import { faBook, faClosedCaptioning, faFireAlt, faMicrophone, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

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

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="w-full h-[600px]">
        <div className="skeleton-carousel" />
      </div>
    );
  }


  return (
    <div className="flex flex-row justify-between pb-5 animated max-md:flex-col max-md:gap-5">
      {MetaData.map(({ title, index }) => {
        const currentData = data[index];
        return (
          <div
            key={index}
            className="flex flex-col bg-neutral-700/20 box-shadow p-5 w-[24%] max-md:w-full gap-5 rounded-md"
          >
            <h1 className="text-2xl">{title}</h1>
            {currentData &&
              currentData.map((dataItem, idx) => {
                const title = dataItem.title || '??';
                const formattedTitle =
                  title.length > 40 ? title.substring(0, 40) + "..." : title;
                return (
                  <Link
                    href={`/pages/Manga/details/${dataItem.id}`}
                    key={idx}
                    className="flex flex-row gap-3 bg-neutral-600/20 animated hover:bg-indigo-400 transition-full rounded-lg p-3 box-shadow"
                  >
                      <img
                        className="xl:h-[100px] h-[70px] w-[100px] object-cover max-md:w-[70px] rounded-lg"
                        src={dataItem.image}
                      />
                    <div className="flex flex-col justify-center gap-2 w-full">
                      <h2>{formattedTitle}</h2>
                      <div className="flex flex-row gap-[2px] w-full items-center text-[12px]">
                        <p className="flex flex-row items-center gap-1 px-1 rounded-l-sm bg-green-200 text-black">
                          {" "}
                          <FontAwesomeIcon icon={faFireAlt} />{" "}
                          {dataItem.view}
                        </p>
                        <p className="flex flex-row items-center gap-1 px-1 bg-blue-200 text-black">
                          {" "}
                          <FontAwesomeIcon icon={faBook} /> {dataItem.chapter.length > 13 ? dataItem.chapter.substring(0,13) + '...' : dataItem.chapter || '0'}
                        </p>
                        <p className="px-2 rounded-r-sm bg-primary/30">
                          MANGA
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

export default ReusableStack;
