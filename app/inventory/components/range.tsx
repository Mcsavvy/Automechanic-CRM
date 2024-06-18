"use client"
import { FC, useState, useEffect } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Hourglass, TrendingUp, TrendingDown } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface RangeBarProps {
    setBefore: (val: string) => void;
    setAfter: (val: string) => void;
    setMetric: (val: 'month' | 'hour' | 'day' | 'year') => void;
    before: string;
    after: string;
}
const RangeBar: FC<RangeBarProps> = ({before, after, setBefore, setAfter, setMetric }) => {
    const [f_b, setFB] = useState('')
    const [f_a, setFA] = useState('')
    const [by, setBy] = useState<'month' | 'hour' | 'day' | 'year'>('month')
    const [val, setVal] = useState('this week')
    const [clicked, setClicked] = useState(false)
    const submitCustom = (e: any) => {
        e.preventDefault()
        setMetric(by)
        setBefore(f_b)
        setAfter(f_a)
    }
    const reset = () => {
        setClicked(true)
        setTimeout(() => {
            const today = new Date()
            setMetric('month')
            setBefore((new Date(today.setDate(today.getDate() - today.getDay() + 6)).toISOString()))
            setAfter((new Date(today.setDate(today.getDate() - today.getDay())).toISOString()))
            setVal('this week')
            setClicked(false)
        }, 100)
    }

    const fetchDefaults = (period: 'today' | 'this week' | 'this month' | 'this year' | 'yesterday' | 'last week' | 'last month' | 'last year' | 'yesterday') => {
        let result;
        setVal(period)
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));

        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        const startOfYear = new Date(today.getFullYear(), 0, 1);
        const endOfYear = new Date(today.getFullYear(), 11, 31);

        const yesterday = new Date(today.setDate(today.getDate() - 1));

        const lastWeekStart = new Date(today.setDate(today.getDate() - 7));
        const lastWeekEnd = new Date(today.setDate(today.getDate() - 1));

        const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

        const lastYearStart = new Date(today.getFullYear() - 1, 0, 1);
        const lastYearEnd = new Date(today.getFullYear() - 1, 11, 31);

        switch (period) {
            case 'today':
                result = { before: endOfDay, after: startOfDay };
                setMetric('hour')
                break
            case 'this week':
                result = { before: endOfWeek, after: startOfWeek };
                setMetric('day')
                break
            case 'this month':
                result = { before: endOfMonth, after: startOfMonth };
                setMetric('day')
                break
            case 'this year':
                result = { before: endOfYear, after: startOfYear };
                break
            case 'yesterday':
                result = { before: yesterday, after: yesterday };
                setMetric('hour')
                break
            case 'last week':
                result = { before: lastWeekEnd, after: lastWeekStart };
                setMetric('day')
                break
            case 'last month':
                result = { before: lastMonthEnd, after: lastMonthStart };
                setMetric('day')
                break
            case 'last year':
                result = { before: lastYearEnd, after: lastYearStart };
                setMetric('month')
                break
            default:
                return
        }
        setBefore(result.before.toISOString())
        setAfter(result.after.toISOString())
    };

    return (
        <div className="flex flex-row flex-wrap items-center justify-between gap-2 w-full bg-white border border-neu-2 rounded-md p-2">
            <p className="font-rambla text-[16px]">From <span className="font-semibold text-pri-6">{formatDate(after)}</span> to <span className="font-semibold text-acc-7">{formatDate(before)}</span></p>
            <div className="flex flex-row items-center justify-start gap-2">
            <Hourglass onClick={reset} className={`cursor-pointer ${clicked ? 'animate-spin' : ''}`} size={24} strokeWidth={1.5} color={"#003056"}/>

            <Select value={val} onValueChange={fetchDefaults}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Today" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="this week">This Week</SelectItem>
                    <SelectItem value="this month">This Month</SelectItem>
                    <SelectItem value="this year">This Year</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="last week">Last Week</SelectItem>
                    <SelectItem value="last month">Last Month</SelectItem>
                    <SelectItem value="last year">Last Year</SelectItem>
                    <Popover>
                        <PopoverTrigger className="flex items-center justify-start hover:bg-pri-1 text-sm w-full px-[30px] py-1">Custom</PopoverTrigger>
                        <PopoverContent>
                            <form onSubmit={submitCustom}>
                                <label>From:
                                    <Input required type="date" value={f_a} onChange={(e) => setFA(e.target.value)} />
                                </label>
                                <label>To:
                                    <Input required type="date" value={f_b} onChange={(e) => setFB(e.target.value)} />
                                </label>
                                <label>By:
                                    <Select value={by} onValueChange={(e) => setBy(e as any)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Day" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="hour">Hour</SelectItem>
                                            <SelectItem value="day">Day</SelectItem>
                                            <SelectItem value="month">Month</SelectItem>
                                            <SelectItem value="year">Year</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </label>
                                <Button type="submit">Ok</Button>
                            </form>
                        </PopoverContent>
                    </Popover>
                </SelectContent>
            </Select>
            </div>

        </div>
    )

}
export default RangeBar