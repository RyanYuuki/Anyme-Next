"use client";
import { FetchAnimeByID } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import BasicDetails from '@/components/Anime/BasicDetails';
import CharactersData from '@/components/Anime/CharacterData';
import ReusableCarousel from "@/components/ReusableCarousel";
const AnimeDetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      const Data = await FetchAnimeByID(id);
      setData(Data);
    };
    loadData();
  }, []);

  if (!data) return <h1>Loading...</h1>;

  return (
    <div className="flex flex-col gap-2 w-[80%] relative left-[10%]">
      <img
        className="w-full h-[250px] object-cover rounded-sm"
        src={data.cover}
      />
      <BasicDetails data={data} />
      <CharactersData data={data.characters} />
      <ReusableCarousel className={'mt-5'} title={'Related'} data={data.relations} />
      <ReusableCarousel className={'mt-5'} title={'Recommendations'} data={data.recommendations} />
    </div>
  );
};

export default AnimeDetailsPage;
