"use client";
import { FetchMangaDetails } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import BasicDetails from '@/components/Manga/BasicDetails';
import ChapterList from '@/components/Manga/ChapterList';
import MangaCover from '@/components/Manga/MangaCover';
import { Skeleton } from "@/components/ui/skeleton";

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

  return (
    <div className="flex flex-col gap-2 px-20 max-md:px-2 min-h-screen">
      <MangaCover posterSrc={'/421f5172507433.64c983d7563d0.png'} />
      <BasicDetails data={data} />
      <ChapterList id={id} chaptersData={data?.chapterList} />
    </div>
  );
};

export default MangaDetails;
