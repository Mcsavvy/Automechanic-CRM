"use client";

import { ColumnDef } from "@tanstack/react-table";
import ProfilePicture from "@/app/inventory/buyers/components/profile-picture";

import { Order, OrderSort, OrderSummary } from "@/lib/@types/order";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { sum } from "lodash";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrderStore } from "@/lib/providers/order-store-provider";
import Link from "next/link";

type SortableColumnHeaderProps = {
  children: React.ReactNode;
  name: keyof OrderSort;
};

function SortableColumnHeader({ children, name }: SortableColumnHeaderProps) {
  const { sort, applySort } = useOrderStore((state) => state);
  var sortDirection: "asc" | "desc" | "none" = "none";
  if (sort[name] === 1) {
    sortDirection = "asc";
  } else if (sort[name] === -1) {
    sortDirection = "desc";
  } else {
    sortDirection = "none";
  }

  function handleClick() {
    if (sortDirection === "asc") {
      applySort({ ...sort, [name]: -1 });
    } else if (sortDirection === "desc") {
      const newSort = { ...sort };
      delete newSort[name];
      applySort(newSort);
    } else {
      applySort({ ...sort, [name]: 1 });
    }
  }
  return (
    <Button variant="ghost" onClick={handleClick}>
      {children}
      {sortDirection === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
      {sortDirection === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
      {sortDirection === "none" && (
        <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
      )}
    </Button>
  );
}

export const columns: ColumnDef<OrderSummary>[] = [
  {
    id: "id",
    accessorKey: "id",
    enableHiding: false,
    header: () => <span className="font-bold">ID</span>,
    cell: ({ row }) => (
      <Link href={`/inventory/orders/${row.original.id}`} className="font-bold">
        {row.original.id.slice(-7)}
      </Link>
    ),
  },
  {
    id: "customer",
    header: () => <span className="font-bold">Customer</span>,
    cell: ({ row }) => {
      const order = row.original;
      const buyer = order.buyer;
      return (
        <Popover>
          <PopoverTrigger asChild>
            <div className="cursor-pointer text-pri-5 w-[150px] text-ellipsis">
              {buyer.name}
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col items-center">
              <ProfilePicture buyer={buyer} />
              <span className="font-bold mt-2">{buyer.name}</span>
              <div className="flex items-center justify-center mt-2 flex-col">
                <a
                  className="text-pri-5 text-sm cursor-pointer"
                  href={`mailto:${buyer.email}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {buyer.email}
                </a>
                <a
                  className="text-pri-5 text-sm cursor-pointer"
                  href={`tel:${buyer.phone}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {buyer.phone.replace("+234", "0")}
                </a>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      );
    },
  },
  {
    id: "createdAt",
    header: () => (
      <SortableColumnHeader name="createdAt">
        <span className="font-bold">Order Date</span>
      </SortableColumnHeader>
    ),
    cell: ({ row }) => {
      const order = row.original;
      const date = new Date(order.createdAt);
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
    header: () => <span className="font-bold">Total Cost</span>,
    cell: ({ row }) => {
      const order = row.original;
      const total = order.totalAmount;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "NGN",
        currencyDisplay: "code",
        maximumFractionDigits: 0,
      }).format(total);
      return (
        <div className="text-left font-medium">
          {formatted.replace("NGN", "₦")}
        </div>
      );
    },
  },
  {
    id: "status",
    header: () => <span className="font-bold">Status</span>,
    cell: ({ row }) => {
      const status = row.original.status;
      switch (status) {
        case "pending":
          return (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
              pending
            </span>
          );
        case "cancelled":
          return (
            <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
              cancelled
            </span>
          );
        case "overdue":
          return (
            <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
              overdue
            </span>
          );
        case "paid":
          return (
            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
              paid
            </span>
          );
        default:
          return (
            <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
              {status}
            </span>
          );
      }
    },
  },
  {
    id: "discount",
    header: () => (
      <SortableColumnHeader name="discount">
        <span className="font-bold">Discount</span>
      </SortableColumnHeader>
    ),
    cell: ({ row }) => {
      const discount = row.original.discount; // discount in percentage
      return (
        <div className="text-center font-bold">
          {discount > 0 ? "-" : ""}
          {discount}%
        </div>
      );
    },
  },
  {
    id: "itemCount",
    header: () => <span className="font-bold">Items</span>,
    cell: ({ row }) => {
      const itemCount = row.original.numItems;
      return (
        <div className="text-left font-medium">
          {itemCount} {itemCount > 1 ? "items" : "item"}
        </div>
      );
    },
  },
  {
    id: "amountPaid",
    header: () => (
      <SortableColumnHeader name="amountPaid">
        <span className="font-bold">Amount Paid</span>
      </SortableColumnHeader>
    ),
    cell: ({ row }) => {
      const amountPaid = row.original.amountPaid;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "NGN",
        currencyDisplay: "code",
        maximumFractionDigits: 0,
      }).format(amountPaid);
      return (
        <div className="text-left ml-4 font-medium">
          {formatted.replace("NGN", "₦")}
        </div>
      );
    },
  },
  {
    id: "paymentMethod",
    header: () => <span className="font-bold">Payment Mode</span>,
    cell: ({ row }) => {
      const paymentMethod = row.original.paymentMethod;
      switch (paymentMethod) {
        case "cash":
          return (
            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
              cash
            </span>
          );
        case "credit":
          return (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
              credit
            </span>
          );
        case "debit":
          return (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
              debit
            </span>
          );
        case "voucher":
          return (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
              voucher
            </span>
          );
        case "bank":
          return (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
              bank
            </span>
          );
        case "cheque":
          return (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
              cheque
            </span>
          );
        default:
          return (
            <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
              {paymentMethod}
            </span>
          );
      }
    },
  },
  {
    id: "overdueLimit",
    header: () => (
      <SortableColumnHeader name="overdueLimit">
        <span className="font-bold">Deadline For Payment</span>
      </SortableColumnHeader>
    ),
    cell: ({ row }) => {
      const overdueLimit = row.original.overdueLimit;
      const date = new Date(overdueLimit);
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
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     return <BuyerActions buyerId={row.id} />;
  //   },
  // },
];
