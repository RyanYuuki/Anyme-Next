import "swiper/css";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faCirclePlay,
  faClosedCaptioning,
  faInfoCircle,
  faMicrophone,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

export default function BigCarousel({ data }) {
  const disableCopy = {
    userSelect: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
  };

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="w-full h-[400px]">
        <div className="skeleton-carousel" />
      </div>
    );
  }

  return (
    <div className="w-[100%] rounded-[5px] overflow-hidden animated">
      <Swiper>
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="text-white rounded-[5px] relative">
              <img
                src={item.poster}
                alt="Cover Image"
                className="w-full h-[400px] object-cover max-md:h-[300px]"
              />
              <div className="absolute inset-0 custom-gradient"></div>
              <div className="absolute top-0 h-full w-[50%] flex flex-col gap-5 p-10 max-md:p-2 justify-end max-md:w-full">
                <h2 style={{ fontSize: 20 }}>#{index + 1} Spotlight</h2>
                <h1
                  style={disableCopy}
                  className="text-3xl max-md:text-xl no-select"
                >
                  {item.name || item.jname}
                </h1>
                <div className="flex flex-row gap-5 max-md:gap-1 items-center max-md:text-sm">
                  {item.otherInfo.map((info, idx) => (
                    <Badge variant={'secondary'} key={idx} style={{ ...disableCopy }}>
                      <FontAwesomeIcon className="mr-1" icon={faCirclePlay} /> {info}
                    </Badge>
                  ))}
                  <Separator orientation="vertical" />
                  <div className="flex flex-row gap-[2px] text-[14px] max-md:text-[12px]">
                    <Badge className="bg-green-200 text-black rounded-none rounded-l-md">
                      <FontAwesomeIcon className="mr-1 rounded-none rounded-l-md" icon={faClosedCaptioning} />{" "}
                      {item.episodes.sub || "0"}
                    </Badge>
                    <Badge className="bg-blue-200 text-black rounded-none rounded-r-md">
                      <FontAwesomeIcon className="mr-1 rounded-none rounded-r-md" icon={faMicrophone} />{" "}
                      {item.episodes.dub || "0"}
                    </Badge>
                  </div>
                </div>
                <p style={disableCopy} className="lg:block max-md:hidden">
                  {item.description.length > 150
                    ? item.description.substring(0, 150) + "..."
                    : item.description}
                </p>
                <div className="flex flex-row gap-5">
                  <Link href={`/pages/Anime/watch/${item.id}`}>
                    <Button className="flex flex-row gap-1 px-[18px] py-[8px] max-md:py-[0px] max-md:px-[10px] rounded-3xl transition-all duration-500 hover:scale-110 active:scale-75">
                      <FontAwesomeIcon icon={faPlay} /> Watch Now
                    </Button>
                  </Link>
                  <Link href={`/pages/Anime/details/${item.id}`}>
                    <Button className="flex flex-row gap-1 text-base px-[18px] py-[10px] max-md:px-[10px] max-md:py-[10px] bg-white/20 text-white rounded-3xl hover:bg-indigo-400 hover:text-white transition-all duration-500 hover:scale-110 active:scale-75">
                      <FontAwesomeIcon icon={faInfoCircle} /> Detail
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
