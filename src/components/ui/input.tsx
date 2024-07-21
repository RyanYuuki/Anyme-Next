"use client";

import React, { ChangeEvent, useState } from "react";
import { Cross1Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [isSearchBarToggled, setIsSearchBarToggled] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const handleSearch = () => {
      setIsSearchBarToggled(true);
    };

    const handleExit = () => {
      setIsSearchBarToggled(false);
      setInputValue('');
    }

    const handleInput = (event : ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    };

    return (
      <main
        className={cn(
          "flex items-center relative h-10 w-2/5 transition-all",
          className
        )}
      >
        <input
          onClick={handleSearch}
          type={type}
          value={inputValue}
          onChange={(event) => handleInput(event)}
          className={cn(
            `flex h-full w-full rounded-md bg-transparent ${isSearchBarToggled ? 'px-10' : 'px-3' } py-1 text-sm shadow-sm transition-all duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`
          )}
          ref={ref}
          {...props}
          placeholder="Search Anime..."
        />
        <MagnifyingGlassIcon
          className={cn(
            "absolute transition-all left-3",
            isSearchBarToggled ? "scale-100 opacity-100 duration-300" : "scale-0 opacity-0 duration-300"
          )}
        />
        <MagnifyingGlassIcon
          className={cn(
            "absolute transition-all duration-300 right-3",
            isSearchBarToggled ? "scale-0" : "scale-100"
          )}
        />
        <Cross1Icon
          onClick={handleExit}
          className={cn(
            "absolute right-3 transition-all duration-300 transform",
            isSearchBarToggled ? "scale-100 opacity-100" : "scale-0 opacity-0"
          )}
        />
      </main>
    );
  }
);

Input.displayName = "Input";

export { Input };
