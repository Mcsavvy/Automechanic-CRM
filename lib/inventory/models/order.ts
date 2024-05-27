import mongoose from 'mongoose';
import { getBaseSchema, IBaseDocument , defineModel} from '../../common/models/base';
import { BuyerModel, IBuyerDocument } from './buyer';
import { PaymentMethod, OrderStatus } from '@/lib/@types/order';

export const orderStatusChoices: OrderStatus[] = [
  "pending",
  "cancelled",
  "error",
  "rest",
  "paid",
];
export const paymentMethodChoices: PaymentMethod[] = [
  "cash",
  "credit",
  "debit",
  "voucher",
  "bank",
  "cheque",
];

export interface IOrderDocument extends IBaseDocument {
  status: OrderStatus;
  overdueLimit: Date;
  paymentMethod: PaymentMethod;
  buyerId: mongoose.Types.ObjectId | IBuyerDocument;
  amountPaid: number;
  change: number;
}

const OrderSchema = getBaseSchema().add({
    status: { type: String, required: true, enum: orderStatusChoices, default: 'rest' },
    overdueLimit: { type: Date, required: true },
    paymentMethod: { type: String, required: true, enum: paymentMethodChoices, default: 'cash'},
    buyerId: { type: mongoose.Types.ObjectId, required: true, ref: BuyerModel },
    amountPaid: { type: Number, required: true, default: () => 0 },
    change: { type: Number, required: true, default: () => 0 },
    discount: { type: Number, required: true, default: () => 0 },
})
export const OrderModel = defineModel<IOrderDocument>("Order", OrderSchema);
export default OrderModel;