import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faHeart, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";

const HomeCarousel = ({ data }) => {
  const disableCopy = {
    userSelect: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
  };

  return (
    <div className="w-full overflow-hidden animated">
      <Swiper slidesPerView={1}>
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="text-white rounded-5 relative">
              <img
                src={item.image || "/manga-carousel.png"}
                alt={item.title || "Cover Image"}
                className="object-cover w-full h-[400px] object-center"
              />
              <div className="absolute inset-0 bg-black/70 backdrop-blur-lg"></div>
              <div className="absolute top-0 h-full w-full flex flex-row gap-10 p-10">
                <div className="relative flex-shrink-0">
                  <img
                    className="h-[300px] w-[220px] object-cover rounded-lg"
                    src={item.image}
                    alt={item.title || "Image"}
                  />
                  <p className="absolute top-1 left-1 p-2 px-3 rounded-md text-sm bg-indigo-400">
                    <FontAwesomeIcon icon={faHeart} /> {item.view}
                  </p>
                  {item.chapter && (
                    <p className="absolute bottom-[25px] right-[6px] p-2 rounded-md text-sm bg-indigo-400 text-white">
                      {item.chapter.split(':')[0]}
                    </p>
                  )}
                </div>
                <div className="flex flex-col justify-center gap-5 flex-grow">
                  <h2 className="text-2xl">#{index + 1} Spotlight</h2>
                  <h1
                    style={disableCopy}
                    className="text-3xl max-md:text-xl no-select"
                  >
                    {item.title || "??"}
                  </h1>
                  <p style={disableCopy} className="lg:block max-md:hidden">
                    {item.description.length > 400
                      ? item.description.substring(0, 500) + "..."
                      : item.description}
                  </p>
                  <div className="flex flex-row gap-5 items-center">
                    <Link href={`/pages/Manga/watch/${item.id}`}>
                      <Button className="flex flex-row gap-1 ">
                        <FontAwesomeIcon icon={faBook} /> Read Now
                      </Button>
                    </Link>
                    <Link href={`/pages/Manga/details/${item.id}`}>
                      <Button className="flex flex-row gap-1 ">
                        <FontAwesomeIcon icon={faInfoCircle} /> Detail
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeCarousel;
