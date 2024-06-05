import Good from "../inventory/models/good";
import Order from "../inventory/models/order";
import OrderItem from "../inventory/models/orderItem";
import { choice, randint } from "../utils";

export default async function populateOrderItems(number: number) {
  const orderItems = [];
  const orders = await Order.find()
    .select({ _id: 1, amountPaid: 1, status: 1, discount: 1 })
    .exec();
  const goods = await Good.find().select({ _id: 1, costPrice: 1 }).exec();
  for (let i = 0; i < number; i++) {
    let order = choice(orders);
    while (["cancelled", "overdue"].includes(order.status)) {
      order = choice(orders);
    }
    const good = choice(goods);
    const amountPaid = order.amountPaid;
    const status = order.status;
    const discount = order.discount;  // in percentage
    const costPrice = good.costPrice;
    // sell at a price between 10% and 50% more than cost price
    const sellingPrice = randint(
      costPrice + costPrice * 0.1,
      costPrice + costPrice * 0.5
    );
    const qty = randint(1, 10);
    const totalCost = costPrice * qty;
    const discountedCost = totalCost - (totalCost * discount) / 100;
    const orderItem = new OrderItem({
      qty,
      sellingPrice,
      costPrice,
      orderId: order._id,
      goodId: good._id,
    });
    await orderItem.save();
    orderItems.push(orderItem);
    if (["cancelled", "overdue", "pending"].includes(status)) {
      continue;
    }
    // update order amountPaid
    if (status === "paid") {
      order.amountPaid += discountedCost;
    }
    else if (status === "ongoing") {
      order.amountPaid += randint(0, discountedCost);
    }
    await order.save();
  }
  return orderItems;
}
