"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { faker } from "@faker-js/faker";
import { OrderDataTable } from "@/components/ui/ordersDataTable";
import { Plus } from 'lucide-react'


const tableHeaders = [
  { id: 'id', name: "Order ID", isVisible: true, isPresent: true },
  { id: 'createdAt', name: "Ordered On", isVisible: true },
  { id: 'buyerId', name: "Ordered By", isVisible: true },
  { id: 'paymentMethod', name: "Payment Method", isVisible: true },
  { id: 'isOverdue', name: "OverDue limit", isVisible: true },
  { id: 'total', name: "Order total", isVisible: true },
  { id: 'status', name: "Status", isVisible: true },
];
const dataFilters = [
  { id: 'id', name: "Order ID", type: "text" },
  { id: 'buyerId', name: "Buyer", type: "text"},
  { id: 'status', name: "Status", type: "text" },
  { id: 'Before', name: "Before", type: "date" },
  { id: 'After', name: "After", type: "date" }
]
export default function Orders() {
  const generateFakeData = () => {
    const data = [];
    for (let i = 0; i < 10; i++) {
      const buyerId = faker.person.fullName();
      const id = faker.string.uuid().slice(1,12);
      const createdAt = faker.date.recent();
      const isOverdue: boolean = faker.date.recent() < createdAt;
      const total = Math.floor(parseFloat(faker.commerce.price()) * Math.random() * 100);
      const status = ["paid", "pending", "cancelled", "error"][Math.random() * 4 | 0];
      const paymentMethod = ["bank", "cheque", "cash", "voucher"][Math.random() * 4 | 0];
      data.push({
        id,
        buyerId,
        createdAt : createdAt.toLocaleDateString(),
        isOverdue,
        total,
        paymentMethod,
        status,
      });
    }
    return data;
  };
  return (
    <>
      <div className="flex flex-col relative w-full">
        <div className="h-full relative">
          <div className="flex flex-row justify-between items-center p-[20px]">
            <a href="#goods/new"><Button className="flex flex-row gap-2"><Plus size={20} strokeWidth={1.5} />Create new order</Button></a>
          </div>
          <div className="flex flex-row flex-wrap gap-[30px] px-[30px] items-center justify-evenly">
            <div className=" min-w-[300px] bg-white p-4 flex grow-1 flex-col rounded-md w-[30%] gap-3 border border-pri-3 shadow-inner">
              <h3 className="text-2xl text-green-500 font-normal font-heading">Completed Orders</h3>
              <p className="text-lg text-neu-8">Total: 117 </p>
            </div>
            <div className=" min-w-[300px] bg-white p-4 flex grow-1 flex-col rounded-md w-[30%] gap-3 border border-pri-3 shadow-inner">
              <h3 className="text-2xl text-pri-5 font-normal font-heading">Pending Orders</h3>
              <p className="text-lg text-neu-8">Total: 45</p>
            </div>
            <div className=" min-w-[300px] bg-white p-4 flex grow-1 flex-col rounded-md w-[30%] gap-3 border border-pri-3 shadow-inner">
              <h3 className="text-2xl text-red-500 font-heading font-normal">Errors</h3>
              <p className="text-lg text-neu-8">Total: 34</p>
            </div>
          </div>
          <OrderDataTable data={generateFakeData()} headers={tableHeaders} filters={dataFilters} />
        </div>
      </div>
    </>
  );
}