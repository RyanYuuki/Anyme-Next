import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-row justify-evenly items-center h-screen homeCard">
      <div className="flex flex-row gap-5 w-[40%] h-[75%] justify-evenly">
        <img
          src="/homepage_cover.jpg"
          alt="Homepage Cover"
          className="w-[250px] h-[350px] rounded-lg object-cover"
        />
        <img
          src="/second_cover_image.webp"
          alt="Second Cover"
          className="w-[250px] h-[350px] rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-col text-[35px] mt-10 w-[40%] h-[75%] gap-5">
        <h1 className="">Welcome To AnYmey</h1>
        <h1 className="" >Your one-stop solution for finding anime, manga.</h1>
        <Link className="flex flex-row gap-5" href="/pages/Anime/">
          <Button size={'lg'} className="mt-4">Anime</Button>
          <Button size={'lg'} className="mt-4">Manga</Button>
        </Link>
      </div>
    </div>
  );
}
