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
import { FaEllipsis, FaFilter } from "react-icons/fa6";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { table } from "console";
import { ChevronDown } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md";

interface TableHeader {
    id: string;
    name: string;
    isVisible: boolean;
    isPresent?: boolean;
}
interface TableFilter {
    id: string;
    name: string;
    type: string;
}
interface DataTableProps {
    data: Array<any>;
    headers: TableHeader[];
    filters: TableFilter[];
}

export const DataTable: FC<DataTableProps> = ({ data, headers, filters }) => {
    const [columns, setColumns] = useState(headers);
    const [rows, setRows] = useState<any[]>(data);
    const [filterValues, setFilterValues] = useState<any>({});
    const toggleColumnVisibility = (id: string) => {
        const newColumns = columns.map((column) => {
            if (column.id === id && (!column.isPresent)) {
                column.isVisible = !column.isVisible;
            }
            return column;
        });
        setColumns(newColumns);
    }
    const handleFilterChange = (id: string, value: string) => {
        setFilterValues(prevState => ({ ...prevState, [id]: value }));
    }

    const handleApplyFilters = () => {
        console.log(filterValues);
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
                        </div>
                        <div className="flex flex-row justify-start items-center gap-[10px] py-3">
                            <Popover>
                                <PopoverTrigger className="flex flex-row items-center justify-start gap-3 border border-neu-3 p-[8px] rounded-md"><FaFilter />Filter</PopoverTrigger>
                                <PopoverContent>
                                    <div className="flex flex-col gap-3 overflow-auto h-[300px]">
                                        {filters.map((filter: any, index: any) => {
                                            return (
                                                <div key={index} className="flex flex-col gap-1">
                                                    <label className="text-sm">{filter.name}</label>
                                                    <input
                                                        type={filter.type}
                                                        className="border border-neu-6 outline-none p-2"
                                                        value={filterValues[filter.id] || ''}
                                                        onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                                                    />
                                                </div>
                                            )
                                        })}
                                        <Button variant={"default"} onClick={handleApplyFilters}>Apply</Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
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
                    </div>
                </div>
                    <Table className="scrollbar-thin w-full">
                        <TableHeader>
                            <TableRow>
                                {
                                    columns.map((column: any, index: any) => {
                                        if (column.isPresent || column.isVisible) {
                                            return (
                                                <TableHead key={index} className={`${index == 0 ? ' left-0 z-[1]' : ''} sticky top-0  bg-neu-1`}>{column.name}</TableHead>
                                            )
                                        }
                                    })
                                }
                                <TableHead className="text-right sticky top-0 bg-neu-1">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rows.map((row: any, idx: any) => (
                                <TableRow key={idx}>
                                    {
                                        columns.map((column: any, index: any) => (
                                            (column.isPresent || column.isVisible) &&
                                            <TableCell key={index} className={`${index == 0 ? 'sticky left-0 bg-neu-1' : ''}`}>{row[column.id].toString()}</TableCell>
                                        ))
                                    }
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger><FaEllipsis />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[150px] flex flex-col gap-3">
                                                <Button variant={'ghost'} className="items-center justify-start gap-2"><MdOutlineEdit />Edit</Button>
                                                <Button variant={'ghost'} className="font-red items-center justify-start gap-2"><MdOutlineDeleteOutline />Delete</Button>
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
