"use client";
import Image from "next/image";
import { FC, useState, useEffect, useRef } from "react";
import { Order } from "@/lib/@types/order";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const Invoice: FC<Order> = (props) => {
    const [subTotal, setSub] = useState(0)
    const [discount, setDiscount] = useState(0)
    const invoiceRef = useRef<HTMLDivElement>(null);
    const formatCurrency = (amt: number) => {
        return Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "NGN",
        })
            .format(amt)
            .replace("NGN", "₦")
    }
    const formatDate = (date: string, time: boolean = false) => {
        const dateObj = new Date(date);
        const dateOptions = { day: "numeric" as "numeric", month: "long" as "long", year: "numeric" as "numeric"  };
        const formattedDate = new Intl.DateTimeFormat('en-GB', dateOptions).format(dateObj);
        if (time) {
            const timeOptions = { hour: "numeric" as "numeric", minute: "numeric" as "numeric", hour12: true };
            const formattedTime = new Intl.DateTimeFormat('en-GB', timeOptions).format(dateObj);
            return `${formattedDate} at ${formattedTime}`;
        }
        return formattedDate;
    };

    const printInvoice = () => {
        if (invoiceRef.current && props.orderNo) {
            html2canvas(invoiceRef.current, { scale: 1 }).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF("portrait", "pt", "a4");
                const imgProps = pdf.getImageProperties(imgData);
                let pdfWidth = pdf.internal.pageSize.getWidth();
                let pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                let heightLeft = imgProps.height;
    
                const pageHeight = pdf.internal.pageSize.getHeight();
                let position = 0;
    
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
                heightLeft -= pageHeight;
    
                while (heightLeft >= 0) {
                    position = heightLeft - imgProps.height;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
                    heightLeft -= pageHeight;
                }
    
                pdf.save(`invoice-${props.orderNo}-for-${props.buyer.name}.pdf`);
            });
        }    
    }
    useEffect(() => {
        if (props) {
            const s_total = props.items.reduce((total, item) =>  total + (item.sellingPrice * item.qty), 0)
            setSub(s_total)
            const dc = (props.discount / 100) * s_total;
            setDiscount(dc)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props])
    return (
        <>
        <Button onClick={printInvoice} variant={"outline"} className="w-[40px] p-0 h-[40px] grow-0 shrink-0"><Download size={28} strokeWidth={1.5} /></Button>
        <div className="p-2 origami-background h-auto "ref={invoiceRef}>
            <div className='border border-[#ccc]  min-h-[490px] p-3 font-nunito text-black'>
                <header className="flex flex-col items-center justify-start">
                    <Image src="/logo.jpg" width={40} height={40} alt="logo" className="rounded-full" />
                    <h1 className="text-lg font-rambla font-semibold">WILLIE&apos;S</h1>
                    <p>2 Archebong Street, Ikeja Main Line, Ikeja, Lagos, Nigeria</p>
                    <p>+234 812 345 6789</p>
                    <p>williegarage@giagalo.com</p>
                </header>
                <div className="flex flex-row items-start justify-between gap-5 mt-5">
                    <ul className="flex flex-row gap-3 items-start justify-start">
                        <li className="font-rambla font-semibold flex flex-col items-start justify-start">
                            <span>Invoice No:</span>
                            <span>Issued:</span>
                            <span>Due:</span>
                        </li>
                        <li className="font-nunito flex flex-col items-start justify-start">
                            <span>#{props.orderNo.toString().padStart(5, "0")}</span>
                            <span>{formatDate(props.createdAt)}</span>
                            <span>{formatDate(props.overdueLimit)}</span>
                        </li>
                    </ul>
                    <ul className="flex flex-row gap-3 items-start justify-start">
                        <li className="font-rambla font-semibold flex flex-col items-start justify-start">
                            <span>Bill To:</span>
                            <span>Email:</span>
                            <span>Phone:</span>
                        </li>
                        <li className="font-nunito flex flex-col items-start justify-start">
                            <span>{props.buyer.name}</span>
                            <span className="lowercase">{props.buyer.email}</span>
                            <span>{props.buyer.phone}</span>
                        </li>
                    </ul>
                </div>
                <table className="mt-5 w-full border border-[#ccc]">
                    <thead>
                        <tr>
                            <th className="text-left font-rambla font-semibold text-[20px] border-t border-b border-[#ccc] px-1 p-2">S/N</th>
                            <th className="text-left font-rambla font-semibold text-[20px] border-t border-b border-[#ccc] px-1 p-2">Description</th>
                            <th className="text-left font-rambla font-semibold text-[20px] border-t border-b border-[#ccc] px-1 p-2">Qty</th>
                            <th className="text-left font-rambla font-semibold text-[20px] border-t border-b border-[#ccc] px-1 p-2">Price</th>
                            <th className="text-left font-rambla font-semibold text-[20px] border-t border-b border-[#ccc] px-1 p-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.items.map((item, id) => {
                                return (
                                    <tr key={id}>
                                        <td className="font-nunito border-t border-b border-[#ccc] p-1">{id + 1}</td>
                                        <td className="font-nunito border-t border-b border-[#ccc] p-1">{item.good.name}</td>
                                        <td className="font-nunito border-t border-b border-[#ccc] p-1">{item.qty}</td>
                                        <td className="font-nunito border-t border-b border-[#ccc] p-1">{formatCurrency(item.sellingPrice)}</td>
                                        <td className="font-nunito border-t border-b border-[#ccc] p-1">{formatCurrency(item.sellingPrice * item.qty)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <div className="mt-5 flex flex-row items-start justify-between gap-5">
                    <div className="flex flex-col items-start justify-start">
                        <h2 className="font-semibold text-lg font-rambla text-pri-6">Pay via</h2>
                        <ul>
                            <li>
                                <h3 className="font-semibold font-rambla">Cash</h3>
                                <ul className="list-disc px-3">
                                    <li className="text-sm">Ensure you obtain a  receipt for each cash transaction you make at our office</li>
                                    <li className="text-sm">Ensure the recepit is also signed by the concerned staff</li>
                                </ul>
                            </li>
                            <li>
                                <h3 className="font-semibold font-rambla">Cheque</h3>
                                <ul className="list-disc px-3">
                                    <li className="text-sm">All cheques must have a validity window of at most two weeks and at least two weeks</li>
                                    <li className="text-sm">Expired, forged or dishonored cheques will not be accepted</li>
                                </ul>
                            </li>
                            <li>
                                <h3 className="font-semibold font-rambla">Bank</h3>
                                <p><span className="font-semibold font-nunito text-[13px]">Acc No: </span>2034562012</p>
                                <p><span className="font-semibold font-nunito text-[13px]">Bank: </span>First Bank Nigeria</p>
                                <ul className="list-disc px-3">

                                    <li className="text-sm">Ensure all transactions are successful and follow up by contacting the concerned
                                        staff for immediate processing
                                    </li>
                                    <li className="text-sm">We will not take liability for any failed transactions/transfers</li>
                                </ul>
                            </li>
                            <li>
                                <h3 className="font-semibold font-rambla">Voucher</h3>
                                <ul className="list-disc px-3">
                                    <li className="text-sm">Expired, fake or forged vouchers will not be honored</li>
                                </ul>
                            </li>
                        </ul>

                    </div>
                    <div className="flex flex-col items-end justify-between b">
                        <ul className="flex flex-row gap-3 items-start justify-start">
                            <li className="font-rambla font-semibold flex flex-col items-start justify-start">
                                <span>Subtotal:</span>
                                <span>Tax:</span>
                                <span>Shipping:</span>
                                <span className=" text-red-500">Discount:</span>
                                {props.amountPaid > 0 && <span className="text-lg font-semibold text-acc-7">Paid:</span>}
                            </li>
                            <li className="font-nunito flex flex-col items-start justify-start">
                                <span>{formatCurrency(subTotal)}</span>
                                <span>₦  - -</span>
                                <span>₦  - -</span>
                                <span className="text-red-500">{formatCurrency(discount)}</span>
                                {props.amountPaid > 0 && <span className="text-lg font-semibold text-acc-7">{formatCurrency(props.amountPaid)}</span>}
                            </li>
                        </ul>
                        <span className="w-fullhi border-t border-[#ccc]"></span>
                        <div className="flex flex-row gap-3 text-xl font-semibold text-pri-6">
                            <span className="font-rambla">Total:</span>
                            <span className="font-nunito">{formatCurrency(subTotal - discount - props.amountPaid)}</span>
                        </div>
                    </div>
                </div>
                <p className="text-center font-rambla italic mt-5 text-pri-6 font-normal">Thank you for doing business with us. Have a great day</p>
                <footer className="border-t border-[#ccc] mt-1">
                    <p className="font-nunito text-[10px] font-italic">Generated on {formatDate(new Date(Date.now()).toISOString(), true)}</p>
                </footer>
            </div>
        </div>
        </>
    )
}
export default Invoice