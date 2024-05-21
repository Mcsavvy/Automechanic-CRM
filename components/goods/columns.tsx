"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
    ChevronDown,
    ListFilter,
    Search,
    Ellipsis,
    MoreHorizontal,
    Pencil,
    Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import Good from "@/lib/@types/goods";

export const columns: ColumnDef<Good>[] = [
    {
        accessorKey: "name",
        header: "Name",
        enableHiding: false,
    },
    {
        accessorKey: "categories",
        header: "Categories",
        cell: ({ row }) => {
            // display the categories as badges
            return (
                <div className="flex flex-wrap gap-2">
                    {(row.getValue("categories") as string[]).map(
                        (category) => (
                            <span
                                key={category}
                                className="px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded-sm"
                            >
                                {category}
                            </span>
                        )
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "productCode",
        header: "Product Code",
        cell: ({ row }) => {
            return (
                <div className="text-left font-medium">
                    {(row.getValue("productCode") as string).slice(0, 8)}
                </div>
            );
        },
    },
    {
        accessorKey: "unitPrice",
        header: "Unit Price",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("unitPrice"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "NGN",
                currencyDisplay: "code",
                maximumFractionDigits: 0,
            }).format(amount);

            return (
                <div className="text-left font-medium">
                    {formatted.replace("NGN", "₦")}
                </div>
            );
        },
    },
    {
        accessorKey: "qtyInStock",
        header: "Qty In Stock",
    },
    {
        accessorKey: "totalValue",
        header: "Total Value",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("totalValue"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "NGN",
                currencyDisplay: "code",
                maximumFractionDigits: 0,
            }).format(amount);

            return (
                <div className="text-left font-medium">
                    {formatted.replace("NGN", "₦")}
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <Popover>
                    <PopoverTrigger>
                        <MoreHorizontal size={20} strokeWidth={1.5} />
                    </PopoverTrigger>
                    <PopoverContent className="w-[120px] px-0 flex flex-col gap-3">
                        <a
                            href={`#goods/${row.id}/edit`}
                            className="px-4 py-2 hover:bg-gray-100 flex flex-row justify-start items-center gap-2"
                            // onClick={() =>
                            //     onChangeGood(row.id, row.productName)
                            // }
                        >
                            <Pencil size={20} strokeWidth={1.5} />
                            Edit
                        </a>
                        <a
                            href={`#goods/${row.id}/delete`}
                            className="px-4 py-2 hover:bg-gray-100 flex flex-row justify-start items-center gap-2"
                            // onClick={() =>
                            //     onChangeGood(row.id, row.productName)
                            // }
                        >
                            <Trash size={20} color="red" strokeWidth={1.5} />
                            Delete
                        </a>
                    </PopoverContent>
                </Popover>
            );
        },
    },
];