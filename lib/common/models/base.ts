import mongoose, { Document, Schema } from "mongoose";

const dbUri = process.env.MONGODB_URI as string;
let db: mongoose.mongo.Db | undefined = undefined;

(async () => {
    if (!mongoose.connections.length) {
      console.log('Connecting to database:', dbUri);
      await mongoose.connect(dbUri);
    }
    db = mongoose.connections[0].db;
})();

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