import mongoose from 'mongoose';
import { getBaseSchema, IBaseDocument } from './base';
import Job from './job';
import Mechanic from './mechanic';

interface IServiceDocument extends IBaseDocument {
  title: string;
  description: string;
  discount: number;
  price: number;
  isCompleted: boolean;
  jobId: mongoose.Types.ObjectId;
  mechanicId: mongoose.Types.ObjectId;
}

const ServiceSchema = getBaseSchema().add({
  title: { type: String, required: true },
  description: { type: String, required: true },
  discount: { type: String, required: true },
  isCompleted: { types: Boolean, default: false },
  jobId: { type: mongoose.Types.ObjectId, required: true, ref: Job },
  mechanicId: { type: mongoose.Types.ObjectId, required: true, ref: Mechanic },
});



export default mongoose.model<IServiceDocument>("Service", ServiceSchema);