import { Input } from "@/components/ui/input";
import AsyncSelect from "react-select/async";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import NumberInput from "@/components/ui/number-input";

export default function InvoiceItems() {
  return (
    <div className="min-h-[90vh] flex flex-col justify-start items-start gap-4 flex-grow w-full md:w-[60%] border border-gray-200 rounded-lg shadow p-2">
      <h1 className="text-xl font-bold text-gray-800 p-2">Invoice</h1>
      <div className="flex gap-4 w-full flex-wrap p-2 pl-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="customer" className="text-sm text-gray-500">
            Order Number
          </label>
          <Input
            type="text"
            name="customer"
            className="w-[100px] border-neu-7"
            disabled
            value={"0004"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="customer" className="text-sm text-gray-500">
            Customer
          </label>
          <AsyncSelect
            isClearable
            isSearchable
            options={[]}
            noOptionsMessage={() => "No customer found"}
            className="w-[200px]"
          />
        </div>
      </div>
      <div className="flex w-full overflow-auto scrollbar-thin">
        <Table className="w-full h-full" parentClassName="max-h-80">
          <TableHeader className="border-b border-pri-3">
            <TableRow>
              <TableHead className="sticky top-0 bg-neu-1 min-w-60 font-bold">
                Item
              </TableHead>
              <TableHead className="sticky top-0 bg-neu-1 min-w-[100px] font-bold text-center">
                QTY
              </TableHead>
              <TableHead className="sticky top-0 bg-neu-1 min-w-[150px] font-bold text-center">
                Price
              </TableHead>
              <TableHead className="sticky top-0 bg-neu-1 min-w-[100px] font-bold">
                Total
              </TableHead>
              <TableHead className="sticky top-0 bg-neu-1 min-w-8 font-bold"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="bg-neu-1 w-full  align-top">
                <AsyncSelect
                  isClearable
                  isSearchable
                  options={[]}
                  noOptionsMessage={() => "No item found"}
                />
              </TableCell>
              <TableCell className="bg-neu-1 w-full align-top">
                <Input type="number" />
              </TableCell>
              <TableCell className="bg-neu-1 w-full">
                <NumberInput prependSymbol symbol="$" />
              </TableCell>
              <TableCell className="bg-neu-1 w-full align-baseline">
                $0.00
              </TableCell>
              <TableCell className="bg-neu-1 w-full align-top">
                <Button variant="ghost">
                  <Trash size={16} strokeWidth={1.5} />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col justify-start items-start self-start p-4 mt-auto">
        <p className="text-right text-gray-500">Notes (optional)</p>
        <textarea
          className="mt-2 p-2 border border-neu-4 rounded-sm max-w-full w-full"
          placeholder="Add a note for the customer..."
          tabIndex={0}
          rows={5}
        />
      </div>
    </div>
  );
}
