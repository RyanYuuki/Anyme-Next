import React from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
const VideoPlayer = ({
  episodeSrc,
  episodesData,
  currentEpisode,
  episodeLoading,
}) => {
  return (
    <div className="h-full w-[72%] rounded-3xl">
      {episodeLoading ? (
        <div>Loading video...</div>
      ) : (
        <MediaPlayer
          className="vds-player"
          title={
            episodesData[currentEpisode - 1]?.title ||
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
  );
};

export default VideoPlayer;
