import { NextResponse, NextRequest } from "next/server";
import permissionRequired from "@/lib/decorators/permission";
import { Permission } from "@/lib/permissions/server";
import GroupDAO from "@/lib/common/dao/group";
import GroupModel from '@/lib/common/models/group'
import mongoose from "mongoose";
import Group from "@/lib/@types/group";

export const POST = permissionRequired(Permission.AllowAny())(async function (
  req: NextRequest,
  { params }: { params: { groupId: string } }
) {
  try {
    const { name, description, permissions } = await req.json() as Group;
    const groupId = mongoose.Types.ObjectId.createFromHexString(params.groupId);
    await GroupModel.updateOne(
        { _id: groupId },
        { $set: { name, permissions, description } }
      );
    // await Promise.all([
    //   GroupDAO.updateGroup(groupId, { name, description }),
    //   GroupDAO.setPermission(groupId, permissions)
    // ]);

    return NextResponse.json({ message: "Role successfully updated" }, { status: 200 });
  } catch (error) {
    console.error('Error updating group:', error);
    return NextResponse.json({ message: "Error updating role" }, { status: 500 });
  }
});
