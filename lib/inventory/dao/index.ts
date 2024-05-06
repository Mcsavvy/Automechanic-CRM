import dbConnect from "../../dbConnect";
import OrderDAO from './order'
import OrderItemDAO from './orderItem'
import GoodDAO from './good'
import BuyerDAO from './buyer'
import InvoiceDAO from './invoice'

dbConnect()

const DAO = {
    Order: OrderDAO,
    OrderItem: OrderItemDAO,
    Good: GoodDAO,
    Buyer: BuyerDAO,
    Invoice: InvoiceDAO
}
export default DAO