'use client';

import React from "react";
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
const Header = () => {
  const [isSearchBarToggled, setIsSearchBarToggled] = useState(false);
  return (
    <header className="relative z-50 flex flex-row items-center justify-evenly gap-5 p-5 px-7 backdrop-blur-lg border-b border-b-border bg-black/15 max-md:gap-0 max-md:px-3 max-md:justify-between">
      <h1 className="text-2xl font-semibold">
        An<span className="text-4xl text-neutral-500">Y</span>meY
      </h1>
      <div className="flex flex-row gap-8 px-5 max-md:hidden">
        <h2 className="font-medium flex flex-row gap-2 hover:bg-white/30 items-center p-2 rounded-xl transition-all duration-500">
          <FontAwesomeIcon icon={faFilm} />
          Anime
        </h2>
        <h2 className="font-medium flex flex-row gap-2 items-center hover:bg-white/30 p-2 rounded-xl transition-all duration-500">
          <FontAwesomeIcon icon={faBook} />
          Manga
        </h2>
      </div>
      <Input className="w-2/5 bg-input rounded-lg max-md:hidden" />
      <div style={{ display: isSearchBarToggled ? 'flex' : 'none' }} className="absolute left-0 top-[100%] w-full flex items-center justify-center p-5 bg-primary-foreground">
        <Input className="bg-input w-full" />
      </div>

      <div className="flex flex-row gap-5 items-center max-md:gap-4">
        <Button variant={"outline"} size={"icon"}>
          <MagnifyingGlassIcon />
        </Button>
        <Button variant={"outline"} size={"icon"}>
          <FontAwesomeIcon icon={faShuffle} />
        </Button>
        <ModeToggle />
        <Button variant={"secondary"}>Login</Button>
      </div>
    </header>
  );
};

export default Header;
