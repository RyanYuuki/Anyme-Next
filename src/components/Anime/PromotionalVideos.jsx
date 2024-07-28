import { Poster } from "@vidstack/react";
import React from "react";
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';


const PromotionalVideos = ({ data }) => {
  return (
    <div className="flex flex-col w-full bg-neutral-700/30 rounded-md p-5 gap-10">
      <h1 className="text-2xl" >Promotional Videos</h1>
      <div className="flex flex-row justify-evenly overflow-scroll custom-scrollbar gap-3">
        {data.map((data) => {
          return (
            <div className="w-[40%] h-[250px]" >
            <MediaPlayer className="vds-player" title={data.title} src={data.source}>
              <MediaProvider>
                </MediaProvider>
              <DefaultVideoLayout
                icons={defaultLayoutIcons}
              />
            </MediaPlayer>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PromotionalVideos;
