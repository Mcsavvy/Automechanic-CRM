import Buyer from "../inventory/models/buyer";
import Order, {orderStatusChoices, paymentMethodChoices} from "../inventory/models/order";
import { choice, randint, randDate } from "../utils";

export default async function populateOrders(number: number) {
    const orders = [];
    const buyers = await Buyer.find().select({ _id: 1 });
    for (let i = 0; i < number; i++) {
        const buyer = choice(buyers);
        const order = new Order({
          status: choice(orderStatusChoices),
          overdueLimit: new Date(),
          paymentMethod: choice(paymentMethodChoices),
          buyerId: buyer._id,
          amountPaid: randint(5, 1000),
          discount: randint(0, 50),
          cancelReason: null,
          createdAt: randDate(
            new Date(2020, 0, 1, 10),
            new Date(2032, 11, 31, 12)
          ),
        });
        await order.save();
        orders.push(order);
    }
    return orders;
};