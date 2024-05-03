import { FaCalendarDay, FaChartPie, FaDatabase } from "react-icons/fa6";
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <nav className="fixed left-0 h-screen w-52 flex flex-col border border-red-500 bg-white flex-shrink-0">
                <ul className="flex flex-col p-[10px] gap-[20px]">
                    <li>
                        <h3 className="flex flex-row gap-[10px] justify-start items-center"><FaCalendarDay />Appointments</h3>
                        <ul className="flex flex-col gap-1">
                            <li>Service Appointments</li>
                        </ul>
                    </li>
                    <li>
                        <h3 className="flex flex-row gap-[10px] justify-start items-center"><FaDatabase />Records</h3>
                        <ul className="flex flex-col gap-1 border border-blue-500">
                            <li>Customers</li>
                            <li>Vehicles</li>
                            <li>Service Records</li>
                        </ul>
                    </li>
                    <li>
                        <h3 className="flex flex-row gap-[10px] justify-start items-center"><FaChartPie /> Analytics</h3>
                        <ul className="flex flex-col gap-1">
                            <li>Customer Analytics</li>
                            <li>Service Analytics</li>
                            <li>Revenue Analytics</li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <main>
                {children}
            </main>
        </div>
    )
}