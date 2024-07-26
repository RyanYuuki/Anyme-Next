import {
  faClosedCaptioning,
  faMicrophone,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useGenerateRandomColor from '../hooks/generateRandomColor';

const ReusableCardStacks = ({ withGenres, genresData , data, title }) => {
  const { generateColor } = useGenerateRandomColor();
  const [colors, setColors] = useState([]);

  useEffect(() => {
    if (withGenres) {
      const newColors = genresData.map(() => generateColor());
      setColors(newColors);
    }
  }, [genresData, withGenres]);

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col gap-5 w-[69%]">
        <h1 className="text-2xl">{title}</h1>
        <div className="flex flex-wrap gap-5 p-5 bg-neutral-700/30 rounded-md">
          {data.map((anime) => (
            <Link
              key={anime.id}
              href={`/pages/Anime/details/${anime.id}`}
              className="flex flex-col group"
            >
              <div className="relative flex items-center justify-center">
                <img
                  className="w-[173px] h-[244px] object-cover rounded-lg"
                  src={anime.poster}
                  alt=""
                />
                <div className="absolute flex justify-center items-center h-full w-full top-0 group-hover:seasonCard transition-full rounded-xl">
                  <FontAwesomeIcon
                    className="text-3xl group-hover:opacity-100 opacity-0 transition-full"
                    icon={faPlay}
                  />
                </div>
                <div className="absolute left-[7px] bottom-[7px] flex flex-row gap-[5px] items-center text-[14px]">
                  <p className="flex flex-row justify-center items-center gap-1 px-1 rounded-sm bg-green-200 text-black">
                    <FontAwesomeIcon icon={faClosedCaptioning} />{" "}
                    {anime.episodes.sub || "0"}
                  </p>
                  <p className="flex flex-row justify-center items-center gap-1 px-1 rounded-sm bg-blue-200 text-black">
                    <FontAwesomeIcon icon={faMicrophone} />{" "}
                    {anime.episodes.dub || "0"}
                  </p>
                </div>
              </div>

              <h2>
                {anime.name.length > 17
                  ? anime.name.substring(0, 17) + "..."
                  : anime.name}
              </h2>
              <div className="flex flex-row gap-2">
                <p>{anime.type}</p>
                <p>{anime.duration}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {withGenres && (
        <div className="flex flex-col gap-5 w-[25%]">
          <h1 className="text-2xl">Genres</h1>
          <div className="grid grid-cols-3 auto-rows-max gap-2 p-5 bg-input rounded-md">
            {genresData.map((genre, index) => (
              <div
                key={genre}
                className="p-2 rounded-md"
                style={{ color: colors[index] , filter: 'brightness(1.2)'}}
              >
                {genre.length > 9 ? genre.substring(0, 9) + ".." : genre}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReusableCardStacks;
