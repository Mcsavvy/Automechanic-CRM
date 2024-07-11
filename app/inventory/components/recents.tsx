import { DashboardProps } from '@/lib/@types/dashboard';
import { PackagePlus } from 'lucide-react';
import { useState, useEffect, FC } from 'react'
import axios from "axios"
import { formatDateTime } from '@/lib/utils';
import ContactAvatar from '@/components/ui/contact-avatar'
import Link from 'next/link'

const Recents: FC<Partial<DashboardProps>> = ({ before, after }) => {
    const [recents, setRecents] = useState<any[]>([])

    const fetchData = async (before?: string, after?: string) => {
        try {
            let query = '?'
            if (before) query += `&b=${encodeURIComponent(before)}`;
            if (after) query += `&a=${encodeURIComponent(after)}`;
            if (!(before || after)) query = '';
            const response = await axios.get(`/api/insights/recent-actions${query}`)
            if (response.status !== 200) {
                throw response;
            }
            console.log("Values", response.data)
            return response.data || []
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        fetchData(before, after)
            .then((data) => {
                setRecents(data)
            })
    }, [before, after])

    return (
        <div className="w-full h-[350px] rounded-md bg-white shadow-md overflow-y-auto flex flex-col gap-3 scrollbar-thin">
            <h3 className="w-full sticky top-0 bg-white text-lg text-pri-6 font-semibold font-quicksand pt-4 px-4">
                Recent Actions
            </h3>
            <ul className='px-4 flex flex-col gap-2 mb-4'>
                {recents && recents.length > 0 ? recents.map((val: any, idx) => {
                    if (val.type === "order") {
                        return (
                            <li key={idx} className="flex flex-col gap-2">
                                <div className='flex flex-row items-center justify-start gap-2'>
                                    <div className="w-[35px] h-[35px] flex flex-row items-center justify-center bg-primary rounded-full">
                                        <PackagePlus size={24} color='white' strokeWidth={2} />
                                    </div>
                                    <Link href={`/inventory/goods/${val._id}`}>
                                        <h3 className=' cursor-pointer text-[18px] font-semibold text-primary'>#{val.orderNo.toString().padStart(5, "0")}</h3>
                                    </Link>
                                </div>

                                <div className="border-l-4 border-neu-3 px-3 py-1 ml-3">
                                    <p>You added a new order at <span className="text-pri-6 font-semibold">{formatDateTime(val.createdAt, "time")}</span></p>
                                    <p className='text-sm text-neu-5'>{formatDateTime(val.createdAt, "humanize")}</p>
                                </div>
                            </li>
                        )
                    } else {
                        return (
                            <li key={idx} className="flex flex-col gap-2">
                                <div className='flex flex-row items-center justify-start gap-2'>
                                    <ContactAvatar name={val.name} size={40} />
                                    <Link href={`/inventory/customers/${val._id}`}>
                                        <h3 className=' cursor-pointer text-[18px] font-semibold text-primary'>{val.name}</h3>
                                    </Link>
                                </div>
                                <div className="border-l-4 border-neu-3 px-3 py-1 ml-3">
                                    <p>You landed a new client at <span className="text-pri-6 font-semibold">{formatDateTime(val.createdAt, "time")}</span></p>
                                    <p className='text-sm text-neu-5'>{formatDateTime(val.createdAt, "humanize")}</p>
                                </div>
                            </li>
                        )
                    }


                }) :
                    <div>Nothing to see here</div>}
            </ul>
        </div>
    )

}

export default Recents