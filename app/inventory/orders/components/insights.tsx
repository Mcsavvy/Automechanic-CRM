"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { RefreshCcw } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { OrderInsights } from '@/lib/@types/insights'
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip } from "chart.js";
import { Bar } from 'react-chartjs-2';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip)
export default function Insights() {
    const [insights, setInsights] = useState<OrderInsights[]>([])
    const [summary, setSummary] = useState<any>({})
    const [chartData, setCharData] = useState<any>()
    const [chartSummary, setChartSummary] = useState<any>()
    const [metric, setMetric] = useState<'month' | 'hour' | 'day' | 'year'>('month')
    const [before, setBefore] = useState('')
    const [after, setAfter] = useState('')
    const [f_b, setFB] = useState('')
    const [f_a, setFA] = useState('')
    const [by, setBy] = useState<'month' | 'hour' | 'day' | 'year'>('day')
    const [val, setVal] = useState('today')
    const [clicked, setClicked] = useState(false)
    const metrics = {
        'month': ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        'day': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'hour': ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'],
        'year': Array.from({ length: 20 }, (_, i) => i + 2015),
    }
    const options = {
        scales: {
            y: {
                display: false,
                grid: {
                    display: false,
                },
                stacked: true,
            },
            x: {
                grid: {
                    display: false,
                },
                stacked: true,
                barPercentage: 0.6,
                categoryPercentage: 0.8,
            },
        },
    }
    const summaryOptions = {
        indexAxis: 'y',
        scales: {
            y: {
                display: false,
                grid: {
                    display: false,
                },
                stacked: true,
            },
            x: {
                grid: {
                    display: false,
                },
                stacked: true,
                barPercentage: 0.6,
                categoryPercentage: 0.8,
            },
        },
    }

    const fetchDefaults = (period: 'today' | 'last week' | 'last month' | 'last year' | 'yesterday') => {
        let beforeDate = new Date();
        let afterDate = new Date();
        setVal(period)
        switch (period) {
            case 'today':
                setMetric('hour');
                beforeDate.setHours(0, 0, 0, 0);
                afterDate.setHours(23, 59, 59, 999);
                break;
            case 'last week':
                setMetric('day');
                beforeDate.setDate(beforeDate.getDate() - 7);
                afterDate.setDate(afterDate.getDate() - 1);
                break;
            case 'last month':
                setMetric('day');
                beforeDate.setMonth(beforeDate.getMonth() - 1);
                afterDate.setDate(afterDate.getDate() - 1);
                break;
            case 'last year':
                setMetric('month');
                beforeDate.setFullYear(beforeDate.getFullYear() - 1);
                afterDate.setDate(afterDate.getDate() - 1);
                break;
            case 'yesterday':
                setMetric('hour');
                beforeDate.setDate(beforeDate.getDate() - 1);
                afterDate.setDate(afterDate.getDate() - 1);
                break;
            default:
                return
        }

        setBefore(beforeDate.toISOString());
        setAfter(afterDate.toISOString());
    }
    const fetchInsights = async (val: string, _before?: string, _after?: string) => {
        try {
            let query = ''
            if (before) query += `&b=${encodeURIComponent(before)}`;
            if (after) query += `&a=${encodeURIComponent(after)}`;
            const response = await axios.get(`/api/insights/orders?m=${val}${query}`)
            if (response.status !== 200) {
                throw response;
            }
            const filler = (period: number) => {
                return {
                    period,
                    totalRevenue: 0,
                    totalCost: 0,
                    totalQuantitySold: 0,
                }
            }
            let data: OrderInsights[] = response.data.results;
            setSummary(response.data.summary)
            let tableData = []
            let item
            for (let i = 0; i < metrics[metric].length; i++) {
                item = data.find(item => item.period === (['month', 'day'].includes(metric) ? i + 1 : i))
                if (item) tableData.push(item)
                else tableData.push(filler(i))
            }
            return tableData
        } catch (err) {
            console.error(err)
        }
    }
    const humanizeDate = (dateStr: string) => {
        const dateObj = new Date(dateStr);
        return dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    const submitCustom = (e: any) => {
        e.preventDefault()
        setVal(`From ${humanizeDate(f_a)} to ${humanizeDate(f_b)}`)
        setMetric(by)
        setBefore(f_b)
        setAfter(f_a)
    }
    const reset = () => {
        setClicked(true)
        setTimeout(() => {
            setMetric('year')
            setBefore('')
            setAfter('')
            setFA('')
            setFB('')
            setVal('today')
            setClicked(false)
        }, 1000)
    }

    useEffect(() => {
        fetchInsights(metric, before, after)
            .then((data) => {
                if (data) setInsights(data)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [metric, before, after])
    useEffect(() => {
        console.log("Datum", insights);
        if (insights) {
            const maxRevenue = Math.max(...insights.map(item => item.totalRevenue));
            setCharData({
                labels: metrics[metric] as string[],
                datasets: [
                    {
                        id: 1,
                        label: 'Total Revenue',
                        data: insights.map(item => item.totalRevenue),
                        // fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.5,
                        backgroundColor: '#003366'
                    },
                    {
                        id: 2,
                        label: '',
                        data: insights.map(item => maxRevenue - item.totalRevenue),
                        backgroundColor: '#F2F6FF',
                        tension: 0.5,
                    },
                ],
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [insights, metric]);

    useEffect(() => {
        if (summary)
            setChartSummary({
                labels: ['paid', 'pending', 'rest', 'cancelled', 'errors'],
                datasets: [
                    {
                        id: 1,
                        label: 'Paid',
                        data: [summary.paid, summary.pending, summary.rest, summary.cancelled, summary.errors],
                    },
                ]

        })
    }, [summary])

    return (
        <div className="flex flex-row flex-wrap gap-[30px] px-[30px] items-center justify-evenly">
            <div className=" min-w-[300px] w-[60%] min-h-[300px] bg-white p-4 flex  grow-1 flex-col rounded-md w-[30%] gap-3 border border-[#ccc] shadow-xl overflow-x-scroll scrollbar-thin">
                <div className="flex flex-row justify-between items-center gap-6">
                    <h3 className="text-lg text-pri-5 font-semibold font-heading">Your Revenue</h3>
                    <div className="flex flex-row items-center justify-end gap-3">
                        <RefreshCcw onClick={reset} className={`cursor-pointer ${clicked ? 'animate-spin' : ''}`} size={24} strokeWidth={1.5} />
                        <Select value={val} onValueChange={fetchDefaults}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Today" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="today">Today</SelectItem>
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


                {insights.length > 0 && <Bar data={chartData} options={options} />}
            </div>
            <div className=" min-w-[300px] w-[30%] min-h-[300px] bg-white p-4 flex grow-1 flex-col rounded-md w-[30%] border border-[#ccc] gap-3 shadow-xl overflow-x-scroll scrollbar-thin">
                <h3 className="text-lg text-pri-5 font-semibold font-heading">Overview</h3>
                {Object.keys(summary).length > 0 && 
                    <>
                        <ul className="flex flex-col gap-2 items-start">
                            <li className="flex flex-row items-center justify-between">Total issued:<span className="font-semibold text-acc-7">{summary.total}</span></li>
                            <li className="flex flex-row items-center justify-between">Total paid:<span className="font-semibold text-acc-7">{summary.paid}</span></li>
                            <li className="flex flex-row items-center justify-between">Total pending:<span className="font-semibold text-acc-7">{summary.pending}</span></li>
                            <li className="flex flex-row items-center justify-between">Total errors:<span className="font-semibold text-acc-7">{summary.errors}</span></li>
                            <li className="flex flex-row items-center justify-between">Total interested:<span className="font-semibold text-acc-7">{summary.rest}</span></li>
                        </ul>
                        <Bar data={chartSummary} options={summaryOptions} />
                    </>
                }
            </div>
        </div >
    )
}