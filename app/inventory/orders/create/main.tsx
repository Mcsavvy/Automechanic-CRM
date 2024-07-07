"use client";
import { PaymentMethod } from "@/lib/@types/order";
import { addDays } from "date-fns";

import { useState } from "react";
import InvoicePayments from "./invoice-payments";
import InvoiceItems from "./invoice-items";
import { InvoiceItem, InvoicePayment, CreateInvoiceState } from "./types";

export default function CreateInvoice({invoiceNumber}: {invoiceNumber: number}) {
    const [invoiceNo, setInvoiceNo] = useState(invoiceNumber);
    const [customer, setCustomer] = useState("");
    const [items, setItems] = useState<InvoiceItem[]>([]);
    const [total, setTotal] = useState(0);
    const [notes, setNotes] = useState("");
    const [issueDate, setIssueDate] = useState<Date | undefined>(new Date());
    const [dueDate, setDueDate] = useState<Date | undefined>(addDays(new Date(), 7));
    const [discount, setDiscount] = useState(0);
    const [payments, setPayments] = useState<InvoicePayment[]>([]);

    const state: CreateInvoiceState = {
        total,
        notes,
        dueDate,
        issueDate,
        discount,
        customer,
        invoiceNo,
        items,
        payments,
        setTotal,
        setNotes,
        setDueDate,
        setIssueDate,
        setDiscount,
        setCustomer,
        setItems,
        setPayments,
    };

    return (
      <section className="flex gap-4 w-full h-full flex-wrap">
          <InvoiceItems {...state} />
          <InvoicePayments {...state} />
      </section>
    );
}