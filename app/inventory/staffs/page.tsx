"use client"
import { useState } from "react"
import { DataTable } from "@/components/staff/data-table";

const Staffs = () => {
    const [activeTab, setTab] = useState("admin")
    const [hasPrevPage, setPrevPage] = useState(false)
    const [hasNextPage, setNextPage] = useState(false)
    const [staff, setStaff] = useState([])
    const [page, setPage] = useState(1)
    function changeTab(val: string) {
        setTab(val)
    }
    const changeStaff = () => { }
    return (
        <div className="flex flex-col absolute h-[calc(100vh-60px)] top-[60px] w-full">
            <div className="h-full relative border border-red-500 bg-white shadow-md md:m-4">
                <div className="mx-[30px] mt-3 flex flex-row justify-between items-center border-b border-neu-6">
                    <h3>Company Employees</h3>
                    <ul className="hidden md:flex flex-row items-start bg-white rounded-md">
                        <li onClick={() => changeTab('all')} className={`cursor-pointer relative px-4 py-1 text-center text-[14px] transition-all duration-200 ease-in-out ${activeTab == 'all' ? 'tab' : ''}`}>All</li>
                        <li onClick={() => changeTab('admin')} className={`cursor-pointer relative px-4 py-1 text-center text-[14px] transition-all duration-200 ease-in-out ${activeTab == 'admin' ? 'tab' : ''}`}>Admin</li>
                        <li onClick={() => changeTab('mechanic')} className={`cursor-pointer relative px-4 py-1 text-center text-[14px] transition-all duration-200 ease-in-out ${activeTab == 'mechanic' ? 'tab' : ''}`}>Mechanic</li>
                        <li onClick={() => changeTab('teller')} className={`cursor-pointer relative px-4 py-1 text-center text-[14px] transition-all duration-200 ease-in-out ${activeTab == 'teller' ? 'tab' : ''}`}>Teller</li>
                    </ul>
                </div>
                <div className="w-ful mx-[30px]">
                    <DataTable
                        data={staff}
                        onChangeGood={changeStaff}
                        page={page}
                        pageCount={5}
                        hasNextPage={hasNextPage}
                        hasPrevPage={hasPrevPage}
                        onNext={() => setPage(page + 1)}
                        onPrev={() => setPage(page - 1)} />
                </div>
            </div>
        </div>
    )
}

export default Staffs