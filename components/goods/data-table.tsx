"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    ChevronDown,
} from "lucide-react";
import { FC, useState } from "react";
import {
    VisibilityState,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { columns} from "@/components/goods/columns";
import Good from "@/lib/@types/goods";
import GoodsFilters from "./filters";
import { useQueryState } from "nuqs";
import GoodsSearch from "./search";

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
    data: Good[];
    headers: TableHeader[];
    filters: TableFilter[];
    onChangeGood: (id: string, title: string) => void;
    onNext: () => void;
    onPrev: () => void;
    page: number;
    pageCount: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
}

export const DataTable: FC<DataTableProps> = ({
    data,
    headers,
    filters,
    onChangeGood,
    onNext,
    onPrev,
    page,
    pageCount,
    hasPrevPage,
    hasNextPage,
}) => {
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
        productCode: false
    });
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getRowId: (row) => row.id,
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            columnVisibility,
        },
    });
    return (
        <div className="relative flex flex-col h-full w-full">
            <div className=" w-inherit md:w-[calc(100%-60px)] box-border flex flex-col bg-white py-3 overflow-auto rounded-t-md m-[30px] border border-pri-3 h-[calc(100% - 550px)]">
                <div className="px-3">
                    <div className="flex flex-row justify-between flex-wrap items-center">
                        <GoodsSearch />
                        <div className="flex flex-row justify-start items-center gap-[10px] py-3">
                            <GoodsFilters />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="ml-auto"
                                    >
                                        Columns{" "}
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {table
                                        .getAllColumns()
                                        .filter((column) => column.getCanHide())
                                        .map((column) => {
                                            return (
                                                <DropdownMenuCheckboxItem
                                                    key={column.id}
                                                    className="capitalize"
                                                    checked={column.getIsVisible()}
                                                    onCheckedChange={column.toggleVisibility}
                                                >
                                                    {column.id}
                                                </DropdownMenuCheckboxItem>
                                            );
                                        })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
                <Table className="scrollbar-thin w-full">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header, idx) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className={
                                                (idx == 0
                                                    ? " left-0 z-[1]"
                                                    : "") +
                                                " sticky top-0 bg-neu-1"
                                            }
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell, idx) => (
                                        <TableCell
                                            key={cell.id}
                                            className={
                                                (idx == 0
                                                    ? "sticky left-0 bg-neu-1"
                                                    : "") +
                                                (cell.column.columnDef.id ===
                                                "actions"
                                                    ? " text-right cursor-pointer"
                                                    : "")
                                            }
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex flex-row items-center justify-between p-3 mx-[30px] pt-0 h-[70px]">
                <div className="flex flex-row items-center justify-start gap-3">
                    <Button
                        variant={"outline"}
                        onClick={onPrev}
                        disabled={!hasPrevPage}
                    >
                        Prev
                    </Button>
                    <Button
                        variant={"outline"}
                        onClick={onNext}
                        disabled={!hasNextPage}
                    >
                        Next
                    </Button>
                </div>
                <p>
                    - Page <span className="text-pri-6">{page}</span> of{" "}
                    <span className="text-pri-6">{pageCount}</span>
                </p>
            </div>
        </div>
    );
};
