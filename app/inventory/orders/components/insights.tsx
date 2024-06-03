"use client"
import { useState, useEffect } from 'react'
import axios from 'axios'
import OrderInsights from '@/lib/types/insight.ts'
export default function Insights() {
    const [insights, setInsights] = useState<OrderInsights[]>([])
    const [metric, setMetric] = useState('month')
    const [before, setBefore] = useState('')
    const [after, setAfter] = useState('')

    const fetchInsights = async () => {
        const metrics = {
            'month': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            'day': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            'hour': ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM']
        }

        try {
            // Fetch insights from the API
            const response = await axios.get(`/api/insights/orders?m=${metric}`)

            if (response.status !== 200) {
                throw response;
            }

            let tableData: OrderInsights[] = response.data.sort((a:OrderInsights, b: OrderInsights) => a.period - b.period)
            const filler = (period: number) => {
                return {
                    period,
                    totalRevenue: 0,
                    totalCost: 0,
                    totalQuantitySold: 0,
                }
            }
            if (metric === 'month' || metric === 'day' || metric === 'hour') {
                const data = [];
                for (let i = 1; i <= metrics[metric].length; i++) {
                    const item = tableData.find(item => item.period === i);
                    if (item) {
                        data.push(item);
                    } else {
                        data.push(filler(i));
                    }
                }
                tableData = data;
            }

            return tableData;
        } catch (err) {
            console.error(err)
            return []
        }
    }
    useEffect(() => {
        fetchInsights().then((res) => {
            setInsights(res)
        })
    }, [])
    return (
        <div className="flex flex-row flex-wrap gap-[30px] px-[30px] items-center justify-evenly">
            <div className=" min-w-[300px] w-[65%] h-[300px] bg-white p-4 flex  grow-1 flex-col rounded-md w-[30%] gap-3 border border-acc-7 shadow-inner shadow-md">
                <h3 className="text-2xl text-green-500 font-normal font-heading">Completed Orders</h3>
                <p className="text-lg text-neu-8">Total: 117 </p>
            </div>
            <div className=" min-w-[250px] w-[30%] h-[300px] bg-white p-4 flex grow-1 flex-col rounded-md w-[30%] gap-3 border border-acc-7 shadow-inner shadow-md">
                <h3 className="text-2xl text-green-500 font-normal font-heading">Completed Orders</h3>
                <p className="text-lg text-neu-8">Total: 117 </p>
            </div>
        </div>
    )
}