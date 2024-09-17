/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClosedCaptioning,
  faMicrophone,
  faPlay,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Skeleton } from "./ui/skeleton";

export default function ReusableCarousel({ title, data = [], className }) {
  const isLoading = !Array.isArray(data) || data.length === 0;
  const displayData = isLoading ? Array(5).fill(null) : data;

  return (
    <div className={cn("flex flex-col gap-5 animated", className)}>
      <h2 className="text-3xl max-md:text-2xl font-semibold border-l-8 border-ring px-5">
        {title}
      </h2>
      <div className="bg-neutral-700/20 rounded-lg box-shadow max-md:p-3">
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            300: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            350: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            400: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            992: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
          style={{ cursor: "grab" }}
        >
          {displayData.map((anime, index) => (
            <SwiperSlide key={anime?.id || index}>
              <div className="flex flex-col justify-center p-8 items-center gap-3 text-center max-md:p-0">
                {isLoading ? (
                  <>
                    <Skeleton className="h-[290px] w-[230px] max-md:h-[250px] rounded-lg" />
                    <Skeleton className="h-4 w-3/4 mt-2 rounded" />
                  </>
                ) : (
                  <>
                    <Link
                      className={`relative carousel overflow-hidden rounded-lg group`}
                      href={
                        anime.type === "MANGA"
                          ? `/Manga/details/${anime.id}`
                          : `/pages/Anime/details/${anime.id}`
                      }
                    >
                      <img
                        className="rounded-xl object-cover h-[290px] w-[230px] max-md:h-[250px]"
                        src={'https://anymey-proxy.vercel.app/cors?url=' + anime.poster || "/path/to/default-image.jpg"}
                        draggable="false"
                        onError={(e) =>
                          (e.target.src = "/path/to/default-image.jpg")
                        }
                      />
                      <div className="absolute flex justify-center items-center h-full w-full top-0 group-hover:seasonCard transition-full rounded-xl">
                        <FontAwesomeIcon
                          className="text-3xl group-hover:opacity-100 opacity-0 transition-full"
                          icon={faPlay}
                        />
                      </div>
                      <div className="absolute left-[7px] bottom-[7px] flex flex-row gap-[2px] items-center text-[14px]">
                        <p className="flex flex-row justify-center items-center gap-1 px-1 rounded-sm bg-green-200 text-black">
                          <FontAwesomeIcon icon={faClosedCaptioning} />{" "}
                          {anime.episodes.sub}
                        </p>
                        <p className="flex flex-row justify-center items-center gap-1 px-1 rounded-sm bg-blue-200 text-black">
                          <FontAwesomeIcon icon={faMicrophone} />{" "}
                          {anime.episodes.dub || "0"}
                        </p>
                      </div>
                    </Link>
                    <h4 className="font-semibold max-md:text-[12px]">
                      {anime.name.length > 20
                        ? anime.name.substring(0, 20) + "..."
                        : anime.name}
                    </h4>
                  </>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
