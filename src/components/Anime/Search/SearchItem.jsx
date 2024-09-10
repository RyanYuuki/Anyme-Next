import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClosedCaptioning, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const AnimeItem = ({ data, handleCross }) => (
  <Link
    onClick={handleCross}
    href={`/pages/Anime/details/${data.id}`}
    key={data.id}
    className="animated flex flex-row items-center gap-5 justify-center w-full bg-neutral-700/30 hover:bg-neutral-700/50 p-2 rounded-md box-shadow min-h-[100px]"
  >
    <img
      className="w-[70px] h-[80px] rounded-lg"
      src={data.poster || 'https://100x100'}
      alt=""
    />
    <div className="flex flex-col w-full gap-2">
      <h1>{data.name || data.jname}</h1>
      <div className="flex flex-row gap-[2px] w-full items-center text-[12px]">
        <p className="flex flex-row items-center gap-1 px-1 rounded-l-sm bg-green-200 text-black">
          <FontAwesomeIcon icon={faClosedCaptioning} />
          {data.episodes.sub}
        </p>
        <p className="flex flex-row items-center gap-1 px-1 bg-blue-200 text-black">
          <FontAwesomeIcon icon={faMicrophone} /> {data.episodes.dub || '0'}
        </p>
        <p className="px-2 rounded-r-sm bg-primary/30">{data.type}</p>
      </div>
    </div>
  </Link>
);

const MangaItem = ({ data, handleCross }) => (
  <Link
    onClick={handleCross}
    href={`/pages/Manga/details/${data.id}`}
    key={data.id}
    className="animated flex flex-row items-center gap-5 justify-center w-full bg-neutral-700/30 p-2 rounded-md box-shadow min-h-[100px] hover:bg-neutral-700/10"
  >
    <img
      className="w-[70px] h-[80px] rounded-lg"
      src={data.image || 'https://100x100'}
      alt=""
    />
    <div className="flex flex-col w-full gap-2">
      <h1>{data.title}</h1>
    </div>
  </Link>
);

const SearchItem = ({ searchData, searchMode, handleCross }) => {
  if (searchMode === 'Anime') {
    return searchData?.map((data) => <AnimeItem key={data.id} data={data} handleCross={handleCross} />);
  }

  if (searchMode === 'Manga') {
    console.log(searchData);
    if (searchData?.mangaList?.length > 0) {
      return searchData.mangaList.map((data) => <MangaItem key={data.id} data={data} handleCross={handleCross} />);
    } else {
      return <h1>Not Found</h1>;
    }
  }

  return null;
};

export default SearchItem;
