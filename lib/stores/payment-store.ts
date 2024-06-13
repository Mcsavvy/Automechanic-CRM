import axios from "axios";
import { createStore } from "zustand/vanilla";
import {
  NewPayment,
  PaginatedPayments,
  Payment,
  PaymentModification,
  PaymentSort,
} from "../@types/payments";

const endpoint = "/api/payments";

export type PaymentFilter = {
  orderId?: string;
  customerId?: string;
  minAmount?: number;
  maxAmount?: number;
  minCreatedAt?: Date;
  maxCreatedAt?: Date;
};

export interface PaymentState extends PaginatedPayments {
  filter: PaymentFilter;
  payments: Payment[];
  status: "idle" | "loading" | "loaded" | "error";
}

export interface PaymentActions {
  setPayments: (payments: Payment[]) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  applyFilter: (filter: PaymentFilter) => void;
  clearFilter: () => void;
  getPayment: (id: string) => Promise<Payment>;
  createPayment: (payment: NewPayment) => Promise<Payment>;
  updatePayment: (payment: PaymentModification) => Promise<Payment>;
  deletePayment: (id: string) => Promise<void>;
  reset: () => void;
}

export type PaymentStore = PaymentState & PaymentActions;

const filterParamNames: Record<keyof PaymentFilter, string> = {
  orderId: "order",
  customerId: "customer",
  minAmount: "amount[gte]",
  maxAmount: "amount[lte]",
  minCreatedAt: "created[after]",
  maxCreatedAt: "created[before]",
};

const sortParamNames: Record<keyof PaymentSort, string> = {
  amount: "sort[amount]",
  createdAt: "sort[createdAt]",
};

export async function fetchPayments(
  filter: PaymentFilter,
  sort: PaymentSort,
  page: number,
  limit: number
): Promise<PaginatedPayments> {
  const params = new URLSearchParams();
  Object.entries(filter).forEach(([key, value]) => {
    if (value) {
      params.append(
        filterParamNames[key as keyof PaymentFilter],
        value.toString()
      );
    }
  });
  Object.entries(sort).forEach(([key, value]) => {
    if (value) {
      const param = sortParamNames[key as keyof PaymentSort];
      if (!param) {
        console.error(`Invalid sort key: ${key}`);
        return;
      }
      params.append(param, value.toString());
    }
  });
  params.append("page", page.toString());
  params.append("limit", limit.toString());
  const { data } = await axios.get<PaginatedPayments>(`${endpoint}?${params}`);
  return data;
}

export async function fetchPayment(id: string): Promise<Payment> {
  const { data } = await axios.get<Payment>(`${endpoint}/${id}`);
  return data;
}

export async function createPayment(payment: NewPayment): Promise<Payment> {
  const { data } = await axios.post<Payment>(endpoint, payment);
  return data;
}

export async function updatePayment(
  payment: PaymentModification
): Promise<Payment> {
  const { data } = await axios.put<Payment>(
    `${endpoint}/${payment.id}`,
    payment
  );
  return data;
}

export async function deletePayment(id: string): Promise<void> {
  await axios.delete(`${endpoint}/${id}`);
}

export const initialPaymentState: PaymentState = {
  filter: {},
  payments: [],
  status: "idle",
  page: 1,
  limit: 10,
  totalDocs: 0,
  pageCount: 0,
  next: null,
  prev: null,
  hasNextPage: false,
  hasPrevPage: false,
};

export const usePaymentStore = createStore<PaymentStore>((set) => ({
  ...initialPaymentState,
  setPayments: (payments) => set({ payments }),
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
  applyFilter: (filter) => set({ filter }),
  clearFilter: () => set({ filter: {} }),
  getPayment: async (id) => {
    set({ status: "loading" });
    try {
      const payment = await fetchPayment(id);
      set({ status: "loaded" });
      return payment;
    } catch (error) {
      set({ status: "error" });
      throw error;
    }
  },
  createPayment: async (payment) => {
    set({ status: "loading" });
    try {
      const newPayment = await createPayment(payment);
      set({ status: "loaded" });
      return newPayment;
    } catch (error) {
      set({ status: "error" });
      throw error;
    }
  },
  updatePayment: async (payment) => {
    set({ status: "loading" });
    try {
      const updatedPayment = await updatePayment(payment);
      set({ status: "loaded" });
      return updatedPayment;
    } catch (error) {
      set({ status: "error" });
      throw error;
    }
  },
  deletePayment: async (id) => {
    set({ status: "loading" });
    try {
      await deletePayment(id);
      set({ status: "loaded" });
    } catch (error) {
      set({ status: "error" });
      throw error;
    }
  },
  reset: () => set(initialPaymentState),
}));
