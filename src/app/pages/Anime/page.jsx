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
  const [carouselData, setCarouselData] = useState(null);
  const [popularData, setPopularData] = useState(null);
  const [tableData, setTableData] = useState(null);
  useEffect(() => {
    const localArr = [];
    const loadData = async () => {
      const data = await FetchTrendingAnime(1, 10);
      setData(data);
      const test = await FetchAniwatchHomePage();
      console.log(test);
      const carouselData = await FetchPopularAnime(1, 10);
      setCarouselData(carouselData);
      const popularData = await FetchPopularAnime(2, 10);
      setPopularData(popularData);
      if(data && carouselData && popularData) {
        localArr.push([...data],[...carouselData],[...popularData], [...data]);
        setTableData(localArr);
      }
    };
    loadData();
  }, []);

  if (!data || !popularData) return <div>Loading...</div>;

  return (
    <div className="flex flex-col px-10 gap-10">
      <BigCarousel data={data} />
      <ReusableCarousel title={"Trending"} data={carouselData} />
      <ReusableCarousel title={"Popular"} data={popularData} />
      <ReusableStack data={tableData} />
    </div>
  );
};

export default page;
