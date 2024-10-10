import {
  faClosedCaptioning,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton"; 

const Top10AnimesTable = ({ data }) => {
  const MetaData = [{ title: "Today" }, { title: "Week" }, { title: "Month" }];
  const [activeDuration, setActiveDuration] = useState(0);
  const [currentData, setCurrentData] = useState(null);

  const handleDurationChange = (duration) => {
    setActiveDuration(duration);
  };

  useEffect(() => {
    setCurrentData(null);
    const durationArr = [data?.today, data?.week, data?.month];
    setCurrentData(durationArr?.[activeDuration]);
  }, [activeDuration, data]);

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between">
          <Skeleton className="h-10 w-36" />
          <div className="flex flex-row gap-3 items-center">
            {MetaData.map((_, index) => (
              <Skeleton key={index} className="h-8 w-20 rounded-md" />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 max-md:grid-cols-1 grid-rows-auto gap-3 bg-neutral-700/30 p-5 rounded-md">
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex flex-row items-center gap-10 group animated"
              >
                <Skeleton className="h-10 w-10 text-center" />
                <div className="flex flex-row gap-2">
                  <Skeleton className="h-[100px] w-[70px] rounded-lg" />
                  <div className="flex flex-col justify-center gap-2">
                    <Skeleton className="h-6 w-40" />
                    <div className="flex flex-row gap-[2px] w-full items-center">
                      <Skeleton className="h-4 w-12 rounded-l-sm" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row justify-between">
        <h2 className="text-3xl max-md:text-2xl font-semibold border-l-8 text-nowrap border-l-ring px-5">
          Top 10
        </h2>
        <div className="flex flex-row gap-3 items-center">
          {MetaData.map((data, index) => (
            <button
              key={data.title + index}
              onClick={() => handleDurationChange(index)}
              className={`p-2 px-3 rounded-md max-md:px-2 max-md:p-1 ${
                index == activeDuration ? "bg-indigo-400" : "bg-input"
              }`}
            >
              {data.title}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 max-md:grid-cols-1 grid-rows-auto gap-3 bg-neutral-700/30 p-5 rounded-md">
        {currentData &&
          currentData.map((data, index) => (
            <Link
              key={data.id}
              href={`/pages/Anime/details/${data.id}`}
              className="flex flex-row items-center gap-10 group animated"
            >
              <h1 className="text-2xl w-[30px] text-center border-b-4 border-indigo-400 group-hover:text-indigo-300 transition-full">
                {data.rank.toString().padStart(2, "0")}
              </h1>
              <div className="flex flex-row gap-2">
                <img
                  className="h-[100px] w-[70px] object-cover rounded-lg group-hover:blur-[3px] transition-full"
                  src={data.poster}
                  alt=""
                />
                <div className="flex flex-col justify-center gap-2">
                  <h1 className="group-hover:text-indigo-300 transition-full">
                    {data.name.length > 30
                      ? data.name.substring(0, 30) + "..."
                      : data.name || data.jname}
                  </h1>
                  <div className="flex flex-row gap-[2px] w-full items-center text-[12px]">
                    <p className="flex flex-row items-center gap-1 px-1 rounded-l-sm bg-green-200 text-black">
                      <FontAwesomeIcon icon={faClosedCaptioning} />{" "}
                      {data.episodes.sub}
                    </p>
                    <p className="flex flex-row items-center gap-1 px-1 bg-blue-200 text-black">
                      <FontAwesomeIcon icon={faMicrophone} />{" "}
                      {data.episodes.dub || "0"}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Top10AnimesTable;
