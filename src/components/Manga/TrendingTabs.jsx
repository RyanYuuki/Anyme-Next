import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Button } from "../ui/button";

export function TabsDemo({ data }) {
  const tab1 = data[0];
  const tab2 = data[1];
  const tab3 = data[2];
  return (
    <Tabs
      defaultValue="today"
      className="mt-1 w-full bg-neutral-700/40 p-2 rounded-md"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="today">Today</TabsTrigger>
        <TabsTrigger value="week">Week</TabsTrigger>
        <TabsTrigger value="month">Month</TabsTrigger>
      </TabsList>
      <TabsContent value="today">
        <div className="flex flex-col">
          {tab1.map((manga, index) => (
            <Link
              className="flex flex-row justify-left gap-3 items-center mt-5"
              href={`/pages/Manga/details/${manga.id}`}
            >
              <h1 className="grid place-items-center h-[50px] w-[50px] rounded-xl bg-input">
                {index + 1}
              </h1>
              <img
                className="w-[70px] h-[100px] object-cover rounded-lg"
                src={manga.image}
                alt=""
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
          ))}
        </div>
      </TabsContent>
      <TabsContent value="week">
        <div className="flex flex-col">
          {tab2.map((manga, index) => (
            <Link
              className="flex flex-row justify-left gap-3 items-center mt-5"
              href={`/pages/Manga/details/${manga.id}`}
            >
              <h1 className="grid place-items-center h-[50px] w-[50px] rounded-xl bg-input">
                {index + 1}
              </h1>
              <img
                className="w-[70px] h-[100px] object-cover rounded-lg"
                src={manga.image}
                alt=""
              />
              <div className="flex flex-col gap-2">
                <h1 className="text-[14px]">
                  {manga.title.length > 20
                    ? manga.title.substring(0, 20) + "..."
                    : manga.title}
                </h1>
                <Button className="bg-input text-primary hover:text-black box-shadow w-[180px] text-center">
                  {manga.chapter.length > 20
                    ? manga.chapter.substring(0, 20) + "..."
                    : manga.chapter}
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="month">
        <div className="flex flex-col">
          {tab3.map((manga, index) => (
            <Link
              className="flex flex-row justify-left gap-3 items-center mt-5"
              href={`/pages/Manga/details/${manga.id}`}
            >
              <h1 className="grid place-items-center h-[50px] w-[50px] rounded-xl bg-input">
                {index + 1}
              </h1>
              <img
                className="w-[70px] h-[100px] object-cover rounded-lg"
                src={manga.image}
                alt=""
              />
              <div className="flex flex-col gap-2">
                <h1 className="text-[14px]">
                  {manga.title.length > 20
                    ? manga.title.substring(0, 20) + "..."
                    : manga.title}
                </h1>
                <Button className="bg-input text-primary hover:text-black box-shadow w-[180px] text-center">
                  {manga.chapter.length > 20
                    ? manga.chapter.substring(0, 20) + "..."
                    : manga.chapter}
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default TabsDemo;
