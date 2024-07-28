"use client";

import React, { useEffect } from "react";
import { ModeToggle } from "../ModeToggle";
import { Input } from "../ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClosedCaptioning,
  faLaptop,
  faMicrophone,
  faShield,
  faShuffle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Button } from "../ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import NavigationMenu from "../../components/NavigationItems";
import { SearchAniWatch } from "@/hooks/useApi";
import Link from "next/link";
const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchBarToggled, setIsSearchBarToggled] = useState(false);
  const [isSearchBarToggledMobile, setIsSearchBarToggledMobile] =
    useState(false);
  const [searchData, setSearchData] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      const data = await SearchAniWatch(searchTerm);
      setSearchData(data);
    };
    setTimeout(loadData, 500);
  }, [searchTerm]);

  const handleCross = () => {
    setIsSearchBarToggled(false);
    setSearchTerm("");
    setSearchData(null);
  };

  return (
    <header className="fixed w-[100vw] z-50 flex flex-row items-center justify-evenly gap-5 p-5 px-7 backdrop-blur-lg border-b border-b-border bg-black/15 max-md:gap-0 max-md:px-3 max-md:justify-between">
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
          <div className="flex flex-col gap-2 absolute w-full top-[120%] max-h-[500px] bg-primary-foreground p-5 overflow-scroll custom-scrollbar rounded-md">
            {searchData.map((data) => (
              <Link
                onClick={handleCross}
                href={`/pages/Anime/details/${data.id}`}
                key={data.id}
                className="animated flex flex-row items-center gap-5 justify-center w-full bg-neutral-700/30 p-2 rounded-md box-shadow"
              >
                <img
                  className="w-[70px] h-[80px] rounded-lg"
                  src={data.poster || "https://100x100"}
                  alt=""
                />
                <div className="flex flex-col w-full gap-2">
                  <h1>{data?.name || data?.jname}</h1>
                  <div className="flex flex-row gap-[2px] w-full items-center text-[12px]">
                    <p className="flex flex-row items-center gap-1 px-1 rounded-l-sm bg-green-200 text-black">
                      <FontAwesomeIcon icon={faClosedCaptioning} />
                      {data.episodes.sub}
                    </p>
                    <p className="flex flex-row items-center gap-1 px-1 bg-blue-200 text-black">
                      <FontAwesomeIcon icon={faMicrophone} />{" "}
                      {data.episodes.dub || "0"}
                    </p>
                    <p className="px-2 rounded-r-sm bg-primary/30">
                      {data?.type}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div
        style={{ scale: isSearchBarToggledMobile ? "1" : "0" }}
        className="absolute flex left-0 top-[100%] w-full items-center justify-center p-5 bg-primary-foreground transition-full"
      >
        <Input
          handleCross={handleCross}
          value={searchTerm}
          onChange={() => setSearchTerm(event.target.value)}
          placeholder="Search Anime..."
          className="bg-accent w-full"
        />
        {searchData && isSearchBarToggledMobile && (
          <div className="flex flex-col gap-2 absolute w-full top-[100%] max-h-[300px] bg-primary-foreground px-2 overflow-scroll custom-scrollbar rounded-md animated">
            {searchData.map((data) => (
              <Link
                onClick={handleCross}
                href={`/pages/Anime/details/${data.id}`}
                key={data.id}
                className="flex flex-row w-full gap-5 bg-neutral-700/30 p-2 rounded-md box-shadow"
              >
                <img
                  className="w-[70px] h-[80px] rounded-lg"
                  src={data.poster}
                  alt=""
                />
                <div className="flex flex-col justify-center w-full gap-2 text-[12px]">
                  <h1>{data?.name || data?.jname}</h1>
                  <div className="flex flex-row gap-[2px] w-full items-center text-[12px]">
                    <p className="flex flex-row items-center gap-1 px-1 rounded-l-sm bg-green-200 text-black">
                      <FontAwesomeIcon icon={faClosedCaptioning} />
                      {data.episodes.sub}
                    </p>
                    <p className="flex flex-row items-center gap-1 px-1 bg-blue-200 text-black">
                      <FontAwesomeIcon icon={faMicrophone} />{" "}
                      {data.episodes.dub || "0"}
                    </p>
                    <p className="px-2 rounded-r-sm bg-primary/30">
                      {data?.type}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-row gap-5 items-center max-md:gap-4">
        <Button
          onClick={() => setIsSearchBarToggledMobile(!isSearchBarToggledMobile)}
          className="max-md:flex justify-center items-center hidden"
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
        <Button className="max-md:hidden" variant={"secondary"}>
          Login
        </Button>
      </div>
    </header>
  );
};

export default Header;
