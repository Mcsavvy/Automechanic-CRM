"use client"
import { useEffect, useState } from "react"
import { DataTable } from "@/components/staff/data-table";
import { useStaffStore } from "@/lib/providers/staff-store-provider";
import { useQueryState } from "nuqs";

const Staffs = () => {
    const [activeTab, setTab] = useState(localStorage.getItem("activeTab") || "")
    const {groups, staff, page, setPage, hasNextPage, hasPrevPage, totalPages, applyFilter, filter, loaded} = useStaffStore((state) => state);
    // const [selectedGroup, setSelectedGroup] = useQueryState<string>("group", {defaultValue: ""});

    function changeTab(val: string) {
        setTab(val)
        localStorage.setItem("activeTab", val)
    }

    useEffect(() => {
        if (!loaded) return;
        applyFilter({...filter, group: activeTab});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    const changeStaff = () => { }
    return (
        <div className="flex flex-col absolute h-[calc(100vh-60px)] top-[60px] w-full">
            <div className="h-full relative bg-white overflow-auto md:rounded-md shadow-xl md:m-6">
                <div className="mx-[30px] mt-3 flex flex-row justify-between items-center border-b border-neu-6">
                    <ul className="flex flex-row items-start bg-white rounded-md">
                        {
                            groups.map((group) => (
                                <li key={group.id} onClick={() => changeTab(group.id)} className={`capitalize cursor-pointer relative px-4 py-1 text-center text-[14px] transition-all duration-200 ease-in-out ${activeTab == group.id ? 'tab' : ''}`}>{group.name}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className="w-full h-[calc(100%-45px)]">
                    <DataTable
                        data={staff}
                        onChangeStaff={changeStaff}
                        page={page}
                        pageCount={totalPages}
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