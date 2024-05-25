export type OrderStatus = 'pending' | 'cancelled' | 'error' | 'rest'| 'paid';
export type PaymentMethod = 'cash' | 'credit' | 'debit' | 'voucher' | 'bank' | 'cheque';
export const orderStatusChoices: OrderStatus[] = ['pending', 'cancelled', 'error', 'rest', 'paid'];
export const paymentMethodChoices: PaymentMethod[] = ['cash', 'credit', 'debit', 'voucher', 'bank', 'cheque'];

export interface OrderItem {
    qty: number;
    sellingPrice: number; // Per unit
    discount: number; //In percentage
    orderId: string;
    goodId: string;
    costPrice: number;
}

export interface Order {
    status: OrderStatus;
    overdueLimit: Date;
    paymentMethod: PaymentMethod;
    buyerId: string;
    amountPaid: number;
    change: number;
    items: OrderItem[];
    discount: number;
}

