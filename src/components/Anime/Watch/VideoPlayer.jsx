import React from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider, Poster, Track } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
const VideoPlayer = ({
  episodeSrc,
  episodesData,
  currentEpisode,
  episodeLoading,
  captionsData
}) => {
  const captions = captionsData.filter((caption) => caption.kind == "captions");
  const thumbnails = captionsData.filter(
    (caption) => caption.kind == "thumbnails"
  );
  return (
    <div className="h-full w-[72%] max-md:w-full rounded-3xl">
      {episodeLoading ? (
        <div>Loading video...</div>
      ) : (
        <MediaPlayer
          className="vds-player animated"
          title={
            episodesData[currentEpisode - 1]?.title ||
            `Episode ${currentEpisode}`
          }
          src={episodeSrc || ""}
          crossOrigin
        >
          <MediaProvider>
            <Poster className="vds-poster" src={episodesData[currentEpisode - 1].image} />
            {captions.map((c) => (
              <Track
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
      )}
    </div>
  );
};

export default VideoPlayer;
