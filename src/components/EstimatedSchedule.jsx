import React, { useEffect, useState } from "react";
import useCurrentWeekWithDetails from "../hooks/useCurrentWeekWithDetails";
import { FetchEstimatedSchedule } from "@/hooks/useApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const EstimatedSchedule = () => {
  const week = useCurrentWeekWithDetails();
  const [scheduleData, setScheduleDate] = useState(null);
  const [activeYear, setActiveYear] = useState(null);
  const [activeDay, setActiveDay] = useState(null);
  const [activeMonth, setActiveMonth] = useState(null);

  useEffect(() => {
    if (week.length > 0) {
      setActiveYear(week[0].year);
      setActiveDay(week[0].day);
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
        setScheduleDate(data);
        console.log(
          "year: " +
            activeYear +
            " month: " +
            activeMonth +
            " day: " +
            activeDay
        );
      };
      loadData();
    }
  }, [activeDay, activeYear, activeMonth]);

  const handleScheduleDate = (day) => {
    setActiveDay(day);
  };

  return (
    <div className="flex flex-col gap-5 w-[70%]">
      <h1 className="text-2xl">Estimated Schedule</h1>
      <div className="flex flex-col gap-5 justify-center items-center bg-neutral-700/30 p-5 rounded-md">
        <div className="flex flex-row gap-3">
          {week.map((data, index) => (
            <div
              key={index}
              onClick={() => handleScheduleDate(data.day)}
              className={`flex flex-col py-[10px] px-[30px] rounded-xl text-center ${
                data.day == activeDay ? "bg-indigo-400" : "bg-input"
              }`}
            >
              <h1>{data.weekday.slice(0, 3)}</h1>
              <p className="text-nowrap">{data.month + " " + data.day}</p>
            </div>
          ))}
        </div>
        {scheduleData &&
          scheduleData.map((data) => (
            <Link href={`/pages/Anime/watch/${data.id}`} className="flex flex-row justify-between w-full p-3 border-b border-input group hover:text-indigo-400">
              <div className="flex flex-row gap-8">
                <p>{data.time}</p>
                <h1>{data.name}</h1>
              </div>
              <button className="flex flex-row gap-2 items-center p-2 group-hover:bg-indigo-400 group rounded-xl group-hover:text-white" >
                <FontAwesomeIcon icon={faPlay} /> Episode{" " + data.episode}
              </button>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default EstimatedSchedule;
