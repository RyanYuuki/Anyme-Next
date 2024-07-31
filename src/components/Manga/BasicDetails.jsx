import React from "react";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireAlt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const BasicDetails = ({ data }) => {
  if(!data) return <h1>Loading...</h1>
  return (
    <>
      <div className="flex flex-row bg-neutral-700/30 rounded-md animated">
        <div className="flex flex-col gap-2 p-5">
          <img
            className="w-[170px] h[200px] rounded-xl"
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
        <div className="flex flex-col justify-evenly">
          <h1 className="flex flex-col text-3xl font-bold">
            {data.name}
            <p className="text-[14px] italic text-primary/50 font-normal">
              {"[" + data.author + "]"}
            </p>
          </h1>
          <div className="flex flex-col gap-7 bg-input p-2 rounded-lg max-md:hidden">
            <p className="flex flex-row gap-2">
              Status:<span className="font-bold">{data.status}</span>
            </p>
            <p className="flex flex-row gap-2">
              Last Updated: <span className="font-bold">{data.updated}</span>
            </p>
            <p className="flex flex-row gap-2">
              Views:{" "}
              <span className="font-bold">
                {data.view} <FontAwesomeIcon icon={faFireAlt} />
              </span>
            </p>
          </div>
          <div className="flex flex-row gap-3 max-md:hidden">
            {data.genres.map((genre) => (
              <p className="p-2 px-3 bg-white text-black rounded-lg">{genre}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden max-md:flex flex-col gap-5 bg-neutral-700/30 p-3 rounded-md">
        <div className="flex flex-col gap-7 bg-input p-2 rounded-md">
          <p className="flex flex-row gap-1">
            Status:<span className="font-bold">{data.status}</span>
          </p>
          <p className="flex flex-row gap-1">
            Last Updated: <span className="font-bold">{data.updated}</span>
          </p>
          <p className="flex flex-row gap-1">
            Views:{" "}
            <span className="font-bold">
              {data.view} <FontAwesomeIcon icon={faFireAlt} />
            </span>
          </p>
        </div>
        <div className="hidden grid-cols-2 grid-rows-auto gap-3 max-md:grid">
          {data.genres.map((genre) => (
            <p className="p-2 px-3 bg-white text-black rounded-lg">{genre}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default BasicDetails;
