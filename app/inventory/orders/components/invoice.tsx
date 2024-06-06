"use client";
import Image from "next/image";
export default function Invoice() {
    return (
        <div className='border border-[#ccc]  min-h-[490px] p-3 font-nunito text-black'>
            <header className="flex flex-col items-center justify-start">
                <Image src="/logo.jpg" width={40} height={40} alt="logo" className="rounded-full" />
                <h1 className="text-lg font-rambla font-semibold">WILLIE&apos;S</h1>
                <p>2 Archebong Street, Ikeja Main Line, Ikeja, Lagos, Nigeria</p>
                <p>+234 812 345 6789</p>
                <p>williegarage@giagalo.com</p>
            </header>
            <div className="flex flex-row items-start justify-between gap-5 mt-5">
                <ul className="flex flex-row gap-3 items-start justify-start">
                    <li className="font-rambla font-semibold flex flex-col items-start justify-start">
                        <span>Invoice No:</span>
                        <span>Issued:</span>
                        <span>Due:</span>
                    </li>
                    <li className="font-nunito flex flex-col items-start justify-start">
                        <span>12ed75a8c2</span>
                        <span>17th March, 2024</span>
                        <span>25th April, 2024</span>
                    </li>
                </ul>
                <ul className="flex flex-row gap-3 items-start justify-start">
                    <li className="font-rambla font-semibold flex flex-col items-start justify-start">
                        <span>Bill To:</span>
                        <span>Email:</span>
                        <span>Phone:</span>
                    </li>
                    <li className="font-nunito flex flex-col items-start justify-start">
                        <span>Uchebono James</span>
                        <span>uchebonojames@gmail.com</span>
                        <span>+234 913 456 7890</span>
                    </li>
                </ul>
            </div>
            <table className="mt-5 w-full border border-[#ccc]">
                <thead>
                    <tr>
                        <th className="font-rambla font-semibold text-[20px] border-t border-b border-[#ccc] px-1 p-2">S/N</th>
                        <th className="font-rambla font-semibold text-[20px] border-t border-b border-[#ccc] px-1 p-2">Description</th>
                        <th className="font-rambla font-semibold text-[20px] border-t border-b border-[#ccc] px-1 p-2">Qty</th>
                        <th className="font-rambla font-semibold text-[20px] border-t border-b border-[#ccc] px-1 p-2">Price</th>
                        <th className="font-rambla font-semibold text-[20px] border-t border-b border-[#ccc] px-1 p-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">1</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">Spark Plugs</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">4</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">$10</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">$40</td>
                    </tr>
                    <tr>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">2</td>


                        <td className="font-nunito border-t border-b border-[#ccc] p-1">Oil Filter</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">2</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">$8</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">$16</td>
                    </tr>
                    <tr>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">3</td>

                        <td className="font-nunito border-t border-b border-[#ccc] p-1">Brake Pads</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">1</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">$30</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">$30</td>
                    </tr>
                    <tr>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">4</td>

                        <td className="font-nunito border-t border-b border-[#ccc] p-1">Air Filter</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">3</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">$12</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">$36</td>
                    </tr>
                    <tr>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">5</td>

                        <td className="font-nunito border-t border-b border-[#ccc] p-1">Battery</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">1</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">$100</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">$100</td>
                    </tr>
                    <tr>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">6</td>

                        <td className="font-nunito border-t border-b border-[#ccc] p-1">Tire</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">4</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">$50</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">$200</td>
                    </tr>
                    <tr>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">7</td>

                        <td className="font-nunito border-t border-b border-[#ccc] p-1">Alternator</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">1</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">$150</td>
                        <td className="font-nunito border-t border-b border-[#ccc] p-1">$150</td>
                    </tr>
                </tbody>
            </table>

            <div className="mt-5 flex flex-row items-start justify-between gap-5">
                <div className="flex flex-col items-start justify-start">
                    <h2 className="font-semibold text-lg font-rambla text-pri-6">Pay via</h2>
                    <ul>
                        <li>
                            <h3 className="font-semibold font-rambla">Cash</h3>
                            <ul className="list-disc px-3">
                                <li className="text-sm">Ensure you obtain a  receipt for each cash transaction you make at our office</li>
                                <li className="text-sm">Ensure the recepit is also signed by the concerned staff</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="font-semibold font-rambla">Cheque</h3>
                            <ul className="list-disc px-3">
                                <li className="text-sm">All cheques must have a validity window of at most two weeks and at least two weeks</li>
                                <li className="text-sm">Expired, forged or dishonored cheques will not be accepted</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="font-semibold font-rambla">Bank</h3>
                            <p><span className="font-semibold font-nunito text-[13px]">Acc No: </span>2034562012</p>
                            <p><span className="font-semibold font-nunito text-[13px]">Bank: </span>First Bank Nigeria</p>
                            <ul className="list-disc px-3">

                                <li className="text-sm">Ensure all transactions are successful and follow up by contacting the concerned
                                    staff for immediate processing
                                </li>
                                <li className="text-sm">We will not take liability for any failed transactions/transfers</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="font-semibold font-rambla">Voucher</h3>
                            <ul className="list-disc px-3">
                                <li className="text-sm">Expired, fake or forged vouchers will not be honored</li>
                            </ul>
                        </li>
                    </ul>

                </div>
                <div className="flex flex-col items-end justify-between b">
                    <ul className="flex flex-row gap-3 items-start justify-start">
                        <li className="font-rambla font-semibold flex flex-col items-start justify-start">
                            <span>Subtotal:</span>
                            <span>Tax:</span>
                            <span>Shipping:</span>
                            <span className=" text-red-500">Discount:</span>
                            <span className="text-lg font-semibold text-acc-7">Paid:</span>
                        </li>
                        <li className="font-nunito flex flex-col items-start justify-start">
                            <span>$ 468.00</span>
                            <span>$ 46.80</span>
                            <span>$ 20.00</span>
                            <span className="text-red-500">$ 50.00</span>
                            <span className="text-lg font-semibold text-acc-7">$ 400.00</span>
                        </li>
                    </ul>
                    <span className="w-[200px] border-t border-[#ccc]"></span>
                    <div className="flex flex-row gap-3 text-xl font-semibold text-pri-6">
                        <span className="font-rambla">Total:</span>
                        <span className="font-nunito">$ 84.80</span>
                    </div>
                </div>
            </div>
            <p className="text-center font-rambla italic mt-5 text-pri-6 font-normal">Thank you for doing business with us. Have a great day</p>
            <footer className="border-t border-[#ccc] mt-1">
                <p className="font-nunito text-[10px] font-italic">Generated on 15th April 2024 at 3:45pm</p>
            </footer>
        </div>
    )
}