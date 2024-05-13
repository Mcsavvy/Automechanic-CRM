"use client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/datepicker";
import { Button } from "@/components/ui/button"
import { FaEllipsis } from "react-icons/fa6";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { table } from "console";
import { ChevronDown } from "lucide-react";
import { FC, useEffect, useState } from "react";
interface TableHeader {
    id: string;
    name: string;
    isVisible: boolean;

}
interface DataTableProps {
    data: Array<any>;
    headers: TableHeader[];
}

export const DataTable: FC<DataTableProps> = ({ data, headers }) => {
    const [columns, setColumns] = useState(headers);
    const [rows, setRows] = useState<any[]>(data);
    const toggleColumnVisibility = (id: string) => {
        const newColumns = columns.map((column) => {
            if (column.id === id) {
                column.isVisible = !column.isVisible;
            }
            return column;
        });
        setColumns(newColumns);
    }
    return (
        <div className="relative flex flex-col h-full w-full">
            <div className="relative flex flex-col bg-white p-3 overflow-auto rounded-t-md m-[30px] border border-pri-3 h-[calc(100% - 550px)]">
                <div>
                    <h2 className="font-semibold text-lg">All Goods</h2>
                    <div className="flex flex-row justify-between flex-wrap items-center">
                        <div className="bg-white w-[300px] px-[10px] flex flex-row items-center justify-start gap-[10px] border border-neu-6">
                            <FaSearch />
                            <input placeholder="Start typing..." className=" w-full outline-none border-none text-md py-2 px-0" />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="ml-auto">
                                        Columns <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {columns.map((column: any, index: any) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={index}
                                                className="capitalize"
                                                checked={column.isVisible}
                                                onCheckedChange={(value) =>
                                                    toggleColumnVisibility(column.id)
                                                }
                                            >
                                                {column.name}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-[10px]">
                            <Button variant={'outline'}>
                                Filter
                            </Button>
                            <DatePicker />
                        </div>
                    </div>
                </div>
                <Table className="scrollbar-thin w-[90%]">
                    <TableHeader>
                        <TableRow>
                            {
                                columns.map((column: any, index: any) => {
                                    if (column.isVisible) {
                                        return (
                                            <TableHead key={index}>{column.name}</TableHead>
                                        )
                                    }
                                })
                            }
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((row: any, idx: any) => (
                            <TableRow key={idx} className={`${idx == 0? 'sticky left-0 ': ''}`}>
                                {
                                    columns.map((column: any, index: any) => (
                                        column.isVisible &&
                                        <TableCell key={index}>{row[column.id].toString()}</TableCell>
                                    ))
                                }
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><FaEllipsis />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[150px] flex flex-col gap-3">
                                            <Button variant={'default'}>Edit</Button>
                                            <Button variant={'destructive'}>Delete</Button>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
            <div className="flex flex-row items-center justify-between p-3 mx-[30px] pt-0 h-[70px]">
                <div className="flex flex-row items-center justify-start gap-3">
                    <Button variant={'outline'}>Prev</Button>
                    <Button variant={'outline'}>Next</Button>
                </div>
                <p>
                    Page <span className="text-pri-6">1</span> of <span className="text-pri-6">100</span>
                </p>
            </div>
        </div>
    );
}
