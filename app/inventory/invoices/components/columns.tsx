"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ExternalInvoice } from "@/lib/@types/invoice";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExternalInvoiceStore } from "@/lib/providers/invoice-store-provider";
import Link from "next/link";

type SortableColumnHeaderProps = {
  children: React.ReactNode;
  name: keyof ExternalInvoice;
};


export const columns: ColumnDef<ExternalInvoice>[] = [
  {
    id: "id",
    accessorKey: "id",
    enableHiding: false,
    header: () => <span className="font-bold">ID</span>,
    cell: ({ row }) => (
      <Link href={`/inventory/invoices/${row.original.id}`} className="font-bold">
        #{row.original.id.slice(0, 8)}
      </Link>
    ),
  },
  {
    id: "client",
    header: () => <span className="font-bold">Client</span>,
    cell: ({ row }) => {
      const invoice = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-medium">{invoice.client.fullName}</span>
          <span className="text-sm text-gray-500">{invoice.client.email}</span>
        </div>
      );
    },
  },
  {
    id: "Date",
    header: () => (
      <span className="font-bold">Date</span>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return (
        <div className="text-left ml-4 font-medium">
          {date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
      );
    },
  },
  {
    id: "dueDate",
    header: () => (
      <span className="font-bold">Due Date</span>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.dueDate);
      return (
        <div className="text-left ml-4 font-medium">
          {date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
      );
    },
  },
  {
    id: "total",
    header: () => <span className="font-bold">Total Amount</span>,
    cell: ({ row }) => {
      const invoice = row.original;
      const total = invoice.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const afterDiscount = total - (total * (invoice.discount / 100));
      const finalTotal = afterDiscount + invoice.tax + invoice.shipping;

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "NGN",
        currencyDisplay: "code",
        maximumFractionDigits: 0,
      }).format(finalTotal);

      return (
        <div className="text-left font-medium">
          {formatted.replace("NGN", "₦")}
        </div>
      );
    },
  },
  {
    id: "paymentMade",
    header: () => (
      <span className="font-bold">Amount Paid</span>
    ),
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "NGN",
        currencyDisplay: "code",
        maximumFractionDigits: 0,
      }).format(row.original.paymentMade);

      return (
        <div className="text-left ml-4 font-medium">
          {formatted.replace("NGN", "₦")}
        </div>
      );
    },
  },
  {
    id: "status",
    header: () => <span className="font-bold">Status</span>,
    cell: ({ row }) => {
      const invoice = row.original;
      const dueDate = new Date(invoice.dueDate);
      const isPaid = invoice.paymentMade >= invoice.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const isOverdue = !isPaid && dueDate < new Date();

      if (isPaid) {
        return (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            paid
          </span>
        );
      }

      if (isOverdue) {
        return (
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
            overdue
          </span>
        );
      }

      return (
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
          pending
        </span>
      );
    },
  }
];