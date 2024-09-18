"use client";
import React, { useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import Modal from "@/components/ui/modal";
import { fetchPayment } from "@/lib/stores/payment-store";
import { Payment } from "@/lib/@types/payments";
import { formatInvoiceNumber, formatMoney } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download, Phone } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";

async function downloadReceipt(element: HTMLDivElement, name: string) {
  console.log("element", element);
  const canvas = await html2canvas(element, {
    scale: 1,
  });
  console.log("canvas", canvas);
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("landscape", "pt", "a4");
  console.log(imgData);
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  let heightLeft = imgProps.height;
  const pageHeight = pdf.internal.pageSize.getHeight();
  let position = 0;
  pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
  heightLeft -= pageHeight;
  while (heightLeft >= 0) {
    position = heightLeft - imgProps.height;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;
  }
  pdf.save(`${name}.pdf`);
}

export default function PaymentReceiptModal() {
  const [paymentId, setPaymentId] = useQueryState("payment", {
    defaultValue: "",
    clearOnDefault: true,
  });
  const [payment, setPayment] = useState<Payment | null>(null);
  const receiptRef = React.useRef<HTMLDivElement>(null);
  const modalId = "payment/receipt";

  useEffect(() => {
    const isOpen = paymentId;
    if (isOpen) {
      fetchPayment(paymentId).then(setPayment);
    }
  }, [paymentId]);
  const title = payment ? (
    <span>
      Payment Receipt For{" "}
      <Link href={`/orders/${payment.order.id}`} className="text-primary">
        {formatInvoiceNumber(payment.order.orderNo)}
      </Link>
    </span>
  ) : (
    <span>Payment Receipt</span>
  );

  return (
    <Modal
      id={modalId}
      title={title}
      onClose={() => {
        setPaymentId("");
        setPayment(null);
      }}
      classNames={{
        title: "text-lg text-black",
        modal:
          "scrollbar-thin overflow-auto h-[100vh] p-2",
      }}
    >
      <div
        className="w-[595px] mx-auto border border-[#ccc] h-[300px] font-nunito text-black pb-0"
        ref={receiptRef}
      >
        <div className="bg-pri-5 w-full h-6"></div>
        <header className="flex flex-col items-center justify-start">
          <div className="grid grid-cols-[2fr_6fr_3fr] w-full px-6 pt-2">
            <div className="">
              <Image
                src="/logo.png"
                width={50}
                height={50}
                alt="logo"
                className="rounded-full"
              />
              <div className="flex items-center justify-start mt-2">
                <p className="text-sm font-bold">Date:</p>

                <p className="text-sm underline decoration-dotted ml-2">
                  {payment &&
                    new Date(payment.createdAt).toLocaleDateString("en-GB")}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-start">
              <h1 className="text-3xl font-bold font-rambla pl-6">
                Payment Receipt
              </h1>
              <p className="text-lg font-bold">
                Invoice {payment && formatInvoiceNumber(payment.order.orderNo)}
              </p>
            </div>

            <div className="flex flex-col items-start justify-start pt-1">
              <h2 className="font-rambla font-semibold">{"Willie's Garage"}</h2>
              <p className="text-[10px]">
                2 Archebong Street, Ikeja Main Line, Ikeja, Lagos, Nigeria
              </p>
              <p className="text-xs">
                <Phone
                  size={12}
                  strokeWidth={1.5}
                  className="mr-1 pb-[2px] inline-block"
                />
                0812 345 6789
              </p>
            </div>
          </div>
        </header>
        <div className="bg-acc-5 w-full h-1 mt-2"></div>
        <div className="flex flex-col items-center justify-start mt-7 mb-11">
          <div className="flex w-full px-6">
            <p className="font-bold mr-2">Received with thanks from</p>
            <div className="w-[20rem] text-center">
              {payment?.customer.name}
              <hr className="border-dotted border-black" />
            </div>
          </div>
          <div className="flex w-full px-6">
            <p className="font-bold mr-2">Amount</p>
            <div className="w-[27.2rem] text-center">
              {payment && formatMoney(payment.amount)}
              <hr className="border-dotted border-black" />
            </div>
          </div>
          <div className="flex w-full px-6">
            <p className="font-bold mr-2">Invoice</p>
            <div className="w-[27.6rem] text-center">
              {payment && formatInvoiceNumber(payment.order.orderNo)}
              <hr className="border-dotted border-black" />
            </div>
          </div>
          <div className="flex w-full px-6">
            <p className="font-bold mr-2">Received By</p>
            <div className="w-[25.7rem] text-center">
              {payment?.confirmedBy.name}
              <hr className="border-dotted border-black" />
            </div>
          </div>
        </div>
        <div className="bg-pri-5 w-full h-2 mt-auto mb-0"></div>
      </div>
      <div className="flex items-center justify-end mt-4">
        <Button onClick={() => downloadReceipt(receiptRef.current!, "receipt")}>
          <Download size={16} className="mr-2" />
          Download Receipt
        </Button>
      </div>
    </Modal>
  );
}
