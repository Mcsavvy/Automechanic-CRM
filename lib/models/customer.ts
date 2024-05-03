import mongoose from 'mongoose';
import { getBaseSchema, IBaseDocument , defineModel} from './base';

interface ICustomerDocument extends IBaseDocument {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

const CustomerSchema = getBaseSchema().add({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});



export default defineModel<ICustomerDocument>("Customer", CustomerSchema);