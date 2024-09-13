const proxy_url = "https://goodproxy.goodproxy.workers.dev/fetch?url=";
const consumet_api_url = "https://consumet-api-two-nu.vercel.app/meta/anilist/";
const aniwatch_api_url = "https://aniwatch-ryan.vercel.app/anime/";
let isRomaji = false;

if (typeof window !== "undefined") {
  isRomaji = localStorage.getItem("isRomaji") === "true";
}

function toggleRomaji(state) {
  if (typeof window !== "undefined") {
    isRomaji = state;
    localStorage.setItem("isRomaji", state);
  }
}

async function fetchHomePageAniwatch() {
  try {
    const response = await fetch(`${proxy_url}${aniwatch_api_url}home`);
    if (response.ok) {
      return await response.json();
    } else {
      console.error(
        `Error fetching data from Aniwatch API: ${response.status}`
      );
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function fetchHomePageConsumet() {
  let data = {};

  try {
    const spotlightAnimesResponse = await fetch(
      `${proxy_url}${consumet_api_url}trending`
    );
    const trendingAnimesResponse = await fetch(
      `${proxy_url}${consumet_api_url}trending?page=2`
    );
    const latestEpisodesResponse = await fetch(
      `${proxy_url}${consumet_api_url}advanced-search?sort=["EPISODES"]`
    );
    const topUpcomingAnimesResponse = await fetch(
      `${proxy_url}${consumet_api_url}advanced-search?status=NOT_YET_RELEASED`
    );
    const topAiringAnimesResponse = await fetch(
      `${proxy_url}${consumet_api_url}trending?page=3`
    );
    const mostPopularAnimesResponse = await fetch(
      `${proxy_url}${consumet_api_url}popular`
    );
    const mostFavouriteAnimesResponse = await fetch(
      `${proxy_url}${consumet_api_url}popular?page=2`
    );
    const latestCompletedAnimesResponse = await fetch(
      `${proxy_url}${consumet_api_url}advanced-search?year=2024&status=FINISHED`
    );

    if (spotlightAnimesResponse.ok) {
      data.spotlightAnimes = (await spotlightAnimesResponse.json()).results;
    }
    if (trendingAnimesResponse.ok) {
      data.trendingAnimes = (await trendingAnimesResponse.json()).results;
    }
    if (latestEpisodesResponse.ok) {
      data.latestEpisodesAnimes = (await latestEpisodesResponse.json()).results;
    }
    if (topUpcomingAnimesResponse.ok) {
      data.topUpcomingAnimes = (await topUpcomingAnimesResponse.json()).results;
    }
    if (topAiringAnimesResponse.ok) {
      data.topAiringAnimes = (await topAiringAnimesResponse.json()).results;
    }
    if (mostPopularAnimesResponse.ok) {
      data.mostPopularAnimes = (await mostPopularAnimesResponse.json()).results;
    }
    if (mostFavouriteAnimesResponse.ok) {
      data.mostFavouriteAnimes = (
        await mostFavouriteAnimesResponse.json()
      ).results;
    }
    if (latestCompletedAnimesResponse.ok) {
      data.latestCompletedAnimes = (
        await latestCompletedAnimesResponse.json()
      ).results;
    }

    if (
      spotlightAnimesResponse.ok &&
      topAiringAnimesResponse.ok &&
      trendingAnimesResponse.ok
    ) {
      const today = await spotlightAnimesResponse.json();
      const week = await trendingAnimesResponse.json();
      const month = await topAiringAnimesResponse.json();
      data.top10Animes = {
        today: extractData(today.results),
        week: extractData(week.results),
        month: extractData(month.results),
      };
    }
  } catch (error) {
    console.error(`Error fetching data from Consumet API: ${error}`);
  }

  return data;
}

async function fetchAnimeDetailsConsumet(id) {
  try {
    const resp = await fetch(`${proxy_url}${consumet_api_url}info/${id}`);
    if (resp.ok) {
      return await resp.json();
    } else {
      console.error(`Failed to fetch data: ${resp.status}`);
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function fetchAnimeDetailsAniwatch(id) {
  try {
    const resp = await fetch(`${proxy_url}${aniwatch_api_url}info?id=${id}`);
    if (resp.ok) {
      return await resp.json();
    } else {
      console.error(`Failed to fetch data: ${resp.status}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching anime details: ${error}`);
    return null;
  }
}

export function extractData(items) {
  const isConsumet =
    typeof window !== "undefined" &&
    localStorage.getItem("using-consumet") === "true";
  if (items) {
    return items.map((item) => {
      const id = item.id || "one-piece-100";
      const name = isRomaji
        ? item.title?.romaji
        : item.title?.english || "Unknown";
      const poster = item.image || "Consumet";
      const cover = item.cover || item.image || item.poster || "";
      const description = item.description || "No description available";
      const carouselImage = item.cover || "Consumet";
      const otherInfo = [
        (item.type || "??").toString(),
        (item.duration || "??").toString(),
        (item.releaseDate || "??").toString(),
        "HD",
      ];
      const jname = item?.title?.romaji || item?.jname || "??";
      const type = item.type || "TV";
      const episodes = {
        sub: item.totalEpisodes || "??",
        dub: "0",
      };

      return {
        id,
        name,
        poster,
        otherInfo,
        description,
        cover,
        jname,
        type,
        episodes,
        carouselImage,
      };
    });
  } else {
    return [];
  }
}

export async function fetchHomePage() {
  if (typeof window !== "undefined") {
    const isConsumet = localStorage.getItem("isConsumet") || false;
    if (isConsumet) {
      return await fetchHomePageConsumet();
    } else {
      return await fetchHomePageAniwatch();
    }
  }
}
