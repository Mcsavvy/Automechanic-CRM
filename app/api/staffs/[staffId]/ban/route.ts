import { NextResponse, NextRequest } from "next/server";
import permissionRequired from "@/lib/decorators/permission";
import { Permission } from "@/lib/permissions/base";
import UserDAO from "@/lib/common/dao/user";
import mongoose from "mongoose";

export const POST = permissionRequired(Permission.AllowAny())(async function (
  req: NextRequest,
  { params }: { params: { staffId: string } }
) {
  const staffId = params.staffId;
  try {
    await UserDAO.setUserStatus(
      mongoose.Types.ObjectId.createFromHexString(staffId),
      "banned"
    );
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
  return new NextResponse(null, { status: 204 });
});
