import { NextResponse, NextRequest } from "next/server";
import permissionRequired from "@/lib/decorators/permission";
import { Permission } from "@/lib/permissions/base";
import GroupDAO from "@/lib/common/dao/group";
import GroupModel from '@/lib/common/models/group'
import LogDAO, { logParams } from "@/lib/common/dao/log";
import mongoose, { Types } from "mongoose";
import { getDocument } from "@/lib/common/dao/base";
import Group from "@/lib/@types/group";

export const POST = permissionRequired(Permission.AllowAny())(async function (
  req: NextRequest,
  { params }: { params: { groupId: string } }
) {
  try {
    const { name, description, permissions } = await req.json() as Group;
    const groupId = mongoose.Types.ObjectId.createFromHexString(params.groupId);
    const group = await GroupModel.findOneAndUpdate(
        { _id: groupId },
        { $set: { name, permissions, description } },
        { new: false }
      );
    if (!group) {
    const logDetails: logParams = {
      display: [this.user.fullName(), group.name],
      targetId: Types.ObjectId.createFromHexString(params.groupId),
      loggerId: Types.ObjectId.createFromHexString(this.user.id),
      target: "Group",
      details: {
        updated: group.id,
        name: group.name,
        permissions: group.permissions,
        description: group.description,
      },
    };
    await LogDAO.logModification(logDetails);
    return NextResponse.json({ message: "Role successfully updated" }, { status: 200 });
  } catch (error) {
    console.error('Error updating group:', error);
    return NextResponse.json({ message: "Error updating role" }, { status: 500 });
  }
});
