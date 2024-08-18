import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  faBars,
  faBook,
  faClapperboard,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
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
          <div className="mt-10 flex flex-col items-left gap-7">
            <SheetClose asChild>
              <Link href={`/`}>
                <span>
                  <FontAwesomeIcon className="mr-2" icon={faHome} /> Home
                </span>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href={`/pages/Anime/`}>
                <span>
                  <FontAwesomeIcon className="mr-2" icon={faClapperboard} /> Anime
                </span>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href={`/pages/Manga/`}>
                <span>
                  <FontAwesomeIcon className="mr-2" icon={faBook} /> Manga
                </span>
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
