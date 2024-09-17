"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Github,
  Menu,
  Search,
  Home,
  Film,
  Book,
  X,
  Clapperboard,
  Command,
} from "lucide-react";
import ModeToggle from "@/components/ModeToggle";
import { useCallback, useEffect, useState } from "react";
import { GetMangaSearch, SearchAniWatch, SearchManga } from "@/hooks/useApi";
import SearchItem from "@/components/Anime/Search/SearchItem";
import debounce from "lodash/debounce";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mangaSearchTerm, setMangaSearchTerm] = useState("");
  const [animeSearchData, setAnimeSearchData] = useState(null);
  const [mangaSearchData, setMangaSearchData] = useState(null);
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      active: !pathname.includes("Anime") && !pathname.includes("Manga"),
    },
    {
      href: "/pages/Anime",
      label: "Anime",
      icon: Clapperboard,
      active: pathname.includes("Anime"),
    },
    {
      href: "/pages/Manga",
      label: "Manga",
      icon: Book,
      active: pathname.includes("Manga"),
    },
  ];

  const debouncedAnimeSearch = useCallback(
    debounce(async (term) => {
      const tempAnimeData = await SearchAniWatch(term);
      setAnimeSearchData(tempAnimeData);
    }, 300),
    []
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const debouncedMangaSearch = useCallback(
    debounce(async (term) => {
      const tempMangaData = await SearchManga(term);
      setMangaSearchData(tempMangaData);
    }, 300),
    []
  );

  useEffect(() => {
    if (searchTerm) {
      debouncedAnimeSearch(searchTerm);
    }
  }, [searchTerm, debouncedAnimeSearch]);

  useEffect(() => {
    if (mangaSearchTerm) {
      debouncedMangaSearch(mangaSearchTerm);
    }
  }, [mangaSearchTerm, debouncedMangaSearch]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-10 max-md:px-3 flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold text-xl sm:inline-block">
              AnymeY
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium ml-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 transition-colors hover:text-primary ${
                  item.active ? "text-primary" : "text-muted-foreground"
                } active:shadow-glow`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
              >
                <path
                  d="M3 5H11"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M3 12H16"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M3 19H21"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileNav navItems={navItems} />
          </SheetContent>
        </Sheet>
        <div className="w-2 hidden max-md:block" />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <SearchDialog
              isOpen={isSearchOpen}
              onOpenChange={setIsSearchOpen}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              mangaSearchTerm={mangaSearchTerm}
              setMangaSearchTerm={setMangaSearchTerm}
              animeSearchData={animeSearchData}
              mangaSearchData={mangaSearchData}
              setAnimeSearchData={setAnimeSearchData}
              setMangaSearchData={setMangaSearchData}
            />
          </div>
          <nav className="flex items-center">
            <Link
              href="https://github.com/RyanYuuki/anyme-next"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="sm" className="w-9 px-0">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

function MobileNav({ navItems }) {
  const pathname = usePathname();

  return (
    <div className="grid gap-6 p-6 pt-20">
      <Link href="/" className="flex items-center space-x-2">
        <span className="font-bold">AnymeY</span>
      </Link>
      <nav className="grid gap-4">
        {navItems.map((item) => (
          <SheetClose asChild key={item.href}>
            <Link
              href={item.href}
              className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary ${
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              } active:shadow-glow`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          </SheetClose>
        ))}
      </nav>
    </div>
  );
}

function SearchDialog({
  isOpen,
  onOpenChange,
  searchTerm,
  setSearchTerm,
  mangaSearchTerm,
  setMangaSearchTerm,
  animeSearchData,
  mangaSearchData,
  setAnimeSearchData,
  setMangaSearchData,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start relative text-sm text-muted-foreground bg-muted/50 sm:pr-12 md:w-40 lg:w-64"
        >
          <Search className="mr-2 h-4 w-4" />
          Search
          <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <Command className="h-3 w-3" />
            <span className="text-xs">K</span>
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-md:w-[95%] md:max-w-[700px] lg:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Search AnymeY</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="anime" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="anime">Anime</TabsTrigger>
            <TabsTrigger value="manga">Manga</TabsTrigger>
          </TabsList>
          <TabsContent value="anime" className="mt-4">
            <SearchTab
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchData={animeSearchData}
              setSearchData={setAnimeSearchData}
              placeholder="Search anime..."
              mode="Anime"
              onClose={() => onOpenChange(false)}
            />
          </TabsContent>
          <TabsContent value="manga" className="mt-4">
            <SearchTab
              searchTerm={mangaSearchTerm}
              setSearchTerm={setMangaSearchTerm}
              searchData={mangaSearchData}
              setSearchData={setMangaSearchData}
              placeholder="Search manga..."
              mode="Manga"
              onClose={() => onOpenChange(false)}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function SearchTab({
  searchTerm,
  setSearchTerm,
  searchData,
  setSearchData,
  placeholder,
  mode,
  onClose,
}) {
  return (
    <>
      <div className="flex items-center space-x-2">
        <Input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder={placeholder}
          className="flex-1"
        />
      </div>
      <div className="mt-4 max-h-[400px] space-y-2 overflow-y-auto pr-2 custom-scrollbar">
        <SearchItem
          searchData={searchData}
          searchMode={mode}
          handleCross={onClose}
        />
      </div>
    </>
  );
}
