import React from "react";
import Player from "../../ui/artplayer";

const ArtPlayer = ({
  episodeSrc,
  episodesData,
  currentEpisode,
  episodeLoading,
  captionsData,
}) => {
  if (!episodeSrc) return null;

  return (
    <div className="h-full w-[72%] max-md:w-full rounded-3xl">
      <Player className="vds-player" url={episodeSrc} />
    </div>
  );
};

export default ArtPlayer;
