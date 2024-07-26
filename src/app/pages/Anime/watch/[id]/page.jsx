"use client";
import {
  FetchAnimeByAniwatchID,
  FetchAnimeByID,
  FetchEpisodeLinksByMappedID,
  FetchEpisodesByMappedID,
  FetchEpisodesData,
  FetchStreamingData,
} from "@/hooks/useApi";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  faBars,
  faImage,
  faTableCells,
} from "@fortawesome/free-solid-svg-icons";
import VideoPlayer from "@/components/Anime/Watch/VideoPlayer";
import EpisodeList from "@/components/Anime/Watch/EpisodeList";
import BasicDetails from "@/components/Anime/BasicDetails";
import AnimeRelation from "@/components/Anime/Watch/AnimeRelations";
import ReusableVerticalCarousel from "@/components/Anime/Watch/ReusableVerticalCarousel";
import ServerSelector from "@/components/Anime/Watch/ServerSelector";

const StreamingPage = () => {
  const { id, anilistID } = useParams();
  const [animeData, setAnimeData] = useState(null);
  const icons = [faBars, faTableCells, faImage];
  const [episodesData, setEpisodesData] = useState(null);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [episodeSrc, setEpisodeSrc] = useState(null);
  const [captionsData, setCaptionsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [episodeLoading, setEpisodeLoading] = useState(true);
  const [activeServer, setActiveServer] = useState("VidStream");
  const [episodeType, setEpisodeType] = useState("sub");
  const Servers = ["VidStream", "MegaCloud", "StreamSB"];

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const MetaData = await FetchAnimeByAniwatchID(id);
      setAnimeData(MetaData);
      if (MetaData) {
        const EpisodesData = await FetchEpisodesByMappedID(id);
        const EpisodeData = await FetchEpisodesData(
          MetaData.anime.info.anilistId
        );
        if (EpisodesData) {
          setEpisodesData(
            EpisodesData.episodes.map((data) => {
              const episodeData = EpisodeData[data.number - 1];
              return {
                ...data,
                image: episodeData && episodeData.image ? episodeData.image : MetaData.anime.info.poster,
              };
            })
          );
        }
      }
      setIsLoading(false);
    };
    loadData();
  }, [id]);

  useEffect(() => {
    const loadEpisodeData = async () => {
      try {
        if (episodesData) {
          setEpisodeLoading(true);
          const episodeSrc = await FetchEpisodeLinksByMappedID(
            episodesData[currentEpisode - 1].episodeId,
            activeServer,
            episodeType
          );
          setCaptionsData(episodeSrc.tracks);
          setEpisodeSrc(episodeSrc.sources[0].url);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setEpisodeLoading(false);
      }
    };
    loadEpisodeData();
  }, [currentEpisode, episodesData, episodeType, activeServer]);

  const handleClick = (number) => {
    setCurrentEpisode(number);
  };

  const handleServer = (type, server) => {
    setEpisodeType(type);
    setActiveServer(server);
  };

  if (isLoading || !episodesData) return <div>Loading...</div>;

  return (
    <div className="flex flex-col px-5 gap-3">
      <div className="flex flex-row justify-between h-[600px]">
        <VideoPlayer
          episodeLoading={episodeLoading}
          episodeSrc={episodeSrc}
          episodesData={episodesData}
          currentEpisode={currentEpisode}
          captionsData={captionsData || []}
        />
        <EpisodeList
          episodesData={episodesData || []}
          currentEpisode={currentEpisode}
          icons={icons}
          handleClick={handleClick}
        />
      </div>
      {animeData ? (
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col w-[72%] gap-3">
            <ServerSelector
              onClick={handleServer}
              episodeType={episodeType}
              activeServer={activeServer}
              Servers={Servers}
              currentEpisode={currentEpisode}
            />
            <BasicDetails data={animeData.anime} page="Streaming" />
            <AnimeRelation relations={animeData.seasons} />
          </div>
          <div className="flex flex-col w-[26%] h-full gap-2">
            <ReusableVerticalCarousel
              data={animeData.relatedAnimes}
              title={"RELATED"}
            />
            <ReusableVerticalCarousel
              data={animeData.relatedAnimes}
              title={"RECOMMENDATION"}
            />
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default StreamingPage;
