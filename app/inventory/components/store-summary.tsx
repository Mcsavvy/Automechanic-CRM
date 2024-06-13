"use client"
import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { formatCurrencyShort } from '@/lib/utils';
import Link from 'next/link';
import { CircleDollarSign, ShoppingCart, ReceiptText } from 'lucide-react'

interface StoreSummaryProps {
    before: string;
    after: string;
}
const StoreSummary: FC<Partial<StoreSummaryProps>> = ({ before, after }) => {
    const [summary, setSummary] = useState<any>({})
    const fetchSummary = async (before?: string, after?: string) => {
        try {
            let query = '?'
            if (before) query += `&b=${encodeURIComponent(before)}`;
            if (after) query += `&a=${encodeURIComponent(after)}`;
            if (!(before || after)) query = '';
            const response = await axios.get(`/api/insights/store-summary${query}`)
            if (response.status !== 200) {
                throw response;
            }
            let data = response.data;
            return data
        } catch (err) {
            console.error(err)
        }
    }

    // useEffect(() => {
    //     fetchSummary(before, after).
    //         then(data => setSummary(data))
    // }, [before, after])
    useEffect(() => {
        console.log("Summary", summary)
    })
    return (
        <div className="min-h-[calc(100%-420px)] flex flex-col gap-2  border border-neu-3 overflow-y-auto scrollbar-thin bg-white rounded-md shadow-inner p-4 ">
            <h3 className="text-lg text-pri-5 font-semibold font-quicksand flex items-center justify-between">Store overview
                <Link href="/inventory/products">
                <Button variant={"outline"} className="font-semibold">Go to store</Button>
                </Link>
            </h3>
            <div className="flex flex-col items-start justify-start" >
                <p className="text-sm text-neu-6">MVP</p>
                <Link className='hover:cursor-pointer hover:bg-neu-1' href={`/inventory/products/`}>
                    <div className="flex flex-row items-center justify-start gap-2">
                        <p className="font-semibold text-pri-6 font-lg font-rambla">Electric Caburetor</p>
                        <ul className="grow flex flex-col gap-1">
                            <li className="flex flex-row items-center justify-start gap-2"><ShoppingCart strokeWidth={1.5} size={20} /> <span>35 sold</span></li>
                            <li className="flex flex-row items-center justify-start gap-2"><CircleDollarSign strokeWidth={1.5} size={20} /> <span>$15k in revenue</span></li>
                            <li className="flex flex-row items-center justify-start gap-2"><ReceiptText strokeWidth={1.5} size={20} /> <span>155 orders</span></li>
                        </ul>
                    </div>
                </Link>
            </div>
            <div>
                <p className="text-sm text-neu-6">In stock</p>
                <div className="flex flex-wrap justify-between items-center">
                    <span className="text-lg font-bold text-pri-5">625</span><span className='text-[13px] text-pri-5'>/1000</span>
                    <span className="w-[calc(100%-3px)] h-[40px] flex flex-row gap-[3px]">
                        <span className="w-[calc(62.5%-3px)] h-full progress-bar " style={{ "--progress": 'var(--pri-500)' }}></span>
                        <span className="w-[calc(37.5%-3px)] h-full progress-bar " style={{ "--progress": 'var(--pri-200)' }}></span>
                    </span>
                </div>
            </div>
            <div>
                <p className="text-sm text-neu-6">Low stock</p>
                <div className="flex flex-wrap justify-between items-center">
                    <span className="text-lg font-bold text-acc-6">150</span ><span className='text-[13px] text-acc-6'>/1000</span>
                    <span className="w-[calc(100%-3px)] h-[40px] flex flex-row gap-[3px]">
                        <span className="w-[calc(15%-3px)] h-full progress-bar " style={{ "--progress": 'var(--acc-600)' }}></span>
                        <span className="w-[calc(85%-3px)] h-full progress-bar " style={{ "--progress": 'var(--acc-300)' }}></span>
                    </span>
                </div>
            </div>
            <div>
                <p className="text-sm text-neu-6">Out of stock</p>
                <div className="flex flex-wrap justify-between items-center">
                    <span className="text-lg font-bold text-red-500">225</span><span className='text-[13px] text-red-500'>/1000</span>
                    <span className="w-[calc(100%-3px)] h-[40px] flex flex-row gap-[3px]">
                        <span className="w-[calc(22.5%-3px)] h-full progress-bar " style={{ "--progress": 'red' }}></span>
                        <span className="w-[calc(77.5%-3px)] h-full progress-bar " style={{ "--progress": 'var(--red-light)' }}></span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default StoreSummary