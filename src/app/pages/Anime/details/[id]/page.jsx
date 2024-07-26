"use client";
import { FetchAnimeByAniwatchID, FetchAnimeByID } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import BasicDetails from "@/components/Anime/BasicDetails";
import CharactersData from "@/components/Anime/CharacterData";
import ReusableCarouselAlt from "@/components/Anime/ReusableCarouselAlt";
const AnimeDetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [consumetData, setConsumetData] = useState(null);
  const [posterSrc, setPosterSrc] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      const Data = await FetchAnimeByAniwatchID(id);
      setData(Data);
      if (
        Data.anime.info.stats.episodes.sub > 300 ||
        Data.anime.info.stats.episodes.sub > "300"
      ) {
        const AltData = await FetchAnimeByID(Data.anime.info.anilistId, "data");
        setPosterSrc(AltData.cover);
        setConsumetData(AltData);
      } else {
        const AltData = await FetchAnimeByID(Data.anime.info.anilistId);
        setConsumetData(AltData);
        setPosterSrc(AltData.cover);
      }
    };
    loadData();
  }, [id]);

  if (!data) return <h1>Loading...</h1>;

  return (
    <div className="flex flex-col gap-2 w-[80%] relative left-[10%] animated">
      <img
        className="w-full h-[250px] object-cover rounded-sm animated"
        src={posterSrc}
      />
      <BasicDetails data={data.anime} />
      {consumetData && <CharactersData data={consumetData?.characters} />}
      <ReusableCarouselAlt
        className={"mt-5"}
        title={"Related"}
        data={data?.relatedAnimes || []}
      />
      <ReusableCarouselAlt
        className={"mt-5"}
        title={"Recommendations"}
        data={data?.recommendedAnimes || []}
      />
    </div>
  );
};

export default AnimeDetailsPage;
