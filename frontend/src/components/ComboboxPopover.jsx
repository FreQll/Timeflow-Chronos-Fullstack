import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const ComboboxPopover = ({ statuses }) => {
    const [open, setOpen] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState(null)
  
    return (
      <div className="flex items-center space-x-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[150px] justify-start">
              {selectedStatus ? <>{selectedStatus.title}</> : <>+ Set type</>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" side="right" align="start">
            <Command>
              <CommandInput placeholder="Change type..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {statuses.map((status) => (
                    <CommandItem
                      key={status.title}
                      value={status.title}
                      onSelect={(value) => {
                        setSelectedStatus(statuses.find((priority) => priority.title.toLowerCase() === value.toLowerCase()) || null)
                        setOpen(false)
                      }}
                    >
                      {status.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    )
}

export default ComboboxPopover

