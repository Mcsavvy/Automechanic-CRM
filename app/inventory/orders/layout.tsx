"use client"
import React, { useState, useEffect } from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useParams } from 'next/navigation'
export default function OrderLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const [currOrder, setCurrOrder] = useState<string | string[]>('')
    const params = useParams()

    useEffect(() => {
        if (params.orderId) {
            setCurrOrder(params.orderId)
        }
        else {
            setCurrOrder('')
        }
    }, [params])
    return (
        <div className="flex flex-col h-full w-full overflow-auto">
            <Breadcrumb className="bg-white sticky z-30 top-0 w-full h-[30px] font-heading flex items-center flex-row justify-start px-3 text-[14px]">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink className="text-pri-3" href="/inventory/orders">Orders</BreadcrumbLink>
                    </BreadcrumbItem>
                    {
                        currOrder &&
                        <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className=" font-semibold text-pri-6">Order - {currOrder}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </>
                    }
                </BreadcrumbList>
            </Breadcrumb>
            <div>
                {children}
            </div>
        </div>

    )
}
