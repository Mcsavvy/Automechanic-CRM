import { NextResponse } from "next/server";
import permissionRequired from "@/lib/decorators/permission";
import { Permission } from "@/lib/permissions/base";
import UserDAO from "@/lib/common/dao/user";
import GroupDAO from "@/lib/common/dao/group";
import Group, { IGroupDocument } from "@/lib/common/models/group";
import mongoose from "mongoose";

interface NewStaffRequest {
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  groups: { label: string; value: string }[];
}

export const POST = permissionRequired(Permission.AllowAny())(async function (
  req
) {
  const body: NewStaffRequest = await req.json();
  const groups: IGroupDocument[] = [];
  // validate groups
  for (const group of body.groups) {
    if (!mongoose.Types.ObjectId.isValid(group.value)) {
      return NextResponse.json({ error: "Invalid group id" }, { status: 400 });
    }
    const doc = await Group.findById(group.value);
    if (!doc) {
      return NextResponse.json(
        { error: `Group "${group.value}" not found` },
        { status: 404 }
      );
    }
    groups.push(doc);
  }
  try {
    // create user
    const user = await UserDAO.addUser({
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      email: body.email,
      password: body.email,
    });
    // add user to groups
    for (const group of groups) {
      await GroupDAO.addMember(group.id, user.id);
    }
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
  return NextResponse.json({});
});
