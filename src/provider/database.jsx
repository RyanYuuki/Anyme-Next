"use client";
import React, { createContext, useState, useContext } from "react";

const UserDataContext = createContext();

export const useUserData = () => useContext(UserDataContext);

export default function DataProvider({ children }) {
  const [currentlyWatching, setCurrentlyWatching] = useState(
    JSON.parse(localStorage.getItem("currentlyWatching")) || []
  );
  const [currentlyReading, setCurrentlyReading] = useState(
    JSON.parse(localStorage.getItem("currentlyReading")) || []
  );

  const addAnimeEpisode = (
    animeTitle,
    currentEpisode,
    totalEpisodes,
    currentProgress,
    episodeTitle
  ) => {
    const newEpisode = {
      animeTitle,
      currentEpisode,
      totalEpisodes,
      currentProgress,
      episodeTitle,
    };

    const updatedWatching = [...currentlyWatching, newEpisode];
    setCurrentlyWatching(updatedWatching);
    localStorage.setItem("currentlyWatching", JSON.stringify(updatedWatching));
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
