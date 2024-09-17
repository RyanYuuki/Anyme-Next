import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

const BasicDetails = ({ data, page = "Details", className }) => {
  if (!data || data?.length === 0) {
    return (
      <Skeleton className="flex flex-row gap-4 p-3 w-full">
        <div className="flex flex-col gap-3">
          <Skeleton className="w-[200px] h-[250px] rounded-md" />
          <Skeleton className="h-[30px] w-[200px] rounded-md" />
          <Skeleton className="h-[30px] w-[200px] rounded-md" />
          <div className="flex flex-row justify-between" >
            <Skeleton className="h-[30px] w-[90px] rounded-md" />
            <Skeleton className="h-[30px] w-[90px] rounded-md" />
          </div>
        </div>
        <div className="w-full">
          <Skeleton className="w-full h-[100%] rounded-md" />
        </div>
      </Skeleton>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-row w-full gap-5 p-3 bg-neutral-700/10 box-shadow rounded-sm animated",
        className
      )}
    >
      <div className="flex flex-col gap-2 w-[180px] max-md:w-[130px] max-md:text-[12px]">
        <div className="relative">
          <img
            className="object-cover max-md:h-[150px] w-[250px] rounded-md animated"
            src={'https://anymey-proxy.vercel.app/cors?url=' + data.info.poster}
            alt={data.info.id}
          />
          <p className="absolute top-1 left-1 px-3 py-1 rounded-md bg-black/70">
            {data.info.stats.rating}
          </p>
        </div>
        <Link href={`/pages/Anime/watch/${data.info.id}`}>
          <button
            className="p-[12px] text-[14px] max-md:text-[10px] max-md:p-2 w-full bg-neutral-700/20 box-shadow rounded-md font-semibold hover:bg-indigo-400 transition-full"
            aria-label={page === "Details" ? "Watch Now" : "More Info"}
          >
            {page === "Details" ? "WATCH NOW" : "INFO"}
          </button>
        </Link>
        <button
          className="p-[12px] text-[14px] max-md:p-2 max-md:text-[10px] bg-neutral-700/20 box-shadow rounded-md font-semibold hover:bg-indigo-400 transition-full"
          aria-label="Watch Trailer"
        >
          TRAILER
        </button>
        <div className="flex flex-row justify-between">
          <button
            className="p-[12px] text-[14px] max-md:p-2 max-md:text-[10px] w-[45%] bg-neutral-700/20 box-shadow rounded-md font-semibold hover:bg-indigo-400 transition-full"
            aria-label="Action"
          >
            A
          </button>
          <button
            className="p-[12px] text-[14px] max-md:p-2 max-md:text-[10px] w-[45%] bg-neutral-700/20 box-shadow rounded-md font-semibold hover:bg-indigo-400 transition-full"
            aria-label="MAL"
          >
            MAL
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1 w-[80%]">
        <p
          className="text-[12px] max-md:text-[10px]"
          style={{ color: data.color, fontWeight: 700, fontStyle: "italic" }}
        >
          {"[" +
            (data?.moreInfo?.synonyms || data?.info.jname || data?.info?.name) +
            "]"}
        </p>
        <h1 className="text-2xl max-md:text-base font-bold">
          {data.info.name || data.info.jname}
        </h1>
        <p className="flex flex-wrap gap-3 font-semibold text-primary max-md:hidden mb-2">
          {data.moreInfo.genres.map((genre) => (
            <Badge variant={"secondary"} key={genre}>
              {genre}
            </Badge>
          ))}
          <Separator orientation="vertical" />
          <Badge>{data.malscore || "0.0"}</Badge>
        </p>
        <p className="rounded-xl bg-accent/30 p-2 max-md:hidden italic box-shadow">
          {data.info.description.replace(/<\/?[^>]+(>|$)/g, "")}
        </p>
        <div className="fix-text flex flex-row max-md:flex-col justify-between h-full max-md:text-[13px] text-primary/60">
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
            <p className="w-full text-nowrap">
              Studios:{" "}
              <span className="font-semibold text-primary uppercase">
                {data.moreInfo.studios}
              </span>
            </p>
          </div>
        </div>
        <p className="flex-wrap gap-3 max-md:gap-1 max-md:text-[10px] font-semibold text-primary text-[12px] hidden max-md:flex">
          {data.moreInfo.genres.map((genre) => (
            <span key={genre} className="p-2 rounded-xl bg-accent/30">
              {genre}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default BasicDetails;
