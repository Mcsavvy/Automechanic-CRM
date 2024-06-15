import OrderPaymentModel, {
  IOrderPaymentDocument,
} from "../models/orderPayment";
import mongoose from "mongoose";
import { IOrderDocument } from "../models/order";
import OrderModel from "../models/order";
import { DocumentOrId } from "../../@types";
import {
  NewPayment,
  PaginatedPayments,
  Payment,
  PaymentCustomer,
  PaymentModification,
  PaymentOrder,
  PaymentSort,
  PaymentVerifier,
} from "../../@types/payments";
import { FilterQuery } from "mongoose";
import { getDocument } from "../../common/dao/base";
import User, { IUserDocument } from "../../common/models/user";
import BuyerModel, { IBuyerDocument } from "../models/buyer";

type OrderPaymentQuery<T extends IOrderPaymentDocument> = {
  sort?: PaymentSort;
  page?: number;
  limit?: number;
  filters?: FilterQuery<IOrderPaymentDocument>;
  aggregate?: mongoose.Aggregate<T[]>;
};

function transformOrder(order: IOrderDocument): PaymentOrder {
  return {
    id: order._id.toHexString(),
    orderNo: order.orderNo,
  };
}

function transformCustomer(customer: IBuyerDocument): PaymentCustomer {
  return {
    id: customer._id.toHexString(),
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
  };
}

function transformStaff(staff: IUserDocument): PaymentVerifier {
  return {
    id: staff._id.toHexString(),
    name: staff.firstName + " " + staff.lastName,
  };
}

async function transformPayment(
  payment: IOrderPaymentDocument
): Promise<Payment> {
  const customer = await getDocument(
    BuyerModel,
    payment.customer,
    {
      id: 1,
      name: 1,
      email: 1,
      phone: 1,
    },
    { lean: true }
  );
  if (!customer) {
    throw new Error("Customer not found");
  }
  const order = await getDocument(
    OrderModel,
    payment.order,
    {
      id: 1,
      orderNo: 1,
    },
    { lean: true }
  );
  if (!order) {
    throw new Error("Order not found");
  }
  const confirmedBy = await getDocument(
    User,
    payment.confirmedBy,
    {
      id: 1,
      firstName: 1,
      lastName: 1,
    },
    { lean: true }
  );
  if (!confirmedBy) {
    throw new Error("Staff not found");
  }
  return {
    ...payment,
    id: payment._id.toHexString(),
    createdAt: payment.createdAt.toISOString(),
    customer: transformCustomer(customer),
    order: transformOrder(order),
    confirmedBy: transformStaff(confirmedBy),
  };
}

async function createOrderPayment(
  order: DocumentOrId<IOrderDocument>,
  data: Omit<NewPayment, "order">
) {
  let orderInstance: IOrderDocument | null = null;
  if (typeof order === "string" || order instanceof mongoose.Types.ObjectId) {
    orderInstance = await OrderModel.findById(order);
    if (!orderInstance) {
      throw new Error(`Order with id ${order} not found`);
    }
  } else {
    orderInstance = order as IOrderDocument;
  }
  const orderPayment = await OrderPaymentModel.create({
    ...data,
    order: orderInstance!._id,
    customer: orderInstance!.buyerId,
  });
  return transformPayment(
    orderPayment.toJSON({ flattenMaps: true }) as IOrderPaymentDocument
  );
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

async function getPayments<T extends IOrderPaymentDocument>({
  filters,
  aggregate,
  sort = {},
  page = 1,
  limit = 10,
}: OrderPaymentQuery<T>): Promise<PaginatedPayments> {
  let payments: (IOrderPaymentDocument | T)[] = [];
  let totalDocs = 0;
  if (filters) {
    totalDocs = await OrderPaymentModel.countDocuments(filters).exec();
    payments = await OrderPaymentModel.find(filters, null, {
      sort,
      skip: (page - 1) * limit,
      limit,
    }).lean();
  } else if (aggregate) {
    // @ts-ignore
    aggregate.facet({
      payments: [
        { $sort: sort },
        { $skip: (page - 1) * limit },
        { $limit: limit },
      ],
      totalDocs: [{ $count: "count" }],
    });
    // @ts-ignore
    const result: {
      payments: T[];
      totalDocs: { count: number }[];
    } = await aggregate.exec();
    totalDocs = result.totalDocs[0].count;
    payments = result.payments;
  }
  const pageCount = Math.ceil(totalDocs / limit);
  if (page > 1 && page > pageCount) {
    throw new Error("Page not found");
  }
  const transformedPayments = await Promise.all(payments.map(transformPayment));
  const next = page < pageCount ? page + 1 : null;
  const prev = page > 1 ? page - 1 : null;
  return {
    payments: transformedPayments,
    totalDocs,
    pageCount,
    page,
    limit,
    next,
    prev,
    hasNextPage: !!next,
    hasPrevPage: !!prev,
  };
}

async function updateOrderPayment(
  orderPaymentId: string | mongoose.Types.ObjectId,
  data: Omit<PaymentModification, "id">
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
  getPayments,
};

export default OrderPaymentDAO;
