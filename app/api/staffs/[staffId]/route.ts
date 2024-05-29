import { NextResponse, NextRequest } from "next/server";
import permissionRequired from "@/lib/decorators/permission";
import { Permission } from "@/lib/permissions/base";
import UserDAO from "@/lib/common/dao/user";
import mongoose from "mongoose";
import Staff from "@/lib/@types/staff";

type UpdateStaffBody = Partial<Staff>;

export const GET = permissionRequired(Permission.AllowAny())(async function (
  req: NextRequest,
  { params }: { params: { staffId: string } }
) {
  const staffId = params.staffId;
  const result = await UserDAO.getUser(
    mongoose.Types.ObjectId.createFromHexString(staffId)
  );
  if (!result) {
    return NextResponse.json({ message: "Staff not found" }, { status: 404 });
  }
  return NextResponse.json(result);
});

export const PUT = permissionRequired(Permission.AllowAny())(async function (
  req: NextRequest,
  { params }: { params: { staffId: string } }
) {
  const staffId = params.staffId;
  const body = (await req.json()) as UpdateStaffBody;
  if (body.firstName || body.lastName) {
    return NextResponse.json(
      { message: "Cannot change a staff's name" },
      { status: 400 }
    );
  }
  try {
    const staff = await UserDAO.updateUser(
      mongoose.Types.ObjectId.createFromHexString(staffId),
      body
    );
    return NextResponse.json(staff);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "User not found") {
        return NextResponse.json(
          { message: "Staff not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
});
