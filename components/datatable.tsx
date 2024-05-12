import * as React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { randomUUID } from "crypto";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/datepicker";
import { Button } from "@/components/ui/button"
import { FaEllipsis } from "react-icons/fa6";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
interface DataTableProps {
    populate: () => Array<any>;
    headers: Object;
}

export const DataTable: React.FC<DataTableProps> = ({ populate, headers }) => {
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
                                Object.values(headers).map((header: any, index: any) => (
                                    <TableHead key={index}>{header}</TableHead>
                                ))
                            }
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {populate().map((row: any, index: any) => (
                            <TableRow key={index}>
                                {
                                    Object.keys(headers).map((header: any, index: any) => (
                                        <TableCell key={index}>{row[header].toString()}</TableCell>
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
