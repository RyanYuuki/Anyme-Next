import React from "react";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireAlt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

const BasicDetails = ({ data }) => {
  if (!data) {
    return <Skeleton className="h-[300px] w-full rounded-md" />;
  }

  return (
    <>
      <div className="flex flex-row bg-neutral-700/30 rounded-md animated max-md:gap-2">
        <div className="flex flex-col gap-1 p-5 max-md:p-2">
          <img
            className="w-[170px] h-[250px] max-md:h-[150px] max-md:w-[200px] rounded-xl"
            src={data.imageUrl}
            alt={data.title}
          />
          <Link
            className="w-full"
            href={`/page/Manga/read/${data.id}/chapter-1`}
          >
            <Button className="w-full">Read Now</Button>
          </Link>
        </div>
        <div className="flex flex-col justify-evenly max-md:justify-start">
          <h1 className="flex flex-col text-3xl font-bold max-md:mt-2 max-md:text-xl">
            <p className="text-[14px] italic text-primary/50 font-normal">
              {"[" + data.author + "]"}
            </p>
            {data.name}
          </h1>
          <div className="flex flex-row gap-3 max-md:flex-wrap max-md:mt-2">
            {data.genres.map((genre, index) => (
              <Badge key={index} className="w-fit h-fit" variant={"secondary"}>
                {genre}
              </Badge>
            ))}
            <Separator className="h-fit" orientation="vertical" />
            <Badge
              variant={"default"}
              className="flex flex-row gap-1 max-md:w-fit max-md:h-fit items-center font-bold"
            >
              {data.view}
            </Badge>
          </div>
          <p className="flex flex-row gap-2 max-md:hidden">
            Status : <Badge className="font-bold">{data.status}</Badge>
          </p>
          <p className="flex flex-row gap-2 max-md:hidden">
            Last Updated : <Badge className="font-bold">{data.updated}</Badge>
          </p>
        </div>
      </div>
      <div className="hidden max-md:flex flex-col gap-5 bg-neutral-700/30 p-3 rounded-md">
        <div className="flex flex-col gap-7 p-2 rounded-md">
          <p className="flex flex-row gap-2">
            Status:
            <Badge variant={"secondary"} className="font-bold">
              {data.status}
            </Badge>
          </p>
          <p className="flex flex-row gap-2">
            Last Updated:{" "}
            <Badge variant={"secondary"} className="font-bold">
              {data.updated}
            </Badge>
          </p>
          <p className="flex flex-row gap-2">
            Views:{" "}
            <Badge variant={"secondary"} className="font-bold">
              {data.view}
            </Badge>
          </p>
        </div>
      </div>
    </>
  );
};

export default BasicDetails;
