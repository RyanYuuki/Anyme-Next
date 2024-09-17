"use client";
import React, { useEffect, useState } from "react";
import BigCarousel from "@/components/BigCarousel";
import ReusableCarousel from "@/components/ReusableCarousel";
import ReusableStack from "@/components/ReusableStack";
import ReusableCardStacks from "@/components/ReusableCardStacks";
import EstimatedSchedule from "@/components/EstimatedSchedule.jsx";
import TopAnimesTable from "@/components/TopAnimesTable.jsx";
import ContinueWatching from "@/components/continue-watching-section.jsx";
import { fetchHomePage } from "@/hooks/ApiMapper.jsx";
import { animeData } from "../../../lib/fallbackData.jsx";

const page = () => {
  const [data, setData] = useState(null);
  const [TrendingData, setTrendingData] = useState(null);
  const [popularData, setPopularData] = useState(null);
  const [top10AnimesData, setTop10AnimesData] = useState(null);
  const [upcomingAnimesData, setUpcomingAnimesData] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [cardStackData, setCardStackData] = useState(null);
  const [genreData, setGenreData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchHomePage();
      setData(data.spotlightAnimes);
      setTop10AnimesData(data.top10Animes);
      setTrendingData(data.top10Animes.today);
      setPopularData(data.top10Animes.month);
      setTableData(data.topAiringAnimes);
      setCardStackData(data.latestEpisodeAnimes);
      setGenreData(data.genres);
      setUpcomingAnimesData(data.topUpcomingAnimes);
    };
    loadData();
  }, []);

  const isLoading = (data) => !data || data.length === 0;

  return (
    <div className="flex flex-col px-10 gap-10 max-md:px-2 bg-custom">
      <BigCarousel
        data={isLoading(data) ? animeData.spotlightAnimes : data}
        isLoading={isLoading(data)}
      />
      <ContinueWatching />
      <ReusableCarousel
        title={"Trending"}
        data={
          isLoading(TrendingData) ? animeData.top10Animes.today : TrendingData
        }
        isLoading={isLoading(TrendingData)}
      />
      <ReusableCarousel
        title={"Popular"}
        data={
          isLoading(popularData) ? animeData.top10Animes.month : popularData
        }
        isLoading={isLoading(popularData)}
      />
      <TopAnimesTable
        data={
          isLoading(top10AnimesData) ? animeData.top10Animes : top10AnimesData
        }
        isLoading={isLoading(top10AnimesData)}
      />
      <ReusableStack
        data={isLoading(tableData) ? animeData.topAiringAnimes : tableData}
        isLoading={isLoading(tableData)}
      />
      <ReusableCardStacks
        title={"Upcoming Animes"}
        data={
          isLoading(upcomingAnimesData)
            ? animeData.topUpcomingAnimes
            : upcomingAnimesData
        }
        isLoading={isLoading(upcomingAnimesData)}
        withGenres={false}
      />
      <ReusableCardStacks
        withGenres={true}
        genresData={isLoading(genreData) ? animeData.genres : genreData}
        title={"Latest Episodes"}
        data={
          isLoading(cardStackData)
            ? animeData.latestEpisodeAnimes
            : cardStackData
        }
        isLoading={isLoading(cardStackData) || isLoading(genreData)}
      />
      <EstimatedSchedule />
    </div>
  );
};

export default page;
