import {
  faClosedCaptioning,
  faMicrophone,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

const ReusableCardStacks = ({ withGenres, genresData, data, title }) => {
  if (
    !Array.isArray(data) ||
    data.length === 0 ||
    (withGenres && !Array.isArray(genresData)) ||
    (withGenres && genresData.length === 0)
  ) {
    return (
      <div className="w-full h-[400px]">
        <div className="skeleton-carousel" />
      </div>
    );
  }

  return (
    <div className="flex flex-row max-md:flex-col max-md:gap-[20px] justify-between">
      <div className={`flex flex-col gap-5 ${ withGenres ? 'w-[69%]' : 'w-full'} max-md:w-full`}>
        <h2 className="text-3xl max-md:text-2xl font-semibold border-l-8 border-l-ring px-5">
          {title}
        </h2>
        <div className={`grid ${ withGenres ? 'grid-cols-5' : 'grid-cols-6' } grid-row-auto max-md:grid-cols-2 place-items-center gap-5 p-5 bg-neutral-700/30 rounded-md`}>
          {data.map((anime) => (
            <Link
              key={anime.id}
              href={`/pages/Anime/details/${anime.id}`}
              className="flex flex-col gap-1 group"
            >
              <div className="relative flex items-center justify-center w-[173px]">
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
                <Badge variant={'secondary'} >{anime.type}</Badge>
                <Badge variant={'secondary'} >{anime.duration}</Badge>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {withGenres && (
        <div className="flex flex-col gap-5 w-[25%] max-md:w-full">
          <h1 className="text-2xl">Genres</h1>
          <div className="grid grid-cols-3 auto-rows-max gap-2 p-5 bg-neutral-700/30 rounded-md">
            {genresData.map((genre, index) => (
              <Link
                href={`/pages/Anime/search/${genre}`}
                key={genre}
                className="p-2 rounded-md"
                style={{ filter: "brightness(1.2)" }}
              >
                {genre.length > 9 ? genre.substring(0, 9) + ".." : genre}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReusableCardStacks;
