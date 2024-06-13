"use client"
import Insights from './components/insights'
import Overdue from './components/overdue-order'
import StoreSummary from './components/store-summary'
import BestPerformer from './components/best-performing-goods'
import { Button } from "@/components/ui/button"
import { MoveRight } from "lucide-react"
import { useState, useEffect } from 'react'
export default function Home() {
    const [before, setBefore] = useState('')
    const [after, setAfter] = useState('')
    return (
        <div className="absolute border border-red-500 h-[calc(100vh-60px)] top-[60px] w-full">
            <div className="p-[30px] flex flex-col justify-start items-center md:grid md:items-start md:grid-cols-3 gap-4 h-full overflow-y-auto scrollbar-thin" style={{ gridAutoRows: 'min-content' }}>
                <div className="md:col-span-2 rounded-md w-full h-auto items-stretch flex-wrap flex flex-row gap-2 justify-evenly">
                    <Insights />
                </div>
                <div className="flex flex-col min-w-[250px] gap-3 invoice md:col-span-1 md:row-span-2 h-full w-full">
                    <Overdue/>
                    <StoreSummary/>
                </div>
                <BestPerformer/>
            </div>
        </div>
    );
}