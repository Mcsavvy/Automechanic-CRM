import mongoose from 'mongoose';
import { getBaseSchema, IBaseDocument , defineModel} from '../../common/models/base';
import GoodModel from './good';
import OrderModel from './order';

interface IOrderItemDocument extends IBaseDocument {
    qty: number;
    sellingPrice: number; // Per unit
    discount: number; //In percentage
    orderId: mongoose.Types.ObjectId;
    goodId: mongoose.Types.ObjectId;
    costPrice: number; // The current cost price per unit as at creation of the invoice
}

const OrderItemSchema = getBaseSchema().add({
    qty: { type: Number, required: true, default: () => 1},
    sellingPrice: { type: Number, required: true },
    costPrice: { type: Number, required: true },
    discount: { type: Number, required: true, default: () => 0 },
    orderId: { type: mongoose.Types.ObjectId, required: true, ref: OrderModel },
    goodId: { type: mongoose.Types.ObjectId, required: true, ref: GoodModel},
})
export default defineModel<IOrderItemDocument>("OrderItem", OrderItemSchema);