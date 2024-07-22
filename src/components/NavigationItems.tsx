"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Trending Manga",
    href: "/docs/primitives/alert-dialog",
    description: "Sends you to the Trending manga page.",
  },
  {
    title: "Popular Manga",
    href: "/docs/primitives/hover-card",
    description: "Sends you to the Popular manga page.",
  },
  {
    title: "Recent Manga",
    href: "/docs/primitives/progress",
    description: "Sends you to the Recent manga page.",
  },
];

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu className="max-md:hidden">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex flex-row gap-2 text-base bg-primary-foreground/30">
            {" "}
            <FontAwesomeIcon icon={faCirclePlay} />
            Anime
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <img
                    className="h-full w-full object-cover rounded-lg"
                    src={
                      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-YCDoj1EkAxFn.jpg"
                    }
                  />
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Popular">
                Explore Popular Anime.
              </ListItem>
              <ListItem href="/docs/installation" title="Trending">
                Explore Trending Anime.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Random">
                Explore Random Anime.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex flex-row gap-2 text-base bg-primary-foreground/30" > <FontAwesomeIcon icon={faBook} /> Manga</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <img
                    className="h-full w-full object-cover rounded-lg"
                    src={
                      "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx105398-b673Vt5ZSuz3.jpg"
                    }
                  />
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Popular">
                Explore Popular Manga.
              </ListItem>
              <ListItem href="/docs/installation" title="Trending">
                Explore Trending Manga.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Random">
                Explore Random Manga.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
