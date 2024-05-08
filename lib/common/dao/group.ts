import mongoose from "mongoose";
import Group from "../models/group";
import User from "../models/user";

interface createGroupParams {
    name: string;
    description?: string;
}

async function createGroup({
    name,
    description,
}: createGroupParams) {
    const group = new Group({
        name,
        description,
    });
    await group.save();
    return group;
}

async function updateGroup(id: mongoose.Types.ObjectId, params: Partial<createGroupParams>) {
    const group = await Group.findById(id);
    if (!group) {
        throw new Error("Group not found");
    }
    if (params.name) {
        group.name = params.name;
    }
    if (params.description) {
        group.description = params.description;
    }
    await group.save();
}

async function deleteGroup(id: mongoose.Types.ObjectId) {
    await Group.deleteOne({ _id: id });
}

async function addMember(groupId: mongoose.Types.ObjectId, memberId: mongoose.Types.ObjectId) {
    const group = await Group.findById(groupId);
    if (!group) {
        throw new Error("Group not found");
    }
    if (!(await User.findById(memberId))) {
        throw new Error("User not found");
    }
    if (group.members_ids.includes(memberId)) {
        throw new Error("User already in group");
    }
    group.members_ids.push(memberId);
    await group.save();
}

async function removeMember(groupId: mongoose.Types.ObjectId, memberId: mongoose.Types.ObjectId) {
    const group = await Group.findById(groupId);
    if (!group) {
        throw new Error("Group not found");
    }
    if (!(await User.findById(memberId))) {
        throw new Error("User not found");
    }
    if (!group.members_ids.includes(memberId)) {
        throw new Error("User not in group");
    }
    group.members_ids = group.members_ids.filter((id) => id !== memberId);
    await group.save();
}

async function setPermission(groupId: mongoose.Types.ObjectId, key: string, value: string[] | boolean) {
    const group = await Group.findById(groupId);
    if (!group) {
        throw new Error("Group not found");
    }
    group.permissions[key] = value;
    await group.save();
}

const GroupDAO = {
    createGroup,
    updateGroup,
    deleteGroup,
    addMember,
    removeMember,
    setPermission,
};

export default GroupDAO;
