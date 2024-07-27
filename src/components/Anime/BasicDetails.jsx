import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const BasicDetails = ({ data, page = "Details", className }) => {
  const Months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div
      className={cn(
        "flex flex-row w-full gap-5 p-3 bg-neutral-700/30 box-shadow rounded-sm animated",
        className
      )}
    >
      <div className="flex flex-col gap-2 w-[180px] text-[13px]">
        <div className="relative" >
        <img
          className="object-cover max-md:h-[150px] rounded-md"
          src={data.info.poster}
          alt={data.info.id}
        />
        <p className="absolute top-1 left-1 px-3 py-1 rounded-md bg-black/70" >{data.info.stats.rating}</p>
        </div>
        <Link href={`/pages/Anime/watch/${data.info.id}`}>
          <button className="p-3 w-full bg-accent rounded-md font-semibold hover:bg-indigo-400 transition-full">
            {page == "Details" ? "WATCH NOW" : "INFO"}
          </button>
        </Link>
        <button className="p-3 bg-accent rounded-md font-semibold hover:bg-indigo-400 transition-full">
          TRAILER
        </button>
        <div className="flex flex-row justify-between">
          <button className="p-3 w-[45%] bg-accent/80 rounded-md font-semibold hover:bg-indigo-400 transition-full">
            A
          </button>
          <button className="p-3 w-[45%] bg-accent/80 rounded-md font-semibold hover:bg-indigo-400 transition-full">
            MAL
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-[80%]">
        <h1 className="text-2xl max-md:text-lg font-bold">
          {data.info.name || data.info.jname}
        </h1>
        <p className="max-md:text-sm" style={{ color: data.color, fontWeight: 700, fontStyle: 'italic' }}>
          {"[" + (data?.moreInfo?.synonyms || data?.info.jname || data?.info?.name) + "]"}
        </p>
        <p className="rounded-xl bg-accent/60 p-2 max-md:hidden italic box-shadow">
          {data.info.description.replace(/<\/?[^>]+(>|$)/g, "")}
        </p>
        <div className="flex flex-row justify-between h-full max-md:text-[13px] text-primary/60">
          <div className="flex flex-col justify-evenly max-md:justify-start h-full">
            <p>
              Japanese:{" "}
              <span className="font-semibold text-primary">
                {data.moreInfo.japanese}
              </span>
            </p>
            <p>
              Aired:{" "}
              <span className="font-semibold text-primary">
                {data.moreInfo.aired}
              </span>
            </p>
            <p>
              Premiered:{" "}
              <span className="font-semibold text-primary">
                {data.moreInfo.premiered}
              </span>
            </p>
            <p>
              Episodes (SUB):{" "}
              <span className="font-semibold text-primary">
                {data.info.stats.episodes.sub || "0"}
              </span>
            </p>
          </div>
          <div className="flex flex-col justify-evenly max-md:justify-start h-full">
            <p>
              Episodes (DUB):{" "}
              <span className="font-semibold text-primary">
                {data.info.stats.episodes.dub || "0"}
              </span>
            </p>
            <p>
              Duration:{" "}
              <span className="font-semibold text-primary">
                {data.moreInfo.duration}
              </span>
            </p>
            <p>
              Status:{" "}
              <span className="font-semibold text-primary">
                {data.moreInfo.status}
              </span>
            </p>
            <p>
              MalScore:{" "}
              <span className="font-semibold text-primary">
                {data.moreInfo.malscore}
              </span>
            </p>
          </div>
          <div className="flex flex-col justify-evenly max-md:justify-start items-center h-full w-[33%]">
            <p>
              Studios:{" "}
              <span className="font-semibold text-primary uppercase">
                {data.moreInfo.studios}
              </span>
            </p>
            <p className="flex flex-wrap gap-3 font-semibold text-primary">
              {data.moreInfo.genres.map((data) => (
                <span key={data} className="p-2 rounded-xl bg-accent/80">
                  {data}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
