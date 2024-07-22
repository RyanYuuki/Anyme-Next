"use client";
import { FetchAnimeByID } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
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

  const Months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (!data) return <h1>Loading...</h1>;

  return (
    <div className="flex flex-col gap-2 w-[80%] relative left-[10%]">
      <img
        className="w-full h-[250px] object-cover rounded-sm"
        src={data.cover}
      />
      <div className="flex flex-row w-full gap-5 p-3 bg-accent/45 box-shadow rounded-sm">
        <div className="flex flex-col gap-2 w-[180px] text-[13px]">
          <img
            className="object-cover rounded-md"
            src={data.image}
            alt={data.id}
          />
          <button className="p-3 bg-accent rounded-md font-semibold">
            WATCH NOW
          </button>
          <button className="p-3 bg-accent rounded-md font-semibold">
            TRAILER
          </button>
          <div className="flex flex-row justify-between">
            <button className="p-3 w-[45%] bg-accent/80 rounded-md font-semibold">
              A
            </button>
            <button className="p-3 w-[45%] bg-accent/80 rounded-md font-semibold">
              MAL
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-[80%]">
          <h1 className="text-2xl font-bold">
            {data.title.english || data.title.romaji}
          </h1>
          <p style={{ color: data.color, fontWeight: 700 }} >{"[" + data.title.romaji + "]"}</p>
          <p className="rounded-xl bg-accent/60 p-2 italic box-shadow">{data.description.replace(/<\/?[^>]+(>|$)/g, "")}</p>
          <div className="flex flex-row justify-between h-full text-gray-400">
            <div className="flex flex-col justify-evenly h-full">
              <p>
                Japanese:{" "}
                <span className="font-semibold text-white">
                  {data.title.romaji}
                </span>
              </p>
              <p>
                Season:{" "}
                <span className="font-semibold text-white">{data.season}</span>
              </p>
              <p>
                Aired:{" "}
                <span className="font-semibold text-white">
                  {data.startDate.year +
                    " " +
                    Months[data.startDate.month - 1] +
                    " " +
                    data.startDate.day}
                </span>
              </p>
              <p>
                Premiered:{" "}
                <span className="font-semibold text-white">
                  {data.startDate.year +
                    " " +
                    Months[data.startDate.month - 1] +
                    " " +
                    data.startDate.day}
                </span>
              </p>
            </div>
            <div className="flex flex-col justify-evenly h-full">
              <p>
                Episodes:{" "}
                <span className="font-semibold text-white">
                  {data.totalEpisodes}
                </span>
              </p>
              <p>
                Duration:{" "}
                <span className="font-semibold text-white">
                  {data.duration}
                </span>
              </p>
              <p>
                Status:{" "}
                <span className="font-semibold text-white">{data.status}</span>
              </p>
              <p>
                Rating:{" "}
                <span className="font-semibold text-white">{data.rating}</span>
              </p>
            </div>
            <div className="flex flex-col justify-evenly h-full">
              <p>
                Studios:{" "}
                <span className="font-semibold text-white uppercase">
                  {data.studios}
                </span>
              </p>
              <p className="flex flex-wrap gap-3 font-semibold text-white p-3">
                {data.genres.map((data) => <span className="p-2 rounded-xl bg-accent/80" >{data}</span> )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetailsPage;
