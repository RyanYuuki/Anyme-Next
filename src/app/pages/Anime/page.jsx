"use client";
import React, { useEffect, useState } from "react";
import BigCarousel from "../../../components/BigCarousel";
import {
  FetchAniwatchHomePage,
  FetchPopularAnime,
  FetchTrendingAnime,
} from "../../../hooks/useApi.jsx";
import ReusableCarousel from "../../../components/ReusableCarousel";
import ReusableStack from "../../../components/ReusableStack";
const page = () => {
  const [data, setData] = useState(null);
  const [TrendingData, setTrendingData] = useState(null);
  const [popularData, setPopularData] = useState(null);
  const [tableData, setTableData] = useState(null);
  useEffect(() => {
    const localArr = [];
    const loadData = async () => {
      const data = await FetchAniwatchHomePage();
      setData(data.spotlightAnimes);
      setTrendingData(data.top10Animes.today);
      setPopularData(data.top10Animes.month);
      setTableData(data.topAiringAnimes);
    };
    loadData();
  }, []);

  if (!data || !popularData) return <div>Loading...</div>;

  return (
    <div className="flex flex-col px-10 gap-10">
      <BigCarousel data={data} />
      <ReusableCarousel title={"Trending"} data={TrendingData} />
      <ReusableCarousel title={"Popular"} data={popularData} />
      <ReusableStack data={tableData} />
    </div>
  );
};

export default page;
