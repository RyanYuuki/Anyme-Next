import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpenIcon, PlayCircleIcon } from "lucide-react";
import Link from "next/link";

export default function Component() {
  return (
    <div className="container mx-auto px-4 max-md:px-0 py-8">
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
        <Card className="w-full mx-auto">
          <CardHeader className="flex flex-row items-center gap-4">
            <PlayCircleIcon className="w-8 h-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">Anime</CardTitle>
              <p className="text-sm text-muted-foreground">
                Explore our vast anime collection
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <img
              src="/anime_catalog.jpg"
              alt="Anime collection"
              className="w-full h-[300px] object-cover rounded-md max-md:h-[200px]"
            />
            <p className="text-sm text-muted-foreground hidden md:block">
              Dive into a world of captivating storytelling, stunning animation,
              and unforgettable characters. Our anime section offers a diverse
              range of genres, from action-packed shonen to heartwarming
              slice-of-life series. Whether you're a seasoned otaku or new to
              anime, you'll find something to love in our carefully curated
              collection.
            </p>
            <p className="text-sm text-muted-foreground block md:hidden">
              Experience thrilling stories and breathtaking animation across
              various genres. Whether you're a seasoned fan or a newcomer, our
              collection has something for everyone.
            </p>
          </CardContent>
          <CardFooter>
            <Link className="w-full" href={"/pages/Anime"}>
              <Button className="w-full">Explore Anime</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader className="flex flex-row items-center gap-4">
            <BookOpenIcon className="w-8 h-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">Manga</CardTitle>
              <p className="text-sm text-muted-foreground">
                Discover our extensive manga library
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <img
              src="/manga_catalog.jpg"
              alt="Manga collection"
              className="w-full h-[300px] object-cover rounded-md max-md:h-[200px]"
            />
            <p className="text-sm text-muted-foreground hidden md:block">
              Immerse yourself in the rich world of Japanese comics. Our manga
              section features works from renowned mangaka across various
              genres. From epic sagas that span hundreds of chapters to short,
              impactful stories, our collection caters to all reading
              preferences.
            </p>
            <p className="text-sm text-muted-foreground block md:hidden">
              Dive into captivating stories from Japan’s top creators. Our manga
              collection offers a mix of long-running series and short, powerful
              narratives that cater to all readers.
            </p>
          </CardContent>
          <CardFooter>
            <Link className="w-full" href={"/pages/Manga"}>
              <Button className="w-full">Explore Manga</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
