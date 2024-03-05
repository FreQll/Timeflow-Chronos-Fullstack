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
import { enumEventTypes } from '../../helper/enumEventTypes'

const ComboboxPopover = ({ statuses, selectedStatus, title, setSelectedStatus, buttonColor }) => {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex items-center space-x-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className={`w-auto justify-start ${buttonColor ? buttonColor : 'bg-transparent'}` }>
              {selectedStatus ? <>{selectedStatus.title || enumEventTypes[selectedStatus]?.title || selectedStatus?.name}</> : <>+ {title}</>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" side="right" align="start">
            <Command>
              <CommandInput placeholder="Change..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {statuses.map((status) => (
                    <CommandItem
                      key={status.title || status.calendar.id}
                      value={status.title || status.calendar.id}
                      onSelect={(value) => {
                        setSelectedStatus(statuses.find((priority) => 
                          priority?.title?.toLowerCase() === value.toLowerCase() || priority?.calendar?.id === value.toLowerCase() || null
                          ))
                        setOpen(false)
                      }}
                    >
                      {status.title || status.calendar.name}
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

