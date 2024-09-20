import { NextResponse, NextRequest } from "next/server";
import permissionRequired from "@/lib/decorators/permission";
import { Permission } from "@/lib/permissions/server";
import UserDAO from "@/lib/common/dao/user";
import mongoose, { Types } from "mongoose";
import { LogDAO } from "@/lib/common/dao";
import { logParams } from "@/lib/common/dao/log";

export const POST = permissionRequired(Permission.AllowAny())(async function (
  req: NextRequest,
  { params }: { params: { staffId: string } }
) {
  const staffId = params.staffId;
  try {
    const user =  await UserDAO.setUserStatus(
      mongoose.Types.ObjectId.createFromHexString(staffId),
      "active"
    );
    const logDetails: logParams = {
      display: [this.user.fullName(), user.fullName()],
      targetId: Types.ObjectId.createFromHexString(user.id),
      loggerId: Types.ObjectId.createFromHexString(this.user.id),
      target: "Staff",
      details: {
        action_type: "unbanned",
      },
    };
    await LogDAO.logModification(logDetails);
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
