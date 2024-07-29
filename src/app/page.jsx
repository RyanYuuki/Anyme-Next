import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-row justify-center items-center h-screen homeCard">
      <div className="flex flex-row gap-10 w-[40%] h-[75%] justify-center bg-transparent max-md:hidden">
        <img
          src="/homepage_cover.jpg"
          alt="Homepage Cover"
          className="w-[250px] h-[350px] mb-10 rounded-2xl object-cover"
        />
        <img
          src="/second_cover_image.webp"
          alt="Second Cover"
          className="w-[250px] h-[350px] mt-10 rounded-2xl object-cover"
        />
      </div>
      <div className="flex flex-col text-[35px] max-md:text-[20px] max-md:mt-10 max-md:w-[100%] mt-10 w-[40%] h-[75%] gap-5">
        <h1 className="max-md:text-center">
          Welcome To An<span className="text-indigo-400 text-[40px]">Y</span>mey
        </h1>
        <h1 className=" max-md:text-center">
          Your one-stop solution for finding anime, manga.
        </h1>
        <div className="flex flex-row max-md:justify-evenly gap-5">
          <Link href="/pages/Anime/">
            <Button size={"lg"} className="mt-4">
              Anime
            </Button>
          </Link>
          <Link href={"/pages/Manga/"}>
            <Button size={"lg"} className="mt-4">
              Manga
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
