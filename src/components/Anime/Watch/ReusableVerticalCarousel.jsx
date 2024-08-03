import {
  faBook,
  faClosedCaptioning,
  faLayerGroup,
  faMicrophone,
  faPlayCircle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const VerticalReusableCarousel = ({ data, title }) => {
  return (
    <div className="flex flex-col p-3 gap-3 animated w-full h-[49%] max-h-[500px] bg-neutral-700/10 overflow-scroll custom-scrollbar rounded-md">
      <h1 className="text-xl">
        <FontAwesomeIcon icon={title == "RELATED" ? faLayerGroup : faStar} />{" "}
        {title}
      </h1>
      <div className="flex flex-col gap-2">
        {data.map((anime) => (
          <Link href={`/pages/Anime/watch/${anime.id}`} className="group flex flex-row gap-5 p-1 bg-neutral-700/20 hover:bg-indigo-400 hover:text-white transition-full rounded-md items-center">
            <img
              className="w-[69px] h-[96px] object-cover rounded-lg"
              src={anime.poster}
              alt=""
            />
            <div className="flex flex-col justify-center gap-3 w-full">
              <h2 className="group-hover:text-white">
                {anime.name || anime.jname}
              </h2>
              <div className="flex flex-row gap-[2px] w-full items-center text-[14px] pl-1 font-semibold">
                <p className="flex flex-row items-center gap-1 px-1 rounded-l-sm bg-green-200 text-black">
                  {" "}
                  <FontAwesomeIcon icon={faClosedCaptioning} />{" "}
                  {anime.episodes.sub}
                </p>
                <p className="flex flex-row items-center gap-1 px-1 bg-blue-200 text-black">
                  {" "}
                  <FontAwesomeIcon icon={faMicrophone} />{" "}
                  {anime.episodes.dub || "0"}
                </p>
                <p className="px-2 rounded-r-sm bg-primary/30">
                  {anime.type}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VerticalReusableCarousel;
