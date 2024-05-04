import mongoose from 'mongoose';
import { getBaseSchema, IBaseDocument , defineModel} from '@/lib/common/models/base';

interface IOrderDocument extends IBaseDocument {
  status: 'pending' | 'cancelled' | 'error' | 'rest'| 'paid';
  overdueLimit: Date;
  paymentMethod: 'cash' | 'credit' | 'debit' | 'voucher' | 'bank' | 'cheque';
  customerId: mongoose.Types.ObjectId;
  amountPaid: number;
  change: number;
}

const OrderSchema = getBaseSchema().add({
    status: { type: String, required: true, enum: ['pending', 'cancelled', 'error', 'rest', 'paid'], default: 'rest' },
    overdueLimit: { type: Date, required: true },
    paymentMethod: { type: String, required: true, enum: ['cash', 'credit', 'debit', 'voucher', 'bank', 'cheque'] },
    customerId: { type: mongoose.Types.ObjectId, required: true },
    amountPaid: { type: Number, required: true, default: 0 },
    change: { type: Number, required: true, default: 0 },
})
export default defineModel<IOrderDocument>("Order", OrderSchema);