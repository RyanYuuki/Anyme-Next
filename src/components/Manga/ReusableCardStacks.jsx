import {
  faBook,
  faCircle,
  faFireAlt,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Button } from "../ui/button";
import TrendingTabs from "@/components/Manga/TrendingTabs";

const ReusableCardStacks = ({ data, title }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="w-full h-[400px]">
        <div className="skeleton-carousel" />
      </div>
    );
  }

  const newData = [...data[2], ...data[0], ...data[3]];

  return (
    <div className="flex flex-row max-md:flex-col max-md:gap-[20px] justify-between w-full">
      <div className={`flex flex-col gap-5 max-md:w-full`}>
        <h2 className="text-3xl max-md:text-2xl font-semibold border-l-8 border-l-neutral-800 px-5">
          {title}
        </h2>
        <div
          className={`grid grid-cols-5 grid-row-auto max-md:grid-cols-2 place-items-center gap-5 p-5 py-10 bg-primary-foreground/50 rounded-md w-[90%] max-md:w-full flex-shrink-0`}
        >
          {newData &&
            newData.map((manga) => {
              const formattedChapter =
                manga.chapter[0] == "V"
                  ? manga.chapter.split("  ")[1] +
                    " " +
                    manga.chapter.split(" ")[2]
                  : manga.chapter.split(" ")[0] +
                    " " +
                    manga.chapter.split(" ")[1];
              const doubleCheckedChapter = formattedChapter.includes(":")
                ? formattedChapter.replace(":", " ")
                : formattedChapter;
              return (
                <Link
                  key={manga.id}
                  href={`/pages/Manga/details/${manga.id}`}
                  className="flex flex-col"
                >
                  <div className="relative flex items-center justify-center group">
                    <img
                      className="w-[173px] h-[244px] object-cover rounded-md"
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
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-row justify-between mt-2 px-2">
                      <p className="text-[13px]">
                        4.8 <FontAwesomeIcon color="orange" icon={faStar} />{" "}
                      </p>
                      <p className="text-[13px]">
                        <FontAwesomeIcon color="green" icon={faCircle} />{" "}
                        Ongoing
                      </p>
                    </div>
                    <Link
                      href={`/pages/Manga/details/${manga.id}`}
                      className="grid place-items-center h-[40px] font-semibold text-center text-wrap hover:text-indigo-300 transition-colors duration-200"
                    >
                      {manga.title.length > 25
                        ? manga.title.substring(0, 25) + "..."
                        : manga.title}
                    </Link>
                    <div className="flex flex-col gap-1 mt-2 h-[70px]">
                      <Link
                        href={`/pages/Manga/read/${manga.id}/chapter-${
                          doubleCheckedChapter.split(" ")[1]
                        }`}
                      >
                        <Button className="bg-primary/5 hover:text-black text-primary w-full">
                          {doubleCheckedChapter}
                        </Button>
                      </Link>
                      {!isNaN(parseInt(manga.chapter.split(" ")[1]) - 1) && (
                        <Link
                          href={`/pages/Manga/read/${manga.id}/chapter-${
                            parseInt(doubleCheckedChapter.split(" ")[1]) - 1
                          }`}
                        >
                          <Button
                            className="bg-primary/5 hover:text-black text-primary w-full"
                          >
                            Chapter{" "}
                            {parseInt(doubleCheckedChapter.split(" ")[1]) - 1}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
      <div className="flex flex-col gap-5 w-[35%] max-md:w-full">
        <h1 className="text-2xl">
          {" "}
          <FontAwesomeIcon icon={faFireAlt} /> Trending
        </h1>
        <TrendingTabs data={data} />
      </div>
    </div>
  );
};

export default ReusableCardStacks;
