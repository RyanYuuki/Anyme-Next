"use client";
import { useParams } from "next/navigation";
import React from "react";

const AnimeDetailsPage = () => {
  const { id } = useParams();
  return (
    <div>
      <h1 className="text-3xl" >{id}</h1>
    </div>
  );
};

export default AnimeDetailsPage;
