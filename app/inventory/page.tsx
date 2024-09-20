"use client";
import Insights from "./components/insights";
import StoreSummary from "./components/store-summary";
import RecentActions from "./components/recent-actions";
import BestPerformer from "./components/best-performing-goods";
import RangeBar from "./components/range";
import { useState } from "react";


export default function Home() {
  const today = new Date();
  const [before, setBefore] = useState(
    new Date(today.setDate(today.getDate() - today.getDay() + 6)).toISOString()
  );
  const [after, setAfter] = useState(
    new Date(today.setDate(today.getDate() - today.getDay())).toISOString()
  );
  const [metric, setMetric] = useState<"month" | "hour" | "day" | "year">(
    "day"
  );
  const [tab, setTab] = useState("recent");

  return (
    <div className="absolute h-[calc(100vh-60px)] top-[60px] w-full  overflow-auto">
      <div className="sticky top-0 w-full z-10 overflow-x-clip">
        <ul className="px-[30px] pt-3 pb-0 font-quicksand flex flex-row items-start bg-white overflow-x-clip overflow-y-clip gap-4">
          <li
            onClick={() => setTab("recent")}
            className={`font-quicksand capitalize cursor-pointer relative py-1 text-center transition-all duration-200 ease-in-out ${
              tab == "recent" ? "tab" : ""
            }`}
          >
            Recent
          </li>
          <li
            onClick={() => setTab("chart")}
            className={`font-quicksand capitalize cursor-pointer relative py-1 text-center transition-all duration-200 ease-in-out ${
              tab == "chart" ? "tab" : ""
            }`}
          >
            Revenue
          </li>
        </ul>
      </div>
            <div className="flex p-[12px] md:p-[30px] flex-row flex-wrap gap-3 items-center justify-evenly w-full">
                <RangeBar {...{ setBefore, setAfter, setMetric, before, after }} />
                {tab == "chart" &&
                    <div className="w-full md:grid md:grid-cols-[7fr_3fr] md:auto-rows-min gap-4 overflow-y-visible scrollbar-thin flex flex-col items-center">
                        <Insights {...{ metric, before, after }} />
                        <BestPerformer {...{before, after}}/>
                        <div className="col-start-2 row-start-2 flex flex-col gap-3 invoice h-full w-full">
                            <StoreSummary {...{ before, after }} />
                        </div>
                    </div>
                }
                {tab == "recent" &&
                    <RecentActions />
                }
            </div>
        </div>
    );
}
