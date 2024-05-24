"use client"
import { useState } from "react"
import { DataTable } from "@/components/staff/data-table";
import { useStaffStore } from "@/lib/providers/staff-store-provider";
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const Staffs = () => {
    const [activeTab, setTab] = useState("admin")
    const {staff, page, setPage, pageCount, hasNextPage, hasPrevPage} = useStaffStore((state) => state);
    function changeTab(val: string) {
        setTab(val)
    }
    const changeStaff = () => { }
    return (
        <div className="flex flex-col absolute h-[calc(100vh-60px)] top-[60px] w-full">
            <div className="h-full relative bg-white overflow-auto md:rounded-md shadow-xl md:m-6">
                <div className="mx-[30px] mt-3 flex flex-row justify-between items-center border-b border-neu-6">
                    <ul className="flex flex-row items-start bg-white rounded-md">
                        <li onClick={() => changeTab('all')} className={`cursor-pointer relative px-4 py-1 text-center text-[14px] transition-all duration-200 ease-in-out ${activeTab == 'all' ? 'tab' : ''}`}>All</li>
                        <li onClick={() => changeTab('admin')} className={`cursor-pointer relative px-4 py-1 text-center text-[14px] transition-all duration-200 ease-in-out ${activeTab == 'admin' ? 'tab' : ''}`}>Admin</li>
                        <li onClick={() => changeTab('mechanic')} className={`cursor-pointer relative px-4 py-1 text-center text-[14px] transition-all duration-200 ease-in-out ${activeTab == 'mechanic' ? 'tab' : ''}`}>Mechanic</li>
                        <li onClick={() => changeTab('teller')} className={`cursor-pointer relative px-4 py-1 text-center text-[14px] transition-all duration-200 ease-in-out ${activeTab == 'teller' ? 'tab' : ''}`}>Teller</li>
                    </ul>
                </div>
                <div className="w-full h-[calc(100%-45px)]">
                    <DataTable
                        data={staff}
                        onChangeStaff={changeStaff}
                        page={page}
                        pageCount={5}
                        hasNextPage={hasNextPage}
                        hasPrevPage={hasPrevPage}
                        onNext={() => setPage(page + 1)}
                        onPrev={() => setPage(page - 1)}
                   />
                </div>
            </div>
        </div>
    )
}

export default Staffs