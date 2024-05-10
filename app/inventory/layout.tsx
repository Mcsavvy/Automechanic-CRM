"use client"
import { FaCalendarDay, FaChartPie, FaDatabase, FaChartLine, FaToolbox } from "react-icons/fa6";
import { FaCar, FaUser, FaTools, FaUsers, FaRegUserCircle, FaStoreAlt } from "react-icons/fa";
import { HiOutlineMenuAlt2, HiOutlineMenuAlt3 } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import React from "react";
import { useEffect, useState } from "react";
import { GiMechanicGarage } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/providers/auth-store-provider";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [menu, setMenu] = useState(true)
    const [app, setApp] = useState(false)
    const [currApp, setCurrApp] = useState('Inventory')
    const { loggedIn, firstName, lastName } = useAuthStore((state) => state);
    const router = useRouter();
    const toggleMenu = () => {
        setMenu(!menu)
    }
    const toggleApp = () => {
        setApp(!app)
    }
    const changeApp = (app: string) => {
        setCurrApp(app)
        setApp(!app)
    }

    useEffect(() => {
        if (!loggedIn) {
            router.push("/auth/login");
        }
    });

    return (
        <div className="fixed flex flex-row items-center justify-start top-0 left-0">
            <nav className={`top-0 relative h-screen bg-white w-[220px] flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out ${menu ? 'left-0' : '-left-[220px]'} border-r border-neu-3 border-1 shadow-lg text-neu-9 font-heading`}>
                <div className="header">
                    <h1 className="p-[30px]  text-lg font-lg pb-1">W I L L I E</h1>
                    <div className="relative overflow-visible flex flex-col items-center justify-start gap-[20px]">
                        <h2 onClick={toggleApp} className=" self-start cursor-pointer font-heading text-[12px]  font-semibold flex flex-grow-0 w-auto h-[40px] flex-row gap-[8px] rounded-[4px] bg-neu-2 text-black py-2 px-[20px] mx-[30px] items-center jusitify-start">
                            {currApp === 'Inventory' ?
                                <FaStoreAlt className="text-[16px]" /> :
                                <GiMechanicGarage className="text-[16px]" />
                            }
                            {currApp}
                        </h2>
                        {app &&
                            <div className="absolute top-full mt-[10px] z-10">
                                <ul className="flex flex-row gap-3 bg-neu-3 p-3 rounded-lg">
                                    <li onClick={() => changeApp('Inventory')} className="cursor-pointer text-neu-9 text-[12px] flex flex-col justify-center items-center gap-[8px] p-3 rounded-md bg-neu-1 hover:bg-neu-7 hover:text-neu-1 transition-all duration-200 ease-in active:scale-95">
                                        <FaStoreAlt className="text-[16px]" />Inventory</li>
                                    <li onClick={() => changeApp('Garage')} className="cursor-pointer text-neu-9 text-[12px] flex flex-col justify-center items-center gap-[8px] p-3 rounded-md bg-neu-1 hover:bg-neu-7 hover:text-neu-1 transition-all duration-200 ease-in active:scale-95">
                                        <GiMechanicGarage className="text-[16px]" />Garage</li>
                                </ul>
                            </div>
                        }
                    </div>
                </div>

                {menu ?
                    <HiOutlineMenuAlt3 onClick={toggleMenu} className="absolute top-2 right-[-40px] cursor-pointer text-[24px] text-neu-9 transition active:scale-95 duration-200 ease-in z-10" />
                    :
                    <HiOutlineMenuAlt2 onClick={toggleMenu} className="absolute top-2 right-[-40px] cursor-pointer text-[24px] text-neu-9 transition active:scale-95 duration-200 ease-in z-10" />
                }
                <ul className="flex flex-col p-[10px] py-[30px] gap-[15px] overflow-y-auto scrollbar-thin">
                    <li >
                        <h3 className="relative flex pl-[10px] pr-[10px] flex-row text-[15px] font-[200px] justify-between items-center cursor-pointer text-neu-7">
                            Analytics
                        </h3>
                        <ul className="flex flex-col">
                            <li className="cursor-pointer flex flex-row gap-[8px] justify-start items-center px-5 py-1 mt-2 text-[13px] hover:bg-neu-2 hover:text-black transition-all duration-200 ease-in active:scale-95"><FaUser /> Service Appointments</li>
                        </ul>
                    </li>
                    <li >
                        <h3 className="relative flex pl-[10px] pr-[10px] cursor-pointer flex-row text-[15px] justify-start items-center text-neu-7">
                            Invoices
                        </h3>
                        <ul className="flex flex-col">
                            <li className="cursor-pointer flex flex-row gap-[8px] justify-start items-center px-5 py-1 mt-2 text-[13px] hover:bg-neu-2 hover:text-black transition-all duration-200 ease-in active:scale-95">< FaUser />Customers</li>
                            <li className="cursor-pointer flex flex-row gap-[8px]  justify-start items-center px-5 py-1 mt-2 text-[13px] hover:bg-neu-2 hover:text-black transition-all duration-200 ease-in active:scale-95 active-nav"><FaCar />Vehicles</li>
                            <li className="cursor-pointer flex flex-row gap-[8px] justify-start items-center px-5 py-1 mt-2 text-[13px] hover:bg-neu-2 hover:text-black transition-all duration-200 ease-in active:scale-95"><FaTools />Service Records</li>
                        </ul>
                    </li>
                    <li >
                        <h3 className="relative flex pl-[10px] pr-[10px] cursor-pointer flex-row text-[15px] justify-start items-center text-neu-7">
                            Stock
                        </h3>
                        <ul className="flex flex-col">
                            <li className="cursor-pointer flex flex-row gap-[8px] justify-start items-center px-5 py-1 mt-2 text-[13px] hover:bg-neu-2 hover:text-black transition-all duration-200 ease-in active:scale-95"><FaUsers />Customer Analytics </li>
                            <li className="cursor-pointer flex flex-row gap-[8px] justify-start items-center px-5 py-1 mt-2 text-[13px] hover:bg-neu-2 hover:text-black transition-all duration-200 ease-in active:scale-95"><FaToolbox /> Service Analytics</li>
                            <li className="cursor-pointer flex flex-row gap-[8px] justify-start items-center px-5 py-1 mt-2 text-[13px] hover:bg-neu-2 hover:text-black transition-all duration-200 ease-in active:scale-95"><FaChartLine />Revenue Analytics</li>
                        </ul>
                    </li>
                    <li >
                        <h3 className="relative pl-[10px] pr-[10px] flex cursor-pointer flex-row text-[15px] justify-start items-center text-neu-7">
                            Customers
                        </h3>
                        <ul className="flex flex-col">
                            <li className="cursor-pointer flex flex-row gap-[8px] justify-start items-center px-5 py-1 mt-2 text-[13px] hover:bg-neu-2 hover:text-black transition-all duration-200 ease-in active:scale-95"><FaUsers />Customer Analytics </li>
                            <li className="cursor-pointer flex flex-row gap-[8px] justify-start items-center px-5 py-1 mt-2 text-[13px] hover:bg-neu-2 hover:text-black transition-all duration-200 ease-in active:scale-95"><FaToolbox /> Service Analytics</li>
                            <li className="cursor-pointer flex flex-row gap-[8px] justify-start items-center px-5 py-1 mt-2 text-[13px] hover:bg-neu-2 hover:text-black transition-all duration-200 ease-in active:scale-95"><FaChartLine />Revenue Analytics</li>
                        </ul>
                    </li>
                </ul>
                <div className="flex flex-col h-[120px] bg-lavender justify-between items-start px-[10px] py-[5px] text-lg font-bold my-[20px] mb-[30px] border-t border-neu-6 border-1">
                    <h3 className="text-[16px] w-full font-medium flex flex-row gap-[10px] items-center justify-start hover:bg-neu-2 hover:text-black transition-all duration-200 ease-in active:scale-95 cursor-pointer px-5 py-1"><FaRegUserCircle />{firstName}{' '}{lastName}</h3>
                    <h3 className="text-[16px] w-full font-medium flex flex-row gap-[10px] items-center justify-start hover:bg-neu-2 hover:text-black transition-all duration-200 ease-in active:scale-95 cursor-pointer px-5 py-1"><MdLogout /></h3>
                </div>
            </nav>
            <main className={`relative top-0 flex flex-column ${menu ? 'w-[calc(100vw-220px)]' : 'w-[100vw]'} pt-[40px] bg-neu-1 ${menu ? 'left-0' : '-left-[220px]'} flex-grow h-screen overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out font-body`}>
                <div className={`${menu ? 'overlay' : 'no-overlay'}`} onClick={toggleMenu}>
                </div>
                <header className="fixed top-0 h-[40px] w-screen border-b border-neu-3 bg-white overflow-visible z-[10]">
                </header>
                {children}
            </main>
        </div>
    )
}