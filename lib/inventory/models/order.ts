import mongoose from 'mongoose';
import { getBaseSchema, IBaseDocument , defineModel} from '../../common/models/base';
import { BuyerModel, IBuyerDocument } from './buyer';
import { PaymentMethod, OrderStatus } from '@/lib/@types/order';

export const orderStatusChoices: OrderStatus[] = [
  "pending",
  "cancelled",
  "paid",
  "overdue",
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
  discount: number;
  overdueLimit: Date;
  amountPaid: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  cancelReason: string | null;
  buyerId: mongoose.Types.ObjectId | IBuyerDocument;
}

const OrderSchema = getBaseSchema().add({
  overdueLimit: { type: Date, required: true },
  cancelReason: { type: String, required: false },
  discount: { type: Number, required: true, default: () => 0 },
  amountPaid: { type: Number, required: true, default: () => 0 },
  buyerId: { type: mongoose.Types.ObjectId, required: true, ref: BuyerModel },
  status: { type: String, required: true, enum: orderStatusChoices, default: 'pending' },
  paymentMethod: { type: String, required: true, enum: paymentMethodChoices, default: 'cash'},
})


export const OrderModel = defineModel<IOrderDocument>("Order", OrderSchema);
export default OrderModel;