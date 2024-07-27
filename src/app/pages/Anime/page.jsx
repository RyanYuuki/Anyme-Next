"use client";
import React, { useEffect, useState } from "react";
import BigCarousel from "@/components/BigCarousel";
import { FetchAniwatchHomePage } from "../../../hooks/useApi.jsx";
import ReusableCarousel from "@/components/ReusableCarousel";
import ReusableStack from "@/components/ReusableStack";
import ReusableCardStacks from '@/components/ReusableCardStacks';
import EstimatedSchedule from '@/components/EstimatedSchedule.jsx';
import TopAnimesTable from '@/components/TopAnimesTable.jsx';
const page = () => {
  const [data, setData] = useState(null);
  const [TrendingData, setTrendingData] = useState(null);
  const [popularData, setPopularData] = useState(null);
  const [top10AnimesData, setTop10AnimesData] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [cardStackData, setCardStackData] = useState(null);
  const [genreData, setGenreData] = useState(null);
  useEffect(() => {
    const localArr = [];
    const loadData = async () => {
      const data = await FetchAniwatchHomePage();
      setData(data.spotlightAnimes);
      setTop10AnimesData(data.top10Animes);
      setTrendingData(data.top10Animes.today);
      setPopularData(data.top10Animes.month);
      setTableData(data.topAiringAnimes);
      setCardStackData(data.latestEpisodeAnimes);
      setGenreData(data.genres);
    };
    loadData();
  }, []);


  if (!data || !popularData) return <div>Loading...</div>;

  return (
    <div className="flex flex-col px-10 gap-10 max-md:px-5">
      <BigCarousel data={data} />
      <ReusableCarousel title={"Trending"} data={TrendingData} />
      <ReusableCarousel title={"Popular"} data={popularData} />
      <TopAnimesTable data={top10AnimesData} />
      <ReusableStack data={tableData} />
      <ReusableCardStacks withGenres={true} genresData={genreData} title={'Latest Episodes'} data={cardStackData} />
      <EstimatedSchedule />
    </div>
  );
};

export default page;
