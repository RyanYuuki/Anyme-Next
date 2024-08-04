"use client";
import {
  FetchAnimeByAniwatchID,
  FetchEpisodesByMappedID,
  FetchEpisodeLinksByMappedID,
  FetchEpisodesData,
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
  const { id } = useParams();
  const [animeData, setAnimeData] = useState(null);
  const [episodesData, setEpisodesData] = useState(null);
  const [episodeImages, setEpisodeImages] = useState({});
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [episodeSrc, setEpisodeSrc] = useState(null);
  const [captionsData, setCaptionsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [episodeLoading, setEpisodeLoading] = useState(true);
  const [activeServer, setActiveServer] = useState("VidStream");
  const [episodeType, setEpisodeType] = useState("sub");
  const Servers = ["VidStream", "MegaCloud", "StreamSB"];
  const icons = [faBars, faTableCells, faImage];

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const MetaData = await FetchAnimeByAniwatchID(id);
      setAnimeData(MetaData);
      if (MetaData) {
        const EpisodesData = await FetchEpisodesByMappedID(id);
        setEpisodesData(EpisodesData.episodes);
        fetchEpisodeImages(MetaData.anime.info.anilistId);
      }
      setIsLoading(false);
    };

    const fetchEpisodeImages = async (anilistId) => {
      const EpisodeData = await FetchEpisodesData(anilistId);
      if (EpisodeData) {
        setEpisodeImages(
            EpisodeData.reduce((acc, episode, index) => {
              acc[index + 1] = episode.image;
              return acc;
            }, {})
        );
      }
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
          console.log(episodesData[currentEpisode - 1].episodeId);
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

  const episodesWithImages =
    episodesData &&
    episodesData.map((episode, index) => ({
      ...episode,
      image: episodeImages[index + 1] || animeData.anime.info.poster,
    }));

  return (
    <div className="flex flex-col px-5 gap-3 max-md:px-2">
      <div className="flex flex-row justify-between max-md:h-auto max-md:flex-col">
        <VideoPlayer
          episodeLoading={episodeLoading}
          episodeSrc={episodeSrc}
          episodesData={episodesWithImages}
          currentEpisode={currentEpisode}
          captionsData={captionsData || []}
        />
        <EpisodeList
          episodesData={episodesWithImages || []}
          currentEpisode={currentEpisode}
          icons={icons}
          handleClick={handleClick}
        />
      </div>
      {animeData ? (
        <div className="flex flex-row max-md:flex-col max-md:gap-5 w-full justify-between">
          <div className="flex flex-col w-[72%] max-md:w-full gap-3">
            <ServerSelector
              onClick={handleServer}
              episodeType={episodeType}
              activeServer={activeServer}
              Servers={Servers}
              currentEpisode={currentEpisode}
            />
            <BasicDetails data={animeData.anime} page="Streaming" />
            {animeData.seasons.length > 0 && (
              <AnimeRelation relations={animeData.seasons} />
            )}
          </div>
          <div className="flex flex-col w-[26%] max-md:w-full h-full gap-2">
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
