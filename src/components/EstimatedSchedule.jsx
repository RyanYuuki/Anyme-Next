import React, { useEffect, useState } from "react";
import useCurrentWeekWithDetails from "../hooks/useCurrentWeekWithDetails";
import { FetchEstimatedSchedule } from "@/hooks/useApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const EstimatedSchedule = () => {
  const week = useCurrentWeekWithDetails();
  const [scheduleData, setScheduleDate] = useState(null);
  const [activeYear, setActiveYear] = useState(null);
  const [activeDay, setActiveDay] = useState(null);
  const [activeMonth, setActiveMonth] = useState(null);

  const disableCopy = {
    userSelect: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
  };

  useEffect(() => {
    if (week.length > 0) {
      setActiveYear(week[0].year);
      setActiveDay(week[0].dayNumber);
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
        if(data) {
          setScheduleDate(prevValue => data);
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
      <h2 className="text-3xl font-semibold border-l-8 border-l-neutral-800 px-5">
        Estimated Schedule
      </h2>
      <div className="flex flex-col gap-5 justify-center items-center bg-neutral-700/30 p-5 rounded-md">
        <div className="flex flex-row gap-3 w-full">
          <Swiper
            breakpoints={{
              400: {
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
                  className={`flex flex-col py-[10px] px-[30px] rounded-xl text-center cursor-pointer ${
                    data.day == activeDay ? "bg-indigo-400" : "bg-input"
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
              <div className="flex flex-row gap-8">
                <p>{data.time}</p>
                <h1 className="max-md:text-[12px]">
                  {data.name.length > 30
                    ? data.name.substring(0, 30) + "..."
                    : data.name}
                </h1>
              </div>
              <button className="flex flex-row gap-2 items-center text-nowrap p-2 group-hover:bg-indigo-400 group rounded-xl group-hover:text-white">
                <FontAwesomeIcon icon={faPlay} /> Episode {" " + data.episode}
              </button>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default EstimatedSchedule;
