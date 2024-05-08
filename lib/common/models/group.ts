import { getBaseSchema, IBaseDocument, defineModel } from "./base";
import User from "./user";
import mongoose from 'mongoose';

export interface IGroupDocument extends IBaseDocument {
    name: string;
    description?: string;
    members_ids: mongoose.Types.ObjectId[];
    permissions: {
        [key: string]: string[] | boolean;
    };
    hasPermission(permission: string): boolean;
    hasMember(userId: mongoose.Types.ObjectId): boolean;
}

export const GroupSchema = getBaseSchema().add({
    name: { type: String, required: true, unique: true},
    description: { type: String, required: false, default: '' },
    members_ids: { type: [mongoose.Types.ObjectId], required: true, default: [], ref: User },
    permissions: { type: Object, required: true, default: {} },
});

GroupSchema.methods.hasPermission = function (permission: string) {
    // example: 'user:read,write'
    if (permission.includes(":")) {
        const [scope, action] = permission.split(":", 2);
        const actions = action.split(",");
        if (actions.length > 1) {
            return actions.every((action) =>
                this.hasPermission(`${scope}:${action}`)
            );
        }
        if (action === "*" || action === "all" || action === "") {
            return this.permissions[scope] === true;
        }
        return (
            this.permissions[scope] === true ||
            this.permissions[scope].includes(action)
        );
    }
    return this.permissions[permission] === true;
};

GroupSchema.methods.hasMember = function (userId: mongoose.Types.ObjectId) {
    return this.members_ids.includes(userId);
};



export default defineModel<IGroupDocument>("Group", GroupSchema);
