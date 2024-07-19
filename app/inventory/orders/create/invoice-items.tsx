"use client";

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
import { CreateInvoiceState } from "./types";
import { getGoods } from "@/lib/stores/good-store";
import { fetchBuyers } from "@/lib/stores/buyer-store";
import { Buyer } from "@/lib/@types/buyer";
import { debounce } from "lodash";
import React, { useEffect } from "react";
import { formatMoney } from "@/lib/utils";

function goodsSearch(query: string, callback: (...args: [Good[]]) => void) {
  getGoods(1, 10, { query, qty: { gte: 1 } }).then(({ goods }) => {
    callback(
      goods.map((good) => ({
        name: good.name,
        qtyInStock: good.qtyInStock,
        costPrice: good.unitPrice,
        id: good.id,
      }))
    );
  });
}
const debouncedGoodsSearch = debounce(goodsSearch, 300);

function customersSearch(
  query: string,
  callback: (...args: [Buyer[]]) => void
) {
  fetchBuyers(1, 10, { search: query }).then(({ buyers }) => {
    callback(buyers);
  });
}

const debouncedCustomerSearch = debounce(customersSearch, 300);

type Good = {
  name: string;
  qtyInStock: number;
  costPrice: number;
  id: string;
};

const Item: React.FC<
  CreateInvoiceState["items"][0] & {
    handleChange: (good: Good | null, qty: number, cost: number) => void;
    handleDelete: () => void;
    bodyRef: React.MutableRefObject<HTMLElement | null>;
    topGoods: CreateInvoiceState["topGoods"];
    items: CreateInvoiceState["items"];
  }
> = ({
  id,
  name,
  quantity,
  cost,
  qtyInStock,
  costPrice,
  bodyRef,
  topGoods,
  items,
  handleChange,
  handleDelete,
}) => {
  const good = name ? { name, qtyInStock, costPrice, id } : null;
  const total = quantity * cost;

  return (
    <TableRow className="border-b-0">
      <TableCell className="bg-neu-1 w-full align-top p-2">
        <AsyncSelect
          isSearchable
          options={[]}
          value={good}
          onChange={(good) => handleChange(good, quantity, cost)}
          placeholder="search for item"
          loadOptions={debouncedGoodsSearch}
          defaultOptions={topGoods}
          loadingMessage={() => "Searching..."}
          menuPortalTarget={bodyRef.current}
          getOptionValue={(option) => option.id}
          getOptionLabel={(option) => option.name}
          classNames={{ menuList: () => "scrollbar-thin text-sm" }}
          isOptionDisabled={(option) =>
            items.some((item) => item.id === option.id)
          }
          maxMenuHeight={150}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          noOptionsMessage={() => "No item found"}
        />
      </TableCell>
      <TableCell className="bg-neu-1 w-full align-middle p-2">
        {formatMoney(costPrice)}
      </TableCell>
      <TableCell className="bg-neu-1 w-full align-top p-2">
        <NumberInput
          value={quantity}
          min={1}
          max={qtyInStock}
          disabled={!name}
          onChange={(value) => handleChange(good, value, cost)}
        />
      </TableCell>
      <TableCell className="bg-neu-1 w-full p-2">
        <NumberInput
          prependSymbol
          symbol="₦"
          value={cost}
          min={0}
          disabled={!name}
          onChange={(value) => handleChange(good, quantity, value)}
        />
      </TableCell>
      <TableCell className="bg-neu-1 w-full align-middle p-2">
        {formatMoney(total)}
      </TableCell>
      <TableCell className="bg-neu-1 w-full align-top p-2">
        <Button variant="ghost" onClick={() => handleDelete()} disabled={!name}>
          <Trash size={16} strokeWidth={1.5} />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default function InvoiceItems({
  invoiceNo,
  items,
  setItems,
  notes,
  topGoods,
  setCustomer,
  setNotes,
}: CreateInvoiceState) {
  const bodyRef = React.useRef<HTMLElement | null>(null);

  useEffect(() => {
    bodyRef.current = document.body;
  }, []);

  function handleChange(
    id: number,
    good: Good | null,
    quantity: number,
    cost: number
  ) {
    // if good has changed
    if (good && items[id].id !== good.id) {
      items[id] = {
        id: good.id,
        name: good.name,
        quantity,
        // add 10% to the cost price
        cost: good.costPrice + good.costPrice * 0.1,
        qtyInStock: good.qtyInStock,
        costPrice: good.costPrice,
      };
      setItems([...items]);
    } else {
      items[id] = { ...items[id], quantity, cost };
      setItems([...items]);
    }
  }

  function handleDelete(id: number) {
    items.splice(id, 1);
    setItems([...items]);
  }

  function addNewItem(good: Good) {
    setItems([
      ...items,
      {
        ...good,
        quantity: 1,
        cost: good.costPrice + good.costPrice * 0.1,
      },
    ]);
  }

  return (
    <div className="min-h-[90vh] flex flex-col justify-start items-start gap-4 flex-grow w-full md:w-[60%] border border-gray-200 rounded-lg shadow p-2">
      <h1 className="text-xl font-bold text-gray-800 p-2">Invoice</h1>
      <div className="flex gap-4 w-full flex-wrap p-2 pl-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="customer" className="text-sm text-gray-500">
            Invoice Number
          </label>
          <Input
            type="text"
            name="customer"
            className="w-[100px] border-neu-7"
            disabled
            value={"#" + `${invoiceNo}`.padStart(5, "0")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="customer" className="text-sm text-gray-500">
            Customer
          </label>
          <AsyncSelect
            isSearchable
            options={[]}
            placeholder="search for customer"
            noOptionsMessage={() => "No customer found"}
            className="w-[200px]"
            classNames={{ menuList: () => "scrollbar-thin" }}
            getOptionValue={(option) => option.id}
            getOptionLabel={(option) => option.name}
            loadOptions={debouncedCustomerSearch}
            onChange={(customer) => setCustomer(customer?.id || "")}
            loadingMessage={() => "Searching..."}
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
                Cost
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
            {items.map((item, index) => (
              <Item
                key={index}
                {...item}
                bodyRef={bodyRef}
                topGoods={topGoods}
                items={items}
                handleChange={(good, qty, cost) =>
                  handleChange(index, good, qty, cost)
                }
                handleDelete={() => handleDelete(index)}
              />
            ))}
            <Item
              id={items.length.toString()}
              name=""
              quantity={0}
              cost={0}
              qtyInStock={0}
              costPrice={0}
              bodyRef={bodyRef}
              topGoods={topGoods}
              items={items}
              handleChange={(good, qty, cost) => addNewItem(good!)}
              handleDelete={() => {}}
            />
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col justify-start items-start self-start p-4 mt-auto">
        <p className="text-right text-gray-500">Notes (optional)</p>
        <textarea
          className="mt-2 p-2 border border-neu-4 rounded-sm max-w-full w-full"
          placeholder="Add a note for the customer..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          tabIndex={0}
          rows={5}
        />
      </div>
    </div>
  );
}
