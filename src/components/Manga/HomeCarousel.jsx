import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faFireAlt,
  faHeart,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const HomeCarousel = ({ data }) => {
  const disableCopy = {
    userSelect: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
  };

  return (
    <div className="w-full overflow-hidden animated rounded-md box-shadow">
      <Swiper>
        {data
          ? data.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="rounded-5 relative">
                  <div className="object-cover w-full h-[400px] object-center inset-0 max-md:h-[250px] bg-neutral-700/20" />
                  <div className="absolute inset-0 custom-blur"></div>
                  <div className="absolute top-0 h-full w-full flex flex-row gap-10 max-md:gap-5 max-md:p-2 p-10">
                    <div className="relative flex items-center flex-shrink-0">
                      <img
                        className="h-[300px] w-[220px] object-cover rounded-lg max-md:h-[150px] max-md:w-[100px]"
                        src={item.image}
                        alt={item.title || "Image"}
                      />
                      <p className="absolute top-4 left-1 p-2 px-3 max-md:text-[10px] max-md:px-1 max-md:p-0 max-md:top-auto max-md:mb-[120px] rounded-md text-sm bg-white text-black">
                        <FontAwesomeIcon icon={faFireAlt} /> {item.view}
                      </p>
                      {item.chapter && (
                        <p className="absolute max-md:hidden bottom-[15px] max-md:bottom-[50px] right-[6px] p-2 rounded-md text-sm max-md:text-[10px] max-md:px-1 max-md:p-0 bg-white text-black">
                          {item.chapter.split(":")[0]}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col justify-center gap-5">
                      <h2 className="text-2xl max-md:text-base">
                        #{index + 1} Spotlight
                      </h2>
                      <h1
                        style={disableCopy}
                        className="text-3xl max-md:text-xl no-select"
                      >
                        {item.title.length > 50
                          ? item.title.substring(0, 50) + "..."
                          : item.title || "??"}
                      </h1>
                      <p style={disableCopy} className="lg:block max-md:hidden">
                        {item.description.length > 400
                          ? item.description.substring(0, 500) + "..."
                          : item.description}
                      </p>
                      <div className="flex flex-row gap-5 items-center max-md:translate-x-[-20px] max-md:gap-0">
                        <Link href={`/pages/Manga/read/${item.id}/chapter-1`}>
                          <Button className="flex flex-row gap-1 max-md:scale-75">
                            <FontAwesomeIcon icon={faBook} /> Read Now
                          </Button>
                        </Link>
                        <Link href={`/pages/Manga/details/${item.id}`}>
                          <Button className="flex flex-row gap-1 max-md:scale-75">
                            <FontAwesomeIcon icon={faInfoCircle} /> Detail
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          : Array.from({ length: 10 }).map((_, index) => (
              <SwiperSlide>
                <Skeleton className="w-full h-[400px] rounded-md" />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default HomeCarousel;
