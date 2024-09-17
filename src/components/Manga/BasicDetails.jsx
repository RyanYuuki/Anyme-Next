import React from "react";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBookmark,
  faFireAlt,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

const BasicDetails = ({ data, id }) => {
  if (!data) {
    return <Skeleton className="h-[300px] w-full rounded-md" />;
  }

  return (
    <>
      <div className="flex flex-row max-md:flex-col max-md:items-center bg-neutral-700/30 rounded-md animated ">
        <div className="flex flex-col gap-1 p-5 max-md:p-2">
          <img
            className="w-[170px] h-[250px] max-md:w-[170px] rounded-xl"
            src={'https://anymey-proxy.vercel.app/cors?url=' + data.imageUrl}
            alt={data.title}
          />
          <Link
            className="w-full max-md:hidden"
            href={`/pages/Manga/read/${id}/chapter-1`}
          >
            <Button className="w-full">Read Now</Button>
          </Link>
        </div>
        <div className="flex flex-col justify-evenly max-md:text-center max-md:pb-5">
          <h1 className="flex flex-col text-3xl font-bold max-md:mt-2 max-md:text-xl inter">
            <p className="text-[14px] italic text-primary/50 font-normal max-md:hidden">
              {"[" + data.author + "]"}
            </p>
            {data.name}
          </h1>
          <div className="flex flex-col">
            <div className="flex flex-row gap-3 inter max-md:flex-wrap max-md:gap-y-5 max-md:px-6 max-md:justify-center max-md:mt-2">
              {data.genres.map((genre, index) => (
                <Badge
                  key={index}
                  className="w-fit h-fit bg-neutral-700/20 dark:text-white text-black"
                >
                  {genre}
                </Badge>
              ))}

              <Separator
                className="h-fit max-md:hidden"
                orientation="vertical"
              />
              <Badge
                variant={"default"}
                className="flex flex-row gap-1 max-md:w-fit max-md:h-fit items-center font-bold max-md:hidden"
              >
                {data.view}
              </Badge>
            </div>
            <div className="hidden flex-row gap-4 justify-center mt-5 max-md:flex">
              <Badge className="bg-neutral-700/20 dark:text-white text-black" variant={'secondary'} >{data.status}</Badge>
              <Badge className="bg-neutral-700/20 dark:text-white text-black" variant={'secondary'} >{data.updated}</Badge>
              <Separator orientation="vertical" />
              <Badge>{data.view}</Badge>
            </div>
          </div>
          <Link
            className="hidden max-md:flex flex-row gap-3 justify-center relative left-[5%] w-[90%] mt-1 pt-5"
            href={`/page/Manga/read/${data.id}/chapter-1`}
          >
            <Button className="flex flex-row gap-3 items-center">
              {" "}
              <FontAwesomeIcon icon={faBook} /> Read Now
            </Button>
            <Button className="flex flex-row gap-3 items-center">
              {" "}
              <FontAwesomeIcon icon={faBookmark} /> Add To
            </Button>
          </Link>
          <p className="flex flex-row gap-2 max-md:hidden">
            Status : <Badge className="font-bold">{data.status}</Badge>
          </p>
          <p className="flex flex-row gap-2 max-md:hidden">
            Last Updated : <Badge className="font-bold">{data.updated}</Badge>
          </p>
        </div>
      </div>
    </>
  );
};

export default BasicDetails;
