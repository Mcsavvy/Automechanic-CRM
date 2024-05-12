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

interface DataTableProps {
    populate: () => Array<any>;
    headers: Object;
}

export const DataTable: React.FC<DataTableProps> = ({ populate, headers }) => {
    return (
        <div className="relative sticky top-[40px] flex flex-col bg-white p-3 h-full overflowy-auto rounded-md m-[30px] scrollbar-thin">
            <div>
                <h2 className="font-semibold text-lg">All Goods</h2>
                <div className="flex flex-row justify-between flex-wrap items-center">
                    <div className="bg-white w-[300px] px-[10px] flex flex-row items-center justify-start gap-[10px] border border-neu-6">
                        <FaSearch/>
                        <input placeholder="Start typing..." className=" w-full outline-none border-none text-md py-2 px-0"/>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-[10px]">
                        <Button variant={'outline'}>
                            Filter
                        </Button>
                        <DatePicker/>
                    </div>
                </div>
            </div>
            <Table className="scrollbar-thin">
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
                            <TableCell className="text-right">{'. . .'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="absolute bottom-0 flex flex-row items-center justify-start gap-3 bg-neu-1 w-full">
                <Button variant={'outline'} className="h-[30px]">Prev</Button>
                <Button variant={'outline'} className="h-[30px]">Next</Button>
                <p>Page <span c>1</span> of <span>100</span></p>
            </div>
        </div>
    );
}
