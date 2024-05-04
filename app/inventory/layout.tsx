"use client"
import { FaCalendarDay, FaChartPie, FaDatabase, FaChartLine, FaToolbox } from "react-icons/fa6";
import { FaCar, FaUser, FaTools, FaUsers, FaRegUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt2, HiOutlineMenuAlt3 } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import { useState } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [menu, setMenu] = useState(true)
    const toggleMenu = () => {
        setMenu(!menu)
    }
    return (
        <div className="fixed flex flex-row items-center justify-start top-0 left-0">
            <header className="fixed top-0 h-[60px] w-screen border border-red-500 bg-[var(--pri-600)]">
                <div className="flex flex-row justify-center items-center p-[10px] gap-[10px] text-lg font-bold my-[20px]">
                    <FaCar />
                    <h2>Isaac&apos;s Auto</h2>
                </div>
            </header>
            <nav className={`top-[60px] relative h-[calc(100vh-60px)] bg-[var(--neu-100)] w-[220px] flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out ${menu ? 'left-0' : '-left-[220px]'} border-r border-[var(--pri-600)] border-1 shadow-md text-[var(--pri-600)] font-heading`}>
                {menu ?
                    <HiOutlineMenuAlt3 onClick={toggleMenu} className="absolute top-2 right-[-40px] cursor-pointer text-[24px] text-[var(--pri-800)] transition active:scale-95 duration-200 ease-in z-10" />
                    :
                    <HiOutlineMenuAlt2 onClick={toggleMenu} className="absolute top-2 right-[-40px] cursor-pointer text-[24px] text-[var(--pri-800)] transition active:scale-95 duration-200 ease-in z-10" />
                }
                <ul className="flex flex-col p-[10px] py-[30px] gap-[15px] overflow-y-auto scrollbar-thin">
                    <li >
                        <h3 className="relative flex pl-[10px] pr-[10px] flex-row text-[15px] font-[200px] justify-between items-center cursor-pointer text-[var(--pri-300)]">
                            Analytics
                        </h3>
                        <ul className="flex flex-col">
                            <li className="cursor-pointer flex flex-row gap-[8px] justify-start items-center px-5 py-1 mt-2 text-[13px] hover:bg-[var(--pri-200)] hover:text-[var(--pri-700)] transition-all duration-200 ease-in active:scale-95"><FaUser /> Service Appointments</li>
                        </ul>
                    </li>
                    <li >
                        <h3 className="relative flex pl-[10px] pr-[10px] cursor-pointer flex-row text-[15px] justify-start items-center text-[var(--pri-300)]">
                            Invoices
                        </h3>
                        <ul className="flex flex-col">
                            <li className="cursor-pointer flex flex-row gap-[8px] justify-start items-center px-5 py-1 mt-2 text-[13px] hover:bg-[var(--pri-200)] hover:text-[var(--pri-700)] transition-all duration-200 ease-in active:scale-95">< FaUser />Customers</li>
                            <li className="cursor-pointer flex flex-row gap-[8px]  justify-start items-center px-5 py-1 mt-2 text-[13px] hover:bg-[var(--pri-200)] hover:text-[var(--pri-700)] transition-all duration-200 ease-in active:scale-95 active-nav"><FaCar />Vehicles</li>
                            <li className="cursor-pointer flex flex-row gap-[8px] justify-start items-center px-5 py-1 mt-2 text-[13px] hover:bg-[var(--pri-200)] hover:text-[var(--pri-700)] transition-all duration-200 ease-in active:scale-95"><FaTools />Service Records</li>
                        </ul>
                    </li>
                    <li >
                        <h3 className="relative flex pl-[10px] pr-[10px] cursor-pointer flex-row text-[15px] justify-start items-center text-[var(--pri-300)]">
                            Stock
                        </h3>
                        <ul className="flex flex-col">
                            <li className="cursor-pointer flex flex-row gap-[8px] justify-start items-center px-5 py-1 mt-2 text-[13px] hover:bg-[var(--pri-200)] hover:text-[var(--pri-700)] transition-all duration-200 ease-in active:scale-95"><FaUsers />Customer Analytics </li>
                            <li className="cursor-pointer flex flex-row gap-[8px] justify-start items-center px-5 py-1 mt-2 text-[13px] hover:bg-[var(--pri-200)] hover:text-[var(--pri-700)] transition-all duration-200 ease-in active:scale-95"><FaToolbox /> Service Analytics</li>
                            <li className="cursor-pointer flex flex-row gap-[8px] justify-start items-center px-5 py-1 mt-2 text-[13px] hover:bg-[var(--pri-200)] hover:text-[var(--pri-700)] transition-all duration-200 ease-in active:scale-95"><FaChartLine />Revenue Analytics</li>
                        </ul>
                    </li>
                    <li >
                        <h3 className="relative pl-[10px] pr-[10px] flex cursor-pointer flex-row text-[15px] justify-start items-center text-[var(--pri-300)]">
                            Customers
                        </h3>
                        <ul className="flex flex-col">
                            <li className="cursor-pointer flex flex-row gap-[8px] justify-start items-center px-5 py-1 mt-2 text-[13px] hover:bg-[var(--pri-200)] hover:text-[var(--pri-700)] transition-all duration-200 ease-in active:scale-95"><FaUsers />Customer Analytics </li>
                            <li className="cursor-pointer flex flex-row gap-[8px] justify-start items-center px-5 py-1 mt-2 text-[13px] hover:bg-[var(--pri-200)] hover:text-[var(--pri-700)] transition-all duration-200 ease-in active:scale-95"><FaToolbox /> Service Analytics</li>
                            <li className="cursor-pointer flex flex-row gap-[8px] justify-start items-center px-5 py-1 mt-2 text-[13px] hover:bg-[var(--pri-200)] hover:text-[var(--pri-700)] transition-all duration-200 ease-in active:scale-95"><FaChartLine />Revenue Analytics</li>
                        </ul>
                    </li>
                </ul>
                <div className="flex flex-col h-[120px] bg-lavender justify-between items-start px-[10px] py-[5px] text-lg font-bold my-[20px] mb-[30px] border-t border-[var(--pri-600)] border-1">
                    <h3 className="text-[16px] w-full font-medium flex flex-row gap-[10px] items-center justify-start hover:bg-[var(--pri-200)] hover:text-[var(--pri-700)] transition-all duration-200 ease-in active:scale-95 cursor-pointer px-5 py-1"><FaRegUserCircle />John Thomas</h3>
                    <h3 className="text-[16px] w-full font-medium flex flex-row gap-[10px] items-center justify-start hover:bg-[var(--pri-200)] hover:text-[var(--pri-700)] transition-all duration-200 ease-in active:scale-95 cursor-pointer px-5 py-1"><MdLogout /></h3>
                </div>
            </nav>
            <main className={`relative top-[60px] flex flex-column ${menu ? 'w-[calc(100vw-220px)]' : 'w-[100vw]'} bg-[var(--neu-100)] ${menu ? 'left-0' : '-left-[220px]'} flex-grow h-[calc(100vh-60px)] overflowy-auto overflowx-hidden transition-all duration-300 ease-in-out font-body`}>
                {children}
            </main>
        </div>
    )
}