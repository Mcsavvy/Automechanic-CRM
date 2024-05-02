import mongoose from 'mongoose';
import { getBaseSchema, IBaseDocument } from './base';
import UserModel from './user';

interface ILogDocument extends IBaseDocument {
  description: string;
  action: 'create' | 'update' | 'delete'; // The action carried out
  target: string; // The model affected
  targetId: mongoose.Types.ObjectId; // The id of the model affected
  loggerId: mongoose.Types.ObjectId; // The id of the user who carried the action

}

const LogSchema = getBaseSchema().add({
  description: { type: String, required: true, default: ''},
  action: { type: String, required: true },
  target: { type: String, required: true },
  targetId: { type: mongoose.Types.ObjectId, required: true },
  loggerId: { type: mongoose.Types.ObjectId, required: true, ref: UserModel },
});



export default mongoose.model<ILogDocument>("Log", LogSchema);