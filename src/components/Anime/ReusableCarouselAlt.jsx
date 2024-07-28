/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClosedCaptioning, faMicrophone, faPlay } from "@fortawesome/free-solid-svg-icons";

export default function ReusableCarouselAlt({ title, data = [], className }) {
  return (
    <div className={cn("flex flex-col gap-5 animated", className)}>
      <h2 className="text-3xl max-md:text-2xl font-semibold border-l-8 border-l-neutral-800 px-5">
        {title}
      </h2>
      <div className="bg-neutral-700/30 rounded-lg box-shadow p-3 pt-5">
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
              slidesPerView: 3,
              spaceBetween: 10,
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
              spaceBetween: 20,
            },
          }}
          style={{ cursor: "grab" }}
        >
          {data.length > 0 ? (
            data.map((anime, index) => {
              const isManga = anime.type === "MANGA";
              return (
                <SwiperSlide key={index}>
                  <div className="group flex flex-col items-center animated justify-center gap-3 p-3 max-md:p-0 text-center">
                    <Link
                    className="relative transition-full"
                      href={
                        isManga
                          ? `/Manga/details/${anime.id}`
                          : `/pages/Anime/details/${anime.id}`
                      }
                    >
                      <img
                        className="rounded-2xl object-cover h-[290px] w-[230px] max-md:h-[230px] max-md:w-[200px] animated"
                        src={anime.poster || "/path/to/default-image.jpg"}
                        alt={anime.id}
                        draggable="false"
                        onError={(e) =>
                          (e.target.src = "/path/to/default-image.jpg")
                        }
                      />
                      <div className="absolute flex justify-center items-center h-full w-full top-0 group-hover:seasonCard transition-full rounded-xl" >
                      <FontAwesomeIcon className="text-3xl group-hover:opacity-100 opacity-0 transition-full" icon={faPlay} />
                      </div>
                      <div className="absolute left-[10px] bottom-[10px] flex flex-row gap-[5px] items-center text-[14px]">
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
                    <h4 className="font-semibold">
                      {anime.name.length > 30 ? anime.name.substring(0,30) + '...' : anime.name || anime.jname}
                    </h4>
                  </div>
                </SwiperSlide>
              );
            })
          ) : (
            <h1 className="p-5">
              {title} Data Not Found {":)"}
            </h1>
          )}
        </Swiper>
      </div>
    </div>
  );
}
