import Buyer from "../inventory/models/buyer";
import Order from "../inventory/models/order";

export default async function populateOrders(number: number) {
    const orders = [];
    const orderStatusChoices = ['pending', 'cancelled', 'error', 'rest', 'paid'];
    const paymentMethodChoices = ['cash', 'credit', 'debit', 'voucher', 'bank', 'cheque'];
    const buyers = await Buyer.find();
    for (let i = 0; i < number; i++) {
        const buyer = buyers[Math.floor(Math.random() * buyers.length)];
        const order = new Order({
            status: orderStatusChoices[Math.floor(Math.random() * orderStatusChoices.length)],
            overdueLimit: new Date(),
            paymentMethod: paymentMethodChoices[Math.floor(Math.random() * paymentMethodChoices.length)],
            buyerId: buyer._id,
            amountPaid: Math.floor(Math.random() * 1000),
            change: Math.floor(Math.random() * 10),
            discount: Math.floor(Math.random() * 25)
        });
        await order.save();
        orders.push(order);
    }
    return orders;
};