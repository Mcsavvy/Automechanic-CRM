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
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  CircleHelp,
  LucideProps,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrderStore } from "@/lib/providers/order-store-provider";
import Link from "next/link";
import {
  Tooltip as TooltipBase,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

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

const Tooltip: React.FC<
  {
    children: React.ReactNode;
    Icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
  } & Omit<LucideProps, "ref"> &
    React.RefAttributes<SVGSVGElement>
> = ({ children, Icon, ...props }) => {
  const [open, setOpen] = useState(false);
  return (
    <TooltipProvider>
      <TooltipBase open={open} onOpenChange={setOpen}>
        <TooltipTrigger>
          <Icon onClick={() => setOpen(!open)} {...props} />
        </TooltipTrigger>
        <TooltipContent>{children}</TooltipContent>
      </TooltipBase>
    </TooltipProvider>
  );
};

export const columns: ColumnDef<OrderSummary>[] = [
  {
    id: "id",
    accessorKey: "id",
    enableHiding: false,
    header: () => <span className="font-bold">ID</span>,
    cell: ({ row }) => (
      <Link href={`/inventory/orders/${row.original.id}`} className="font-bold">
        #{`${row.original.orderNo}`.padStart(5, "0")}
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
    id: "Date",
    header: () => (
      <SortableColumnHeader name="createdAt">
        <span className="font-bold">Date</span>
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
    id: "Total Cost",
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
    id: "Status",
    header: () => <span className="font-bold">Status</span>,
    cell: ({ row }) => {
      const status = row.original.status;
      const overdueDate = new Date(row.original.overdueLimit);
      switch (status) {
        case "pending":
          return (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
              pending
            </span>
          );
        case "cancelled":
          return (
            <div className="flex items-center">
              <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                cancelled
              </span>
              <Tooltip Icon={CircleHelp} strokeWidth={1.5} size={16}>
                {row.original.cancelReason || "No reason provided"}
              </Tooltip>
            </div>
          );
        case "overdue":
          return (
            <div className="flex items-center">
              <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                overdue
              </span>
              <Tooltip Icon={CircleHelp} strokeWidth={1.5} size={16}>
                This order as been overdue since{" "}
                {overdueDate.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Tooltip>
            </div>
          );
        case "paid":
          return (
            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
              paid
            </span>
          );
        case "ongoing":
          return (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
              ongoing
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
    id: "Discount",
    header: () => (
      <SortableColumnHeader name="discount">
        <span className="font-bold">Discount (%)</span>
      </SortableColumnHeader>
    ),
    cell: ({ row }) => {
      const discount = row.original.discount; // discount in percentage
      return <div className="ml-4 text-center font-bold">{discount}%</div>;
    },
  },
  {
    id: "Amount Paid",
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
    id: "Payment Method",
    header: () => <span className="font-bold">Payment Method</span>,
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
    id: "Payment Deadline",
    header: () => (
      <SortableColumnHeader name="overdueLimit">
        <span className="font-bold">Payment Deadline</span>
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
