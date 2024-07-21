import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import "swiper/css";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faCalendarAlt,
  faCirclePlay,
  faInfoCircle,
  faPlay,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";

export default function BigCarousel({ data }) {
  const disableCopy = {
    userSelect: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
  };
  return (
    <Swiper className="w-[97.5%]">
      {data.map((data, index) => (
        <SwiperSlide>
          <div className="relative mt-3 text-white">
            <img
              src={data.cover}
              alt="Cover Image"
              className="w-full h-[400px] object-cover rounded-[5px] max-md:h-[300px]"
            />
            <div className="absolute inset-0 custom-gradient"></div>
            <div className="absolute top-0 h-full w-[50%] flex flex-col gap-5 p-10 max-md:p-2 justify-end max-md:w-full">
              <h1 style={disableCopy} className="text-3xl max-md:text-xl no-select">
                {data.title.english || data.title.romaji}
              </h1>
              <div className="flex flex-row gap-5 items-center max-md:text-sm">
                <p style={disableCopy}>
                  <FontAwesomeIcon icon={faCirclePlay} /> {data.type}
                </p>
                <p
                  style={{
                    color: data.color,
                    fontSize: "16px",
                    textTransform: "uppercase",
                    fontWeight: "600",
                    ...disableCopy,
                  }}
                >
                  {data.status}
                </p>
                <p style={disableCopy}>
                  {" "}
                  <FontAwesomeIcon icon={faCalendarAlt} /> {data.releaseDate}
                </p>
                <p style={disableCopy}>
                  {" "}
                  <FontAwesomeIcon icon={faStar} /> {data.rating}
                </p>
              </div>
              <p style={disableCopy} className="lg:block max-md:hidden">
                {data.description.length > 150
                  ? data.description.substring(0, 150) + "..."
                  : data.description}
              </p>
              <div className="flex flex-row gap-5">
                <Button
                  className="flex flex-row gap-1 px-[18px] py-[8px] max-md:py-[5px] max-md:px-[10px] rounded-3xl hover:bg-primary-foreground hover:text-accent-foreground transition-all duration-500 hover:scale-110 active:scale-75"
                >
                  <FontAwesomeIcon icon={faPlay} /> Watch Now
                </Button>
                <Button
                  className="flex flex-row gap-1 text-base px-[18px] py-[10px] max-md:px-[10px] max-md:py-[10px] bg-white/20 text-white rounded-3xl hover:bg-black hover:text-white transition-all duration-500 hover:scale-110 active:scale-75"
                >
                  <FontAwesomeIcon icon={faInfoCircle} /> Detail
                </Button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
