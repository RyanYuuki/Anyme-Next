import Link from "next/link";
import React from "react";

const AnimeRelations = ({ relations }) => {
  return (
    <div className="flex flex-col w-full p-5 bg-neutral-700/30 box-shadow rounded-md gap-10 animated">
      <h1 className="text-3xl font-bold">Seasons</h1>
      <div className="flex flex-wrap items-center justify-between px-5 w-full gap-5">
        {relations.length > 0 ? relations.map((data) => (
          <div
            key={data.id}
            className={`relative flex items-center justify-center w-[30%] h-[150px] overflow-hidden animated hover rounded-3xl ${data.isCurrent && 'border-2 border-white'}`}
          >
            <img
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
              src={data.poster}
              alt={data.id}
            />
            <h1 className="absolute z-50 text-center" >{data.name}</h1>
            <Link href={`/pages/Anime/watch/${data.id}`} className="absolute w-full h-full rounded-lg transition-full seasonCard" />
          </div>
        )) : <h1>No Season Aired Yet...</h1> }
      </div>
    </div>
  );
};

export default AnimeRelations;
