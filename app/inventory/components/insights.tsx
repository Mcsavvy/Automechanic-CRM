"use client"
import { RefreshCcw, TrendingUp, TrendingDown } from 'lucide-react';
import { useState, useEffect, FC } from 'react'
import axios from 'axios'
import { OrderInsights } from '@/lib/@types/insights';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip } from "chart.js";
import { Bar } from 'react-chartjs-2';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip)
interface InsightProps {
    metric: string;
    before: string;
    after: string;
}
const Insights: FC<Partial<InsightProps>> = () => {
    const [insights, setInsights] = useState<OrderInsights[]>([])
    const [summary, setSummary] = useState<any>({})
    const [chartData, setCharData] = useState<any>()
    const [chartSummary, setChartSummary] = useState<any>()
    const [metric, setMetric] = useState<'month' | 'hour' | 'day' | 'year'>('month')
    const [before, setBefore] = useState('')
    const [after, setAfter] = useState('')
    const [profit, setP] = useState(0)
    const metrics: any = {
        'month': ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        'day': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'hour': ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'],
        'year': Array.from({ length: 20 }, (_, i) => i + 2015),
    }
    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const totalRevenueDataset = context.chart.data.datasets.find((dataset: any) => dataset.label === 'Total Revenue');
                        const totalRevenueValue = totalRevenueDataset.data[context.parsed.x];
                        return `Total Revenue: ${totalRevenueValue}`;
                    }
                }
            }
        },

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
            const summary = response.data.summary
            let tableData = []
            let item
            for (let i = 0; i < metrics[metric].length; i++) {
                if (metric === "year")
                    item = data.find(item => item.period === metrics[metric][i])
                else
                    item = data.find(item => item.period === (['month', 'day'].includes(metric) ? i + 1 : i))
                if (item) tableData.push(item)
                else tableData.push(filler(i))
            }
            return { tableData, summary }
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        fetchInsights(metric, before, after)
            .then((data) => {
                if (data && data.tableData && data.summary) {
                    setInsights(data.tableData)
                    setSummary(data.summary)
                }
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [metric, before, after])
    useEffect(() => {
        if (insights) {
            const totalRevenue = insights.reduce((total, insight) => total + insight.totalRevenue, 0);
            const totalCost = insights.reduce((total, insight) => total + insight.totalCost, 0);
            setP(Math.round((totalRevenue - totalCost) * 100) / 100);
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



    return (
        <>
            <div className="w-[60%] h-full min-w-[300px] bg-white grow self-stretch flex items-center justify-center border border-neu-3 shadow-md overflow-clip">
                <div className=" w-full min-w-[300px] bg-white p-4 flex grow flex-col gap-3">
                    <h3 className="text-lg text-pri-5 font-semibold font-quicksand">Revenue Summary</h3>
                    {insights.length > 0 && <Bar data={chartData} options={options} />}
                </div >
            </div>
            <div className=" border border-neu-3 shadow-md self-stretch flex-grow w-[200px] p-4 bg-white">
                <h3 className="flex flex-col items-start text-lg text-pri-6 font-semibold font-quicksand">Order Summary within this period
                    <span className={`font-semibold text-xl font-quicksand ${profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {
                            Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'NGN'
                            }).format(profit >= 0 ? profit : 0 - profit)
                                .replace("NGN", "₦")
                        }
                    </span>
                </h3>
                {Object.keys(summary).length > 0 &&
                    <>
                        <ul className="flex flex-col gap-1 items-start">
                            <li className="w-full flex flex-row items-center justify-between"><span>Paid:</span><span className="font-semibold text-acc-7">{summary.paid}</span></li>
                            <li className="w-full flex flex-row items-center justify-between"><span>Pending:</span><span className="font-semibold text-acc-7">{summary.pending}</span></li>
                            <li className="w-full flex flex-row items-center justify-between"><span>Interested:</span><span className="font-semibold text-acc-7">{summary.rest}</span></li>
                            <li className="w-full flex flex-row items-center justify-between"><span>Cancelled:</span><span className="font-semibold text-acc-7">{summary.cancelled}</span></li>
                            <li className="w-full flex flex-row items-center justify-between"><span>Errors:</span><span className="font-semibold text-acc-7">{summary.errors}</span></li>
                            <li className="w-full flex flex-row items-center justify-between font-semibold text-lg"><span>Total:</span><span className="font-semibold text-acc-7">{summary.total}</span></li>
                        </ul>
                    </>
                }
            </div>
        </>
    )
}

export default Insights