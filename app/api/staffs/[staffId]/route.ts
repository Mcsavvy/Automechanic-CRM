import { NextResponse, NextRequest } from "next/server";
import permissionRequired from "@/lib/decorators/permission";
import { Permission } from "@/lib/permissions/base";
import UserDAO from "@/lib/common/dao/user";
import mongoose from 'mongoose';
export const GET = permissionRequired(Permission.AllowAny())(async function (
    req: NextRequest,
    { params }: { params: { staffId: string } }
) {
    const staffId = params.staffId
    const result = await UserDAO.getUser(
            mongoose.Types.ObjectId.createFromHexString(staffId)
    );
    if (!result) {
        return NextResponse.json({ message: "Staff not found" }, { status: 404 });
      }
    return NextResponse.json(result);

});
