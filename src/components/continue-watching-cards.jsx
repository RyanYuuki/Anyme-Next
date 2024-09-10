import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlayCircle, BookOpen } from "lucide-react";
import Image from "next/image";

// Mock data for demonstration
const continueWatching = [
  {
    id: 1,
    title: "Naruto",
    episode: 45,
    progress: 75,
    image: "/placeholder.svg?height=100&width=180",
  },
  {
    id: 2,
    title: "One Piece",
    episode: 223,
    progress: 30,
    image: "/placeholder.svg?height=100&width=180",
  },
  {
    id: 3,
    title: "Attack on Titan",
    episode: 12,
    progress: 90,
    image: "/placeholder.svg?height=100&width=180",
  },
];

const continueReading = [
  {
    id: 1,
    title: "Demon Slayer",
    chapter: 78,
    progress: 60,
    image: "/placeholder.svg?height=150&width=100",
  },
  {
    id: 2,
    title: "My Hero Academia",
    chapter: 156,
    progress: 45,
    image: "/placeholder.svg?height=150&width=100",
  },
  {
    id: 3,
    title: "Jujutsu Kaisen",
    chapter: 34,
    progress: 80,
    image: "/placeholder.svg?height=150&width=100",
  },
];

export default function ContinueWatchingCard() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <ContinueCard
        title="Continue Watching"
        items={continueWatching}
        type="anime"
      />
      <ContinueCard
        title="Continue Reading"
        items={continueReading}
        type="manga"
      />
    </div>
  );
}

function ContinueCard({ title, items, type }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>Pick up where you left off</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {items.map((item) => (
            <div key={item.id} className="mb-6 last:mb-0">
              <div className="flex gap-4 mb-2">
                <div className="relative flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={type === "anime" ? 180 : 100}
                    height={type === "anime" ? 100 : 150}
                    className="rounded-md object-cover"
                  />
                  {type === "anime" && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
                      Ep {item.episode}
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {type === "anime"
                        ? `Episode ${item.episode}`
                        : `Chapter ${item.chapter}`}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="self-start">
                    {type === "anime" ? (
                      <PlayCircle className="h-4 w-4 mr-2" />
                    ) : (
                      <BookOpen className="h-4 w-4 mr-2" />
                    )}
                    {type === "anime" ? "Continue" : "Read"}
                  </Button>
                </div>
              </div>
              <Progress value={item.progress} className="h-2" />
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View All</Button>
      </CardFooter>
    </Card>
  );
}
