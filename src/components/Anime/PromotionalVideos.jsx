import { Poster } from "@vidstack/react";
import React from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const PromotionalVideos = ({ data }) => {
  return (
    <div className="flex flex-col w-full bg-neutral-700/30 rounded-md p-5 gap-10">
      <h1 className="text-2xl">Promotional Videos</h1>
      <div className="p-2 px-10">
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="w-[500px] h-[250px]">
                <MediaPlayer
                  title={item.title}
                  src={item.source}
                  className="vds-player"
                >
                  <MediaProvider>
                    <Poster className="vds-poster" src={item.thumbnail} />
                  </MediaProvider>
                  <DefaultVideoLayout icons={defaultLayoutIcons} />
                </MediaPlayer>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PromotionalVideos;
