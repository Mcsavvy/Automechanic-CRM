"use client"
import Insights from './components/insights'
import Overdue from './components/overdue-order'
import StoreSummary from './components/store-summary'
import Recent from './components/recent'
import BestPerformer from './components/best-performing-goods'
import RangeBar from './components/range'
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react'
import { Boxes, Users, ReceiptText, UsersRound } from 'lucide-react'
export default function Home() {
    const today = new Date()
    const [before, setBefore] = useState((new Date(today.setDate(today.getDate() - today.getDay() + 6)).toISOString()))
    const [after, setAfter] = useState((new Date(today.setDate(today.getDate() - today.getDay())).toISOString()))
    const [metric, setMetric] = useState<'month' | 'hour' | 'day' | 'year'>('day')
    const [tab, setTab] = useState("recent")

    return (
        <div className="absolute h-[calc(100vh-60px)] top-[60px] w-full  overflow-auto">
            <div className="sticky top-0 w-full z-10 overflow-x-clip">
                <ul className="  px-[30px] pt-3 pb-0 font-quicksand flex flex-row items-start bg-white overflow-x-clip overflow-y-clip gap-4">
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
                <RangeBar {...{ setBefore, setAfter, setMetric, before, after }} />
                {tab == "chart" &&
                    <div className="w-full md:grid my-grid gap-4 md:items-start overflow-y-visible scrollbar-thin flex flex-col items-center">
                        <div className="md:col-span-2 md:row-start-1">
                            <RangeBar {...{ setBefore, setAfter, setMetric, before, after }} />
                        </div>
                        <div className="md:col-start-1 md:row-start-2 rounded-md w-full items-stretch flex-wrap flex flex-row gap-2 justify-evenly">
                            <Insights {...{ metric, before, after }} />
                        </div>
                        <div className="col-start-2 row-start-2 flex flex-col min-w-[250px] gap-3 invoice h-full w-full">
                            <Overdue {...{ before, after }} />
                            <StoreSummary {...{ before, after }} />
                        </div>
                    </div>
                }
                {tab == "recent" &&
                    <Recent {...{ before, after }}/>
                }
            </div>
        </div>
    );
}