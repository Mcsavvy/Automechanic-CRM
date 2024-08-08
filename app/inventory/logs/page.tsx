"use client"
import React, { useState, useEffect } from 'react'
import LogItem from './components/log-item'
import axios from 'axios'
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
    const fetchLogs = async () => {
        setL(true)
        try {
            const res = await axios.get('/api/logs')
            setLogs(groupByDate(res.data.logs))
        } catch (error) {
            console.log(error)
        }
        setL(false)
    }
    useEffect(() => {
        fetchLogs()
    }, [])
    return (
        <div className="absolute h-[calc(100vh-60px)] top-[60px] w-full overflow-auto scrollbar-thin">
            <div className="md:p-[30px] p-3 w-[700px] max-w-[calc(100%-30px)] mx-auto  min-h-full bg-white rounded-md">
                {
                    logs &&
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
        </div>
    );
}

export default Logs;