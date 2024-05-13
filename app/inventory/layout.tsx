"use client"
import { FaCalendarDay, FaChartPie, FaDatabase, FaChartLine, FaToolbox, FaFileInvoiceDollar } from "react-icons/fa6";
import { FaCar, FaUser, FaTools, FaUsers, FaRegUserCircle, FaStoreAlt } from "react-icons/fa";
import { HiOutlineMenuAlt2, HiOutlineMenuAlt3 } from "react-icons/hi";
import { TbReceiptRefund } from "react-icons/tb";
import { MdAddAlert, MdLogout } from "react-icons/md";
import React from "react";
import { useEffect, useState } from "react";
import { GiMechanicGarage } from "react-icons/gi";
import { useAuthStore } from "@/lib/providers/auth-store-provider";
import { useRouter, usePathname } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [menu, setMenu] = useState(true)
    const [app, setApp] = useState(false)
    const [currApp, setCurrApp] = useState('inventory')
    const { loggedIn, firstName, lastName } = useAuthStore((state) => state);
    const router = useRouter();
    const pathname = usePathname();
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
        // if (!loggedIn) {
        //     router.push("/auth/login");
        // }
    });
    const checkActive = (path: string) => {
        const pathValue = `/${currApp.toLowerCase()}/${path}`
        return pathname.startsWith(pathValue) ? 'active-nav' : ''
    }
    const navigateTo = (path: string) => {
        router.push(`/${currApp}/${path}`)
    }


    return (
        <div className="fixed flex flex-row items-center justify-start top-0 left-0">
            <nav className={`fixed top-0 md:relative h-screen bg-white w-[220px] flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out ${menu ? 'left-0' : '-left-[220px]'} border-r border-neu-3 border-1 shadow-lg text-neu-9 font-heading z-50 `}>
                <div className="header">
                    <h1 className="p-[30px]  text-lg font-lg pb-1">W I L L I E</h1>


                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-[30px] capitalize">
                                {currApp} <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[40px] ml-[30px]">
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={currApp} onValueChange={setCurrApp}>
                                <DropdownMenuRadioItem value="inventory">Inventory</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="garage">Garage</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {menu ?
                    <HiOutlineMenuAlt3 onClick={toggleMenu} className="absolute top-2 right-[-40px] cursor-pointer text-[24px] text-neu-9 transition active:scale-95 duration-200 ease-in z-30" />
                    :
                    <HiOutlineMenuAlt2 onClick={toggleMenu} className="absolute top-2 right-[-40px] cursor-pointer text-[24px] text-neu-9 transition active:scale-95 duration-200 ease-in z-30" />
                }
                <ul className="flex flex-col p-[10px] py-[30px] gap-[15px] overflow-y-auto scrollbar-thin">
                    <li >
                        <h3 className="relative flex p-[10px] flex-row text-[15px] font-[200px] justify-between items-center cursor-pointer text-neu-7">
                            Inventory Management
                        </h3>
                        <ul className="flex flex-col">
                            <li onClick={() => navigateTo('overview')} className={`cursor-pointer flex flex-row gap-[8px] justify-start items-center p-3 text-[14px] hover:bg-pri-5 hover:text-white transition-all duration-200 ease-in active:scale-95 ${checkActive('overview')}`}><FaStoreAlt />Overview</li>
                            <li onClick={() => navigateTo('alerts')} className={`cursor-pointer flex flex-row gap-[8px] justify-start items-center p-3 text-[14px] hover:bg-pri-5 hover:text-white transition-all duration-200 ease-in active:scale-95 ${checkActive('alerts')}`}><MdAddAlert />Low Stock Alerts</li>
                        </ul>
                    </li>
                    <li >
                        <h3 className="relative flex p-[10px] cursor-pointer flex-row text-[15px] justify-start items-center text-neu-7">
                            Sales & Invoices
                        </h3>
                        <ul className="flex flex-col">
                            <li onClick={() => navigateTo('invoices')} className={`cursor-pointer flex flex-row gap-[8px] justify-start items-center p-3 text-[14px] hover:bg-pri-5 hover:text-white transition-all duration-200 ease-in active:scale-95 ${checkActive('invoices')}`}><FaFileInvoiceDollar />Invoices</li>
                            <li onClick={() => navigateTo('returns')} className={`cursor-pointer flex flex-row gap-[8px] justify-start items-center p-3 text-[14px] hover:bg-pri-5 hover:text-white transition-all duration-200 ease-in active:scale-95 ${checkActive('returns')}`}><TbReceiptRefund />Returns</li>
                        </ul>
                    </li>
                    <li>
                        <h3 className="relative flex p-[10px] cursor-pointer flex-row text-[15px] justify-start items-center text-neu-7">
                            Analytics and Reports
                        </h3>
                        <ul className="flex flex-col">
                            <li onClick={() => navigateTo('sales-reports')} className={`cursor-pointer flex flex-row gap-[8px] justify-start items-center p-3 text-[14px] hover:bg-pri-5 hover:text-white transition-all duration-200 ease-in active:scale-95 ${checkActive('sales-reports')}`}><FaChartLine />Sales Analytics</li>
                            <li onClick={() => navigateTo('store-reports')} className={`cursor-pointer flex flex-row gap-[8px] justify-start items-center p-3 text-[14px] hover:bg-pri-5 hover:text-white transition-all duration-200 ease-in active:scale-95 ${checkActive('store-reports')}`}><FaChartPie />Inventory Reports</li>
                        </ul>
                    </li>
                    <li >
                        <h3 className="relative pl-[10px] pr-[10px] flex cursor-pointer flex-row text-[15px] justify-start items-center text-neu-7">
                            Customers
                        </h3>
                        <ul className="flex flex-col">
                                <FaUsers />
                        </ul>
                    </li>
                </ul>
                <div className="flex flex-col h-[120px] bg-lavender justify-between items-start px-[10px] py-[5px] text-lg font-bold my-[20px] mb-[30px] border-t border-neu-6 border-1">
                    <h3 className="text-[16px] w-full font-medium flex flex-row gap-[10px] items-center justify-start hover:bg-pri-5 hover:text-white transition-all duration-200 ease-in active:scale-95 cursor-pointer px-5 py-3"><FaRegUserCircle />{firstName}{' '}{lastName}</h3>
                    <h3 className="text-[16px] w-full font-medium flex flex-row gap-[10px] items-center justify-start hover:bg-pri-5 hover:text-white transition-all duration-200 ease-in active:scale-95 cursor-pointer px-5 py-3"><MdLogout /></h3>
                </div>
            </nav>
            <main className={`relative top-0 flex flex-column ${menu ? 'md:w-[calc(100vw-220px)]' : 'md:w-[100vw]'}   m-small pt-[40px] bg-neu-1 ${menu ? 'md:left-0' : 'md:left-[-220px]'} flex-grow h-screen overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out font-body`}>
                {menu && <div className='md:w-0 md:h-0 transition-width duration-300 ease flex w-full h-full fixed left-0 top-0 bg-black bg-opacity-50 z-30 backdrop-blur-md' onClick={toggleMenu}>
                </div>}
                <header className="fixed top-0 h-[40px] w-screen border-b border-neu-3 bg-white overflow-visible z-[10]">
                </header>
                {children}
            </main>
        </div>
    )
}