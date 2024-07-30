import React from "react";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireAlt } from "@fortawesome/free-solid-svg-icons";

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
        <h1 className="flex flex-col text-3xl font-bold">{data.name}<p className="text-[14px] italic text-primary/50 font-normal" >{data.author}</p></h1>
        <p className="flex flex-row gap-1" >Status:<span className="font-bold" >{data.status}</span></p>
        <p className="flex flex-row gap-1" >Last Updated: <span className="font-bold" >{data.updated}</span></p>
        <p className="flex flex-row gap-1" >
          Views: <span className="font-bold" >{data.view} <FontAwesomeIcon icon={faFireAlt} /></span>
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
