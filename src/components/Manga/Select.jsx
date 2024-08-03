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

const Selector = ({ label, options, onClick, placeholder, className }) => {
  return (
    <Select onValueChange={onClick}>
      <SelectTrigger className={cn("w-[300px] h-full max-md:w-[150px] bg-primary text-primary-foreground", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="w-full" >
          <SelectLabel>{label}</SelectLabel>
          {options.map((option, index) => (
            <SelectItem className="capitalize" key={index} value={option.id}>
              {option.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Selector;