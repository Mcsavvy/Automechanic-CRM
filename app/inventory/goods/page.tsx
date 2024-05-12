
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
import { FaPlus } from "react-icons/fa";
import { DataTable } from "@/components/datatable";

export default function Home() {
  const tableHeaders = {
    productName: "Product Name",
    category: "Category",
    productId: "Product ID",
    unitPrice: "Unit Price",
    qty: "In Stock",
    totalValue: "Total Value",
    status: "Status",
  };
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
    <div className="w-full h-full overflow-auto relative">
      <Breadcrumb className="sticky top-0 px-[30px] h-[30px] bg-white z-10 border-b border-neu-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-row justify-between items-center p-[20px]">
        <h1 className="text-xl font-semibold">Inventory Summary</h1>
        <Button className="flex flex-row gap-2"><FaPlus />Add Product</Button>
      </div>
      <div className="flex flex-row flex-wrap gap-[30px] px-[30px]">
        <div className=" min-w-300 bg-white p-4 flex grow-1 flex-col rounded-md w-[30%] gap-3 border border-pri-3 shadow-inner">
          <h3 className="text-2xl text-pri-5">Categories</h3>
          <p className="text-lg text-neu-8">Total: 17 </p>
        </div>
        <div className=" min-w-300 bg-white p-4 flex flex-col rounded-md w-[30%] gap-3 border border-pri-3 shadow-inner">
          <h3 className="text-2xl text-pri-5">Goods</h3>
          <p className="text-lg text-neu-8">Total: 45 (Goods)</p>
        </div>
        <div className=" min-w-300 bg-white p-4 flex flex-col rounded-md w-[30%] gap-3 border border-pri-3 shadow-inner">
          <h3 className="text-2xl text-pri-5">Low on Stock</h3>
          <p className="text-lg text-neu-8">Total: 34 (Goods)</p>
        </div>
      </div>
      <DataTable populate={generateFakeData} headers={tableHeaders}/>
    </div>
  );
}