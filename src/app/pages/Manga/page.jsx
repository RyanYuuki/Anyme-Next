"use client";
import React, { useEffect, useState } from "react";
import { FetchMangaList } from "@/hooks/useApi";
import HomeCarousel from "@/components/Manga/HomeCarousel";
import ReusableCarousel from "@/components/Manga/ReusableCarousel";
import ReusableCardStacks from "@/components/Manga/ReusableCardStacks";
const Manga = () => {
  const [mangaList, setMangaList] = useState(null);
  const [newestData, setNewestData] = useState(null);
  const [latestData, setLatestData] = useState(null);
  const [topViewData, setTopViewData] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      const data = await FetchMangaList(1);
      const NewData = await FetchMangaList(2);
      const LatestData = await FetchMangaList(3);
      const TopData = await FetchMangaList(4);
      setNewestData(NewData.mangaList);
      setLatestData(LatestData.mangaList);
      setTopViewData(TopData.mangaList);
      setMangaList(data.mangaList);
      console.log(NewData);
    };
    loadData();
  }, []);

  if (!mangaList || !latestData || !newestData || !topViewData) return <h1>Loading...</h1>;

  return (
    <div className="flex flex-col gap-10 px-10">
      <HomeCarousel data={mangaList} />
      <ReusableCarousel title={'Trending'} data={newestData} />
      <ReusableCarousel title={'Popular'} data={latestData} />
      <ReusableCardStacks title={'Top Reads'} data={topViewData} />
    </div>
  );
};

export default Manga;
