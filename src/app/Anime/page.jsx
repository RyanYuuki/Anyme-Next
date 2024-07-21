'use client';
import React, { useEffect, useState } from "react";
import BigCarousel from "../../components/BigCarousel";
import { FetchPopularAnime, FetchTrendingAnime } from '../../hooks/useApi.jsx';
import ReusableCarousel from '../../components/ReusableCarousel';
const page = () => {
  const [data, setData] = useState(null);
  const [carouselData, setCarouselData] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      const data = await FetchTrendingAnime(1, 10);
      setData(data);
      const carouselData = await FetchPopularAnime(1,10);
      setCarouselData(carouselData);
    }
    loadData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-5">
      <BigCarousel data={data} />
      <ReusableCarousel data={carouselData} />
    </div>
  );
};

export default page;
