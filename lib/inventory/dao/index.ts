import dbConnect from "@/lib/dbConnect";
import OrderDAO from './order'
import OrderItemDAO from './orderItem'
import GoodDAO from './good'
import BuyerDAO from './buyer'

dbConnect()

const DAO = {
    Order: OrderDAO,
    OrderItem: OrderItemDAO,
    Good: GoodDAO,
    Buyer: BuyerDAO
}
export default DAO