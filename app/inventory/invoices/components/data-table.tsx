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
import { Suspense } from "react";
import { FC, useState } from "react";
import {
  VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { columns } from "./columns";
import { ExternalInvoice } from "@/lib/@types/invoice";
import InvoiceSearch from "./search";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import InvoiceFilters from "./filters";
import { LoaderCircle, TriangleAlert } from "lucide-react";

interface DataTableProps {
  data: ExternalInvoice[];
  onNext: () => void;
  onPrev: () => void;
  status: "idle" | "loading" | "loaded" | "error";
  page: number;
  pageCount: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

const TableRows = ({
  table,
}: {
  table: import("@tanstack/table-core").Table<ExternalInvoice>;
}) => {
  return (
    <>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
            className="hover:bg-neu-3"
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export const DataTable: FC<DataTableProps> = ({
  data,
  status,
  onNext,
  onPrev,
  page,
  pageCount,
  hasPrevPage,
  hasNextPage,
}) => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
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
      <div className="w-inherit md:w-[calc(100%-60px)] box-border flex flex-col bg-white py-3 overflow-auto rounded-t-md lg:m-[30px] m-[10px] h-[calc(100% - 550px)]">
        <div className="px-3">
          <div className="flex flex-row justify-between flex-wrap items-center mb-5">
            <Suspense>
              <InvoiceSearch />
            </Suspense>
            <div className="flex flex-row justify-start items-center gap-[10px] py-3">
              <Suspense>
                <InvoiceFilters />
              </Suspense>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columns <ChevronDown className="ml-2 h-4 w-4" />
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
          <TableHeader className="border-b border-pri-3">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {(() => {
              if (["loading", "idle"].includes(status)) {
                return (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24">
                      <LoaderCircle className="animate-spin h-6 w-6 mx-auto" />
                    </TableCell>
                  </TableRow>
                );
              }
              if (status === "error") {
                return (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24">
                      <div className="flex justify-center items-center">
                        <TriangleAlert className="h-6 w-6 mr-2 text-yellow-600" />
                        Error fetching data.
                      </div>
                    </TableCell>
                  </TableRow>
                );
              }
              return <TableRows table={table} />;
            })()}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-row items-center justify-between p-3 mx-[30px] pt-0 h-[70px]">
        <div className="flex flex-row items-center justify-start gap-3">
          <Button variant={"outline"} onClick={onPrev} disabled={!hasPrevPage}>
            Previous
          </Button>
          <Button variant={"outline"} onClick={onNext} disabled={!hasNextPage}>
            Next
          </Button>
        </div>
        <p>
          Page <span className="text-pri-6">{page}</span> of{" "}
          <span className="text-pri-6">{pageCount}</span>
        </p>
      </div>
    </div>
  );
};