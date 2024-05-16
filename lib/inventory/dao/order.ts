import mongoose from "mongoose";
import { BuyerModel } from '../models/buyer';
import { OrderModel } from "../models/order";

interface Order {
    status: 'pending' | 'cancelled' | 'error' | 'rest'| 'paid';
    overdueLimit: Date;
    paymentMethod: 'cash' | 'credit' | 'debit' | 'voucher' | 'bank' | 'cheque';
    amountPaid: number;
    change: number;
  }

async function addOrder(buyerId: mongoose.Types.ObjectId, order: Order) {

    // validate the order data

    const buyer = await BuyerModel.findById(buyerId);
    if (!buyer) {
        throw new Error("Buyer not found");
    }
    const newOrder = new OrderModel({
        ...order,
        buyerId
    });
}

async function updateOrder(id: mongoose.Types.ObjectId, params: Partial<Order>) {

    // Validate the order data

  const order = await OrderModel.findByIdAndUpdate(id, params, { new: true })
    if (!order) {
        throw new Error("Order not found");
    }
    return order;
}

async function deleteOrder(id: mongoose.Types.ObjectId) {
    const order = await OrderModel.findById(id);
    if (!order) {
        throw new Error("Order not found");
    }
    if (['pending', 'paid', 'error'].includes(order.status)) {
        throw new Error("Cannot delete this order. A transaction is still ongoing");
    }
    await order.deleteOne();
    return order
}

async function getOrder(id?: mongoose.Types.ObjectId, filters?: Partial<Order>) {
    let query = {};
    if (id) query = { _id: id };
    if (filters) query = { ...query, ...filters };
    if (!id && !filters) {
        throw new Error("No values provided")
    }
    const order = await OrderModel.findOne(query).populate({
        path: 'buyerId',
        select: 'name email _id phone'
    });
;
    if (!order) {
        throw new Error("Good not found");
    }
    // await order
    return order
}

async function getOrders(filters?: Partial<Order>, page: number = 1, limit: number = 30) {
    if (page < 1) {
        throw new Error("Invalid page number");
    }
    const query = filters ? filters : {};
    const skip = (page - 1) * limit;
    const orders = await OrderModel.find(query)
        .skip(skip)
        .limit(limit)
    // await Promise.all(orders.map(order => order.populate({path: 'buyerId', select: 'name email phone id'})))
    const next = orders.length === limit ? page + 1 : null;
    const prev = page > 1 ? page - 1 : null;
    return { orders, next, prev };
}

const OrderDAO = {
    addOrder,
    updateOrder,
    deleteOrder,
    getOrder,
    getOrders
}
export default OrderDAO