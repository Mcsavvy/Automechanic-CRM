
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button"
import { faker } from "@faker-js/faker";
import { DataTable } from "@/components/ui/datatable";
import { Plus } from 'lucide-react'
export default function Home() {
  const tableHeaders = [
    { id: 'productName', name: "Product Name", isVisible: true, isPresent: true },
    { id: 'category', name: "Category", isVisible: true },
    { id: 'productId', name: "Product ID", isVisible: true },
    { id: 'unitPrice', name: "Unit Price", isVisible: true },
    { id: 'qty', name: "In Stock", isVisible: true },
    { id: 'totalValue', name: "Total Value", isVisible: true },
    { id: 'status', name: "Status", isVisible: true },
  ];
  const dataFilters = [
    { id: 'productName', name: "Product Name", type: "text" },
    { id: 'productId', name: "Product ID", type: "text" },
    { id: 'qty', name: "In Stock", type: "number" },
    { id: 'status', name: "Status", type: "text" },
    { id: 'Before', name: "Before", type: "date" },
    { id: 'After', name: "After", type: "date"}
  ]
  const generateFakeData = () => {
    const data = [];
    for (let i = 0; i < 10; i++) {
      const productName = faker.commerce.productName();
      const category = faker.commerce.department();
      const productId = '123434eq5434';
      const unitPrice = parseFloat(faker.commerce.price());
      const qty = Math.floor(Math.random() * 100);
      const totalValue = qty * unitPrice;
      const status = ["In stock", "out of stock"][Math.random() * 2 | 0];
      const action = '. . .';

      data.push({
        productName,
        category,
        productId,
        unitPrice,
        qty,
        totalValue,
        status,
      });
    }
    return data;
  };

  return (
    <div className="flex flex-col relative w-full">
      <Breadcrumb className="sticky top-0 px-[30px] h-[30px] w-full bg-white z-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/inventory">Inventory</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Overview</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="h-full relative">
        <div className="flex flex-row justify-between items-center p-[20px]">
          <h1 className="text-xl font-semibold">Inventory Summary</h1>
          <Button className="flex flex-row gap-2"><Plus size={20} strokeWidth={1.5} />Add Product</Button>
        </div>
        <div className="flex flex-row flex-wrap gap-[30px] px-[30px] items-center justify-evenly">
          <div className=" min-w-[300px] bg-white p-4 flex grow-1 flex-col rounded-md w-[30%] gap-3 border border-pri-3 shadow-inner">
            <h3 className="text-2xl text-pri-5">Categories</h3>
            <p className="text-lg text-neu-8">Total: 17 </p>
          </div>
          <div className=" min-w-[300px] bg-white p-4 flex grow-1 flex-col rounded-md w-[30%] gap-3 border border-pri-3 shadow-inner">
            <h3 className="text-2xl text-pri-5">Goods</h3>
            <p className="text-lg text-neu-8">Total: 45 (Goods)</p>
          </div>
          <div className=" min-w-[300px] bg-white p-4 flex grow-1 flex-col rounded-md w-[30%] gap-3 border border-pri-3 shadow-inner">
            <h3 className="text-2xl text-pri-5">Low on Stock</h3>
            <p className="text-lg text-neu-8">Total: 34 (Goods)</p>
          </div>
        </div>
        <DataTable data={generateFakeData()} headers={tableHeaders} filters={dataFilters} />
      </div>
    </div>
  );
}