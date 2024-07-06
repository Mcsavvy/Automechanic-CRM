"use client";
import { PaymentMethod } from "@/lib/@types/order";
import { addDays } from "date-fns";

import { useState } from "react";
import InvoicePayments from "./invoice-payments";
import InvoiceItems from "./invoice-items";

type InvoiceItem = {
  id: string;
  name: string;
  cost: number;
  quantity: number;
};

type InvoicePayment = {
  amount: number;
  paymentMethod: PaymentMethod;
};

export default function CreateInvoice({invoiceNumber}: {invoiceNumber: number}) {
    const [invoiceNo, setInvoiceNo] = useState(invoiceNumber);
    const [customer, setCustomer] = useState("");
    const [items, setItems] = useState<InvoiceItem[]>([]);
    const [total, setTotal] = useState(0);
    const [notes, setNotes] = useState("");
    const [issueDate, setIssueDate] = useState(new Date());
    const [dueDate, setDueDate] = useState(addDays(new Date(), 7));
    const [discount, setDiscount] = useState(0);
    const [payments, setPayments] = useState<InvoicePayment[]>([]);

    return (
      <section className="flex gap-4 w-full h-full flex-wrap">
          <InvoiceItems />
          <InvoicePayments />
      </section>
    );
}