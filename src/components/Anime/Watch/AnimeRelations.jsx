import Link from "next/link";
import React from "react";

const AnimeRelations = ({ relations }) => {
  return (
    <div className="flex flex-col w-full p-5 bg-neutral-700/30 box-shadow rounded-md gap-10 animated">
      <h1 className="text-3xl font-bold">Seasons</h1>
      <div className="grid grid-cols-2 max-md:grid-cols-1 grid-rows-auto place-items-center w-full gap-10">
        {relations.length > 0 ? relations.map((data) => (
          <div
            key={data.id}
            className={`relative flex items-center justify-center h-[150px] w-[400px] max-md:w-[200px] max-md:h-[100px] overflow-hidden animated hover rounded-3xl ${data.isCurrent && 'border-2 border-indigo-400 text-indigo-200'}`}
          >
            <img
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110 brightness-50"
              src={`https://anymey-proxy.vercel.app/cors?url=${data.poster}`}
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
