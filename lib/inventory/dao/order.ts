import mongoose, { FilterQuery } from "mongoose";
import { IOrderDocument, OrderModel } from "../models/order";
import { Order, OrderItem } from "@/lib/@types/order";
import { PaginatedDocs } from "@/lib/@types/pagination";
import OrderItemDAO from "./orderItem";

type UnsavedOrderItem = Omit<Omit<OrderItem, "orderId">, "id">;
type OrderCreate = Omit<Order, "buyer"> & { items: UnsavedOrderItem[] };
type OrderUpdate = Omit<Order, "buyer"> & {
  items: (OrderItem | UnsavedOrderItem)[];
};
type PopulatedBuyer = {
  name: string;
  email: string;
  phone: string;
  _id: mongoose.Types.ObjectId;
};
type PaginatedOrders = PaginatedDocs & { orders: Order[] };

function transformOrder(order: IOrderDocument) {
  const result = {
    ...order,
    id: order._id.toHexString(),
    buyerId: order.buyerId._id.toHexString(),
    items: [],
  };
  // remove the _id and __v fields
  Object.keys(result).forEach((key) => {
    if (key === "_id" || key === "__v") {
      delete result[key];
    }
  });
  return result as Omit<Order, "buyer">;
}

function transformBuyer(buyer: PopulatedBuyer) {
  return {
    buyerId: buyer._id.toHexString(),
    buyer: {
      name: buyer.name,
      email: buyer.email,
      phone: buyer.phone,
      id: buyer._id.toHexString(),
    },
  };
}

async function addOrder(order: OrderCreate): Promise<Order> {
  // validate the order data

  const buyerId = new mongoose.Types.ObjectId(order.buyerId);
  const newOrder = new OrderModel({
    ...order,
    buyerId,
  });
  const items = await Promise.all(
    order.items.map((item) => {
      const goodId = new mongoose.Types.ObjectId(item.goodId);
      return OrderItemDAO.addOrderItem(newOrder._id, goodId, item);
    })
  );
  await newOrder.save();
  newOrder.populate({
    path: "buyerId",
    select: "name email _id phone",
  });
  return {
    ...transformBuyer(newOrder.buyerId as PopulatedBuyer),
    ...transformOrder(newOrder),
    items,
  };
}

async function updateOrder(update: OrderUpdate): Promise<Order> {
  // Validate the order data
  const order = await OrderModel.findByIdAndUpdate(
    update.id,
    {
      ...update,
      buyerId: new mongoose.Types.ObjectId(update.buyerId),
    },
    { new: true }
  );
  if (!order) {
    throw new Error("Order not found");
  }
  const items = await Promise.all(
    update.items.map(async (item: OrderItem | UnsavedOrderItem) => {
      const goodId = new mongoose.Types.ObjectId(item.goodId);
      if ("id" in item) {
        return await OrderItemDAO.updateOrderItem(item.id, item);
      } else {
        return await OrderItemDAO.addOrderItem(order._id, goodId, item);
      }
    })
  );
  order.populate({
    path: "buyerId",
    select: "name email _id phone",
  });
  return {
    ...transformBuyer(order.buyerId as PopulatedBuyer),
    ...transformOrder(order),
    items,
  };
}

async function deleteOrder(id: mongoose.Types.ObjectId) {
  const order = await OrderModel.findById(id);
  if (!order) {
    throw new Error("Order not found");
  }
  if (["pending", "paid"].includes(order.status)) {
    throw new Error("Cannot delete this order. A transaction is still ongoing");
  }
  await order.deleteOne();
  return order;
}

async function getOrder(
  id?: mongoose.Types.ObjectId,
  filters?: FilterQuery<Order>
) {
  let query = {};
  if (id) query = { _id: id };
  if (filters) query = { ...query, ...filters };
  if (!id && !filters) {
    throw new Error("id or filters must be provided");
  }
  const order = await OrderModel.findOne(query).lean().populate({
    path: "buyerId",
    select: "name email _id phone",
  });
  if (!order) {
    throw new Error("Good not found");
  }
  return {
    ...transformBuyer(order.buyerId as PopulatedBuyer),
    ...transformOrder(order),
    items: await OrderItemDAO.getOrderItems(order._id),
  };
}

async function getOrders({
  page = 1,
  limit = 10,
  filters,
}: {
  page: number;
  limit: number;
  filters?: FilterQuery<Order>;
}): Promise<PaginatedOrders> {
  if (page < 1) {
    throw new Error("Invalid page number");
  }
  if (limit < 1) {
    throw new Error("Invalid limit");
  }

  const query = { ...filters } as FilterQuery<Order>;
  const totalDocs = await OrderModel.countDocuments(query).exec();
  const pageCount = Math.ceil(totalDocs / limit);
  if (page > pageCount) {
    throw new Error("Page not found");
  }
  const skip = (page - 1) * limit;
  const orders = await OrderModel.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate({
      path: "buyerId",
      select: "name email _id phone",
    })
    .lean()
    .exec();
  const next = orders.length === limit ? page + 1 : null;
  const prev = page > 1 ? page - 1 : null;
  const ordersTransformed = await Promise.all(
    orders.map(async (order) => {
      return {
        ...transformBuyer(order.buyerId as PopulatedBuyer),
        ...transformOrder(order),
        items: await OrderItemDAO.getOrderItems(order._id),
      };
    })
  );
  return {
    orders: ordersTransformed,
    totalDocs,
    limit,
    page,
    pageCount,
    next,
    prev,
    hasPrevPage: prev !== null,
    hasNextPage: next !== null,
  };
}

const OrderDAO = {
  addOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getOrders,
};
export default OrderDAO;
