import mongoose from "mongoose";
import { OrderModel} from "../models/order";
import { OrderItemModel } from "../models/orderItem";
import { GoodModel } from "../models/good";
import { BuyerModel } from "../models/buyer";

interface InvoiceItem {
    productId: string;
    name: string;
    description?: string;
    qty: number;
    sellingPrice: number;
    discount: number;
    total: number;
    grandTotal: number;
}

interface InvoiceTable {
    orderId: mongoose.Types.ObjectId;
    orderedOn: Date;
    buyer: {
        name: string;
        email: string;
        phone: string;
        id: mongoose.Types.ObjectId;
    };
    orderItems: InvoiceItem[];
    total: number;
    dateGenerated: Date;
    orderStatus: string;
    amountPaid: number;
    discount: number;
    grandTotal: number;
}
function getDiscount(price: number, discount: number, rev: boolean = false): number {
    return rev ? (discount / price) * 100 : (discount / 100) * price;
}

async function getInvoice(orderId?: mongoose.Types.ObjectId, orderDoc?: any) : Promise<InvoiceTable> {
    if (!orderId && !orderDoc) {
        throw new Error("Provide the orderId or the order doc");
    }

    const order = orderId ? await OrderModel.findById(orderId).select('-__v').lean() : orderDoc;
    if (!order) {
        throw new Error("Order not found");
    }

    const [buyer, orderItems] = await Promise.all([
        BuyerModel.findById(order.buyerId).lean(),  // Assuming you have UserModel
        OrderItemModel.find({ orderId }).select('-costPrice -__v').populate('goodId').lean()
    ]);
    if (!buyer) {
        throw new Error("Buyer not found");
    }
    let invoiceTotal = 0;
    let invoiceGrandTotal = 0;
    const invoiceItems = orderItems.map(orderItem => {
        const total = orderItem.qty * orderItem.sellingPrice;
        const grandTotal = total - getDiscount(total, orderItem.discount);
        
        invoiceTotal += total;
        invoiceGrandTotal += grandTotal;
        
        return {
            // @ts-ignore
            productId: orderItem.goodId.productId,
            // @ts-ignore
            name: orderItem.goodId.name,
            qty: orderItem.qty,
            sellingPrice: orderItem.sellingPrice,
            discount: orderItem.discount,
            total,
            grandTotal
        };
    });
    
    const sumDiscount = getDiscount(invoiceTotal, invoiceTotal - invoiceGrandTotal, true);

    return {
        orderId: order._id,
        orderedOn: order.createdAt,
        buyer: {
            name: buyer.name,
            id: buyer._id,
            email: buyer.email,
            phone: buyer.phone
        },
        orderItems: invoiceItems,
        total: invoiceTotal,
        dateGenerated: new Date(),
        orderStatus: order.status,
        amountPaid: order.amountPaid,
        discount: sumDiscount,
        grandTotal: invoiceGrandTotal
    };
}

async function getInvoices(buyerId: mongoose.Types.ObjectId): Promise<InvoiceTable[]> {
    const orders = await OrderModel.find({ buyerId }).select('-__v').lean();
    const invoicePromises = orders.map(order => getInvoice(undefined, order));
    const invoices = await Promise.all(invoicePromises);
    return invoices;
}
const InvoiceDAO = { 
    getInvoice,
    getInvoices 
}
export default InvoiceDAO;