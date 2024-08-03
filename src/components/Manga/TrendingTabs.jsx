/* eslint-disable react/prop-types */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export function TabsDemo({ data }) {
  const tab1 = data && data[0];
  const tab2 = data && data[1];
  const tab3 = data && data[2];

  const renderMangaList = (mangas) => {
    return mangas.map((manga, index) => (
      <Link
        key={manga.id}
        className="flex flex-row justify-left gap-3 items-center mt-5"
        href={`/pages/Manga/details/${manga.id}`}
      >
        <h1 className="grid place-items-center h-[50px] w-[50px] rounded-xl bg-input">
          {index + 1}
        </h1>
        <img
          className="w-[70px] h-[100px] object-cover rounded-lg"
          src={manga.image || "/path/to/default-image.jpg"}
          alt={manga.title}
          onError={(e) => (e.target.src = "/path/to/default-image.jpg")}
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-[14px]">
            {manga.title.length > 20
              ? manga.title.substring(0, 20) + "..."
              : manga.title}
          </h1>
          <Button className="bg-input text-primary box-shadow hover:text-black w-[180px] text-center">
            {manga.chapter.length > 20
              ? manga.chapter.substring(0, 20) + "..."
              : manga.chapter}
          </Button>
        </div>
      </Link>
    ));
  };

  const renderSkeleton = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="flex flex-row justify-left gap-3 items-center mt-5">
        <Skeleton className="h-[50px] w-[50px] rounded-xl" />
        <Skeleton className="w-[70px] h-[100px] object-cover rounded-lg" />
        <div className="flex flex-col gap-2">
          <Skeleton className="w-[180px] h-[20px]" />
          <Skeleton className="w-[180px] h-[20px]" />
        </div>
      </div>
    ));
  };

  return (
    <Tabs
      defaultValue="today"
      className="mt-1 w-full bg-neutral-700/20 p-2 rounded-md pb-10"
    >
      <TabsList className="grid w-full grid-cols-3 bg-neutral-600/20">
        <TabsTrigger value="today">Today</TabsTrigger>
        <TabsTrigger value="week">Week</TabsTrigger>
        <TabsTrigger value="month">Month</TabsTrigger>
      </TabsList>
      <TabsContent value="today">
        <div className="flex flex-col">
          {tab1 ? renderMangaList(tab1) : renderSkeleton()}
        </div>
      </TabsContent>
      <TabsContent value="week">
        <div className="flex flex-col">
          {tab2 ? renderMangaList(tab2) : renderSkeleton()}
        </div>
      </TabsContent>
      <TabsContent value="month">
        <div className="flex flex-col">
          {tab3 ? renderMangaList(tab3) : renderSkeleton()}
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default TabsDemo;
