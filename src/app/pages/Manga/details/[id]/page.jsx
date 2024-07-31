"use client";
import { FetchMangaDetails } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import BasicDetails from '@/components/Manga/BasicDetails';
import ChapterList from '@/components/Manga/ChapterList';

const MangaDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      const Data = await FetchMangaDetails(id);
      setData(Data);
    };
    loadData();
  },[id]);

  if (!data || !data.chapterList) return <h1>Loading...</h1>;
  return (
    <div className="flex flex-col gap-5 px-20 max-md:px-2 min-h-screen">
      <BasicDetails data={data} />
      <ChapterList id={id} chaptersData={data?.chapterList} />
    </div>
  );
};

export default MangaDetails;
