import { faClosedCaptioning, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { title } from "process";
import React from "react";

const ReusableStack = ({ data }) => {
  const MetaData = [
    {
      title: "Popular",
      index: 0,
    },
    {
      title: "Trending",
      index: 1,
    },
    {
      title: "Most Favourite",
      index: 2,
    },
    {
      title: "Most Watched",
      index: 3,
    },
  ];

  return (
    <div className="flex flex-row justify-between pb-5">
      {MetaData.map(({ title, index }) => {
        const currentData = data[index];
        return (
          <div
            key={index}
            className="flex flex-col bg-neutral-700/20 box-shadow p-5 w-[24%] gap-5 rounded-xl"
          >
            <h1 className="text-2xl">{title}</h1>
            {currentData &&
              currentData.map((dataItem, index) => {
                const title = dataItem?.title?.english || dataItem?.title?.romaji || dataItem?.title?.userPreffered || '??';
                const formattedTitle = title.length > 50 ? title.substring(0,50) + '...' : title;
                return (
                  <div
                    key={index}
                    className="flex flex-row gap-3 bg-neutral-600/20 hover:bg-indigo-400 transition-full rounded-lg p-3 box-shadow"
                  >
                    <Link href={`/pages/Anime/details/${dataItem.id}`}>
                      <img
                        className="xl:h-[100px] h-[70px] w-[100px] rounded-lg"
                        src={dataItem.image}
                        alt={dataItem.title.english || dataItem.title.romaji}
                      />
                    </Link>
                    <div className="flex flex-col justify-center gap-2 w-full">
                      <h2>{formattedTitle}</h2>
                      <div className="flex flex-row gap-[2px] w-full items-center text-[12px]">
                        <p className="flex flex-row items-center gap-1 px-1 rounded-l-sm bg-green-200 text-black">
                          {" "}
                          <FontAwesomeIcon icon={faClosedCaptioning} />{" "}
                          {dataItem.totalEpisodes}
                        </p>
                        <p className="flex flex-row items-center gap-1 px-1 bg-blue-200 text-black">
                          {" "}
                          <FontAwesomeIcon icon={faStar} /> {dataItem.rating}
                        </p>
                        <p className="px-2 rounded-r-sm bg-primary/30">
                          {dataItem.type}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

export default ReusableStack;
