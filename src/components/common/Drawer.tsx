"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Drawer() {
  return (
    <div className="grid-cols-2 gap-2 hidden max-md:grid">
      <Sheet key={"left"}>
        <SheetTrigger asChild>
          <Button variant="outline">
            {" "}
            <FontAwesomeIcon icon={faBars} />
          </Button>
        </SheetTrigger>
        <SheetContent
          className="w-[250px] backdrop-blur-lg bg-neutral-700/20"
          side={"left"}
        >
          <SheetHeader>
            <h1 className="text-xl">AnYmeY</h1>
          </SheetHeader>
          <div className="mt-10 flex flex-col items-center gap-7">
            <SheetClose asChild>
              <Link href={`/`}>
                <h1>Home</h1>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href={`/pages/Anime/`}>
                <h1>Anime</h1>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href={`/pages/Manga/`}>
                <h1>Manga</h1>
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
