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

const RolesCell = ({ id }: {id: string}) => {
    const [userGroups, setUserGroups] = useState([])
    const { groups } = useStaffStore((state) => state);
    // console.log(groups)
    // useEffect(() => {
    //     if (groups?.length > 0) {
    //         setUserGroups(groups.filter(group => group.members.includes(id)))
    //     }
    // }, [groups])
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
        accessorKey: "firstName",
        header: "Full Name",
        enableHiding: false,
        cell: ({ row }) => {
            const firstName = row.original.firstName;
            const lastName = row.original.lastName;
            return (
                <div className="text-left font-medium capitalize">
                    {`${firstName} ${lastName}`}
                </div>
            );
        },
    },
    {
        accessorKey: "permissisons",
        header: "Roles",
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
        header: "Email",
        cell: ({ row }) => {
            return (
                <div className="text-left font-medium lowercase">
                    {`${row.getValue("email")}`}
                </div>
            );
        },
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