import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const ReusableCardStacks = ({ data, title }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="w-full h-[400px]">
        <div className="skeleton-carousel" />
      </div>
    );
  }

  return (
    <div className="flex flex-row max-md:flex-col max-md:gap-[20px] justify-between">
      <div
        className={`flex flex-col gap-5 w-full max-md:w-full`}
      >
        <h2 className="text-3xl max-md:text-2xl font-semibold border-l-8 border-l-neutral-800 px-5">
          {title}
        </h2>
        <div
          className={`grid grid-cols-7 grid-row-auto max-md:grid-cols-2 place-items-center gap-5 p-5 py-10 bg-neutral-700/30 rounded-md`}
        >
          {data && data.map((manga) => (
            <Link
              key={manga.id}
              href={`/pages/Manga/details/${manga.id}`}
              className="flex flex-col group"
            >
              <div className="relative flex items-center justify-center">
                <img
                  className="w-[173px] h-[244px] object-cover rounded-lg"
                  src={manga.image}
                  alt=""
                />
                <div className="absolute flex justify-center items-center h-full w-full top-0 group-hover:seasonCard transition-full rounded-xl">
                  <FontAwesomeIcon
                    className="text-3xl group-hover:opacity-100 opacity-0 transition-full"
                    icon={faBook}
                  />
                </div>
              </div>

              <h2>
                {manga.title.length > 17
                  ? manga.title.substring(0, 17) + "..."
                  : manga.title}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReusableCardStacks;
