"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { Skeleton } from "@/components/ui/skeleton";

const EpisodeList = ({
  episodesData,
  currentEpisode,
  icons,
  handleClick,
}) => {
  const demoEpisodes = [...Array(6)].map((_, i) => i);
  const demoEpisodesList = [...Array(15)].map((_, i) => i);
  const demoEpisodesGrid = [...Array(90)].map((_, i) => i);
  const [currentListType, setCurrentListType] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const handleListChange = () => {
    const newType = (currentListType + 1) % icons.length;
    setCurrentListType(newType);
  };

  const filteredData =
    episodesData &&
    episodesData.length > 0
      && episodesData.filter((data) => {
          const title = data.title;
          const id = data.episodeId;
          const number = data.number;
          const altTitle = "Episode " + number;
          return (
            title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            number
              .toString()
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            altTitle.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });

  return (
    <div className="flex flex-col gap-5 w-[26%] max-md:w-full max-md:h-[400px] max-md:overflow-hidden h-full box-shadow p-2 bg-neutral-700/10 rounded-md">
      <div className="flex flex-row items-center gap-3 w-full">
        <select className="h-[40px] rounded-md px-2 text-[12px] bg-neutral-700/20 ">
          <option
            value={`${episodesData[0]?.number || 1} - ${episodesData?.length}`}
          >
            Episodes
            {` ${episodesData[0]?.number || 1} - ${episodesData?.length}`}
          </option>
        </select>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-lg bg-neutral-700/20 w-full"
          placeholder={"Filter Episodes"}
        />
        <Button onClick={handleListChange} variant={"secondary"} size={"icon"}>
          <FontAwesomeIcon className="px-5" icon={icons[currentListType]} />
        </Button>
      </div>
      <div
        className={`grid ${
          currentListType == 2 ? "grid-cols-6 max-md:grid-cols-5 grid-rows-auto" : "grid-cols-1"
        } gap-2 overflow-y-scroll scroll-smooth custom-scrollbar`}
      >
        {currentListType === 0 && filteredData.length > 0
          ? filteredData.map((data, index) => (
              <button
                key={data.id}
                className={`relative animated group flex flex-row w-full h-[100px] box-shadow rounded-md transition-full hover:bg-indigo-400/70 ${
                  currentEpisode == data.number
                    ? "bg-indigo-400 text-white"
                    : "bg-neutral-700/20"
                }`}
                onClick={() => handleClick(data.number)}
              >
                <div className="absolute p-1 left-2 bottom-2 rounded-md text-white bg-muted">
                  EP {data.number}
                </div>
                <img
                  className="object-cover h-full w-[40%] rounded-l-md"
                  src={data.image}
                  alt={data.number}
                />
                <div className="flex flex-col w-[60%] h-full justify-center text-left pl-3 gap-1">
                  <h1
                    className={`group-hover:text-white transition-full ${
                      currentEpisode == data.number ? "text-white" : ""
                    }`}
                  >
                    Episode {data?.number || index + 1}
                  </h1>
                  <p
                    className={`italic group-hover:text-white max-md:text-[12px] transition-full ${
                      currentEpisode == data.number
                        ? "text-white"
                        : "text-primary/50"
                    }`}
                  >
                    {data?.title.length > 20 ? data?.title.substring(0,20) + '...' : data?.title}
                  </p>
                </div>
              </button>
            ))
          : currentListType == 0 && (
              <div className="flex flex-col gap-3 p-2">
                {demoEpisodes.map(() => (
                  <Skeleton className="flex h-[100px]" >
                    <Skeleton className="w-[30%] rounded-l-md" />
                  </Skeleton>
                ))}
              </div>
            )}
        {currentListType === 1 && filteredData.length > 0
          ? filteredData.map((data) => (
              <button
                key={data.id}
                className={`group flex animated flex-row px-5 items-center gap-3 w-full h-[50px] box-shadow rounded-md transition-full max-md:text-[14px] italic hover:bg-indigo-400/70 ${
                  currentEpisode == data.number
                    ? "bg-indigo-400/95 text-white"
                    : "text-primary/50 bg-neutral-700/20"
                }`}
                onClick={() => handleClick(data.number)}
              >
                <h1
                  className={`group-hover:text-white transition-full ${
                    currentEpisode == data.number ? "text-white" : ""
                  }`}
                >
                  {currentEpisode === data.number ? (
                    <FontAwesomeIcon icon={faPlay} />
                  ) : (
                    data.number + "."
                  )}
                </h1>
                <p
                  className={`group-hover:text-white transition-full ${
                    currentEpisode === data.number
                      ? "text-white"
                      : "text-primary/50"
                  }`}
                >
                  {data.title || "??"}
                </p>
              </button>
            ))
          : currentListType == 1 && (
              <div className="flex flex-col gap-3 p-2">
                {demoEpisodesList.map(() => (
                  <Skeleton className="h-[50px]"></Skeleton>
                ))}
              </div>
            )}
        {currentListType === 2 && filteredData.length > 0
          ? filteredData.map((data) => (
              <button
                key={data.id}
                className={`group animated h-[40px] text-center  box-shadow rounded-md transition-full hover:bg-indigo-400/70 ${
                  currentEpisode == data.number ? "bg-indigo-400/95" : "bg-neutral-700/20"
                }`}
                onClick={() => handleClick(data.number)}
              >
                <span
                  className={`group-hover:text-white transition-full ${
                    currentEpisode === data.number ? "text-white" : ""
                  }`}
                >
                  {currentEpisode === data.number ? (
                    <FontAwesomeIcon icon={faPlay} />
                  ) : (
                    data.number
                  )}
                </span>
              </button>
            ))
          : currentListType == 2 && (
              <div className="grid grid-cols-5 grid-rows-auto gap-3 p-2">
                {demoEpisodesGrid.map(() => (
                  <Skeleton className="h-[35px] w-[70px]"></Skeleton>
                ))}
              </div>
            )}
      </div>
    </div>
  );
};

export default EpisodeList;
