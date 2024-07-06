import { DatePicker } from "@/components/ui/datepicker";
import { Input } from "@/components/ui/input";
import { paymentMethodChoices } from "@/lib/@types/order";
import { PlusCircle } from "lucide-react";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import NumberInput from "@/components/ui/number-input";

export default function InvoicePayments() {
  return (
    <div className="min-h-[90vh] flex flex-col justify-start items-start gap-4 md:w-[35%] md:min-w-[310px] p-2 flex-grow border border-gray-200 rounded-lg shadow">
      <h1 className="text-xl font-bold text-gray-800 p-2">Payment</h1>
      <div className="flex md:flex-col flex-wrap gap-4 p-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="customer" className="text-sm text-gray-500">
            Issue Date
          </label>
          <DatePicker />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="customer" className="text-sm text-gray-500">
            Due Date
          </label>
          <DatePicker />
        </div>
      </div>
      <div className="flex overflow-x-auto w-full scrollbar-thin gap-4 p-2 max-h-[30%] min-h-[6rem]">
        <div className="flex flex-col gap-2 h-fit">
          <label htmlFor="customer" className="text-sm text-gray-500">
            Amount
          </label>
          <div className="w-[120px]">
            <NumberInput prependSymbol symbol="$" />
          </div>
        </div>
        <div className="flex flex-col w-[150px] h-fit">
          <label htmlFor="customer" className="text-sm text-gray-500">
            Payment Method
          </label>
          <Select
            options={paymentMethodChoices.map((choice) => ({
              value: choice,
              label: choice,
            }))}
            isSearchable={false}
            className="mt-2"
            menuPosition="absolute"
            maxMenuHeight={150}
          />
        </div>
      </div>
      <Button variant="ghost">
        <PlusCircle size={24} strokeWidth={1.5} className="mr-2" />
        Add Payment
      </Button>
      <div className="flex flex-col gap-2 p-2 min-w-80 w-full">
        <div className="flex justify-between gap-2">
          <label className="text-sm text-gray-500">Discount</label>
          <NumberInput prependSymbol symbol="%" className="w-20" />
        </div>
        <div className="flex justify-between gap-2">
          <label className="text-sm text-gray-500">Subtotal</label>
          <p className="text-sm text-gray-500">$0.00</p>
        </div>
        <div className="flex justify-between gap-2">
          <label htmlFor="customer" className="text-sm text-gray-500">
            Discount Amount
          </label>
          <p className="text-sm text-gray-500">$0.00</p>
        </div>
        <div className="flex justify-between gap-2">
          <label className="text-sm text-gray-500">Total</label>
          <p className="text-sm text-gray-500">$0.00</p>
        </div>
        <div className="flex justify-between gap-2">
          <label className="text-sm text-gray-500">Outstanding</label>
          <p className="text-sm text-gray-500">$0.00</p>
        </div>
      </div>
      <div className="flex flex-grow items-start justify-around pl-2 pt-0 h-[70px] min-w-80 w-full gap-2">
        <Button variant={"default"} onClick={() => {}} className="w-full bg-pri-5">
          Save
        </Button>
        <Button variant={"destructive"} onClick={() => {}} className="w-full">
          Cancel
        </Button>
      </div>
    </div>
  );
}
