import mongoose, { Document, Schema } from "mongoose";

export interface IBaseDocument extends Document {
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  _id: mongoose.Types.ObjectId;
  __v: number;
}

export const getBaseSchema = () => {
  return new Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: () => false},
  });
}

export const defineModel = <T extends IBaseDocument>(name: string, schema: Schema) => {
  return mongoose.models[name] as mongoose.Model<T> || mongoose.model<T>(name, schema);
}