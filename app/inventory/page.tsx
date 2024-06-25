"use client"
import Insights from './components/insights'
import Overdue from './components/overdue-order'
import StoreSummary from './components/store-summary'
import BestPerformer from './components/best-performing-goods'
import RangeBar from './components/range'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Boxes, Users, ReceiptText, UsersRound } from 'lucide-react'
import QuickAction from './components/quick-action'
export default function Home() {
    const today = new Date()
    const [before, setBefore] = useState((new Date(today.setDate(today.getDate() - today.getDay() + 6)).toISOString()))
    const [after, setAfter] = useState((new Date(today.setDate(today.getDate() - today.getDay())).toISOString()))
    const [metric, setMetric] = useState<'month' | 'hour' | 'day' | 'year'>('month')
    const [tab, setTab] = useState("chart")
    const quickstartOptions = [
        {
            front: "Generate new invoice",
            icon: ReceiptText
        },
        {
            front: "Add new customer",
            icon: UsersRound
        },
        {
            front: "List new Product",
            icon: Boxes
        },
        {
            front: "Manage your staff",
            icon: Users
        }
    ]
    return (
        <div className="absolute h-[calc(100vh-60px)] top-[60px] w-full  overflow-auto">
            <div className="sticky top-0 w-full z-10 overflow-x-clip">
                <ul className="  px-[30px] pt-3 pb-0 font-quicksand flex flex-row items-start bg-white overflow-x-clip overflow-y-clip gap-4">
                    <li
                        onClick={() => setTab("quickstart")}
                        className={`font-quicksand capitalize cursor-pointer relative py-1 text-center transition-all duration-200 ease-in-out ${tab == "quickstart" ? "tab" : ""
                            }`}
                    >
                        Quickstart
                    </li>
                    <li
                        onClick={() => setTab("recent")}
                        className={`font-quicksand capitalize cursor-pointer relative py-1 text-center transition-all duration-200 ease-in-out ${tab == "recent" ? "tab" : ""
                            }`}
                    >
                        Recent
                    </li>
                    <li
                        onClick={() => setTab("chart")}
                        className={`font-quicksand capitalize cursor-pointer relative py-1 text-center transition-all duration-200 ease-in-out ${tab == "chart" ? "tab" : ""
                            }`}
                    >
                        Revenue
                    </li>

                </ul>
            </div>

            <div className="flex p-[30px] flex-row flex-wrap gap-3 items-center justify-evenly w-full">
                {tab == "quickstart" &&
                    quickstartOptions.map((item, idx) => <QuickAction key={idx} {...item} />)
                }
                {tab == "chart" &&
                    <div className="w-full my-grid flex flex-col justify-start items-center gap-4 md:grid md:items-start overflow-y-visible scrollbar-thin">
                        <div className="md:col-start-1 md:col-span-3 md:row-span-1 w-full">
                            <RangeBar {...{ setBefore, setAfter, setMetric, before, after }} />
                        </div>
                        <div className="md:col-start-1 md:col-span-2 md:row-start-2 md:row-span-2 rounded-md w-full items-stretch flex-wrap flex flex-row gap-2 justify-evenly">
                            <Insights {...{ metric, before, after }} />
                        </div>
                        <div className="flex flex-col min-w-[250px] gap-3 invoice md:col-start-3 md:col-span-1 md:row-start-2 md:row-span-2 h-full w-full">
                            <Overdue {...{ before, after }} />
                            <StoreSummary {...{ before, after }} />
                        </div>
                        {/* <BestPerformer {...{ before, after }} /> */}
                    </div>
                }
            </div>
        </div>
    );
}