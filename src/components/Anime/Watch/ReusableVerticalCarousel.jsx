import {
  faBook,
  faLayerGroup,
  faPlayCircle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const VerticalReusableCarousel = ({ data, title }) => {
  return (
    <div className="flex flex-col p-3 gap-3 w-full h-[49%] bg-neutral-700/30 overflow-scroll custom-scrollbar rounded-md">
      <h1 className="text-xl">
        <FontAwesomeIcon icon={title == "RELATED" ? faLayerGroup : faStar} />{" "}
        {title}
      </h1>
      <div className="flex flex-col gap-2">
        {data.map((anime) => (
          <div className="group flex flex-row gap-5 p-1 bg-accent hover:bg-indigo-400 hover:text-white transition-full rounded-md items-center">
            <img
              className="w-[69px] h-[96px] object-cover rounded-lg"
              src={anime.image}
              alt=""
            />
            <div className="flex flex-col justify-center gap-3 w-full">
              <h2 className="group-hover:text-white">
                {anime.title.english || anime.title.romaji}
              </h2>
              <div className="flex flex-row gap-5 text-[12px] text-primary/50">
                <p className="flex flex-row items-center gap-1 rounded-lg group-hover:text-white">
                  <FontAwesomeIcon
                    icon={anime.type == "MANGA" ? faBook : faPlayCircle}
                  />{" "}
                  {anime.type}
                </p>
                <p className="flex flex-row items-center gap-1 rounded-lg group-hover:text-white">
                  {title == "RELATED" ? null : (
                    <FontAwesomeIcon icon={faStar} />
                  )}{" "}
                  {title == "RELATED" ? anime.relationType : anime.rating}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalReusableCarousel;
