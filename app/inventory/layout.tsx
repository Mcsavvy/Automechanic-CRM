"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/providers/auth-store-provider";
import MainDropdown from "../../components/dropdown/MainDropdown";
import AddNewStaffModal from "../../components/modals/AddNewStaffModal";
import { useRouter, usePathname } from "next/navigation";
import {
    ChevronDown,
    ChevronRight,
    SquareChevronLeft,
    SquareChevronRight,
    Package,
    FileLineChart,
    ReceiptText,
    CircleDollarSign,
    TrendingUp,
    CandlestickChart,
    AreaChart,
    Users,
    User,
    Scroll,
    Fingerprint,
    CircleUser,
    LayoutDashboard
} from "lucide-react";
import InventoryProviders from "./providers";
import AddGoodModal from "@/components/modals/AddGoodModal";
import AddNewBuyerModal from "./buyers/components/modals/create-buyer";

interface BaseSectionItem {
    icon: React.ReactNode;
    content: React.ReactNode | string;
    getIsActive: (pathname: string) => boolean;
}

type SectionItem =
    | (BaseSectionItem & { link: string })
    | (BaseSectionItem & { onClick: () => void });

interface Section {
    name: string;
    content?: React.ReactNode;
    items: SectionItem[];
    show: boolean;
}

const sections: Section[] = [
    {
        name: "Inventory",
        show: true,
        items: [
            {
                icon: <LayoutDashboard size={20} strokeWidth={1.5} />,
                content: "Dashboard",
                getIsActive: (pathname) =>
                    pathname === "/inventory" || pathname === "/inventory/",
                link: "/inventory",
            },
            {
                icon: <Package size={20} strokeWidth={1.5} />,
                content: "Store",
                getIsActive: (pathname) =>
                    pathname.startsWith("/inventory/products"),
                link: "/inventory/products",
            },
            {
                icon: <FileLineChart size={20} strokeWidth={1.5} />,
                content: "Reports",
                getIsActive: (pathname) =>
                    pathname.startsWith("/inventory/reports"),
                link: "/inventory/reports",
            },
            {
                icon: <ReceiptText size={20} strokeWidth={1.5} />,
                content: "Invoices",
                getIsActive: (pathname) =>
                    pathname.startsWith("/inventory/invoices"),
                link: "/inventory/orders",
            },
            {
                icon: <CircleDollarSign size={20} strokeWidth={1.5} />,
                content: "Payments",
                getIsActive: (pathname) =>
                    pathname.startsWith("/inventory/payments"),
                link: "/inventory/payments",
            },
            {
                icon: <Users size={20} strokeWidth={1.5} />,
                content: "Customers",
                getIsActive: (pathname) =>
                    pathname.startsWith("/inventory/buyers"),
                link: "/inventory/buyers",
            },
            {
                icon: <TrendingUp size={20} strokeWidth={1.5} />,
                content: "Sales Trends",
                getIsActive: (pathname) =>
                    pathname.startsWith("/inventory/sales-trends"),
                link: "/inventory/sales-trends",
            },
            {
                icon: <CandlestickChart size={20} strokeWidth={1.5} />,
                content: "Profit & Loss",
                getIsActive: (pathname) =>
                    pathname.startsWith("/inventory/profit-loss"),
                link: "/inventory/profit-loss",
            },
            {
                icon: <AreaChart size={20} strokeWidth={1.5} />,
                content: "Revenue Analysis",
                getIsActive: (pathname) =>
                    pathname.startsWith("/inventory/revenue-analysis"),
                link: "/inventory/revenue-analysis",
            }
        ],
    },
    {
        name: "Access Control",
        show: true,
        items: [
            {
                icon: <CircleUser size={20} strokeWidth={1.5} />,
                content: "Manage Staff",
                getIsActive: (pathname) =>
                    pathname.startsWith("/inventory/staffs"),
                link: "/inventory/staffs",
            },
            {
                icon: <Fingerprint size={20} strokeWidth={1.5} />,
                content: "Manage Roles",
                getIsActive: (pathname) =>
                    pathname.startsWith("/inventory/roles"),
                link: "/inventory/roles",
            },
            {
                icon: <Scroll size={20} strokeWidth={1.5} />,
                content: "Activity Logs",
                getIsActive: (pathname) =>
                    pathname.startsWith("/activity-logs"),
                link: "/activity-logs",
            }


        ],
    }
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [showMenu, setShowMenu] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const { loggedIn, firstName } = useAuthStore((state) => state);
    const [showSections, setShowSections] = useState<{
        [key: string]: boolean;
    }>({});
    const router = useRouter();
    const pathname = usePathname();

    function toggleSection(section: string, defaultValue = true) {
        setShowSections((prev) => ({
            ...prev,
            [section]: !(prev[section] === undefined
                ? defaultValue
                : prev[section]),
        }));
    }

    function canShowSection(section: string, defaultValue = true): boolean {
        return showSections[section] === undefined ? defaultValue : showSections[section];
    }


  useEffect(() => {
    if (!loggedIn) {
      router.push("/auth/login" + ("?redirect=" + pathname));
    }
  }, [loggedIn, router, pathname]);

                    {showMenu ? (
                        <SquareChevronLeft
                            size={28}
                            strokeWidth={1.5}
                            onClick={() => setShowMenu((prev) => !prev)}
                            className="absolute top-[20px] right-[-40px] cursor-pointer text-black transition active:scale-95 duration-200 ease-in z-30"
                        />
                    ) : (
                        <SquareChevronRight
                            strokeWidth={1.5}
                            size={28}
                            onClick={() => setShowMenu((prev) => !prev)}
                            className="absolute top-[20px] right-[-40px] cursor-pointer text-black transition active:scale-95 duration-200 ease-in z-30"
                        />
                    )}
                    <ul className="flex flex-col p-[10px] py-[30px] gap-[15px] overflow-y-auto scrollbar-thin mb-[50px]">
                        {sections.map((section) => (
                            <li key={section.name}>
                                <h3
                                    onClick={() =>
                                        toggleSection(
                                            section.name,
                                            section.show
                                        )
                                    }
                                    className="cursor-pointer text-pri-6 font-[600] w-full font-quicksand flex flex-row items-center justify-between"
                                >
                                    {section.content || section.name}
                                    {canShowSection(section.name, section.show) ? (
                                        <ChevronDown
                                            strokeWidth={1.5}
                                            size={20}
                                        />
                                    ) : (
                                        <ChevronRight
                                            strokeWidth={1.5}
                                            size={20}
                                        />
                                    )}{" "}
                                </h3>
                                {canShowSection(section.name, section.show) && (
                                    <ul className="flex flex-col">
                                        {section.items.map((item, idx) => (
                                            <li
                                                key={idx}
                                                onClick={
                                                    "link" in item
                                                        ? () => {
                                                              router.push(
                                                                  item.link
                                                              )
                                                              if (
                                                                  window.innerWidth <
                                                                  768
                                                              ) {
                                                                  setShowMenu(
                                                                      false
                                                                  );
                                                              }
                                                            }
                                                        : item.onClick
                                                }
                                                className={`cursor-pointer flex flex-row gap-[8px] justify-start items-center p-3 text-[15px] hover:bg-pri-5 hover:text-white transition-all duration-200 ease-in active:scale-95 ${
                                                    item.getIsActive(pathname)
                                                        ? "active-nav"
                                                        : ""
                                                }`}
                                            >
                                                {item.icon}
                                                {item.content}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
                <main
                    className={`relative top-0 flex flex-column w-screen ${
                        showMenu ? "md:w-[calc(100vw-220px)]" : "md:w-screen"
                    }  m-small pt-[40px] bg-neu-1 ${
                        showMenu ? "md:left-0" : "md:left-[-220px]"
                    } flex-grow h-screen overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out font-lato`}
                >
                    {showMenu && (
                        <div
                            className="md:w-0 md:h-0 transition-width duration-300 ease flex w-full h-full fixed left-0 top-0 bg-black bg-opacity-50 z-40 backdrop-blur-md"
                            onClick={() => setShowMenu(false)}
                        ></div>
                    )}
                    <header
                        className={`fixed top-0 right-0 w-screen h-[60px] ${
                            showMenu ? "md:w-[calc(100vw-220px)]" : "md:w-screen"
                        }  border-b border-neu-3 bg-white overflow-visible z-30 transition-all duration-200 ease-in`}
                    >
                        <div className="relative">
                            <div className="absolute right-[30px] top-[15px] overflow-visible flex flex-col items-end justify-start">
                                <button
                                    className="inline-flex items-center p-2 gap-3 capitalize font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                                    type="button"
                                    id="dropdownToggle"
                                    onClick={() =>
                                        setShowDropdown((show) => !show)
                                    }
                                >
                                    <User
                                        size={24}
                                        strokeWidth={1.5}
                                        className="border border-pri-6 rounded-full"
                                    />
                                    {firstName}
                                </button>
                                <MainDropdown
                                    show={showDropdown}
                                    setShow={setShowDropdown}
                                />
                            </div>
                        </div>
                    </header>
                    <InventoryProviders>
                        <AddGoodModal />
                        <AddNewStaffModal />
                        <AddNewBuyerModal />
                        {children}
                    </InventoryProviders>
                </main>
            </div>
        </React.Fragment>
    );
}
