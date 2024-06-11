"use client"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { DataTable } from "./components/data-table";
import { useOrderStore } from "@/lib/providers/order-store-provider";


export default function Orders() {
  const { orders, page, setPage, pageCount, hasNextPage, hasPrevPage, status } =
    useOrderStore((state) => state);
  return (
    <>
      <div className="flex flex-col absolute h-[calc(100vh-60px)] top-[60px] w-full">
        <div className="h-full relative">
          <div className="flex flex-row justify-between items-center p-4 px-[30px]">
            <h1 className="text-xl font-quicksand font-semibold">Orders</h1>
            <a href="#actions/order/create">
              <Button className="flex flex-row gap-2">
                <Plus size={20} strokeWidth={1.5} />
                New Order
              </Button>
            </a>
          </div>
          <DataTable
            data={orders}
            page={page}
            status={status}
            pageCount={pageCount}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            onNext={() => setPage(page + 1)}
            onPrev={() => setPage(page - 1)}
          />
        </div>
      </div>
    </>
  );
}
