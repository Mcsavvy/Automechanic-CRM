import mongoose from 'mongoose';
import { getBaseSchema, IBaseDocument } from './base';
import Customer from './customer';
import Vehicle from './vehicle';

interface IJobDocument extends IBaseDocument {
  title: string;
  description: string;
  discount: number;
  customerId: mongoose.Types.ObjectId;
}

const JobSchema = getBaseSchema().add({
  title: { type: String, required: true },
  description: { type: String, required: true },
  discount: { type: String, required: true },
  customerId: { type: mongoose.Types.ObjectId, required: true, ref: Customer},
  vehicleId: { type: mongoose.Types.ObjectId, required: true, ref: Vehicle},
});



export default mongoose.model<IJobDocument>("Job", JobSchema);