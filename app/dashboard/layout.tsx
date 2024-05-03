"use client"
import { FaCalendarDay, FaChartPie, FaDatabase, FaChartLine, FaToolbox } from "react-icons/fa6";
import { FaCar, FaUser, FaTools, FaUsers } from "react-icons/fa";
import { HiOutlineMenuAlt2, HiOutlineMenuAlt3 } from "react-icons/hi";
import { useState } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [menu, setMenu] = useState(false)
    
    const toggleMenu = () => {
        setMenu(!menu)
    }
    return (
        <div className="fixed flex flex-row items-center justify-start top-0 left-0">
            <nav className={`relative h-screen w-[260px] flex flex-col bg-white flex-shrink-0 transition-all duration-300 ease-in-out ${menu ? 'left-0' : '-left-[260px]'} border-r border-black border-1 shadow-md`}>
                {menu ?
                    <HiOutlineMenuAlt3 onClick={toggleMenu} className="absolute top-2 right-[-40px] cursor-pointer text-[24px] transition active:scale-95 duration-200 ease-in z-10" />
                    :
                    <HiOutlineMenuAlt2 onClick={toggleMenu} className="absolute top-2 right-[-40px] cursor-pointer text-[24px] transition active:scale-95 duration-200 ease-in z-10" />
                }
                <div className="flex flex-row justify-center items-center p-[10px] gap-[10px] text-lg font-bold my-[20px]">
                    <FaCar />
                    <h2>Isaac&apos;s Auto</h2>
                </div>
                <ul className="flex flex-col p-[10px] gap-[20px]">
                    <li>
                        <h3 className="flex flex-row gap-[10px] justify-start items-center"><FaCalendarDay />Appointments</h3>
                        <ul className="flex flex-col">
                            <li className="cursor-pointer flex flex-row gap-[8px] bg-custom-gray justify-start items-center px-5 py-2 mt-2 text-sm hover:bg-black hover:text-white transition duration-200 ease-in active:scale-95"><FaUser /> Service Appointments</li>
                        </ul>
                    </li>
                    <li>
                        <h3 className="flex flex-row gap-[10px] justify-start items-center"><FaDatabase />Records</h3>
                        <ul className="flex flex-col">
                            <li className="cursor-pointer flex flex-row gap-[8px] bg-custom-gray justify-start items-center px-5 py-2 mt-2 text-sm hover:bg-black hover:text-white transition duration-200 ease-in active:scale-95">< FaUser />Customers</li>
                            <li className="cursor-pointer flex flex-row gap-[8px] bg-custom-gray justify-start items-center px-5 py-2 mt-2 text-sm hover:bg-black hover:text-white transition duration-200 ease-in active:scale-95"><FaCar />Vehicles</li>
                            <li className="cursor-pointer flex flex-row gap-[8px] bg-custom-gray justify-start items-center px-5 py-2 mt-2 text-sm hover:bg-black hover:text-white transition duration-200 ease-in active:scale-95"><FaTools />Service Records</li>
                        </ul>
                    </li>
                    <li>
                        <h3 className="flex flex-row gap-[10px] justify-start items-center"><FaChartPie /> Analytics</h3>
                        <ul className="flex flex-col">
                            <li className="cursor-pointer flex flex-row gap-[8px] bg-custom-gray justify-start items-center px-5 py-2 mt-2 text-sm hover:bg-black hover:text-white transition duration-200 ease-in active:scale-95"><FaUsers />Customer Analytics </li>
                            <li className="cursor-pointer flex flex-row gap-[8px] bg-custom-gray justify-start items-center px-5 py-2 mt-2 text-sm hover:bg-black hover:text-white transition duration-200 ease-in active:scale-95"><FaToolbox /> Service Analytics</li>
                            <li className="cursor-pointer flex flex-row gap-[8px] bg-custom-gray justify-start items-center px-5 py-2 mt-2 text-sm hover:bg-black hover:text-white transition duration-200 ease-in active:scale-95"><FaChartLine />Revenue Analytics</li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <main className={`relative  flex flex-column ${menu? 'w-[calc(100vw-260px)]': 'w-[calc(100vw)]'}  ${menu ? 'left-0' : '-left-[260px]'} flex-grow h-screen overflowy-auto overflowx-hidden transition-all duration-300 ease-in-out`}>
                {children}
            </main>
        </div>
    )
}