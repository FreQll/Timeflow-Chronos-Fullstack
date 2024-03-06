import React, { useState } from 'react'
import { formatDate } from '../../../helper/momentFunc'
import { DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '../ui/drawer'
import { Button } from '../ui/button'
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"
import DatePickerWithRange from '../DatePicker'
import moment from 'moment'
import { Label, Separator } from '@radix-ui/react-dropdown-menu'
import ComboboxPopover from '../ComboboxPopover'
import { enumEventTypesArray } from '../../../helper/enumEventTypes'
import { Input } from '../ui/input'
import { DropdownMenuLabel } from '../ui/dropdown-menu'
import axios, { GET_CONFIG, POST_CONFIG } from '../../../API/axios'
import { useNavigate } from 'react-router-dom'
import { TrashIcon } from "@radix-ui/react-icons"

const EventDetails = ({ currentEvent, calendars, selectedCalendar }) => {
    const [ newTitle, setNewTitle ] = useState(currentEvent?.name);
    const [ newDescription, setNewDescription ] = useState(currentEvent?.content);
    const navigate = useNavigate();

    const [ type, setType ] = useState(currentEvent.type);
    const [ date, setDate ] = useState({
        from: currentEvent.start,
        to: currentEvent.end,
    });

    const setEventCalendar = async (calendar) => {
      const response = await axios.get(`/api/calendar/calendarInfo/${calendar.calendar.id}`, { withCredentials: true });
      console.log(response);
      if (response) { console.log(response); setSelectedCalendar(response.data); } 
      else { console.log('Error creating event'); }
    }

    const updateData = async (data) => {
      const response = await axios.patch(`/api/event/${currentEvent.id}`, data, POST_CONFIG);
      if (response) navigate('/')
    }

    const handleTitleChange = (e) => {
      setNewTitle(e.target.value);
      const data = {
          name: e.target.value,
      }
      updateData(data)
    }

    const handleDescriptionChange = (e) => {
      setNewDescription(e.target.value)
      const data = {
          content: e.target.value,
      }
      updateData(data);
    }

    const handleDurationChange = (e) => {
      setDate(e);
      const data = {
        start: moment(e.from),
        end: moment(e.to),
      }
      updateData(data);
    } 

    const eventDelete = async () => {
      const response = await axios.delete(`api/event/${currentEvent.id}`, GET_CONFIG)
      if (response.status == 200) navigate('/')
    }

    return (
        <div className="grid gap-4">
          <div className="space-y-2">
            <div className="font-medium leading-none flex gap-[20px] justify-between">
                <input value={newTitle} onChange={handleTitleChange} className="text-[18px] p-0 border-0 outline-none active:outline-none bg-transparent" />
                <div onClick={eventDelete} className='cursor-pointer w-[20px] h-[20px] text-red-500'><TrashIcon /></div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              <input type='text' value={newDescription} placeholder='No description' onChange={handleDescriptionChange} className='outline-none bg-transparent' />
            </p>
          </div>
          <Separator className='bg-black h-[1px] opacity-10' />
          <div>
            <DatePickerWithRange className={'bg-transparent w-max'} date={date} setDate={handleDurationChange} />
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="type">Type</Label>
              <ComboboxPopover id='type' statuses={enumEventTypesArray} title={'Set type'} selectedStatus={type} setSelectedStatus={setType} buttonColor={'bg-white'} />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="calendar">Calendar</Label>
              <ComboboxPopover id='calendar' statuses={calendars} title={'Set calendar'} selectedStatus={selectedCalendar} setSelectedStatus={setEventCalendar} buttonColor={'bg-white'} />
            </div>
          </div>
        </div>
    )
}
export default EventDetails


{/* <div className="mx-auto w-full max-w-sm">
<DrawerHeader>
  <DrawerTitle>{currentEvent?.name}</DrawerTitle>
  <DrawerDescription>{currentEvent?.content || 'No description'}</DrawerDescription>
</DrawerHeader>
<div>
  <DatePickerWithRange date={date} setDate={setDate} />
  <div>
      <Label>Type: </Label>
      <ComboboxPopover statuses={enumEventTypesArray} title={'Set type'} selectedStatus={type} setSelectedStatus={setType} />
  </div>
</div>
<DrawerFooter>
  <Button>Submit</Button>
  <DrawerClose asChild>
    <Button variant="outline">Cancel</Button>
  </DrawerClose>
</DrawerFooter>
</div> */}