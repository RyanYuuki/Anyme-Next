import React from "react";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const BasicDetails = ({ data }) => {
  return (
    <div className="flex flex-row bg-neutral-700/30">
      <div className="flex flex-col gap-2 p-5">
        <img
          className="w-[170px] h[200px] rounded-xl"
          src={data.imageUrl}
          alt={data.title}
        />
        <Button>Read Now</Button>
      </div>
      <div className="flex flex-col justify-evenly">
        <h1 className="text-2xl">{data.name}</h1>
        <p>{data.author}</p>
        <p>{data.status}</p>
        <p>{data.updated}</p>
        <p>
          Views: <span className="font-bold" >{data.view} <FontAwesomeIcon icon={faHeart} /></span>
        </p>
        <div className="flex flex-row gap-3">
          {data.genres.map((genre) => (
            <p className="p-2 px-3 bg-white text-black rounded-lg">{genre}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
