/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faFireAlt } from "@fortawesome/free-solid-svg-icons";
import { Skeleton } from "../ui/skeleton";

export default function ReusableCarousel({ title, data, className }) {
  return (
    <div className={cn("flex flex-col gap-5 animated", className)}>
      <h2 className="text-3xl max-md:text-2xl font-semibold border-l-8 border-l-neutral-800 px-5">
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
          {data
            ? data.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="flex flex-col animated justify-center p-8 items-center gap-3 text-center max-md:p-0">
                    <Link
                      className="relative carousel overflow-hidden rounded-lg group"
                      href={`/pages/Manga/details/${item.id}`}
                    >
                      <img
                        className="rounded-xl object-cover h-[290px] w-[230px] max-md:h-[250px]"
                        src={item.image || "/path/to/default-image.jpg"}
                        draggable="false"
                        onError={(e) =>
                          (e.target.src = "/path/to/default-image.jpg")
                        }
                      />
                      <div className="absolute flex justify-center items-center h-full w-full top-0 group-hover:seasonCard transition-full rounded-xl">
                        <FontAwesomeIcon
                          className="text-3xl group-hover:opacity-100 opacity-0 transition-full"
                          icon={faBook}
                        />
                      </div>
                      <p className="absolute top-2 left-2 rounded-md flex flex-row justify-center items-center gap-1 px-2 bg-white text-black ">
                        <FontAwesomeIcon icon={faFireAlt} />
                        {item.view}
                      </p>
                    </Link>
                    <h4 className="font-semibold max-md:text-sm">
                      {item.title.length > 20
                        ? item.title.substring(0, 20) + "..."
                        : item.title}
                    </h4>
                    <p className="rounded-md text-wrap px-2 bg-primary/20">
                      {item.chapter.length > 13
                        ? item.chapter.substring(0, 13) + "..."
                        : item.chapter}
                    </p>
                  </div>
                </SwiperSlide>
              ))
            : Array.from({ length: 10 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <div className="w-[250px] h-[330px]" >
                    <Skeleton className="h-full w-full rounded-lg" />
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
}
