import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { randomUUID } from "crypto";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input";

export default function Home() {
  const generateFakeData = () => {
    const data = [];
    for (let i = 0; i < 10; i++) {
      const productName = faker.commerce.productName();
      const category = faker.commerce.department();
      const productId = '123434eq5434';
      const unitPrice = parseFloat(faker.commerce.price());
      const inStock = Math.floor(Math.random() * 100);
      const totalValue = inStock * unitPrice;
      const status = ["In stock", "out of stock"][Math.random() * 2 | 0];
      const action = '. . .';

      data.push({
        productName,
        category,
        productId,
        unitPrice,
        inStock,
        totalValue,
        status,
        action,
      });
    }
    return data;
  };

  return (
    <div className="w-full h-full overflow-auto">
      <Breadcrumb className="sticky top-0 px-[30px] py-[5px] bg-white z-10 border-b border-neu-3">
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
        <div className="bg-white p-4 flex grow-1 flex-col rounded-md w-[30%] gap-3 border border-pri-3 shadow-inner">
          <h3 className="text-2xl text-pri-5">Categories</h3>
          <p className="text-lg text-neu-8">Total: 17 </p>
        </div>
        <div className="bg-white p-4 flex flex-col rounded-md w-[30%] gap-3 border border-pri-3 shadow-inner">
          <h3 className="text-2xl text-pri-5">Goods</h3>
          <p className="text-lg text-neu-8">Total: 45 (Goods)</p>
        </div>
        <div className="bg-white p-4 flex flex-col rounded-md w-[30%] gap-3 border border-pri-3 shadow-inner">
          <h3 className="text-2xl text-pri-5">Low on Stock</h3>
          <p className="text-lg text-neu-8">Total: 34 (Goods)</p>
        </div>
      </div>
      <div>
        <div>
          <h2>All Goods</h2>
          <div>
            <div className="bg-white w-[300px] flex flex-row items-center justify-start">
              <FaSearch/>
              <input placeholder="Start typing..." className="outline-none border-none text-md p-2"/>
            </div>
            
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Product Id</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>In Stock</TableHead>
              <TableHead>Total Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {generateFakeData().map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.productName}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.productId}</TableCell>
                <TableCell>{row.unitPrice}</TableCell>
                <TableCell>{row.inStock.toString()}</TableCell>
                <TableCell>{row.totalValue.toString()}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell className="text-right">{row.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}