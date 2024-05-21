export default interface Good {
    id: string;
    name: string;
    categories: string[];
    productCode: string;
    unitPrice: number;
    qtyInStock: number;
    totalValue: number;
    status: "in-stock" | "low-stock" | "out-of-stock";
}