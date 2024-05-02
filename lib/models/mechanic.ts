import mongoose from 'mongoose';
import { getBaseSchema, IBaseDocument } from './base';

interface IMechanicDocument extends IBaseDocument {
  name: string;
  phoneNumber: string;
}

const MechanicSchema = getBaseSchema().add({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});



export default mongoose.model<IMechanicDocument>("Mechanic", MechanicSchema);