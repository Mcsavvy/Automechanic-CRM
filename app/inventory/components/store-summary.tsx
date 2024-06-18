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
    const [summary, setSummary] = useState({
        name: '',
        id: '',
        qtySold: 0,
        revenue: 0,
        qty: 0,
        orderCount: 0
    })
    const [store, setStore] = useState({ inStock: 0, lowStock: 0, noStock: 0, total: 0 })
    const toPercent = (val: number, rev: boolean = false) => {
        let percentage;
        if (store.total <= 0) percentage = 0;
        else percentage = (val / store.total) * 100;
        if (rev) percentage = 100 - percentage;
        return `${percentage}%`;
    }
    const inStock = `${toPercent(store.inStock)}`
    const inDiff = `${toPercent(store.inStock, true)}`
    const lowStock = `${toPercent(store.lowStock)}`
    const lowDiff = `${toPercent(store.lowStock, true)}`
    const noStock = `(${toPercent(store.noStock)}`
    const noDiff = `${toPercent(store.noStock, true)}`

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
            console.log("Data", data)
            return data
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchSummary(before, after).
            then(({ results, ...storeSummary }) => {
                setSummary(results)
                setStore(storeSummary || {})
            })
    }, [before, after])
    useEffect(() => {
        console.log("Summary", summary)
    })
    return (
        <div className="flex flex-col gap-2  border border-neu-3 overflow-y-auto scrollbar-thin bg-white rounded-md shadow-inner p-4">
            <h3 className="text-lg text-pri-5 font-semibold font-quicksand flex items-center justify-between">Store overview
                <Link href="/inventory/products">
                    <Button variant={"outline"} className="font-semibold">Go to store</Button>
                </Link>
            </h3>
            <div className="flex flex-col items-start justify-start" >
                <p className="text-sm text-neu-6">MVP</p>
                {(summary && <Link className='hover:cursor-pointer hover:bg-neu-1 w-full p-2' href={`/inventory/products?query=${summary.name}`}>
                    <div className="flex flex-row items-center justify-start gap-3">
                        <p className="font-semibold text-pri-6 text-lg font-rambla">{summary.name}</p>
                        <ul className="grow flex flex-col gap-1">
                            <li className="flex flex-row items-center justify-start gap-2"><ShoppingCart strokeWidth={1.5} size={20} /> <span>{summary.qtySold} sold</span></li>
                            <li className="flex flex-row items-center justify-start gap-2"><CircleDollarSign strokeWidth={1.5} size={20} /> <span>{formatCurrencyShort(summary.revenue)}</span></li>
                            <li className="flex flex-row items-center justify-start gap-2"><ReceiptText strokeWidth={1.5} size={20} /> <span>{summary.orderCount} order{summary.orderCount > 0? 's': ''}</span></li>
                        </ul>
                    </div>
                </Link>) ||
                <div>
                    <h2 className='text-xl font-bold font-rambla font-acc-7'>No record sales within the period</h2>
                </div>
                }
            </div>
            <div>
                <p className="text-sm text-neu-6">In stock</p>
                <div className="flex flex-wrap justify-between items-center">
                    <span className="text-lg font-bold text-pri-5">{store.inStock}</span><span className='text-[13px] text-pri-5'>/{store.total}</span>
                    <span className="w-full h-[40px] flex flex-row">
                        {/* @ts-ignore */}
                        <span className="h-full progress-bar" style={{ "--progress": 'var(--pri-500)', width: inStock }}></span>
                        {/* @ts-ignore */}
                        <span className="h-full progress-bar" style={{ "--progress": 'var(--pri-200)', width: inDiff }}></span>
                    </span>
                </div>
            </div>
            <div>
                <p className="text-sm text-neu-6">Low stock</p>
                <div className="flex flex-wrap justify-between items-center">
                    <span className="text-lg font-bold text-acc-6">{store.lowStock}</span ><span className='text-[13px] text-acc-6'>/{store.total}</span>
                    <span className="w-full h-[40px] flex flex-row">
                        {/* @ts-ignore */}
                        <span className="h-full progress-bar" style={{ "--progress": 'var(--acc-600)', width: lowStock }}></span>
                        {/* @ts-ignore */}
                        <span className="h-full progress-bar" style={{ "--progress": 'var(--acc-300)', width: lowDiff }}></span>
                    </span>
                </div>
            </div>
            <div>
                <p className="text-sm text-neu-6">Out of stock</p>
                <div className="flex flex-wrap justify-between items-center">
                    <span className="text-lg font-bold text-red-500">{store.noStock}</span><span className='text-[13px] text-red-500'>/{store.total}</span>
                    <span className="w-full h-[40px] flex flex-row">
                        {/* @ts-ignore */}
                        <span className="h-full progress-bar" style={{ "--progress": 'red', width: noStock }}></span>
                        {/* @ts-ignore */}
                        <span className="h-full progress-bar" style={{ "--progress": 'var(--red-light)', width: noDiff }}></span>
                    </span>
                </div>
            </div>
        </div >
    )
}

export default StoreSummary