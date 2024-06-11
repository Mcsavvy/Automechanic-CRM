import Insights from './components/insights'

export default function Home() {
    return (
        <div className="absolute border border-red-500 h-[calc(100vh-60px)] top-[60px] w-full">
            <div className="p-[30px] flex flex-col justify-start items-center md:grid md:grid-cols-3 gap-4 h-full overflow-y-auto scrollbar-thin">
                <div className="md:col-span-2 rounded-md w-full h-auto items-start flex-wrap flex flex-row gap-2 items-center justify-evenly">
                    <div className="">
                    <Insights />
                        </div>
                    <div className=" border border-[#ccc] shadow-md self-stretch flex-grow w-[200px] p-4 bg-white">
                        <h3 className="text-lg text-pri-6 font-semibold font-quicksand">Order Summary</h3>
                    </div>
                </div>
                <div className="flex flex-col gap-3 invoice md:col-span-1 md:row-span-2 border border-[#ccc] h-full w-full bg-white rounded-md shadow-inner min-w-0 p-4">
                    <div className="h-[49%] border-b border-pri-6">
                        <h3 className="text-lg text-red-500 font-semibold font-quicksand">Overdue orders</h3>
                        <ul>
                            <li>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="h-[49%] text-lg text-pri-5 font-semibold font-quicksand">Store overview</h3>
                    </div>


                </div>
                <div className="products md:col-span-2 border border-[#ccc] h-[300px] w-full p-4 bg-white rounded-md shadow-md ">
                    <h3 className="text-lg text-acc-7 font-semibold font-quicksand">Best performing products</h3>

                </div>
            </div>
        </div>
    );
}