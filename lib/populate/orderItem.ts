import Good from "../inventory/models/good";
import Order from "../inventory/models/order";
import OrderItem from "../inventory/models/orderItem";


export default async function populateOrderItems(number: number) {
    const orderItems = [];
    const orders = await Order.find();
    const goods = await Good.find();
    for (let i = 0; i < number; i++) {
        const order = orders[Math.floor(Math.random() * orders.length)];
        const good = goods[Math.floor(Math.random() * goods.length)];
        const orderItem = new OrderItem({
            qty: Math.floor(Math.random() * 10),
            sellingPrice: Math.floor(Math.random() * 1000),
            costPrice: Math.floor(Math.random() * 1000),
            discount: Math.floor(Math.random() * 20),
            orderId: order._id,
            goodId: good._id,
        });
        await orderItem.save();
        orderItems.push(orderItem);
    }
    return orderItems;
}