'use client'
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
import { useUserData } from "@/provider/database";
import {
  FetchAnimeByAniwatchID,
  FetchEpisodesByMappedID,
  FetchEpisodeLinksByMappedID,
  FetchEpisodesData,
} from "@/hooks/useApi";

const StreamingPage = () => {
  const { id } = useParams();
  const [animeData, setAnimeData] = useState(null);
  const [episodesData, setEpisodesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [episodeImages, setEpisodeImages] = useState({});
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [episodeSrc, setEpisodeSrc] = useState(null);
  const [captionsData, setCaptionsData] = useState(null);
  const [episodeLoading, setEpisodeLoading] = useState(true);
  const [activeServer, setActiveServer] = useState("VidStream");
  const [episodeType, setEpisodeType] = useState("sub");
  const [lastSavedTime, setLastSavedTime] = useState(0); 
  const { addAnimeEpisode, currentlyWatching } = useUserData();
  const [episodeDuration, setEpisodeDuration] = useState(1440);
  const [currentTime, setCurrentTime] = useState(0);

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
        }
      } catch (error) {
        console.log(error);
      } finally {
        setEpisodeLoading(false);
      }
    };
    loadEpisodeData();
  }, [currentEpisode, episodesData, episodeType, activeServer]);

  const shouldSaveProgress = (currentTime) => {
    return currentTime - lastSavedTime >= 240; 
  };

  const updateDatabase = () => {
    if (animeData != null && shouldSaveProgress(currentTime)) {
      addAnimeEpisode(
        animeData.anime.info.id,
        animeData.anime.info.name ?? animeData.anime.info.jname ?? "??",
        episodesData[currentEpisode - 1].title,
        episodesWithImages[currentEpisode - 1].image ??
          animeData.anime.info.poster,
        currentEpisode,
        animeData.anime.info.stats.episodes.sub,
        currentTime,
        episodeDuration
      );
      setLastSavedTime(currentTime); 
      console.log(currentlyWatching);
    }
  };

  useEffect(() => {
    updateDatabase();
  }, [currentEpisode, currentTime, episodeDuration, episodeImages]);

  const handleClick = (number) => {
    setCurrentEpisode(number);
  };

  const handleServer = (type, server) => {
    setEpisodeType(type);
    setActiveServer(server);
  };

  const handleTimeUpdate = (event) => {
    const currentTime = event.currentTime;
    setCurrentTime(currentTime);
  };

  const handleDurationChange = (event) => {
    const duration = event.duration;
    setEpisodeDuration(duration);
  };

  const episodesWithImages =
    episodesData &&
    episodesData.map((episode, index) => ({
      ...episode,
      image: episodeImages[index + 1] || animeData.anime.info.poster,
    }));

  return (
    <div className="flex flex-col px-5 gap-3 max-md:px-2">
      <div className="flex flex-row justify-between h-[550px] max-md:flex-col rounded-lg">
        <VideoPlayer
          episodeLoading={episodeLoading}
          episodeSrc={episodeSrc}
          episodesData={episodesWithImages}
          currentEpisode={currentEpisode}
          captionsData={captionsData || []}
          setProgress={handleTimeUpdate}
          setDuration={handleDurationChange}
        />
        <EpisodeList
          episodesData={episodesWithImages || []}
          currentEpisode={currentEpisode}
          icons={[faBars, faTableCells, faImage]}
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
              Servers={["VidStream", "MegaCloud", "StreamSB"]}
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
