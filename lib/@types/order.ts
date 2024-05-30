import { PaginatedDocs } from "./pagination";

export type OrderStatus = 'pending' | 'cancelled' | 'paid' | 'overdue';
export type PaymentMethod = 'cash' | 'credit' | 'debit' | 'voucher' | 'bank' | 'cheque';

export interface OrderItem {
    id: string;
    qty: number;
    goodId: string;
    orderId: string;
    costPrice: number;
    sellingPrice: number; // Per unit
}

export interface OrderBuyer {
    id: string;
    name: string;
    email: string;
    phone: string;
}

export interface Order {
    id: string;
    buyerId: string;
    discount: number;
    buyer: OrderBuyer;
    amountPaid: number;
    overdueLimit: Date;
    items: OrderItem[];
    status: OrderStatus;
    paymentMethod: PaymentMethod;
}


export interface PaginatedOrders extends PaginatedDocs {
    orders: Order[];
}

export type UnsavedOrderItem = Omit<Omit<OrderItem, "orderId">, "id">;
export type UnsavedOrder = Omit<Order, "buyer"> & { items: UnsavedOrderItem[] };
export type OrderCreate = UnsavedOrder;
export type OrderUpdate = Omit<Order, "buyer"> & {
    items: (OrderItem | UnsavedOrderItem)[];
};