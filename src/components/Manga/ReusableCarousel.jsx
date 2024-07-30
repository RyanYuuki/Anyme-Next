/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faFireAlt } from "@fortawesome/free-solid-svg-icons";

export default function ReusableCarousel({ title, data = [], className }) {
  const demoArray = ["", "", "", "", ""];
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="small-carousel">
        {demoArray.map(() => (
          <div className="carousel-card" />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-5 animated", className)}>
      <h2 className="text-3xl max-md:text-2xl font-semibold border-l-8 border-l-neutral-800 px-5">
        {title}
      </h2>
      <div className="bg-neutral-700/30 rounded-lg box-shadow max-md:p-3">
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
          {data.map((data, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="flex flex-col animated justify-center p-8 items-center gap-3 text-center max-md:p-3">
                  <Link
                    className={`relative carousel overflow-hidden rounded-lg group`}
                    href={`/pages/Manga/details/${data.id}`}
                  >
                    <img
                      className="rounded-xl object-cover h-[290px] w-[230px] max-md:h-[200px]"
                      src={data.image || "/path/to/default-image.jpg"}
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
                    <p className="absolute top-2 left-2 rounded-md flex flex-row justify-center items-center gap-1 px-2 bg-green-200 text-black">
                      <FontAwesomeIcon icon={faFireAlt} />
                      {data.view}
                    </p>
                  </Link>
                  <h4 className="font-semibold max-md:text-sm">
                    {data.title.length > 30
                      ? data.title.substring(0, 30) + "..."
                      : data.title}
                  </h4>
                  <p className="rounded-md text-wrap px-2 bg-white text-black">
                      {data.chapter.length > 20
                        ? data.chapter.substring(0, 20) + "..."
                        : data.chapter}
                    </p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
