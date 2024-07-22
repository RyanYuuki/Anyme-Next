import { title } from "process";
import React from "react";

const ReusableStack = ({ data }) => {
  const MetaData = [
    {
      title: "Popular",
    },
    {
      title: "Trending",
    },
    {
      title: "Most Favourite",
    },
    {
      title: "Most Watched",
    },
  ];

  return (
    <div className="flex flex-row mx-10 rounded-2xl pb-5">
      {MetaData.map(({ title }) => (
        <div className="flex flex-col bg-zinc-800/30 box-shadow p-5 w-[25%] gap-5">
          <h1 className="text-2xl">{title}</h1>
          {data.map((data) => (
            <div className="flex flex-row gap-3 bg-neutral-900 rounded-lg p-3">
              <img className="xl:h-[100px] rounded-lg" src={data.image} />
              <div className="flex flex-col justify-evenly w-full">
                <h1>{data.title.english || data.title.romaji}</h1>
                <div className="flex flex-row gap-3 w-full">
                  <p>{data.type}</p>
                  <p>{data.status}</p>
                  <p>{data.totalEpisodes}</p>
                  <p>{data.rating}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ReusableStack;
