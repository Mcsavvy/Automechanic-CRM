import mongoose from "mongoose";
import OrderItemModel, { IOrderItemDocument } from "../models/orderItem";
import GoodModel from "../models/good";
import OrderModel from "../models/order";
import { OrderItem, OrderStatus, UnsavedOrderItem } from "@/lib/@types/order";

export function transformOrderItem(item: IOrderItemDocument) {
  const result = {
    ...item,
    id: item._id.toHexString(),
    goodId: item.goodId._id.toHexString(),
    orderId: item.orderId._id.toHexString(),
  };
  // remove the _id and __v fields
  Object.keys(result).forEach((key) => {
    if (key === "_id" || key === "__v") {
      delete result[key];
    }
  });
  return result as OrderItem;
}

async function addOrderItem(
  orderId: mongoose.Types.ObjectId | string,
  goodId: mongoose.Types.ObjectId | string,
  params: UnsavedOrderItem
) {
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
    throw new Error("Order not found");
  }
  const orderItem = new OrderItemModel({
    ...params,
    costPrice: good.costPrice,
    orderId,
    goodId,
  });
  await orderItem.save();
  return transformOrderItem(orderItem);
}

async function getOrderItem(id: mongoose.Types.ObjectId | string) {
  const orderItem = await OrderItemModel.findById(id).lean();
  if (!orderItem) {
    throw new Error("OrderItem not found");
  }
  return transformOrderItem(orderItem);
}

async function getOrderItems(orderId: mongoose.Types.ObjectId | string) {
  const orderItems = await OrderItemModel.find({ orderId }).lean();
  return orderItems.map(transformOrderItem);
}

async function deleteOrderItem(id: mongoose.Types.ObjectId | string) {
  const orderItem = await OrderItemModel.findById(id);
  if (!orderItem) {
    throw new Error("OrderItem not found");
  }
  await orderItem.populate("orderId", "status");
  const order = orderItem.orderId as { status: OrderStatus };
  if (["pending", "paid"].includes(order.status)) {
    throw new Error(
      "Cannot delete this orderItem. A transaction is still ongoing"
    );
  }
  await orderItem.deleteOne();
  return transformOrderItem(orderItem);
}

async function updateOrderItem(
  id: mongoose.Types.ObjectId | string,
  params: OrderItem
) {
  const orderItem = await OrderItemModel.findByIdAndUpdate(id, params, {
    new: true,
  });
  if (!orderItem) {
    throw new Error("OrderItem not found");
  }
  return transformOrderItem(orderItem);
}

const OrderItemDAO = {
  addOrderItem,
  getOrderItem,
  getOrderItems,
  deleteOrderItem,
  updateOrderItem,
};
export default OrderItemDAO;
