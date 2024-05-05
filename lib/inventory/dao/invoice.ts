import mongoose from "mongoose";
import OrderModel from "../models/order";
import OrderItemModel from "../models/orderItem";
import GoodModel from "../models/good";
import BuyerModel from "../models/buyer";

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
function getDiscount(price: number, discount: number, rev: boolean = false) {
    return rev ? (discount / price) * 100 : (discount / 100) * price;
}

async function getInvoice(orderId?: mongoose.Types.ObjectId, orderDoc?: any) {
    let order;
    if (!orderId && !orderDoc) {
        throw new Error("Provide the orderId or the order doc")
    }
    if (orderId) {
        order = await OrderModel.findById(orderId, { __v: 0 });
    } else if (orderDoc) {
        order = orderDoc;
    }
    if (!order) {
        throw new Error("Order not found")
    }
    await order.populate('buyerId');
    const buyer = order.buyerId as any;
    const orderItems = await OrderItemModel.find({ orderId }, { costPrice: 0, __v: 0 });
    const invoiceItems: InvoiceItem[] = [];
    let invoiceTotal = 0;
    let invoiceGrandTotal = 0;
    orderItems.map(async (orderItem) => {
        await orderItem.populate('goodId');
        const good = orderItem.goodId as any;
        const qty = orderItem.qty;
        const sellingPrice = orderItem.sellingPrice;
        const discount = orderItem.discount;
        const total = qty * sellingPrice;
        const grandTotal = total - getDiscount(total, discount);
        const invoiceItem: InvoiceItem = { productId: good.productId, name: good.name, qty, sellingPrice, discount, total, grandTotal };
        invoiceItems.push(invoiceItem);
        invoiceTotal += total;
        invoiceGrandTotal += grandTotal;
    })
    const dateGenerated = new Date(Date.now())
    const orderStatus = order.status;
    const amountPaid = order.amountPaid;
    const sumDiscount = getDiscount(invoiceTotal, invoiceTotal - invoiceGrandTotal, true)
    const invoice: InvoiceTable = { 
        orderId: order._id, 
        orderedOn: order.createdAt,
        buyer: {name: buyer.name, id: buyer._id, email: buyer.email, phone: buyer.phone}, 
        orderItems: invoiceItems, 
        total: invoiceTotal, 
        dateGenerated, 
        orderStatus, 
        amountPaid, 
        discount: sumDiscount, 
        grandTotal: invoiceGrandTotal 
    };
    return invoice
}

async function getInvoices(buyerId: mongoose.Types.ObjectId) {
    const orders = await OrderModel.find({ buyerId }, { __v: 0 });
    const invoices: InvoiceTable[] = [];
    orders.map(async (order) => {
        const invoice = await getInvoice(undefined, order);
        invoices.push(invoice);
    })
}
const InvoiceDAO = { 
    getInvoice,
    getInvoices 
}
export default InvoiceDAO;