"use client"
import React from "react";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/providers/auth-store-provider";
import MainDropdown from "../components/dropdown/MainDropdown";
import AddNewStaffModal from "../components/modals/AddNewStaffModal";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, LineChart, Receipt, TriangleAlert, PieChart, Store, Bell, NotebookTabs, UsersRound, User, LogOut, SquareChevronLeft, SquareChevronRight, EllipsisVertical } from "lucide-react";
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [menu, setMenu] = useState(true);
    const [app, setApp] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [currApp, setCurrApp] = useState("Inventory");
    const { loggedIn, firstName } = useAuthStore((state) => state);
    const [showInventory, setShowInventory] = useState(false)
    const [showGarage, setShowGarage] = useState(false)
    const router = useRouter();
    const pathname = usePathname();
    const toggleMenu = () => {
        setMenu(!menu);
    };
    const toggleApp = () => {
        setApp(!app);
    };
    const changeApp = (app: string) => {
        setCurrApp(app);
        setApp(!app);
    };

    useEffect(() => {
        // if (!loggedIn) {
        //     router.push("/auth/login");
        // }
    });
    useEffect(() => {
        setMenu(window.innerWidth > 768)
    }, [])
    const checkActive = (path: string) => {
        const pathValue = `/${currApp.toLowerCase()}/${path}`;
        return pathname.startsWith(pathValue) ? "active-nav" : "";
    };
    const navigateTo = (path: string) => {
        router.push(`/${currApp.toLowerCase()}/${path}`);
    };

    return (
        <React.Fragment>
            <AddNewStaffModal />
            <div className="fixed flex flex-row items-center justify-start top-0 left-0">
                <nav
                    className={`fixed top-0 md:relative h-screen bg-white w-[220px] flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out ${menu ? "left-0" : "-left-[219px]"
                        } border-r border-neu-3 border-1 shadow-lg text-neu-9 font-heading z-50 `}
                >
                    <div className="header">
                        <h1 className="p-[30px]  text-lg font-lg pb-1">
                            W I L L I E
                        </h1>
                    </div>

                    {menu ?
                        <SquareChevronLeft strokeWidth={1.5} size={20} onClick={toggleMenu} className="absolute top-[60px] right-[-20px] cursor-pointer text-neu-9 transition active:scale-95 duration-200 ease-in z-30" />
                        :
                        <SquareChevronRight strokeWidth={1.5} size={20} onClick={toggleMenu} className="absolute top-[60px] right-[-20px] cursor-pointer text-neu-9 transition active:scale-95 duration-200 ease-in z-30" />
                    }
                    <ul className="flex flex-col p-[10px] py-[30px] gap-[15px] overflow-y-auto scrollbar-thin mb-[50px]">
                        <li >
                            <h3 onClick={() => setShowInventory(!showInventory)} className="cursor-pointer text-pri-6 font-[600] w-full font-heading flex flex-row items-center justify-between">
                                Inventory
                                {showInventory ? 
                                 <ChevronDown strokeWidth={1.5} size={20} />
                                : <ChevronRight strokeWidth={1.5} size={20} />
                                }                            </h3>
                            {showInventory &&
                                <ul className="flex flex-col">
                                    <li onClick={() => navigateTo('overview')} className={`cursor-pointer flex flex-row gap-[8px] justify-start items-center p-3 text-[15px] hover:bg-pri-5 hover:text-white transition-all duration-200 ease-in active:scale-95 ${checkActive('overview')}`}><Store size={20} strokeWidth={1.5} />Overview</li>
                                    <li onClick={() => navigateTo('alerts')} className={`cursor-pointer flex flex-row gap-[8px] justify-start items-center p-3 text-[15px] hover:bg-pri-5 hover:text-white transition-all duration-200 ease-in active:scale-95 ${checkActive('alerts')}`}><Bell size={20} strokeWidth={1.5} />Low Stock Alerts</li>
                                    <li onClick={() => navigateTo('orders')} className={`cursor-pointer flex flex-row gap-[8px] justify-start items-center p-3 text-[15px] hover:bg-pri-5 hover:text-white transition-all duration-200 ease-in active:scale-95 ${checkActive('orders')}`}><NotebookTabs size={20} strokeWidth={1.5} />Orders</li>
                                    <li onClick={() => navigateTo('invoices')} className={`cursor-pointer flex flex-row gap-[8px] justify-start items-center p-3 text-[15px] hover:bg-pri-5 hover:text-white transition-all duration-200 ease-in active:scale-95 ${checkActive('invoices')}`}><Receipt size={20} strokeWidth={1.5} />Invoices</li>
                                    <li onClick={() => navigateTo('returns')} className={`cursor-pointer flex flex-row gap-[8px] justify-start items-center p-3 text-[15px] hover:bg-pri-5 hover:text-white transition-all duration-200 ease-in active:scale-95 ${checkActive('returns')}`}><TriangleAlert size={20} strokeWidth={1.5} />Returns</li>
                                    <li onClick={() => navigateTo('sales-reports')} className={`cursor-pointer flex flex-row gap-[8px] justify-start items-center p-3 text-[15px] hover:bg-pri-5 hover:text-white transition-all duration-200 ease-in active:scale-95 ${checkActive('sales-reports')}`}><LineChart size={20} strokeWidth={1.5} />Sales Analytics</li>
                                    <li onClick={() => navigateTo('store-reports')} className={`cursor-pointer flex flex-row gap-[8px] justify-start items-center p-3 text-[15px] hover:bg-pri-5 hover:text-white transition-all duration-200 ease-in active:scale-95 ${checkActive('store-reports')}`}><PieChart size={20} strokeWidth={1.5} />Inventory Reports</li>
                                    <li onClick={() => navigateTo('customers')} className={`cursor-pointer flex flex-row gap-[8px] justify-start items-center p-3 text-[15px] hover:bg-pri-5 hover:text-white transition-all duration-200 ease-in active:scale-95 ${checkActive('sales-reports')}`}><UsersRound size={20} strokeWidth={1.5} />Customers</li>
                                </ul>
                            }
                        </li>
                        <li>
                        <h3 onClick={() => setShowGarage(!showGarage)} className="cursor-pointer text-pri-6 font-semibold w-full font-[600] flex flex-row items-center justify-between">
                                Garage
                                {showGarage ? 
                                 <ChevronDown strokeWidth={1.5} size={20} />
                                : <ChevronRight strokeWidth={1.5} size={20} />
                                }
                            </h3>
                            {showGarage &&
                                <ul className="flex flex-col">
                                    <li onClick={() => navigateTo('sales-reports')} className={`cursor-pointer flex flex-row gap-[8px] justify-start items-center p-3 text-[15px] hover:bg-pri-5 hover:text-white transition-all duration-200 ease-in active:scale-95 ${checkActive('sales-reports')}`}><LineChart size={20} strokeWidth={1.5} />Sales Analytics</li>
                                    <li onClick={() => navigateTo('store-reports')} className={`cursor-pointer flex flex-row gap-[8px] justify-start items-center p-3 text-[15px] hover:bg-pri-5 hover:text-white transition-all duration-200 ease-in active:scale-95 ${checkActive('store-reports')}`}><PieChart size={20} strokeWidth={1.5} />Inventory Reports</li>
                                    <li onClick={() => navigateTo('customers')} className={`cursor-pointer flex flex-row gap-[8px] justify-start items-center p-3 text-[15px] hover:bg-pri-5 hover:text-white transition-all duration-200 ease-in active:scale-95 ${checkActive('sales-reports')}`}><UsersRound size={20} strokeWidth={1.5} />Customers</li>
                                </ul>
                            }
                        </li>

                    </ul>
                </nav>
                <main className={`relative top-0 flex flex-column w-screen ${menu ? 'md:w-[calc(100vw-220px)]' : 'md:w-screen'}  m-small pt-[40px] bg-neu-1 ${menu ? 'md:left-0' : 'md:left-[-220px]'} flex-grow h-screen overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out font-body`}>
                    {menu &&
                        <div className='md:w-0 md:h-0 transition-width duration-300 ease flex w-full h-full fixed left-0 top-0 bg-black bg-opacity-50 z-40 backdrop-blur-md' onClick={toggleMenu}>
                        </div>
                    }
                    <header className={`fixed top-0 right-0 w-screen h-[60px] ${menu ? 'md:w-[calc(100vw-220px)]' : 'md:w-screen'}  border-b border-neu-3 bg-white overflow-visible z-30 transition-all duration-200 ease-in`}>
                        <div className="relative">
                            <div className="absolute right-[30px] top-[15px] overflow-visible flex flex-col items-end justify-start">
                                <button
                                    className="inline-flex items-center p-2 gap-3 capitalize font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                                    type="button"
                                    id="dropdownToggle"
                                    onClick={() => setShowDropdown((show) => !show)}
                                >
                                    < User size={24} strokeWidth={1.5} className="border border-pri-6 rounded-full" />{firstName}
                                </button>
                                <MainDropdown
                                    show={showDropdown}
                                    setShow={setShowDropdown}
                                />
                            </div>
                        </div>
                    </header>
                    {children}
                </main>
            </div>
        </React.Fragment>
    )
}
