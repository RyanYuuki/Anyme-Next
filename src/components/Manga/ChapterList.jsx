import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHeart,
  faTableCells,
} from "@fortawesome/free-solid-svg-icons";

const ChapterList = ({ chaptersData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isGrid, setIsGrid] = useState(false);
  const filteredChapters =
    chaptersData &&
    chaptersData.filter((chapter) => chapter.name.includes(searchTerm));

  return (
    <div className="flex flex-col bg-neutral-700/30 min-h-[70vh] p-5 rounded-md">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl">Chapters</h1>
        <div className="flex flex-row justify-end items-center gap-3 w-[40%]">
          <Input
            value={searchTerm}
            onChange={() => setSearchTerm(event.target.value)}
            className="w-[90%] bg-input rounded-md"
            placeholder="Filter Chapters..."
          />
          <Button onClick={() => setIsGrid(!isGrid)}>
            <FontAwesomeIcon icon={isGrid ? faBars : faTableCells} />{" "}
          </Button>
        </div>
      </div>
      <div
        className={` ${
          isGrid
            ? "grid grid-cols-11 grid-rows-auto place-items-center"
            : "flex flex-col"
        } gap-3 mt-5`}
      >
        {filteredChapters.map((chapter) =>
          !isGrid ? (
            <div className="flex flex-row justify-between items-center p-3 rounded-md bg-input">
              <h1 className="flex flex-col gap-2">
                {chapter.name}
                <p className="text-primary/50">{chapter.createdAt}</p>
              </h1>
              <p>
                {" "}
                <FontAwesomeIcon icon={faHeart} /> {chapter.view}
              </p>
              <Button>Read</Button>
            </div>
          ) : (
            <div className="flex flex-row justify-center items-center w-[120px] h-[50px] rounded-md bg-input">
              <h1>
                {chapter.name.length > 11
                  ? chapter.name.substring(0, 11) + "..."
                  : chapter.name}
              </h1>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ChapterList;
