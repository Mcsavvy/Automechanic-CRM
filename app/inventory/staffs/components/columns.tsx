"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
    MoreHorizontal,
    Eye,
} from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useStaffStore } from "@/lib/providers/staff-store-provider";
import Staff from "@/lib/@types/staff";
import {useState, useEffect } from "react"
import Link from "next/link";

const RolesCell = ({ id }: {id: string}) => {
    const { groups } = useStaffStore((state) => state);
    return (
        <div className="flex flex-wrap gap-2">
            {(groups).filter(g => g.members.includes(id)).map(
                (group) => (
                    <span
                        key={group.id}
                        className="px-2 py-1 text-xs font-medium text-white bg-acc-7 rounded-sm"
                    >
                        {group.name}
                    </span>
                )
            )}
        </div>
    )
}

export const columns: ColumnDef<Staff>[] = [
    {
        id: "fullName",
        header: () => {
            return (
                <span className="text-left font-medium">Name</span>
            );
        },
        enableHiding: false,
        cell: ({ row }) => {
            const firstName = row.original.firstName;
            const lastName = row.original.lastName;
            return (
                <Link href={`/inventory/staffs/${row.id}`} className="text-left font-medium capitalize">
                    {`${firstName} ${lastName}`}
                </Link>
            )
        },
    },
    {
        id: "roles",
        header: () => {
            return (
                <span className="text-left font-medium">Roles</span>
            );
        },
        cell: ({ row }) => {
            // display the categories as badges
            const id = row.original.id
            return (
                <RolesCell id={id} />
            );
        },
    },
    {
        accessorKey: "email",
        header: () => {
            return (
                <span className="text-left font-medium">Email</span>
            );
        },
        cell: ({ row }) => {
            return (
                <a className="text-left text-pri-3 font-medium" href={`mailto:${row.original.email}`} target="_blank">
                    {row.original.email}
                </a>
            );
        },
    },
    {
        accessorKey: "phone",
        header: () => {
            return (
                <span className="text-left font-medium">Phone</span>
            );
        },
        cell: ({ row }) => {
            const phone = row.original.phone.replace("+234", "0");
            return (
                <a className="text-left text-pri-3 font-medium" href={`tel:${phone}`} target="_blank">
                    {phone}
                </a>
            );
        },
    },
    {
        accessorKey: "status",
        header: () => {
            return (
                <span className="text-left font-medium">Status</span>
            );
        },
        cell: ({ row }) => {
            const status = row.original.status;
            return status === "active" ? (
              <span className="bg-green-800 text-green-100 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                active
              </span>
            ) : (
              <span className="bg-red-800 text-red-100 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                inactive
              </span>
            );
        },
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