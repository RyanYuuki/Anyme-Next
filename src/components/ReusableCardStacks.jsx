import {
  faClosedCaptioning,
  faMicrophone,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton"; 

const ReusableCardStacks = ({ withGenres, genresData, data, title }) => {
  const isLoading = 
    !Array.isArray(data) || 
    data.length === 0 || 
    (withGenres && (!Array.isArray(genresData) || genresData.length === 0));

  if (isLoading) {
    return (
      <div className="flex flex-row max-md:flex-col max-md:gap-[20px] justify-between">
        <div className={`flex flex-col gap-5 ${ withGenres ? 'w-[69%]' : 'w-full'} max-md:w-full`}>
          <Skeleton className="h-10 w-36" />
          <div className={`grid ${ withGenres ? 'grid-cols-5' : 'grid-cols-6' } grid-row-auto max-md:grid-cols-2 place-items-center gap-5 p-5 bg-neutral-700/30 rounded-md`}>
            {Array(14).fill(null).map((_, index) => (
              <div key={index} className="flex flex-col gap-2">
                <Skeleton className="w-[173px] h-[244px] rounded-lg" />
                <Skeleton className="h-6 w-40" />
                <div className="flex flex-row gap-2">
                  <Skeleton className="h-6 w-16 rounded" />
                  <Skeleton className="h-6 w-16 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
        {withGenres && (
          <div className="flex flex-col gap-5 w-[25%] max-md:w-full">
            <Skeleton className="h-8 w-24" />
            <div className="grid grid-cols-3 auto-rows-max gap-2 p-5 bg-neutral-700/30 rounded-md">
              {Array(41).fill(null).map((_, index) => (
                <Skeleton key={index} className="h-8 w-full rounded-md" />
              ))}
            </div>
          </div>
        )}
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
              <div className="relative flex items-center justify-center w-[173px] max-sm:w-[150px]">
                <img
                  className="w-[173px] h-[244px] object-cover rounded-lg max-sm:h-[220px]"
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

              <h2 className="whitespace-nowrap overflow-hidden text-ellipsis">
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
            {genresData.map((genre) => (
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
