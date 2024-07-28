"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AdvancedSearch } from "@/hooks/useApi";
import Link from "next/link";
import {
  faClosedCaptioning,
  faMicrophone,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ScoreSelector,
  SeasonSelector,
  SortSelector,
  RatingSelector,
  StatusSelector,
  LanguageSelector,
  YearSelector,
  MonthSelector,
  DaySelector,
  TypeSelector,
  GenreSelector,
} from "@/components/Anime/Search/Select";
import { Input } from "@/components/ui/input";

const Search = () => {
  const { id } = useParams();
  const [searchData, setSearchData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [genre, setGenres] = useState(id.toLowerCase());
  const [type, setType] = useState(null);
  const [sort, setSort] = useState(null);
  const [season, setSeason] = useState(null);
  const [lang, setLang] = useState(null);
  const [status, setStatus] = useState(null);
  const [rating, setRating] = useState(null);
  const [startDay, setStartDay] = useState(null);
  const [startMonth, setStartMonth] = useState(null);
  const [startYear, setStartYear] = useState(null);
  const [endDay, setEndDay] = useState(null);
  const [endMonth, setEndMonth] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const loadData = async () => {
        const data = await AdvancedSearch(
          ' ' + searchQuery,
          genre,
          type,
          sort,
          season,
          lang,
          status,
          rating,
          startYear,
          startMonth,
          startDay,
          endYear,
          endMonth,
          endDay,
          score
        );
        setSearchData(data);
      }
    loadData();
  }, [
    searchQuery,
    genre,
    type,
    sort,
    season,
    lang,
    status,
    rating,
    startYear,
    startMonth,
    startDay,
    endYear,
    endMonth,
    endDay,
    score,
  ]);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-6 max-md:grid-cols-2 grid-rows-auto gap-3 px-5 place-items-center">
        <Input
          handleCross={() => setSearchQuery("")}
          value={searchQuery}
          onChange={() => setSearchQuery(event.target.value)}
          className="w-[180px] max-md:w-[150px] bg-input rounded-md"
          placeholder="Search..."
        />
        <GenreSelector onClick={setGenres} />
        <TypeSelector onClick={setType} />
        <StatusSelector onClick={setStatus} />
        <RatingSelector onClick={setRating} />
        <ScoreSelector onClick={setScore} />
        <SeasonSelector onClick={setSeason} />
        <LanguageSelector onClick={setLang} />
        <SortSelector onClick={setSort} />
        <YearSelector onClick={setStartYear} label="Start Year" />
        <MonthSelector onClick={setStartMonth} label="Start Month" />
        <DaySelector onClick={setStartDay} label="Start Day" />
        <YearSelector onClick={setEndYear} label="End Year" />
        <MonthSelector onClick={setEndMonth} label="End Month" />
        <DaySelector onClick={setEndDay} label="End Day" />
      </div>
      <div className="grid grid-cols-7 max-md:grid-cols-2 place-items-center gap-5 p-5 bg-neutral-700/30 rounded-md">
        {searchData ?
          searchData.map((anime) => (
            <Link
              key={anime.id}
              href={`/pages/Anime/details/${anime.id}`}
              className="flex flex-col group"
            >
              <div className="relative flex items-center justify-center">
                <img
                  className="w-[173px] h-[244px] object-cover rounded-lg"
                  src={anime.poster}
                  alt=""
                />
                <div className="absolute flex justify-center items-center h-full w-full top-0 group-hover:seasonCard transition-full rounded-xl">
                  <FontAwesomeIcon
                    className="text-3xl group-hover:opacity-100 opacity-0 transition-full"
                    icon={faPlay}
                  />
                </div>
                <div className="absolute left-[7px] bottom-[7px] flex flex-row gap-[5px] items-center text-[14px]">
                  <p className="flex flex-row justify-center items-center gap-1 px-1 rounded-sm bg-green-200 text-black">
                    <FontAwesomeIcon icon={faClosedCaptioning} />{" "}
                    {anime.episodes.sub || "0"}
                  </p>
                  <p className="flex flex-row justify-center items-center gap-1 px-1 rounded-sm bg-blue-200 text-black">
                    <FontAwesomeIcon icon={faMicrophone} />{" "}
                    {anime.episodes.dub || "0"}
                  </p>
                </div>
              </div>

              <h2>
                {anime.name.length > 17
                  ? anime.name.substring(0, 17) + "..."
                  : anime.name}
              </h2>
              <div className="flex flex-row gap-2">
                <p>{anime.type}</p>
                <p>{anime.duration}</p>
              </div>
            </Link>
          )) : <h1 className="text-center" >Not Found {':)'}</h1> }
      </div>
    </div>
  );
};

export default Search;
