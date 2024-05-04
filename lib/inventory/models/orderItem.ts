import mongoose from 'mongoose';
import { getBaseSchema, IBaseDocument , defineModel} from '@/lib/common/models/base';

interface IOrderItemDocument extends IBaseDocument {
    qty: number;
    sellingPrice: number; // Per unit
    discount: number; //In percentage
    orderId: mongoose.Types.ObjectId;
    goodId: mongoose.Types.ObjectId;
}

const OrderItemSchema = getBaseSchema().add({
    qty: { type: Number, required: true, default: 1 },
    sellingPrice: { type: Number, required: true },
    discount: { type: Number, required: true, default: 0 },
    orderId: { type: mongoose.Types.ObjectId, required: true },
    goodId: { type: mongoose.Types.ObjectId, required: true },
})
export default defineModel<IOrderItemDocument>("OrderItem", OrderItemSchema);