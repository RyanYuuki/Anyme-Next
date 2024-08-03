"use client";
import { Button } from "@/components/ui/button";
import Selector from "@/components/Manga/Select";
import { FetchMangaChaptersSrc } from "@/hooks/useApi";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Manga/BreadCrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";

const ReadPage = ({ params }) => {
  const [mangaID, setMangaID] = useState(params.id[0]);
  const [chapterID, setChapterID] = useState(params.id[1]);
  const [chapterImages, setChapterImages] = useState(null);
  const [chapterData, setChapterData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setChapterImages(null);
      const data = await FetchMangaChaptersSrc(mangaID, chapterID);
      setChapterData(data);
      setChapterImages(data.images);
    };
    loadData();
  }, [params.id, mangaID, chapterID]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [chapterID]);

  const handleClick = (chapter) => {
    setChapterID(chapter);
  };

  const handleNavigation = (direction) => {
    const currentIndex = chapterData.chapterListIds.findIndex(
      (chapter) => chapter.name === chapterData.currentChapter
    );
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < chapterData.chapterListIds.length) {
      setChapterID(chapterData.chapterListIds[newIndex].id);
    }
  };

  if (!chapterData) return <h1>Loading...</h1>;

  return (
    <div className="min-h-screen flex flex-col items-center gap-5 max-md:text-center">
      <h1 className="text-3xl font-boldr">
        {chapterData.title}
      </h1>
      <h1>{chapterData.currentChapter}</h1>
      <Breadcrumb
        prevPage={mangaID}
        title={chapterData.title}
        currentPath={chapterData.currentChapter}
      />
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center flex-row max-md:w-[400px] max-md:px-5">
          <Button
            className="flex flex-row gap-1 group"
            onClick={() => handleNavigation(+1)}
          >
            {" "}
            <FontAwesomeIcon
              className="group-hover:mr-2 transition-full duration-100"
              icon={faLeftLong}
            />{" "}
            Prev
          </Button>
          <Selector
            options={chapterData.chapterListIds}
            onClick={handleClick}
            placeholder={chapterData.currentChapter}
            label={"Chapters"}
          />
          <Button
            className="flex flex-row gap-1 group"
            onClick={() => handleNavigation(-1)}
          >
            Next
            <FontAwesomeIcon
              className="group-hover:ml-2 duration-100 transition-full"
              icon={faRightLong}
            />
          </Button>
        </div>
        <div className="flex flex-col gap-0">
          {chapterImages
            ? chapterImages.map((chapter, index) => (
                <img
                  key={index}
                  className={`w-[700px] object-contain ${
                    index === 0 && "rounded-t-md"
                  } ${index === chapterImages.length - 1 && "rounded-b-md"}`}
                  src={chapter.image}
                  alt={`Page ${index + 1}`}
                />
              ))
            : Array.from({ length: 30 }).map((_, index) => (
                <div className="flex w-[700px] items-center justify-center h-[800px] bg-white" >
                  <h1 className="text-black" >{index + 1}</h1>
                </div>
              ))}
          <div className="flex mt-5 justify-between items-center flex-row flex-shrink-0 max-md:px-5">
            <Button
              className="flex flex-row gap-1 group"
              onClick={() => handleNavigation(+1)}
            >
              <FontAwesomeIcon
                className="group-hover:mr-2 transition-full duration-100"
                icon={faLeftLong}
              />{" "}
              Prev
            </Button>
            <Button
              className="flex flex-row gap-1 group"
              onClick={() => handleNavigation(-1)}
            >
              Next
              <FontAwesomeIcon
                className="group-hover:ml-2 transition-full duration-100"
                icon={faRightLong}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadPage;
