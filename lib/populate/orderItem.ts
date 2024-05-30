import Good from "../inventory/models/good";
import Order from "../inventory/models/order";
import OrderItem from "../inventory/models/orderItem";
import { choice } from "../utils";


export default async function populateOrderItems(number: number) {
    const orderItems = [];
    const orders = await Order.find().select({ _id: 1 });
    const goods = await Good.find().select({ _id: 1 });
    for (let i = 0; i < number; i++) {
        const order = choice(orders);
        const good = choice(goods);
        const orderItem = new OrderItem({
            qty: Math.floor(Math.random() * 10),
            sellingPrice: Math.floor(Math.random() * 1000),
            costPrice: Math.floor(Math.random() * 1000),
            orderId: order._id,
            goodId: good._id,
        });
        await orderItem.save();
        orderItems.push(orderItem);
    }
    return orderItems;
}