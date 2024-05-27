import { IBaseDocument } from "../models/base";
import mongoose from "mongoose";

export type ObjectOrId<T extends IBaseDocument> = T | mongoose.Types.ObjectId | string;

export async function getDocument<T extends IBaseDocument>(
  model: mongoose.Model<T>,
  id: ObjectOrId<T>
): Promise<T | null> {
  if (id instanceof mongoose.Types.ObjectId || typeof id === "string") {
    return model.findById(id);
  }
  return id;
}