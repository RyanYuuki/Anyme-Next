import {
  faBook,
  faPlayCircle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const VerticalReusableCarousel = ({ data, title }) => {
  return (
    <div className="flex flex-col p-3 gap-4 w-full h-[49%] bg-neutral-700/30 overflow-scroll custom-scrollbar box-shadow rounded-md">
      <h1 className="text-2xl">{title}</h1>
      {data.map((anime) => (
        <div className="flex flex-row gap-5 p-3 bg-accent hover:bg-indigo-400 transition-full rounded-md">
          <img
            className="w-[75px] h-[100px] object-cover rounded-lg"
            src={anime.image}
            alt=""
          />
          <div className="flex flex-col justify-center gap-3 w-full">
            <h1>{anime.title.english || anime.title.romaji}</h1>
            <div className="flex flex-row gap-5">
              <p className="flex flex-row items-center gap-2 p-2 bg-indigo-400 rounded-lg text-white">
                <FontAwesomeIcon
                  icon={anime.type == "MANGA" ? faBook : faPlayCircle}
                />{" "}
                {anime.type}
              </p>
              <p className="flex flex-row items-center gap-2 p-2 bg-indigo-400 rounded-lg text-white">
                {title == "Related" ? null : <FontAwesomeIcon icon={faStar} />}{" "}
                {title == "Related" ? anime.relationType : anime.rating}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerticalReusableCarousel;
