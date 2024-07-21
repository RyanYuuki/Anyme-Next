'use client';
import React, { useEffect, useState } from "react";
import BigCarousel from "../../../components/BigCarousel";
import { FetchPopularAnime, FetchTrendingAnime } from '../../../hooks/useApi.jsx';
import ReusableCarousel from '../../../components/ReusableCarousel';
import ReusableStack from '../../../components/ReusableStack';
const page = () => {
  const [data, setData] = useState(null);
  const [carouselData, setCarouselData] = useState(null);
  const [popularData, setPopularData] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      const data = await FetchTrendingAnime(1, 10);
      setData(data);
      const carouselData = await FetchPopularAnime(1,10);
      setCarouselData(carouselData);
      const popularData = await FetchPopularAnime(2,10);
      setPopularData(popularData);
    }
    loadData();
  }, []);

  if (!data || !popularData) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-5">
      <BigCarousel data={data} />
      <ReusableCarousel title={'Trending'} data={carouselData} />
      <ReusableCarousel title={'Popular'} data={popularData} />
      <ReusableStack data={popularData} />
    </div>
  );
};

export default page;
