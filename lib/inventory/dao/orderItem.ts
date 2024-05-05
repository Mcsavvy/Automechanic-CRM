import mongoose from "mongoose";
import OrderItemModel from '../models/orderItem';
import GoodModel from "../models/good";
import OrderModel from "../models/order";

interface OrderItem {
    qty: number;
    sellingPrice: number;
    discount: number;
    orderId: mongoose.Types.ObjectId;
    goodId: mongoose.Types.ObjectId;
}

interface OOrderItem {
    qty?: number;
    sellingPrice?: number;
    discount?: number;
    orderId?: mongoose.Types.ObjectId;
    goodId?: mongoose.Types.ObjectId;
    costPrice?: number;

}

async function addOrderItem(orderId: mongoose.Types.ObjectId, goodId: mongoose.Types.ObjectId, params: OrderItem) {

    // validate the orderItem data

    const good = await GoodModel.findById(goodId);
    if (!good) {
        throw new Error("Good not found");
    }
    if (good.qty < params.qty) {
        throw new Error("Not enough stock");
    }
    const order = await OrderModel.findById(orderId);
    if (!order) {
        throw new Error("Order not found")
    }
    const orderItem = new OrderItemModel({
        ...params,
        costPrice: good.costPrice,
        orderId,
        goodId
    });
    await orderItem.save();
    return orderItem;
}

async function deleteOrderItem(id: mongoose.Types.ObjectId) {
    const orderItem = await OrderItemModel.findById(id);
    if (!orderItem) {
        throw new Error("OrderItem not found");
    }
    await orderItem.populate('orderId');
    const order = orderItem.orderId as any;
    if (['pending', 'paid', 'error'].includes(order?.status)) {
        throw new Error("Cannot delete this orderItem. A transaction is still ongoing");
    }
    await orderItem.deleteOne();
    return orderItem;

}

async function updateOrderItem(id: mongoose.Types.ObjectId, params: OOrderItem) {
    const orderItem = await OrderItemModel.findByIdAndUpdate(id, params, { new: true });
    if (!orderItem) {
        throw new Error("OrderItem not found");
    }
    return orderItem;
}

export default {
    addOrderItem,
    deleteOrderItem,
    updateOrderItem
}