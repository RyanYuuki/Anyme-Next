import { faBook, faFireAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { Skeleton } from "../ui/skeleton";

const ReusableStack = ({ data }) => {
  const MetaData = [
    {
      title: "Top Airing",
      index: 0,
    },
    {
      title: "Most Popular",
      index: 1,
    },
    {
      title: "Most Favourite",
      index: 2,
    },
    {
      title: "Most Completed",
      index: 3,
    },
  ];

  const renderSkeletons = () => {
    return Array.from({ length: 5 }).map((_, idx) => (
      <div
        key={idx}
        className="flex flex-row gap-3 bg-neutral-700/20 animated hover:bg-indigo-400 transition-full rounded-lg p-3 box-shadow"
      >
        <Skeleton className="xl:h-[100px] h-[70px] w-[100px] object-cover max-md:w-[70px] rounded-lg" />
        <div className="flex flex-col justify-center gap-2 w-full">
          <Skeleton className="h-[20px] w-[80%]" />
          <div className="flex flex-row gap-[2px] w-full items-center text-[12px]">
            <Skeleton className="h-[20px] w-[40px] rounded-l-sm bg-green-200 text-black" />
            <Skeleton className="h-[20px] w-[40px] rounded-r-sm bg-blue-200 text-black" />
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex flex-row justify-between pb-5 animated max-md:flex-col max-md:gap-5">
      {MetaData.map(({ title, index }) => {
        const currentData = data?.[index];
        return (
          <div
            key={index}
            className="flex flex-col bg-neutral-700/10 box-shadow p-5 w-[24%] max-md:w-full gap-5 rounded-md"
          >
            <h1 className="text-2xl">{title}</h1>
            {currentData
              ? currentData.map((dataItem, idx) => {
                  const title = dataItem.title || "??";
                  const formattedTitle =
                    title.length > 40 ? title.substring(0, 40) + "..." : title;
                  return (
                    <Link
                      href={`/pages/Manga/details/${dataItem.id}`}
                      key={idx}
                      className="flex flex-row gap-3 bg-neutral-700/20 animated hover:bg-indigo-400 transition-full rounded-lg p-3 box-shadow"
                    >
                      <img
                        className="xl:h-[100px] h-[70px] w-[100px] object-cover max-md:w-[70px] rounded-lg"
                        src={dataItem.image}
                      />
                      <div className="flex flex-col justify-center gap-2 w-full">
                        <h2>{formattedTitle}</h2>
                        <div className="flex flex-row gap-[2px] w-full items-center text-[12px]">
                          <p className="flex flex-row items-center gap-1 px-1 rounded-l-sm bg-green-200 text-black">
                            <FontAwesomeIcon icon={faFireAlt} />{" "}
                            {dataItem.view}
                          </p>
                          <p className="flex flex-row items-center rounded-r-sm gap-1 px-1 bg-blue-200 text-black">
                            <FontAwesomeIcon icon={faBook} />{dataItem.chapter.length > 10 ? dataItem.chapter.substring(0, 10) : dataItem.chapter || "0"}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })
              : renderSkeletons()}
          </div>
        );
      })}
    </div>
  );
};

export default ReusableStack;
