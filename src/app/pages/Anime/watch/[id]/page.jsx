"use client";
import { FetchEpisodesData, FetchStreamingData } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

const StreamingPage = () => {
  const { id } = useParams();
  const [episodesData, setEpisodesData] = useState(null);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [episodeSrc, setEpisodeSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [episodeLoading, setEpisodeLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await FetchEpisodesData(id);
      setEpisodesData(data);
      setIsLoading(false);
    };
    loadData();
  }, [id]);

  useEffect(() => {
    const loadEpisodeData = async () => {
      try {
        if (episodesData) {
          setEpisodeLoading(true);
          const episodeData = await FetchStreamingData(
            episodesData[currentEpisode - 1].id
          );
          const filteredLink = episodeData.find(
            (episode) => episode.quality === "default"
          );
          setEpisodeSrc(filteredLink.url);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setEpisodeLoading(false);
      }
    };
    loadEpisodeData();
  }, [currentEpisode, episodesData]);

  const handleClick = (number) => {
    setCurrentEpisode(number);
  };

  if (isLoading || !episodesData) return <div>Loading...</div>;

  return (
    <div className="flex flex-col px-5">
      <div className="flex flex-row justify-between h-[600px]">
        <div className="h-full w-[72%] rounded-3xl">
          {episodeLoading ? (
            <div>Loading video...</div>
          ) : (
            <MediaPlayer
              className="vds-player"
              title={
                episodesData[currentEpisode - 1].title ||
                `Episode ${currentEpisode}`
              }
              src={episodeSrc || ""}
              crossOrigin
            >
              <MediaProvider />
              <DefaultVideoLayout icons={defaultLayoutIcons} />
            </MediaPlayer>
          )}
        </div>
        <div className="flex flex-col gap-2 w-[28%] overflow-y-scroll scroll-smooth custom-scrollbar h-full">
          {episodesData.map((data) => (
            <div key={data.id}>
              <button
                className={`w-full h-[100px] text-center text-white bg-neutral-500/20 rounded-lg ${
                  currentEpisode === data.number
                    ? "border-2 border-neutral-600"
                    : ""
                }`}
                onClick={() => handleClick(data.number)}
              >
                {data.number}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StreamingPage;
