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
    const [before, setBefore] = useState('')
    const [after, setAfter] = useState('')
    const [metric, setMetric] = useState<'month' | 'hour' | 'day' | 'year'>('month')
    const [tab, setTab] = useState("quickstart")
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
        <div className="absolute border border-red-500 h-[calc(100vh-60px)] top-[60px] w-full  overflow-auto    ">
            <div className="sticky top-0 w-full z-10 overflow-x-clip">
                <ul className="  px-[30px] pt-3 pb-0 font-quicksand flex flex-row items-start bg-white overflow-x-auto overflow-y-clip">
                    <li
                        onClick={() => setTab("quickstart")}
                        className={`font-quicksand capitalize cursor-pointer relative px-4 py-1 text-center transition-all duration-200 ease-in-out ${tab == "quickstart" ? "tab" : ""
                            }`}
                    >
                        Quickstart
                    </li>
                    <li
                        onClick={() => setTab("recent")}
                        className={`font-quicksand capitalize cursor-pointer relative px-4 py-1 text-center transition-all duration-200 ease-in-out ${tab == "recent" ? "tab" : ""
                            }`}
                    >
                        Recent Actions
                    </li>
                    <li
                        onClick={() => setTab("charts")}
                        className={`font-quicksand capitalize cursor-pointer relative px-4 py-1 text-center transition-all duration-200 ease-in-out ${tab == "charts" ? "tab" : ""
                            }`}
                    >
                        Quick Charts
                    </li>

                </ul>
            </div>

            <div className="flex p-[30px] flex-row flex-wrap gap-3 items-center justify-evenly w-full h-full">
                {tab == "quickstart" &&
                    quickstartOptions.map((item, idx) => <QuickAction key={idx} {...item} />)
                }
                {tab == "charts" &&
                    <div className="p-[30px] flex flex-col justify-start items-center md:items-stretch md:grid md:items-start md:grid-cols-3 gap-4 h-full overflow-y-visible scrollbar-thin" style={{ gridAutoRows: 'min-content' }}>
                        <div className="md:col-span-3 flex flex-row flex-wrap items-center justify-between">
                            <RangeBar {...{ setBefore, setAfter, setMetric }} />
                        </div>
                        <div className="md:col-span-2 rounded-md w-full h-auto items-stretch flex-wrap flex flex-row gap-2 justify-evenly">
                            <Insights {...{ metric, before, after }} />
                        </div>
                        <div className="flex flex-col min-w-[250px] gap-3 invoice md:col-span-1 md:row-span-2 h-full w-full">
                            <Overdue {...{ before, after }} />
                            <StoreSummary {...{ before, after }} />
                        </div>
                        <BestPerformer {...{ before, after }} />
                    </div>
                }
            </div>
        </div>
    );
}