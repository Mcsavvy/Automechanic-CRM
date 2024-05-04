"use client"
import { FaCalendarDay, FaChartPie, FaDatabase, FaChartLine, FaToolbox } from "react-icons/fa6";
import { FaCar, FaUser, FaTools, FaUsers, FaFileInvoiceDollar, FaChevronRight, FaChevronDown } from "react-icons/fa";
import { HiOutlineMenuAlt2, HiOutlineMenuAlt3 } from "react-icons/hi";
import { useState } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [menu, setMenu] = useState(true)
    const [dropdownOpen, setDropdownOpen] = useState({ analytics: false, invoices: false, stock: false, customers: false })
    const toggleMenu = () => {
        setMenu(!menu)
    }
    const toggleDropdown = (dropdown: string) => {
        setDropdownOpen(prevState => ({ ...prevState, [dropdown]: !prevState[dropdown] }))
    }
    return (
        <div className="fixed flex flex-row items-center justify-start top-0 left-0">
            <header className="fixed top-0 h-[60px] w-screen border border-red-500 bg-[var(--pri-600)]">
                <div className="flex flex-row justify-center items-center p-[10px] gap-[10px] text-lg font-bold my-[20px]">
                    <FaCar />
                    <h2>Isaac&apos;s Auto</h2>
                </div>
            </header>
            <nav className={`top-[60px] relative h-[calc(100vh-60px)] bg-[var(--pri-600)] w-[240px] flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out ${menu ? 'left-0' : '-left-[260px]'} border-r border-black border-1 shadow-md text-white font-body`}>
                {menu ?
                    <HiOutlineMenuAlt3 onClick={toggleMenu} className="absolute top-2 right-[-60px] cursor-pointer text-[24px] text-[var(--pri-800)] transition active:scale-95 duration-200 ease-in z-10" />
                    :
                    <HiOutlineMenuAlt2 onClick={toggleMenu} className="absolute top-2 right-[-60px] cursor-pointer text-[24px] text-[var(--pri-800)] transition active:scale-95 duration-200 ease-in z-10" />
                }
                <ul className="flex flex-col p-[10px] py-[30px] gap-[40px] border border-red-500 h-[400px] overflow-y-scroll scrollbar-thin">
                    <li>
                        <h3 onClick={() => toggleDropdown('analytics')} className="flex flex-row gap-[10px] justify-start items-center cursor-pointer">
                            <FaChartLine />Analytics
                            {dropdownOpen.analytics ? <FaChevronDown /> : <FaChevronRight />}
                        </h3>
                        {dropdownOpen.analytics &&
                            <ul className="flex flex-col">
                                <li className="cursor-pointer flex flex-row gap-[8px] justify-start items-center px-5 py-2 mt-2 text-[13px] hover:bg-black hover:text-white transition duration-200 ease-in active:scale-95"><FaUser /> Service Appointments</li>
                            </ul>
                        }
                    </li>
                    <li>
                        <h3 onClick={() => toggleDropdown('invoices')} className="flex cursor-pointer flex-row gap-[10px] text-[16px] justify-start items-center">
                            <FaFileInvoiceDollar />Invoices
                            {dropdownOpen.invoices ? <FaChevronDown /> : <FaChevronRight />}</h3>
                        {dropdownOpen.invoices &&
                            <ul className="flex flex-col">
                                <li className="cursor-pointer flex flex-row gap-[8px] justify-start items-center px-5 py-2 mt-2 text-[13px] hover:bg-black hover:text-white transition duration-200 ease-in active:scale-95">< FaUser />Customers</li>
                                <li className="cursor-pointer flex flex-row gap-[8px]  justify-start items-center px-5 py-2 mt-2 text-[13px] hover:bg-black hover:text-white transition duration-200 ease-in active:scale-95"><FaCar />Vehicles</li>
                                <li className="cursor-pointer flex flex-row gap-[8px] justify-start items-center px-5 py-2 mt-2 text-[13px] hover:bg-black hover:text-white transition duration-200 ease-in active:scale-95"><FaTools />Service Records</li>
                            </ul>
                        }
                    </li>
                    <li>
                        <h3 onClick={() => toggleDropdown('stock')} className="flex cursor-pointer flex-row gap-[10px] justify-start items-center">
                            <FaChartPie />Stock
                            {dropdownOpen.stock ? <FaChevronDown className="text-sm" /> : <FaChevronRight className="text-sm" />}</h3>
                        {dropdownOpen.stock &&
                            <ul className="flex flex-col">
                                <li className="cursor-pointer flex flex-row gap-[8px] justify-start items-center px-5 py-2 mt-2 text-[13px] hover:bg-black hover:text-white transition duration-200 ease-in active:scale-95"><FaUsers />Customer Analytics </li>
                                <li className="cursor-pointer flex flex-row gap-[8px] justify-start items-center px-5 py-2 mt-2 text-[13px] hover:bg-black hover:text-white transition duration-200 ease-in active:scale-95"><FaToolbox /> Service Analytics</li>
                                <li className="cursor-pointer flex flex-row gap-[8px] justify-start items-center px-5 py-2 mt-2 text-[13px] hover:bg-black hover:text-white transition duration-200 ease-in active:scale-95"><FaChartLine />Revenue Analytics</li>
                            </ul>
                        }
                    </li>
                    <li>
                        <h3 onClick={() => toggleDropdown('customers')} className="flex cursor-pointer flex-row gap-[10px] justify-start items-center">
                            <FaUsers />Customers
                            {dropdownOpen.customers ? <FaChevronDown className="text-sm" /> : <FaChevronRight className="text-sm" />}
                        </h3>
                        {dropdownOpen.customers &&
                            <ul className="flex flex-col">
                                <li className="cursor-pointer flex flex-row gap-[8px] justify-start items-center px-5 py-2 mt-2 text-[13px] hover:bg-black hover:text-white transition duration-200 ease-in active:scale-95"><FaUsers />Customer Analytics </li>
                                <li className="cursor-pointer flex flex-row gap-[8px] justify-start items-center px-5 py-2 mt-2 text-[13px] hover:bg-black hover:text-white transition duration-200 ease-in active:scale-95"><FaToolbox /> Service Analytics</li>
                                <li className="cursor-pointer flex flex-row gap-[8px] justify-start items-center px-5 py-2 mt-2 text-[13px] hover:bg-black hover:text-white transition duration-200 ease-in active:scale-95"><FaChartLine />Revenue Analytics</li>
                            </ul>
                        }
                    </li>
                </ul>
            </nav>
            <main className={`relative top-[60px] flex flex-column ${menu ? 'w-[calc(100vw-240px)]' : 'w-[100vw]'} border border-blue-500 ${menu ? 'left-0' : '-left-[260px]'} flex-grow h-[calc(100vh-60px)] overflowy-auto overflowx-hidden transition-all duration-300 ease-in-out font-body`}>
                {children}
            </main>
        </div>
    )
}