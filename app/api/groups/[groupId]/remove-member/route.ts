import { NextResponse, NextRequest } from "next/server";
import permissionRequired from "@/lib/decorators/permission";
import { Permission } from "@/lib/permissions/server";
import GroupDAO from "@/lib/common/dao/group";
import mongoose from 'mongoose';

interface GroupChange {
    staffId: string;
}
export const POST = permissionRequired(Permission.AllowAny())(async function (
    req: NextRequest,
    { params }: { params: { groupId: string } }
) {
    const groupId = params.groupId
    const { staffId } = (await req.json()) as GroupChange;
    if (!staffId) {
        return NextResponse.json({ message: "Staff ID is required" }, { status: 400 });
    }
    await GroupDAO.removeMember(
            mongoose.Types.ObjectId.createFromHexString(groupId),
            mongoose.Types.ObjectId.createFromHexString(staffId)
    );
    return NextResponse.json({"message": "Member removed successfully"});

});
