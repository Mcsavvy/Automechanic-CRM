"use client"
import Insights from './components/insights'
import Overdue from './components/overdue-order'
import { Button } from "@/components/ui/button"
import { MoveRight } from "lucide-react"
import { useState, useEffect } from 'react'
export default function Home() {
    const [before, setBefore] = useState('')
    const [after, setAfter] = useState('')
    return (
        <div className="absolute border border-red-500 h-[calc(100vh-60px)] top-[60px] w-full">
            <div className="p-[30px] flex flex-col justify-start items-center md:grid md:items-start md:grid-cols-3 gap-4 h-full overflow-y-auto scrollbar-thin" style={{ gridAutoRows: 'min-content' }}>
                <div className="md:col-span-2 rounded-md w-full h-auto items-stretch flex-wrap flex flex-row gap-2 justify-evenly">
                    <Insights />
                </div>
                <div className="flex flex-col gap-3 invoice md:col-span-1 md:row-span-2 h-full w-full">
                    <Overdue/>
                    <div className="min-h-[calc(100%-420px)] flex flex-col gap-2  border border-neu-3 overflow-y-auto scrollbar-thin bg-white rounded-md shadow-inner p-4 ">
                        <h3 className="text-lg text-pri-5 font-semibold font-quicksand flex items-center justify-between">Store overview
                            <Button variant={"outline"} className="font-semibold">Go to store</Button>
                        </h3>
                        <div className="flex flex-col items-start justify-start" >
                            <p>MVP</p>
                            <div className="flex flex-row items-center justify-start">
                                <p>Electric Caburetor</p>
                                <ul>
                                    <li> 35 sold</li>
                                    <li> $15k in revenue</li>
                                    <li> 155 orders</li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <p>In stock</p>
                            <div className="flex flex-wrap justify-between items-center">
                                <span>625</span><span>/1000</span>
                                <span className="w-[calc(100%-3px)] h-[40px] flex flex-row gap-[3px]">
                                    <span className="w-[calc(62.5%-3px)] h-full progress-bar " style={{ "--progress": 'var(--pri-500)' }}></span>
                                    <span className="w-[calc(37.5%-3px)] h-full progress-bar " style={{ "--progress": 'var(--pri-200)' }}></span>
                                </span>
                            </div>
                        </div>
                        <div>
                            <p>Low stock</p>
                            <div className="flex flex-wrap justify-between items-center">
                                <span>150</span><span>/1000</span>
                                <span className="w-[calc(100%-3px)] h-[40px] flex flex-row gap-[3px]">
                                    <span className="w-[calc(15%-3px)] h-full progress-bar " style={{ "--progress": 'var(--acc-600)' }}></span>
                                    <span className="w-[calc(85%-3px)] h-full progress-bar " style={{ "--progress": 'var(--acc-300)' }}></span>
                                </span>
                            </div>
                        </div>
                        <div>
                            <p>Out of stock</p>
                            <div className="flex flex-wrap justify-between items-center">
                                <span>225</span><span>/1000</span>
                                <span className="w-[calc(100%-3px)] h-[40px] flex flex-row gap-[3px]">
                                    <span className="w-[calc(22.5%-3px)] h-full progress-bar " style={{ "--progress": 'red' }}></span>
                                    <span className="w-[calc(77.5%-3px)] h-full progress-bar " style={{ "--progress": 'var(--red-light)' }}></span>
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="products md:col-span-2 border border-neu-3 min-h-[300px] w-full p-4 bg-white rounded-md shadow-md overflow-y-auto scrollbar-thin">
                    <h3 className="text-lg text-acc-7 flex items-center justify-between w-full font-semibold font-quicksand">
                        Best performing products<Button variant={"outline"} className="font-semibold">Add a new Product</Button>
                    </h3>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-left px-4 py-2">Name</th>
                                <th className="text-left px-4 py-2">Category</th>
                                <th className="text-left px-4 py-2">Qty in Stock</th>
                                <th className="text-left px-4 py-2">Units Sold</th>
                                <th className="text-left px-4 py-2">Revenue Generated</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2">Spark Plugs</td>
                                <td className="px-4 py-2">Ignition System</td>
                                <td className="px-4 py-2">100</td>
                                <td className="px-4 py-2">500</td>
                                <td className="px-4 py-2">$50,000</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2">Brake Pads</td>
                                <td className="px-4 py-2">Braking System</td>
                                <td className="px-4 py-2">50</td>
                                <td className="px-4 py-2">200</td>
                                <td className="px-4 py-2">$20,000</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2">Oil Filters</td>
                                <td className="px-4 py-2">Engine Components</td>
                                <td className="px-4 py-2">200</td>
                                <td className="px-4 py-2">800</td>
                                <td className="px-4 py-2">$80,000</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2">Air Filters</td>
                                <td className="px-4 py-2">Engine Components</td>
                                <td className="px-4 py-2">150</td>
                                <td className="px-4 py-2">600</td>
                                <td className="px-4 py-2">$60,000</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2">Shock Absorbers</td>
                                <td className="px-4 py-2">Suspension System</td>
                                <td className="px-4 py-2">75</td>
                                <td className="px-4 py-2">300</td>
                                <td className="px-4 py-2">$30,000</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2">Product 6</td>
                                <td className="px-4 py-2">Category 6</td>
                                <td className="px-4 py-2">10</td>
                                <td className="px-4 py-2">100</td>
                                <td className="px-4 py-2">$10,000</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2">Product 7</td>
                                <td className="px-4 py-2">Category 7</td>
                                <td className="px-4 py-2">20</td>
                                <td className="px-4 py-2">200</td>
                                <td className="px-4 py-2">$20,000</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2">Product 8</td>
                                <td className="px-4 py-2">Category 8</td>
                                <td className="px-4 py-2">30</td>
                                <td className="px-4 py-2">300</td>
                                <td className="px-4 py-2">$30,000</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2">Product 9</td>
                                <td className="px-4 py-2">Category 9</td>
                                <td className="px-4 py-2">40</td>
                                <td className="px-4 py-2">400</td>
                                <td className="px-4 py-2">$40,000</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2">Product 10</td>
                                <td className="px-4 py-2">Category 10</td>
                                <td className="px-4 py-2">50</td>
                                <td className="px-4 py-2">500</td>
                                <td className="px-4 py-2">$50,000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}