"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

const UserDataContext = createContext();

export const useUserData = () => useContext(UserDataContext);

export default function DataProvider({ children }) {
  const [currentlyWatching, setCurrentlyWatching] = useState([]);
  const [currentlyReading, setCurrentlyReading] = useState([]);

  useEffect(() => {
    const watchingFromStorage =
      JSON.parse(localStorage.getItem("currentlyWatching")) || [];
    const readingFromStorage =
      JSON.parse(localStorage.getItem("currentlyReading")) || [];

    setCurrentlyWatching(watchingFromStorage);
    setCurrentlyReading(readingFromStorage);
  }, []);

  const addAnimeEpisode = (
    animeId,
    animeTitle,
    episodeTitle,
    episodeImage,
    currentEpisode,
    totalEpisodes,
    currentProgress
  ) => {
    const newEpisode = {
      animeId,
      animeTitle,
      episodeTitle,
      episodeImage,
      currentEpisode,
      totalEpisodes,
      currentProgress,
    };

    const updatedWatching = currentlyWatching.map((anime) =>
      anime.animeId === animeId
        ? currentEpisode > anime.currentEpisode
          ? newEpisode
          : anime
        : anime
    );

    const isAlreadyWatching = updatedWatching.some(
      (anime) => anime.animeId === animeId
    );
    const finalWatching = isAlreadyWatching
      ? updatedWatching
      : [...updatedWatching, newEpisode];

    setCurrentlyWatching(finalWatching);
    localStorage.setItem("currentlyWatching", JSON.stringify(finalWatching));
  };

  const contextValue = {
    currentlyWatching,
    currentlyReading,
    addAnimeEpisode,
  };

  return (
    <UserDataContext.Provider value={contextValue}>
      {children}
    </UserDataContext.Provider>
  );
}
