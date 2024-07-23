import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function Selector({ onClick }) {
  return (
    <Select onValueChange={onClick} >
      <SelectTrigger className="w-[180px] bg-neutral-700/70">
        <SelectValue placeholder="Japanese" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel >Language</SelectLabel>
          <SelectItem value="Japanese">Japanese</SelectItem>
          <SelectItem value="English">English</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default Selector;