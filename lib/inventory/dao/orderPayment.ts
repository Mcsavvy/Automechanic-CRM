import OrderPaymentModel, {
  IOrderPaymentDocument,
} from "../models/orderPayment";
import mongoose from "mongoose";
import { NewOrderPayment, OrderPayment } from "@/lib/@types/order";
import { IOrderDocument } from "../models/order";
import OrderModel from "../models/order";
import { DocumentOrId } from "@/lib/@types";

function transformPayment(payment: IOrderPaymentDocument): OrderPayment {
  const orderPayment = {
    ...payment,
    id: payment._id.toHexString(),
    orderId: payment.orderId._id.toHexString(),
    confirmedBy: payment.confirmedBy._id.toHexString(),
  };
  // @ts-ignore
  delete orderPayment._id;
  // @ts-ignore
  delete orderPayment.__v;
  return orderPayment;
}

async function createOrderPayment(
  order: DocumentOrId<IOrderDocument>,
  data: Omit<NewOrderPayment, "orderId">
) {
  if (order instanceof mongoose.Types.ObjectId || typeof order === "string") {
    if (!(await OrderModel.findById(order).select("_id"))) {
      throw new Error(`Order with id ${order} not found`);
    }
  }
  const orderPayment = await OrderPaymentModel.create({
    ...data,
    orderId: typeof order === "string" ? order : order._id,
  });
  return transformPayment(orderPayment);
}

async function getOrderPayment(
  orderPaymentId: string | mongoose.Types.ObjectId
) {
  const orderPayment = await OrderPaymentModel.findById(orderPaymentId).lean();
  if (!orderPayment) {
    throw new Error("Order payment not found");
  }
  return transformPayment(orderPayment);
}

async function updateOrderPayment(
  orderPaymentId: string | mongoose.Types.ObjectId,
  data: Partial<Omit<NewOrderPayment, "id" | "orderId" | "confirmedBy">>
) {
  const orderPayment = await OrderPaymentModel.findByIdAndUpdate(
    orderPaymentId,
    data,
    { new: true }
  );
  if (!orderPayment) {
    throw new Error("Order payment not found");
  }
  return transformPayment(orderPayment);
}

async function deleteOrderPayment(
  orderPaymentId: string | mongoose.Types.ObjectId
) {
  const orderPayment = await OrderPaymentModel.findByIdAndDelete(
    orderPaymentId
  );
  if (!orderPayment) {
    throw new Error("Order payment not found");
  }
  return transformPayment(orderPayment);
}

async function getPaymentsForOrder(order: DocumentOrId<IOrderDocument>) {
  const orderPayments = await OrderPaymentModel.find({
    orderId: typeof order === "string" ? order : order._id,
  }).lean();
  return orderPayments.map(transformPayment);
}

const OrderPaymentDAO = {
  createOrderPayment,
  getOrderPayment,
  updateOrderPayment,
  deleteOrderPayment,
  getPaymentsForOrder,
};

export default OrderPaymentDAO;
