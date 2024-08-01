"use client";

import React, { useEffect, useState } from "react";
import { ModeToggle } from "../ModeToggle";
import { Input } from "../ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Button } from "../ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import NavigationMenu from "../../components/NavigationItems";
import { SearchAniWatch, SearchManga } from "@/hooks/useApi";
import SearchItem from "@/components/Anime/Search/SearchItem";
import { usePathname } from "next/navigation";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchBarToggled, setIsSearchBarToggled] = useState(false);
  const [isSearchBarToggledMobile, setIsSearchBarToggledMobile] =
    useState(false);
  const [searchData, setSearchData] = useState(null);
  const [placeHolder, setPlaceHolder] = useState("Search Anime...");
  const [searchMode, setSearchMode] = useState("Anime");
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const currentPath = usePathname();

  useEffect(() => {
    const loadData = async () => {
      if (searchTerm.trim()) {
        const data =
          searchMode === "Anime"
            ? await SearchAniWatch(searchTerm)
            : await SearchManga(searchTerm);
        setSearchData(data);
      } else {
        setSearchData(null);
      }
    };
    loadData();
  }, [searchTerm, searchMode]);

  useEffect(() => {
    if (currentPath.includes("Manga")) {
      setSearchMode("Manga");
      setPlaceHolder("Search Manga...");
    } else {
      setSearchMode("Anime");
      setPlaceHolder("Search Anime...");
    }
  }, [currentPath]);

  useEffect(() => {
    if (currentPath.includes("read")) {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > lastScrollY) {
          setIsHeaderVisible(false);
        } else {
          setIsHeaderVisible(true);
        }
        setLastScrollY(scrollY);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
    else {
      setIsHeaderVisible(true);
    }
  }, [lastScrollY, currentPath]);

  const handleCross = () => {
    setIsSearchBarToggled(false);
    setIsSearchBarToggledMobile(false);
    setSearchTerm("");
    setSearchData(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <header
      className={`fixed w-full z-50 flex flex-row items-center justify-evenly gap-5 p-5 px-7 backdrop-blur-lg border-b border-b-border bg-black/15 max-md:gap-0 max-md:px-3 max-md:justify-between transition-transform duration-300 ${
        isHeaderVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
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
          onChange={handleSearchChange}
          placeholder={placeHolder}
          className="w-full bg-accent/50 rounded-lg max-md:hidden"
        />
        {searchData && isSearchBarToggled && (
          <div className="flex flex-col gap-2 absolute w-full top-[120%] max-h-[500px] bg-primary-foreground p-5 overflow-scroll custom-scrollbar rounded-md">
            <SearchItem
              searchData={searchData}
              searchMode={searchMode}
              handleCross={handleCross}
            />
          </div>
        )}
      </div>

      <div
        style={{
          transform: isSearchBarToggledMobile ? "scale(1)" : "scale(0)",
        }}
        className="absolute flex left-0 top-[100%] w-full items-center justify-center p-5 bg-primary-foreground transition-transform"
      >
        <Input
          handleCross={handleCross}
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={placeHolder}
          className="bg-accent w-full"
        />
        {searchData && isSearchBarToggledMobile && (
          <div className="flex flex-col gap-2 absolute w-full top-[100%] max-h-[300px] bg-primary-foreground px-2 overflow-scroll custom-scrollbar rounded-md">
            <SearchItem
              searchData={searchData}
              searchMode={searchMode}
              handleCross={handleCross}
            />
          </div>
        )}
      </div>
      <div className="flex flex-row gap-5 items-center max-md:gap-4">
        <Button
          onClick={() => setIsSearchBarToggledMobile(!isSearchBarToggledMobile)}
          className="max-md:flex justify-center items-center hidden"
          variant="outline"
          size="icon"
        >
          <MagnifyingGlassIcon />
        </Button>
        <Button
          className="bg-primary-foreground/30 text-primary box-shadow hover:bg-white/10"
          size="icon"
        >
          <FontAwesomeIcon icon={faShuffle} />
        </Button>
        <ModeToggle />
        <Button className="max-md:hidden" variant="secondary">
          Login
        </Button>
      </div>
    </header>
  );
};

export default Header;
