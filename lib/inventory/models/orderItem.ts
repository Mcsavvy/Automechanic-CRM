import mongoose from 'mongoose';
import { getBaseSchema, IBaseDocument , defineModel} from '../../common/models/base';
import { GoodModel , IGoodDocument} from './good';
import {OrderModel, IOrderDocument} from './order';

export interface IOrderItemDocument extends IBaseDocument {
    qty: number;
    costPrice: number; // The current cost price per unit as at creation of the invoice
    sellingPrice: number; // Per unit
    orderId: mongoose.Types.ObjectId | IOrderDocument;
    goodId: mongoose.Types.ObjectId | IGoodDocument;
}

const OrderItemSchema = getBaseSchema().add({
    costPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    qty: { type: Number, required: true, default: () => 1},
    goodId: { type: mongoose.Types.ObjectId, required: true, ref: GoodModel},
    orderId: { type: mongoose.Types.ObjectId, required: true, ref: OrderModel },
})
export const OrderItemModel = defineModel<IOrderItemDocument>("OrderItem", OrderItemSchema);
export default OrderItemModel;