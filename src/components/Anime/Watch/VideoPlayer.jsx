"use client";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider, Poster, Track } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { Skeleton } from "@/components/ui/skeleton";

const VideoPlayer = ({
  episodeSrc,
  episodesData,
  currentEpisode,
  episodeLoading,
  captionsData,
  setProgress,
  setDuration,
}) => {
  const captions = captionsData.filter(
    (caption) => caption.kind === "captions"
  );
  const thumbnails = captionsData.filter(
    (caption) => caption.kind === "thumbnails"
  );

  if (episodeLoading || !episodesData) {
    return (
      <div className="w-[72%] max-md:w-full max-md:h-[200px] max-md:mb-5 flex flex-col gap-4">
        <Skeleton className="flex flex-row items-end p-5 justify-between relative w-full h-full rounded-md">
          <div className="flex flex-row gap-1">
            <Skeleton className="h-[40px] w-[40px] rounded-full" />
            <Skeleton className="h-[40px] w-[40px] rounded-full" />
          </div>
          <Skeleton className="w-[80%] h-[40px]" />
          <div className="flex flex-row gap-1">
            <Skeleton className="h-[40px] w-[40px] rounded-full" />
            <Skeleton className="h-[40px] w-[40px] rounded-full" />
          </div>
        </Skeleton>
      </div>
    );
  }

  return (
    <div className="h-full w-[72%] max-md:w-full rounded-3xl">
      <MediaPlayer
        key={currentEpisode}
        className="vds-player animated"
        title={
          episodesData[currentEpisode - 1]?.title || `Episode ${currentEpisode}`
        }
        src={episodeSrc || ""}
        crossOrigin
        onTimeUpdate={setProgress}
        onLoadedMetadata={setDuration}
      >
        <MediaProvider>
          <Poster
            className="vds-poster"
            src={episodesData[currentEpisode - 1].image}
          />
          {captions.map((c) => (
            <Track
              key={c?.file}
              src={c?.file}
              label={c?.label}
              kind={c?.kind}
              language="en-us"
              type={"vtt"}
              default={c?.default}
            />
          ))}
        </MediaProvider>
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      </MediaPlayer>
    </div>
  );
};

export default VideoPlayer;
