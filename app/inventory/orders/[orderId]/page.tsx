import OrderDAO from "@/lib/inventory/dao/order";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Order } from "@/lib/@types/order";
import { Pen, Trash, Mail, Phone } from "lucide-react";
import OrderStatus from "../components/order-status";
import PaymentMethod from "../components/payment-method";
import ProfilePicture from "../../buyers/components/profile-picture";
import OrderItemsTable from "./components/data-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import Invoice from "../components/invoice"
export default async function OrderDetails({
    params,
}: {
    params: { orderId: string };
}) {
    let order: Order;
    try {
        order = await OrderDAO.getOrder(params.orderId);
    } catch (error) {
        notFound();
    }
    const total = order.items.reduce(
        (acc, item) => acc + item.sellingPrice * item.qty,
        0
    );
    const discountedTotal = total - (total * order.discount) / 100;
    const date = new Date(order.createdAt).toLocaleDateString();
    const paid = order.amountPaid;

    return (
        <div className="flex flex-col absolute h-[calc(100vh-60px)] top-[60px] p-4 w-full">
            <div className="h-full relative">
                <div className="flex justify-between w-full">
                    <div className="flex items-center justify-between w-full" id="order-id">
                        <div className="flex items-center justify-start">
                            <Link
                                href="/inventory/orders"
                                className="text-black hover:text-pri-5  bg-transparent p-2 border-2 rounded-sm border-neu-4 transition"
                            >
                                <MoveLeft size={20} />
                            </Link>
                            <div className="flex flex-col items-start justify-center ml-2">
                                <h6 className="text-pri-3">Order / Order details</h6>
                                <h1 className="text-2xl font-bold text-gray-800">
                                    Order #{order.orderNo.toString().padStart(5, "0")}
                                </h1>
                            </div>
                        </div>
                        <div>
                        <Dialog>
                            <DialogTrigger asChild><Button variant={"outline"}>Review Invoice</Button></DialogTrigger>
                            <DialogContent className="max-w-full w-[80vw] h-[100vh] overflow-scroll p-2">
                                <Invoice {...order} />
                            </DialogContent>
                        </Dialog>
                        </div>

                    </div>
                </div>
                <div className="flex items-center justify-between w-full mt-4 flex-wrap border rounded-sm border-neu-3">
                    {/* order details */}
                    <div
                        className="flex flex-col items-start justify-center border-0 border-neu-4 rounded-sm p-4 mr-4"
                        id="order-insights"
                    >
                        <div className="flex items-center justify-start">
                            <div className="flex flex-col items-start justify-start">
                                <h1 className="text-3xl font-bold text-gray-800">
                                    Order #{order.orderNo.toString().padStart(5, "0")}
                                </h1>
                                <div className="flex items-center justify-start mt-2">
                                    <OrderStatus {...order} />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-start w-full flex-wrap">
                            <span className="bg-neu-3 text-neu-9 text-xs mt-4 font-medium me-2 px-2.5 py-0.5 rounded-sm">
                                <span className="font-bold">Total: </span>
                                {Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "NGN",
                                })
                                    .format(discountedTotal)
                                    .replace("NGN", "₦")}
                            </span>
                            <span className="bg-neu-3 text-neu-9 text-xs mt-4 font-medium me-2 px-2.5 py-0.5 rounded-sm">
                                <span className="font-bold">Paid: </span>
                                {Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "NGN",
                                })
                                    .format(paid)
                                    .replace("NGN", "₦")}
                            </span>
                            <span className="bg-neu-3 text-neu-9 text-xs mt-4 font-medium me-2 px-2.5 py-0.5 rounded-sm">
                                <span className="font-bold">Placed On:</span> {date}
                            </span>
                            <span className="bg-neu-3 text-neu-9 text-xs mt-4 font-medium me-2 px-2.5 py-0.5 rounded-sm">
                                <span className="font-bold">Items:</span> {order.items.length}
                            </span>
                        </div>
                    </div>
                    {/* customer details */}
                    <div
                        className="flex flex-col items-start justify-center border-0 border-neu-4 rounded-sm p-4 w-[20rem]"
                        id="customer-details"
                    >
                        <h1 className="text-2xl font-bold text-gray-800">
                            Customer Details
                        </h1>
                        <h1 className="text-md font-bold text-gray-800">
                            {order.buyer.name}
                        </h1>
                        <div className="flex items-center justify-start w-full mt-2">
                            <Mail className="w-3 h-3" strokeWidth={1.5} />
                            <a
                                className="cursor-pointer text-xs text-pri-5 ml-2"
                                href={`mailto:${order.buyer.email}`}
                            >
                                {order.buyer.email}
                            </a>
                        </div>
                        <div className="flex items-center justify-start w-full mt-2">
                            <Phone className="w-3 h-3" strokeWidth={1.5} />
                            <a
                                className="cursor-pointer text-xs text-pri-5 ml-2"
                                href={`tel:${order.buyer.phone}`}
                            >
                                {order.buyer.phone.replace("+234", "0")}
                            </a>
                        </div>
                    </div>
                </div>
                {/* order items */}
                <OrderItemsTable items={order.items} />
                {/* total */}
                <div
                    className="flex items-center justify-end w-full mt-4"
                    id="order-total"
                >
                    <div className="flex items-center justify-end w-full">
                        <Table>
                            <TableRow>
                                <TableCell>
                                    <span className="font-bold">Subtotal</span>
                                </TableCell>
                                <TableCell>
                                    {Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "NGN",
                                    })
                                        .format(total)
                                        .replace("NGN", "₦")}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <span className="font-bold">Discount</span>
                                </TableCell>
                                <TableCell>
                                    {order.discount}% off
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <span className="font-bold">Total</span>
                                </TableCell>
                                <TableCell>
                                    {Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "NGN",
                                    })
                                        .format(discountedTotal)
                                        .replace("NGN", "₦")}
                                </TableCell>
                            </TableRow>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}
