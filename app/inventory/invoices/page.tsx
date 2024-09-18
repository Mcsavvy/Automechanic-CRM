"use client"
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react';

export const metadata = {
  title: "Invoices",
};

export default function Invoices() {
    return (
        <div className="flex flex-col absolute h-[calc(100vh-60px)] top-[60px] w-full">
            <div className="h-full relative bg-white overflow-auto md:m-6">
                <div className="flex flex-col items-start p-4 px-[30px]">
                    <div className="flex flex-row w-full gap-5 items-center justify-between">
                        <div className="flex flex-col flex-wrap">
                            <h2 className="font-quicksand text-xl font-semibold text-pri-6">Income</h2>
                            <p className="font-lato text-sm">See your business trend at a glance and know where you&apos;re headed</p>
                        </div>
                        <Button className="flex flex-row items-center justify-start gap-2" variant={"outline"}>Export Table <Download size={20} strokeWidth={1.5} /></Button>
                    </div>
                    <div className="rounded-md shadow-md w-[400px] h-[150px] border border-acc-5"></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}