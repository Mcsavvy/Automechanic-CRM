import mongoose from 'mongoose';
import { getBaseSchema, IBaseDocument , defineModel} from '../../common/models/base';
import { BuyerModel, IBuyerDocument } from './buyer';
import { OrderStatus, orderStatusChoices, paymentMethodChoices } from '../../../lib/@types/order';


export interface IOrderDocument extends IBaseDocument {
  orderNo: number;
  discount: number;
  overdueLimit: Date;
  amountPaid: number;
  status: OrderStatus;
  cancelReason: string | null;
  buyerId: mongoose.Types.ObjectId | IBuyerDocument;
}

const OrderSchema = getBaseSchema().add({
  overdueLimit: { type: Date, required: true },
  cancelReason: { type: String, required: false },
  discount: { type: Number, required: true, default: () => 0 },
  amountPaid: { type: Number, required: true, default: () => 0 },
  orderNo: { type: Number, required: true, default: () => 0 },
  buyerId: { type: mongoose.Types.ObjectId, required: true, ref: BuyerModel },
  status: { type: String, required: true, enum: orderStatusChoices, default: 'pending' },
})

OrderSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastOrder = await OrderModel.findOne({}, {}, { sort: { orderNo: -1 } });
    this.$set("orderNo", lastOrder ? lastOrder.orderNo + 1 : 1);
  }
  next();
});

export const OrderModel = defineModel<IOrderDocument>("Order", OrderSchema);
export default OrderModel;
export {
  orderStatusChoices,
  paymentMethodChoices,
}