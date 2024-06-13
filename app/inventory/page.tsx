"use client"
import Insights from './components/insights'
import Overdue from './components/overdue-order'
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
                    <div className="min-h-[calc(100%-420px)] flex flex-col gap-2  border border-neu-3 overflow-y-auto scrollbar-thin bg-white rounded-md shadow-inner p-4 ">
                        <h3 className="text-lg text-pri-5 font-semibold font-quicksand flex items-center justify-between">Store overview
                            <Button variant={"outline"} className="font-semibold">Go to store</Button>
                        </h3>
                        <div className="flex flex-col items-start justify-start" >
                            <p>MVP</p>
                            <div className="flex flex-row items-center justify-start">
                                <p>Electric Caburetor</p>
                                <ul>
                                    <li> 35 sold</li>
                                    <li> $15k in revenue</li>
                                    <li> 155 orders</li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <p>In stock</p>
                            <div className="flex flex-wrap justify-between items-center">
                                <span>625</span><span>/1000</span>
                                <span className="w-[calc(100%-3px)] h-[40px] flex flex-row gap-[3px]">
                                    <span className="w-[calc(62.5%-3px)] h-full progress-bar " style={{ "--progress": 'var(--pri-500)' }}></span>
                                    <span className="w-[calc(37.5%-3px)] h-full progress-bar " style={{ "--progress": 'var(--pri-200)' }}></span>
                                </span>
                            </div>
                        </div>
                        <div>
                            <p>Low stock</p>
                            <div className="flex flex-wrap justify-between items-center">
                                <span>150</span><span>/1000</span>
                                <span className="w-[calc(100%-3px)] h-[40px] flex flex-row gap-[3px]">
                                    <span className="w-[calc(15%-3px)] h-full progress-bar " style={{ "--progress": 'var(--acc-600)' }}></span>
                                    <span className="w-[calc(85%-3px)] h-full progress-bar " style={{ "--progress": 'var(--acc-300)' }}></span>
                                </span>
                            </div>
                        </div>
                        <div>
                            <p>Out of stock</p>
                            <div className="flex flex-wrap justify-between items-center">
                                <span>225</span><span>/1000</span>
                                <span className="w-[calc(100%-3px)] h-[40px] flex flex-row gap-[3px]">
                                    <span className="w-[calc(22.5%-3px)] h-full progress-bar " style={{ "--progress": 'red' }}></span>
                                    <span className="w-[calc(77.5%-3px)] h-full progress-bar " style={{ "--progress": 'var(--red-light)' }}></span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <BestPerformer/>
            </div>
        </div>
    );
}