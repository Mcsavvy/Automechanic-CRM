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
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

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
    <div className="p-[50px]">
      <Breadcrumb>
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
      <h1>Inventory Summary</h1>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Product Name</TableHead>
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
  );
}