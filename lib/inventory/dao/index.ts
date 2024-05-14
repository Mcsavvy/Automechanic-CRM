import OrderDAO from './order'
import OrderItemDAO from './orderItem'
import GoodDAO from './good'
import BuyerDAO from './buyer'
import InvoiceDAO from './invoice'
import InsightsDAO from './insights'

const DAO = {
    Order: OrderDAO,
    OrderItem: OrderItemDAO,
    Good: GoodDAO,
    Buyer: BuyerDAO,
    Invoice: InvoiceDAO,
    Insights: InsightsDAO
}
export default DAO