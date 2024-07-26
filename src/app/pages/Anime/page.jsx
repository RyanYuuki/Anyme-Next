"use client";
import React, { useEffect, useState } from "react";
import BigCarousel from "@/components/BigCarousel";
import { FetchAniwatchHomePage } from "../../../hooks/useApi.jsx";
import ReusableCarousel from "@/components/ReusableCarousel";
import ReusableStack from "@/components/ReusableStack";
import ReusableCardStacks from '@/components/ReusableCardStacks';
import EstimatedSchedule from '@/components/EstimatedSchedule.jsx';
const page = () => {
  const [data, setData] = useState(null);
  const [TrendingData, setTrendingData] = useState(null);
  const [popularData, setPopularData] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [cardStackData, setCardStackData] = useState(null);
  const [genreData, setGenreData] = useState(null);
  const [scheduleData, setScheduleData] = useState(null);
  useEffect(() => {
    const localArr = [];
    const loadData = async () => {
      const data = await FetchAniwatchHomePage();
      setData(data.spotlightAnimes);
      setTrendingData(data.top10Animes.today);
      setPopularData(data.top10Animes.month);
      setTableData(data.topAiringAnimes);
      setCardStackData(data.latestEpisodeAnimes);
      setGenreData(data.genres);
    };
    loadData();
  }, []);

  const handleScheduleDate = (date) => {
    const schedule = scheduleData.find((item) => item.date === date);
    setScheduleData(schedule);
  };

  if (!data || !popularData) return <div>Loading...</div>;

  return (
    <div className="flex flex-col px-10 gap-10">
      <BigCarousel data={data} />
      <ReusableCarousel title={"Trending"} data={TrendingData} />
      <ReusableCarousel title={"Popular"} data={popularData} />
      <ReusableStack data={tableData} />
      <ReusableCardStacks withGenres={true} genresData={genreData} title={'Latest Episodes'} data={cardStackData} />
      <EstimatedSchedule scheduleData={scheduleData} handleScheduleDate={handleScheduleDate} />
    </div>
  );
};

export default page;
