"use client";

import React, { useEffect } from "react";
import { ModeToggle } from "../ModeToggle";
import { Input } from "../ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCirclePlay,
  faFilm,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Button } from "../ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import NavigationMenu from "../../components/NavigationItems";
import { SearchAnime } from "@/hooks/useApi";
const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchBarToggled, setIsSearchBarToggled] = useState(false);
  const [isSearchBarToggledMobile, setIsSearchBarToggledMobile] =
    useState(false);
  const [searchData, setSearchData] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      const data = await SearchAnime(searchTerm);
      setSearchData(data);
    };
    setTimeout(loadData, 500);
  }, [searchTerm]);

  const toggleSearchBar = () => {
    setIsSearchBarToggledMobile(true);
  };

  const handleCross = () => {
    setIsSearchBarToggled(false);
    setSearchTerm("");
    setSearchData(null);
  };

  return (
    <header className="fixed w-full z-50 flex flex-row items-center justify-evenly gap-5 p-5 px-7 backdrop-blur-lg border-b border-b-border bg-black/15 max-md:gap-0 max-md:px-3 max-md:justify-between">
      <h1 className="text-2xl font-semibold">
        An<span className="text-4xl text-neutral-500">Y</span>meY
      </h1>
      <NavigationMenu />
      <div
        onClick={() => setIsSearchBarToggled(true)}
        className="relative w-2/5"
      >
        <Input
          handleCross={handleCross}
          value={searchTerm}
          onChange={() => setSearchTerm(event.target.value)}
          placeholder="Search Anime..."
          className="w-full bg-accent/50 rounded-lg max-md:hidden"
        />
        {searchData && isSearchBarToggled && (
          <div className="flex flex-col gap-2 absolute w-full top-[140%] max-h-[500px] bg-primary-foreground p-5 overflow-scroll custom-scrollbar rounded-md">
            {searchData.map((data) => (
              <div
                key={data.id}
                className="flex flex-row items-center justify-center w-full bg-neutral-700/30 p-2 rounded-md"
              >
                <img
                  className="w-[70px] h-[80px] rounded-lg"
                  src={data.image}
                  alt=""
                />
                <div className="flex flex-col w-full gap-2 items-center justify-center text-center">
                  <h1>{data?.title?.english || data?.title?.romaji}</h1>
                  <div className="flex flex-row items-center justify-center gap-10 w-full text-[12px]">
                    <p>{data?.type || "??"}</p>
                    <p>{data?.status || "??"}</p>
                    <p>{data?.totalEpisodes || "??"}</p>
                    <p>{data?.rating || "??"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        style={{ display: isSearchBarToggledMobile ? "flex" : "none" }}
        className="absolute left-0 top-[100%] w-full flex items-center justify-center p-5 bg-primary-foreground"
      >
        <Input placeholder="Search Anime..." className="bg-accent w-full" />
      </div>
      <div className="flex flex-row gap-5 items-center max-md:gap-4">
        <Button
          className="max-md:block hidden"
          variant={"outline"}
          size={"icon"}
        >
          <MagnifyingGlassIcon />
        </Button>
        <Button
          className="bg-primary-foreground/30 text-primary box-shadow hover:bg-white/10"
          size={"icon"}
        >
          <FontAwesomeIcon icon={faShuffle} />
        </Button>
        <ModeToggle />
        <Button variant={"secondary"}>Login</Button>
      </div>
    </header>
  );
};

export default Header;
