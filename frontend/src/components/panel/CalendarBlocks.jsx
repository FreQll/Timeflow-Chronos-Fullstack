import React, { useEffect, useState } from "react";
import RadioInput from "../RadioInput";
import { Button } from "../ui/button";
import { enumEventTypes } from "../../helper/enumEventTypes";
import ButtonBlue from "../buttons/ButtonBlue";
import { getSavedState } from "@/redux/store";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import AddCalendar from "@/components/calendar/AddCalendar";
import axios from "../../../API/axios";
import { toastError } from "@/helper/toastFunctions";
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover'
import EditCalendar from '../calendar/EditCalendar'
import { Pencil1Icon } from "@radix-ui/react-icons"

const CalendarBlocks = ({
  calendars,
  activeCalendar,
  changeActiveEventTypes,
  changeActiveCalendar,
}) => {
  const user = getSavedState()?.user;
  const [defaultCalendar, setDefaultCalendar] = useState();

  const clickCheckboxEventTypes = (keyTitle) => {
    changeActiveEventTypes(keyTitle);
  };

  const clickCheckboxCalendars = (calendarId) => {
    changeActiveCalendar(calendarId);
  };

    const getDefaultCalendar = async () => {
        try {
        const response = await axios.get(`/api/calendar/${user.id}`, {
            withCredentials: true,
        });
        setDefaultCalendar(response.data[0].calendar);
        } catch (error) {
        console.log("Error getting calendars");
        toastError("Error getting calendars");
        }
    }

  useEffect(() => {
    getDefaultCalendar();
  }, []);

  return (
    <div className="flex flex-col gap-[15px]">
      <div className="flex flex-col gap-[15px] p-[10px] rounded-[10px] bg-[#ffffff99]">
        <div className="flex flex-col gap-[10px] w-[100%]">
          <h3 className="opacity-50">Calendars</h3>
                    {calendars && (
                        <RadioGroup defaultValue={calendars[0].calendar.id} className='flex max-w-[100%] flex-col gap-0'>
                            {calendars.map(element => (
                                <Popover key={element.calendar.id}>
                                        <div className="flex items-center justify-between max-w-[100%]" onClick={() => clickCheckboxCalendars(element.calendar.id)} onContextMenu={(event) => handleContextMenu(event, element.calendar)} >
                                            <div className='flex items-center gap-[10px] max-w-[90%]'>
                                                <RadioGroupItem value={element.calendar.id} id={element.calendar.name} style={{ backgroundColor: element.calendar.color }} className={`rounded-[4px] text-white border-0 box_shadow`} />
                                                <div  className='text-ellipsis max-w-[100%] overflow-hidden'>
                                                    <Label htmlFor={element.calendar.name}>{element.calendar.name}</Label>
                                                </div>
                                            </div>
                                            <PopoverTrigger asChild>
                                                <Pencil1Icon className='cursor-pointer' />
                                            </PopoverTrigger>
                                        </div>
                                    <PopoverContent className="ml-[40%] w-fit z-[20] bg-gray-100 border border-gray-400 rounded-[10px] p-[20px] box_shadow">
                                        <EditCalendar calendar={element.calendar} />
                                    </PopoverContent>
                                </Popover>
                            ))}
                        </RadioGroup>
                    )}
                </div>
                
                <Dialog>
                    <DialogTrigger asChild>
                        <ButtonBlue text={'New calendar'} />
                    </DialogTrigger>
                    <AddCalendar />
                </Dialog>

        {/* <Drawer>
                    <DrawerTrigger asChild>
                        <ButtonBlue text={'Add event'} onClick={handleOpenAddEvent} />
                    </DrawerTrigger>
                    <AddEvent calendars={calendars} />
                </Drawer> */}
      </div>

      <div className="p-[10px] rounded-[10px] bg-[#ffffff99]">
        <div>
          <h3 className="mb-[10px] opacity-50">Events</h3>

          <div className="flex flex-col gap-[10px]">
            {Object.keys(enumEventTypes).map((type) => (
              <div
                key={type}
                className="flex items-center space-x-2"
                onClick={() => clickCheckboxEventTypes(type)}
              >
                <Checkbox
                  id={type}
                  style={{ backgroundColor: enumEventTypes[type].color }}
                  className="border-0 text-white"
                  defaultChecked
                />
                <label
                  htmlFor={type}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {enumEventTypes[type].title}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarBlocks;
