"use client"
import React, { useState, useEffect } from 'react'
import LogItem from './components/log-item'
import Filters from './components/filters'
import axios from "@/lib/axios"
import Log from '@/lib/@types/log'
const groupByDate = (logs: Log[]) => {
    return logs.reduce((acc: any, log) => {
        const date = new Date(log.createdAt).toDateString()
        if (!acc[date]) {
            acc[date] = []
        }
        acc[date].push(log)
        return acc
    }, {})
}
const Logs: React.FC = () => {
    const [loading, setL] = useState(false)
    const [logs, setLogs] = useState<any>([])
    const [before, setBefore] = useState<string>('')
    const [after, setAfter] = useState<string>('')
    const [action, setAction] = useState<string>('')
    const [l_type, setType] = useState<string>('')

    const fetchLogs = async () => {
        setL(true)
        try {
            setLogs([])
            let query = '?'
            if (before) query += `&b=${encodeURIComponent(before)}`;
            if (after) query += `&a=${encodeURIComponent(after)}`;
            if (action) query += `&at=${encodeURIComponent(action)}`;
            if (l_type) query += `&t=${encodeURIComponent(l_type)}`;
            if (!(before || after || action || l_type)) query = '';
            const res = await axios.get(`/api/logs${query}`)
            setLogs(groupByDate(res.data.logs))
        } catch (error) {
            console.log(error)
        }
        setL(false)
    }
    useEffect(() => {
        fetchLogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [before, after, l_type, action])

    return (
        <div className="flex flex-row absolute h-[calc(100vh-60px)] top-[60px] w-full overflow-auto scrollbar-thin">
            <div className="md:p-[30px] p-3 w-[700px] max-w-[calc(100%-30px)] mx-3 mt-3 bg-white min-h-[calc(100%-3em)] h-fit rounded-md">
                {
                    (!logs || loading) ?
                    <div>
                        Loading...
                    </div>:
                    <ul>
                        {
                            Object.keys(logs).map((date, index) => (
                                <li key={index} className="flex flex-col gap-2 items-start justify-start">
                                    <h1 className="text-lg font-bold text-acc-7">{date}</h1>
                                    <ul className='flex flex-col items-start justify-start gap-2'>
                                        {
                                            logs[date].map((log: Log, index: number) => (
                                                <li key={index} className="flex items-center justify-between">
                                                    <LogItem {...log} preview={true} />
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </li>
                            ))
                        }
                    </ul>
                }
            </div>
            <Filters {...{ setBefore, setAfter, setType, setAction }}/>
        </div>
    );
}

export default Logs;