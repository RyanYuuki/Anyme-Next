import Link from "next/link";
import React from "react";

const AnimeRelations = ({ relations }) => {
  const filteredRelations = relations.filter(
    (anime) => anime.relationType === "SEQUEL" || anime.relationType === "PREQUEL"
  );

  return (
    <div className="flex flex-col w-full p-5 bg-accent/45 box-shadow rounded-md">
      <h1 className="text-3xl font-bold">Seasons</h1>
      <div className="flex flex-row items-center h-[400px] justify-evenly w-full">
        {filteredRelations.map((data) => (
          <div
            key={data.id}
            className="relative flex flex-col justify-end w-[400px] h-[200px] overflow-hidden group rounded-lg"
          >
            <img
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
              src={data.image}
              alt={data.id}
            />
            <Link href={`/pages/Anime/watch/${data.id}`} className="absolute w-full h-full custom-gradient rounded-lg group-hover:opacity-0 transition-full" />
            <div className="absolute px-5 p-2">
              <p className="font-semibold">{data.relationType}</p>
              <h1 className="font-bold">{data.title.english || data.title.romaji}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeRelations;
