/* eslint-disable no-unused-vars */
import { jaroWinklerDistance } from "./jaro-winkler";
const PROXY = "https://sup-proxy.zephex0-f6c.workers.dev/api-json?url=";
const apiLink = "https://consumet-api-two-nu.vercel.app";
const BASE_URL = "https://consumet-api-two-nu.vercel.app/meta/anilist/";
const ANIWATCH_URL = "https://aniwatch-ryan.vercel.app/anime/";
const API_KEY = "e2f1fb12caa883224a8363dc0329b3bc";
const BASE_MOVIE_URL = "https://api.themoviedb.org";


// MOVIE

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const fetchTvOntheAir = () =>
  fetchData(`${PROXY}${BASE_MOVIE_URL}/tv/on_the_air?api_key=${API_KEY}`);

export const fetchTvNowPlaying = () =>
  fetchData(`${PROXY}${BASE_MOVIE_URL}/tv/now_playing?api_key=${API_KEY}`);

export const fetchTvTopRated = () =>
  fetchData(`${PROXY}${BASE_MOVIE_URL}/tv/top_rated?api_key=${API_KEY}`);

export const fetchTvAiringToday = () =>
  fetchData(`${PROXY}${BASE_MOVIE_URL}/tv/airing_today?api_key=${API_KEY}`);

export const fetchMovieTopRated = () =>
  fetchData(`${PROXY}${BASE_MOVIE_URL}/movie/top_rated?api_key=${API_KEY}`);

export const fetchMovieUpcoming = () =>
  fetchData(`${PROXY}${BASE_MOVIE_URL}/movie/upcoming?api_key=${API_KEY}`);

export const fetchMovieNowPlaying = () =>
  fetchData(`${PROXY}${BASE_MOVIE_URL}/movie/now_playing?api_key=${API_KEY}`);

export const fetchMovieTrending = () =>
  fetchData(`${PROXY}${BASE_MOVIE_URL}/trending/movie/day?api_key=${API_KEY}`);

export const fetchTvPopular = () =>
  fetchData(`${PROXY}${BASE_MOVIE_URL}/tv/popular?api_key=${API_KEY}`);

export const fetchMoviePopular = () =>
  fetchData(`${PROXY}${BASE_MOVIE_URL}/movie/popular?api_key=${API_KEY}`);

export const fetchMovieSearch = (query) =>
  fetchData(`${BASE_MOVIE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);

export const fetchTvSearch = (query) =>
  fetchData(`${BASE_MOVIE_URL}/search/tv?api_key=${API_KEY}&query=${query}`);

export const fetchMovieInfo = (movieId) =>
  fetchData(`${PROXY}${BASE_MOVIE_URL}/movie/${movieId}?api_key=${API_KEY}`);

export const fetchTVInfo = (TVId) =>
  fetchData(`${PROXY}${BASE_MOVIE_URL}/tv/${TVId}?api_key=${API_KEY}`);


// ANIME
export const FetchTrendingAnime = async (page = 1, perPage = 10) => {
  const response = await fetch(
    `${BASE_URL}trending?page=${page}&perPage=${perPage}`
  );
  const data = await response.json();
  return data.results;
};
export const FetchPopularAnime = async (page) => {
  if (page == undefined) {
    const response = await fetch(`${BASE_URL}popular`);
    const data = await response.json();
    return data.results;
  } else {
    const response = await fetch(`${BASE_URL}popular?page=${page}`);
    const data = await response.json();
    return data.results;
  }
};
export const FetchAnimeByID = async (query, type = "info") => {
  const response = await fetch(`${BASE_URL}${type}/${query}`);
  const data = await response.json();
  return data;
};
export const SearchAnime = async (query) => {
  const response = await fetch(`${BASE_URL}${query}`);
  const data = await response.json();
  return data.results;
};
export const FetchStreamingData = async (query) => {
  const response = await fetch(`${BASE_URL}watch/${query}`);
  const data = await response.json();
  return data.sources;
};
export const FetchEpisodesData = async (query) => {
  const response = await fetch(`${BASE_URL}episodes/${query}`);
  const data = await response.json();
  return data;
};
export const FetchRandomAnime = async () => {
  const response = await fetch(`${BASE_URL}random-anime`);
  const data = await response.json();
  return data;
};

//MANGA
export const GetMangaDetails = async (id) => {
  const response = await fetch(
    apiLink + `/meta/anilist-manga/info/${id}?provider=mangadex`
  );
  const data = await response.json();
  return data;
};

export const GetMangaPages = async (chapterId) => {
  const response = await fetch(
    apiLink +
      `/meta/anilist-manga/read?chapterId=${chapterId}&provider=mangadex`
  );
  const data = await response.json();
  return data;
};

export const GetMangaSearch = async (query, count) => {
  const response = await fetch(
    apiLink + `/meta/anilist-manga/${query}?page=1&perPage=${count}`
  );
  const data = await response.json();
  return data.results;
};

export const GetMangaNew = async (count, page = 1) => {
  const response = await fetch(
    apiLink +
      `/meta/anilist/advanced-search?type=MANGA&sort=["POPULARITY_DESC"]&status=RELEASING&perPage=${count}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

export const GetMangaFavorites = async (count, page = 1) => {
  const response = await fetch(
    apiLink +
      `/meta/anilist/advanced-search?type=MANGA&sort=["FAVOURITES_DESC"]&perPage=${count}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

export const GetMangaTrending = async (count, page = 1) => {
  const response = await fetch(
    apiLink +
      `/meta/anilist/advanced-search?type=MANGA&sort=["TRENDING_DESC"]&perPage=${count}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

export const GetMangaPopular = async (count, page = 1) => {
  const response = await fetch(
    apiLink +
      `/meta/anilist/advanced-search?type=MANGA&sort=["POPULARITY_DESC"]&perPage=${count}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

export const GetMangaTop = async (count, page = 1) => {
  const response = await fetch(
    apiLink +
      `/meta/anilist/advanced-search?type=MANGA&sort=["SCORE_DESC"]&perPage=${count}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

export const MapAnimeByTitle = async (title) => {
  try {
    const response = await fetch(
      `${ANIWATCH_URL}search?q=${encodeURIComponent(title)}`
    );

    const data = await response.json();

    const normalizedTitle = title.trim().toLowerCase();
    let mappedResult = null;
    let maxScore = 0;

    // Function to calculate Jaro-Winkler similarity
    const calculateSimilarity = (itemName) => {
      const itemNameNormalized = itemName.trim().toLowerCase();
      const score = jaroWinklerDistance(normalizedTitle, itemNameNormalized);
      return score;
    };

    // Find exact match first
    mappedResult = data.animes.find(
      (item) => item.name && item.name.toLowerCase() === normalizedTitle
    );

    // If no exact match, find closest match using Jaro-Winkler distance
    if (!mappedResult) {
      data.animes.forEach((item) => {
        const itemName = item.name;
        if (itemName) {
          const score = calculateSimilarity(itemName);
          if (score > maxScore) {
            maxScore = score;
            mappedResult = item;
          }
        }
      });
    }

    console.log("mappedResult:", mappedResult);
    return mappedResult || null;
  } catch (error) {
    console.error("Error in MapAnimeByTitle:", error);
    return null;
  }
};

export const FetchEpisodesByMappedID = async (id) => {
  const response = await fetch(`${ANIWATCH_URL}episodes/${id}`);
  const data = await response.json();
  return data;
};

export const FetchEpisodeLinksByMappedID = async (
  id,
  server = "vidstreaming",
  category = "sub"
) => {
  const response = await fetch(
    `${ANIWATCH_URL}episode-srcs?id=${id}?server=${server}&category=${category}`
  );
  const data = await response.json();
  return data;
};
