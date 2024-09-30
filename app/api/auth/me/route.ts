import { NextResponse } from "next/server";
import permissionRequired from "@/lib/decorators/permission";
import { Permission } from "@/lib/permissions/server";
import {type User} from "@/lib/@types/user";
import Group from "@/lib/common/models/group";

export const GET = permissionRequired(Permission.AllowAny())(async function (
  req
) {
  const user = this.user;
  const groups = await Group.find(
    { members_ids: user._id },
    {
      _id: 1,
      name: 1,
      permissions: 1,
    }
  );
  const response: User = {
    id: user._id.toString(),
    email: user.email,
    lastName: user.lastName,
    firstName: user.firstName,
    phone: user.phone,
    permissions: user.permissions,
    groups: groups.map((group) => ({
      id: group._id.toString(),
      name: group.name,
      permissions: group.permissions,
    })),
  };
  return NextResponse.json(response);
});
