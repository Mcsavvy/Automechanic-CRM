import mongoose from 'mongoose';
import { getBaseSchema, IBaseDocument , defineModel} from '../../common/models/base';
import { BuyerModel, IBuyerDocument } from './buyer';

export interface IOrderDocument extends IBaseDocument {
  status: 'pending' | 'cancelled' | 'error' | 'rest'| 'paid';
  overdueLimit: Date;
  paymentMethod: 'cash' | 'credit' | 'debit' | 'voucher' | 'bank' | 'cheque';
  buyerId: mongoose.Types.ObjectId | IBuyerDocument;
  amountPaid: number;
  change: number;
}

const OrderSchema = getBaseSchema().add({
    status: { type: String, required: true, enum: ['pending', 'cancelled', 'error', 'rest', 'paid'], default: 'rest' },
    overdueLimit: { type: Date, required: true },
    paymentMethod: { type: String, required: true, enum: ['cash', 'credit', 'debit', 'voucher', 'bank', 'cheque'] },
    buyerId: { type: mongoose.Types.ObjectId, required: true, ref: BuyerModel },
    amountPaid: { type: Number, required: true, default: () => 0 },
    change: { type: Number, required: true, default: () => 0 },
})
export const OrderModel = defineModel<IOrderDocument>("Order", OrderSchema);