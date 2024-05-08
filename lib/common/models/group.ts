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
}

export const Group = getBaseSchema().add({
    name: { type: String, required: true },
    description: { type: String, required: false, default: '' },
    members_ids: { type: [mongoose.Types.ObjectId], required: true, default: [], ref: User },
    permissions: { type: Object, required: true, default: {} },
});




export default defineModel<IGroupDocument>("Group", Group);
