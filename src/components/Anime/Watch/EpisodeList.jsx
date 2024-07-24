"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const EpisodeList = ({ episodesData, currentEpisode, icons, handleClick }) => {
  const [currentListType, setCurrentListType] = useState(0);

  const handleListChange = () => {
    const newType = (currentListType + 1) % icons.length;
    setCurrentListType(newType);
  };

  return (
    <div className="flex flex-col gap-5 w-[26%] overflow-y-scroll scroll-smooth custom-scrollbar h-full p-5 bg-neutral-800/30 rounded-md">
      <div className="flex flex-row items-center gap-3 w-full">
        <select className="h-[40px] rounded-md px-2 text-[12px] bg-input">
          <option
            value={`${episodesData[0]?.number || 1} - ${episodesData?.length}`}
          >
            Episodes
            {` ${episodesData[0]?.number || 1} - ${episodesData?.length}`}
          </option>
        </select>
        <Input
          className=" rounded-lg bg-input w-full"
          placeholder={"Filter Episodes"}
        />
        <Button onClick={handleListChange} variant={"secondary"} size={"icon"}>
          <FontAwesomeIcon className="px-5" icon={icons[currentListType]} />
        </Button>
      </div>
      <div
        className={`flex ${
          currentListType == 2 ? "flex-wrap" : "flex-col"
        } gap-2 justify-center`}
      >
        {currentListType === 0 &&
          episodesData.map((data) => (
            <button
              className={`flex flex-row w-full h-[100px] bg-neutral-500/20 rounded-lg box-shadow transition-full ${
                currentEpisode === data.number ? "border-1 bg-indigo-400" : ""
              }`}
              onClick={() => handleClick(data.number)}
            >
              <img
                className="object-cover h-full w-[40%] rounded-l-lg"
                src={data.image}
                alt={data.number}
              />
              <div className="flex flex-col w-[60%] text-white/65 justify-center text-left pl-3 gap-2">
                <h1>Episode {data?.number}</h1>
                <p className="italic text-white/60">{data?.title}</p>
              </div>
            </button>
          ))}
        {currentListType === 1 &&
          episodesData.map((data) => (
            <button
              className={`flex flex-row px-5 text-white/65 items-center gap-3 w-full h-[50px] bg-neutral-500/20 rounded-lg transition-full ${
                currentEpisode === data.number ? "bg-indigo-400" : ""
              }`}
              onClick={() => handleClick(data.number)}
            >
              <h1>
                {currentEpisode === data.number ? (
                  <FontAwesomeIcon icon={faPlay} />
                ) : (
                  data.number + "."
                )}
              </h1>
              <p>{data.title || "??"}</p>
            </button>
          ))}
        {currentListType === 2 &&
          episodesData.map((data) => (
            <button
              className={`w-[18%] h-[40px] text-center text-white/65 bg-neutral-500/20 rounded-lg transition-full ${
                currentEpisode === data.number ? "bg-indigo-400" : ""
              }`}
              onClick={() => handleClick(data.number)}
            >
              {currentEpisode === data.number ? (
                <FontAwesomeIcon icon={faPlay} />
              ) : (
                data.number
              )}
            </button>
          ))}
      </div>
    </div>
  );
};

export default EpisodeList;
