"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
    MoreHorizontal,
    Eye,
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

import Staff from "@/lib/@types/staff";

export const columns: ColumnDef<Staff>[] = [
    {
        accessorKey: "firstName",
        header: "First Name",
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <div className="text-left font-medium">
                    {`${row.getValue("firstName")}`}
                </div>
            );
        },
    },
    {
        accessorKey: "permissions",
        header: "Roles",
        cell: ({ row }) => {
            return (
                <div className="text-left font-medium">
                    teller, admin
                </div>
            );
        },
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Phone",
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
                            href={`/inventory/staffs/${row.id}`}
                            className="px-4 py-2 hover:bg-gray-100 flex flex-row justify-start items-center gap-2"
                            // onClick={() =>
                            //     onChangeStaff(row.id, row.productName)
                            // }
                        >
                            <Eye size={20} strokeWidth={1.5} />
                            View
                        </a>
                    </PopoverContent>
                </Popover>
            );
        },
    },
];