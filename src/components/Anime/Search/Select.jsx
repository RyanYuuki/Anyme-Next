import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Helper function to generate a range of numbers
const generateRange = (start, end) => {
  const range = [];
  for (let i = start; i <= end; i++) {
    range.push(i.toString().padStart(2, "0"));
  }
  return range;
};

// Generic Selector Component
const Selector = ({ label, options, onClick, placeholder, className }) => {
  return (
    <Select onValueChange={onClick}>
      <SelectTrigger className={cn("w-[180px] max-md:w-[150px] bg-neutral-700/30 text-primary", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option, index) => (
            <SelectItem key={index} value={option.toLowerCase()}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

// Specific Selectors
export const GenreSelector = ({ onClick }) => (
  <Selector label="Genre" options={["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller"]} onClick={onClick} placeholder="Select Genre" />
);

export const TypeSelector = ({ onClick }) => (
  <Selector label="Type" options={["anime", "manga"]} onClick={onClick} placeholder="Select Type" />
);

export const SortSelector = ({ onClick }) => (
  <Selector label="Sort" options={["recently-added", "most-popular"]} onClick={onClick} placeholder="Select Sort" />
);

export const SeasonSelector = ({ onClick }) => (
  <Selector label="Season" options={["spring", "summer", "fall", "winter"]} onClick={onClick} placeholder="Select Season" />
);

export const LanguageSelector = ({ onClick }) => (
  <Selector label="Language" options={["Japanese", "English"]} onClick={onClick} placeholder="Select Language" />
);

export const StatusSelector = ({ onClick }) => (
  <Selector label="Status" options={["currently-airing", "completed", "upcoming"]} onClick={onClick} placeholder="Select Status" />
);

export const RatingSelector = ({ onClick }) => (
  <Selector label="Rating" options={["g", "pg", "pg-13", "r", "r18"]} onClick={onClick} placeholder="Select Rating" />
);

export const ScoreSelector = ({ onClick }) => (
  <Selector label="Score" options={["excellent", "good", "average", "poor"]} onClick={onClick} placeholder="Select Score" />
);

// Date Selectors
export const YearSelector = ({ onClick, label }) => (
  <Selector label={label} options={generateRange(2000, 2030)} onClick={onClick} placeholder="Select Year" />
);

export const MonthSelector = ({ onClick, label }) => (
  <Selector label={label} options={generateRange(1, 12)} onClick={onClick} placeholder="Select Month" />
);

export const DaySelector = ({ onClick, label }) => (
  <Selector label={label} options={generateRange(1, 31)} onClick={onClick} placeholder="Select Day" />
);
