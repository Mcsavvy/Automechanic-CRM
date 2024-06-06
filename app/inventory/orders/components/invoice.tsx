"use client";
import Image from "next/image";
export default function Invoice() {
    return (
        <div className='border border-[#ccc]  min-h-[490px] p-3 font-nunito'>
            <header className="flex flex-col items-center justify-start">
                <Image src="/logo.jpg" width={40} height={40} alt="logo" className="rounded-full" />
                <h1 className="text-lg font-rambla font-semibold">WILLIE&apos;S</h1>
                <p>2 Archebong Street, Ikeja Main Line, Ikeja, Lagos, Nigeria</p>
                <p>+234 812 345 6789</p>
                <p>williegarage@giagalo.com</p>
            </header>
            <div className="flex flex-row items-start justify-between gap-5 mt-3">
                <ul>
                    <li className="flex flex-row gap-5 items-center justify-start"><span className="font-rambla font-semibold">Invoice Number:</span><span className="font-nunito">3574a76ed</span></li>
                    <li className="flex flex-row gap-5 items-center justify-start"><span className="font-rambla font-semibold">Issued:</span><span className="font-nunito">17th March, 2025</span></li>
                    <li className="flex flex-row gap-5 items-center justify-start"><span className="font-rambla font-semibold">Due:</span><span className="font-nunito">25th April, 2025</span></li>
                </ul>
                <ul>
                    <li className="flex flex-row gap-5 items-center justify-start"><span className="font-rambla font-semibold">Bill To:</span><span className="font-nunito">Uchebono James</span></li>
                    <li className="flex flex-row gap-5 items-center justify-start"><span className="font-rambla font-semibold">Email:</span><span className="font-nunito">uchebonojames@gmail.com</span></li>
                    <li className="flex flex-row gap-5 items-center justify-start"><span className="font-rambla font-semibold">Phone:</span><span className="font-nunito">+234 901 260 1558</span></li>
                </ul>
            </div>
            <table className="mt-5 w-full border border-[#ccc]">
                <thead>
                    <tr>
                        <th className="font-rambla font-semibold text-[20px] border-t border-b border-[#ccc] px-1 p-2">Description</th>
                        <th className="font-rambla font-semibold text-[20px] border-t border-b border-[#ccc] px-1 p-2">Qty</th>
                        <th className="font-rambla font-semibold text-[20px] border-t border-b border-[#ccc] px-1 p-2">Price</th>
                        <th className="font-rambla font-semibold text-[20px] border-t border-b border-[#ccc] px-1 p-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">Spark Plugs</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">4</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">$10</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">$40</td>
                    </tr>
                    <tr>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">Oil Filter</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">2</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">$8</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">$16</td>
                    </tr>
                    <tr>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">Brake Pads</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">1</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">$30</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">$30</td>
                    </tr>
                    <tr>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">Air Filter</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">3</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">$12</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">$36</td>
                    </tr>
                    <tr>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">Battery</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">1</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">$100</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">$100</td>
                    </tr>
                    <tr>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">Tire</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">4</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">$50</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">$200</td>
                    </tr>
                    <tr>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">Alternator</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">1</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">$150</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">$150</td>
                    </tr>
                </tbody>
            </table>

            <div className="mt-5 flex flex-col items-end">
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-between">
                            <span className="font-rambla font-semibold">Subtotal:</span>
                            <span className="font-nunito">$468</span>
                        </div>
                        <div className="flex flex-row justify-between">
                            <span className="font-rambla font-semibold">Tax:</span>
                            <span className="font-nunito">$46.80</span>
                        </div>
                        <div className="flex flex-row justify-between">
                            <span className="font-rambla font-semibold">Shipping:</span>
                            <span className="font-nunito">$20</span>
                        </div>
                        <div className="flex flex-row justify-between">
                            <span className="font-rambla font-semibold">Discount:</span>
                            <span className="font-nunito">-$50</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-between">
                            <span className="font-rambla font-semibold">Grand Total:</span>
                            <span className="font-nunito">$484.80</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}