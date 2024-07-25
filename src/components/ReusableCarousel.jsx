/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function ReusableCarousel({ title, data = [], className }) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="carousel-error">
        <p>No {title} anime available at the moment.</p>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <h2 className="text-3xl font-semibold border-l-8 border-l-neutral-800 px-5">
        {title}
      </h2>
      <div className="bg-neutral-700/30 rounded-lg box-shadow">
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
          {data.map((anime, index) => {
            const isManga = anime.type === "MANGA";
            return (
              <SwiperSlide key={index}>
                <div className="flex flex-col justify-center p-8 items-center gap-3 text-center">
                  <Link
                    className={`relative carousel overflow-hidden rounded-2xl`}
                    href={
                      isManga
                        ? `/Manga/details/${anime.id}`
                        : `/pages/Anime/details/${anime.id}`
                    }
                  >
                    <img
                      className="rounded-2xl object-cover h-[290px] 2xl:h-[300px] w-[230px]"
                      src={anime.image || "/path/to/default-image.jpg"}
                      alt={
                        anime.title?.english ||
                        anime.title?.romaji ||
                        anime.title?.userPreferred ||
                        "Anime"
                      }
                      draggable="false"
                      onError={(e) =>
                        (e.target.src = "/path/to/default-image.jpg")
                      }
                    />
                    <p
                      style={{ color: anime.color }}
                      className="absolute bottom-2 left-2 p-2 px-3 rounded-lg bg-black/65 overlay-text"
                    >
                      {anime.type}
                    </p>
                    <p
                      style={{ color: anime.color }}
                      className="absolute right-0 top-0 p-1 px-4 rounded-bl-2xl bg-black overlay-text"
                    >
                      <FontAwesomeIcon icon={faStar} /> {anime.rating}
                    </p>
                  </Link>
                  <h4 className="font-semibold">
                    {anime?.title?.english ||
                      anime?.title?.romaji ||
                      anime?.title?.userPreferred ||
                      "Unknown Title"}
                  </h4>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
