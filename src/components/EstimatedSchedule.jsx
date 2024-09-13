import React, { useEffect, useState } from "react";
import useCurrentWeekWithDetails from "../hooks/useCurrentWeekWithDetails";
import { FetchEstimatedSchedule } from "@/hooks/useApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPlay } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const EstimatedSchedule = () => {
  const week = useCurrentWeekWithDetails();
  const [scheduleData, setScheduleDate] = useState(null);
  const [activeYear, setActiveYear] = useState(null);
  const [activeDay, setActiveDay] = useState(null);
  const [activeMonth, setActiveMonth] = useState(null);
  const date = new Date();
  const day = date.getDate();

  const disableCopy = {
    userSelect: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
  };

  useEffect(() => {
    if (week.length > 0) {
      setActiveYear(week[0].year);
      setActiveDay(week[day - 1].dayNumber);
      setActiveMonth(week[0].monthNumber);
    }
  }, [week]);

  useEffect(() => {
    if (activeYear && activeMonth && activeDay) {
      const loadData = async () => {
        const data = await FetchEstimatedSchedule(
          activeYear,
          activeMonth,
          activeDay
        );
        if (data) {
          setScheduleDate((prevValue) => data);
        }
      };
      loadData();
    }
  }, [activeDay, activeYear, activeMonth]);

  const handleScheduleDate = (year, month, day) => {
    setActiveYear(year);
    setActiveMonth(month);
    setActiveDay(day);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <h2 className="text-3xl font-semibold border-l-8 border-l-ring px-5">
        Estimated Schedule
      </h2>
      <div className="flex flex-col gap-5 justify-center items-center bg-neutral-700/30 p-5 rounded-md">
        <div className="flex flex-row gap-3 w-full">
          <Swiper
            initialSlide={day-1}
            centeredSlidesBounds={true}
            centeredSlides={true}
            breakpoints={{
              300: {
                spaceBetween: 20,
                slidesPerView: 2,
              },
              400: {
                spaceBetween: 20,
                slidesPerView: 2,
              },
              600: {
                spaceBetween: 20,
                slidesPerView: 3,
              },
              768: {
                spaceBetween: 20,
                slidesPerView: 3,
              },
              1200: {
                spaceBetween: 20,
                slidesPerView: 5,
              },
            }}
          >
            {week.map((data, index) => (
              <SwiperSlide key={index}>
                <div
                  onClick={() =>
                    handleScheduleDate(
                      data.year,
                      data.monthNumber,
                      data.dayNumber
                    )
                  }
                  className={`flex flex-col p-2 rounded-xl text-center cursor-pointer ${
                    data.day == activeDay ? "bg-indigo-400 text-white" : "bg-input/50"
                  }`}
                >
                  <h1 style={disableCopy}>{data.weekday.slice(0, 3)}</h1>
                  <p style={disableCopy} className="text-nowrap">
                    {data.month + " " + data.day}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {scheduleData &&
          scheduleData.map((data) => (
            <Link
              href={`/pages/Anime/watch/${data.id}`}
              key={data.id}
              className="flex flex-row justify-between w-full animated p-3 border-b border-input group hover:text-indigo-400"
            >
              <div className="flex flex-row gap-8 items-center">
                <p className="flex flex-row gap-2 items-center group-hover:bg-indigo-400 group rounded-xl group-hover:text-white transition-full group-hover:p-2">
                  <FontAwesomeIcon icon={faClock} /> {data.time}
                </p>
                <h1 className="max-md:text-[12px]">
                  {data.name.length > 30
                    ? data.name.substring(0, 30) + "..."
                    : data.name}
                </h1>
              </div>
              <button className="flex flex-row gap-2 items-center text-nowrap p-2 max-md:text-[13px] group-hover:bg-indigo-400 group-hover:px-3 group rounded-xl group-hover:text-white transition-full">
                <FontAwesomeIcon icon={faPlay} /> Episode {" " + data.episode}
              </button>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default EstimatedSchedule;
