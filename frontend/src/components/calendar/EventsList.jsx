import React, { useEffect, useState } from "react";
import axios, { GET_CONFIG, POST_CONFIG } from "../../../API/axios";
import { cutString, objToJson } from "../../helper/stringFunc";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import EventDetails from "./EventDetails";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useLocation } from "react-router-dom";
import { formatDate } from "../../helper/momentFunc";
import { toastError } from "@/helper/toastFunctions";
import { enumEventTypes } from "@/helper/enumEventTypes";

const EventsList = ({
  date,
  currentEvent,
  setCurrentEvent,
  activeEventTypes,
  calendarId,
  calendars,
  selectedCalendar,
}) => {
  const [events, setEvents] = useState();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  const getEventByDay = async (date) => {
    try {
      const response = await axios.get(
        `/api/calendar/getEventsByTime/${calendarId}?startDate=${formatDate(date, "DD-MM-YYYY")}&endDate=${formatDate(date, "DD-MM-YYYY")}`,
        GET_CONFIG
      );
      if (response) {
        setEvents(response.data);
      }
    } catch (error) {
      toastError("Error getting day events");
    }
  };

  const getEventById = async (id) => {
    const response = await axios.get(`/api/event/eventInfo/${id}`, {
      withCredentials: true,
    });
    if (response) {
      setCurrentEvent(response.data);
    } else {
      toastError("Error getting event");
    }
  };

  const handleClickEvent = async (event) => {
    if (currentEvent) setCurrentEvent(null);
    else getEventById(event.id);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    getEventByDay(date);
  }, [calendarId, activeEventTypes, location]);
  
  return (
    <ol className="mt-1 mx-2 flex flex-col px-[4px]">
      {events?.map((element, id) => 
        id < 2 && (
          activeEventTypes?.includes(element?.event.type) && (
            <li key={id} onClick={() => handleClickEvent(element.event)} className="rounded-[4px]">
              <Popover>
                <PopoverTrigger asChild>
                  <div>
                    <a href="#" className="hidden lg:flex group"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}>
                      <div className="w-[100%] flex items-center gap-[5px]">
                        <div style={{backgroundColor: enumEventTypes[element?.event.type].color}} className="rounded-[50%] h-[5px] w-[5px]"></div>
                        <p 
                          style={{color: isHovered && enumEventTypes[element?.event.type].color}}
                          className={`flex-auto truncate font-medium text-gray-900`}>
                          <span className="hidden lg:flex">
                            {cutString(element?.event.name, 20, "...")}
                          </span>
                          <span className="flex lg:hidden">
                            {cutString(element?.event.name, 10, "...")}
                          </span>
                        </p>
                      </div>
                      <time
                        dateTime="2022-01-03T10:00"
                          style={{color: isHovered && enumEventTypes[element?.event.type].color}}
                        className={`ml-3 hidden flex-none text-gray-500 xl:block`}
                        
                      >
                        10AM
                      </time>
                    </a>
                    <span className="flex flex-wrap-reverse lg:hidden -mx-0.5 mt-auto">
                      <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                    </span>
                  </div>
                </PopoverTrigger>
                <EventDetails
                  currentEvent={element?.event}
                  calendars={calendars}
                  selectedCalendar={selectedCalendar}
                />
              </Popover>

              {/* <Drawer>
                            <DrawerTrigger asChild>
                                <div>
                                    <a href="#" className="hidden lg:flex group">
                                        <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600"> 
                                            <span className='hidden lg:flex'>{cutString(element?.event.name, 20, '...')}</span>
                                            <span className='flex lg:hidden'>{cutString(element?.event.name, 10, '...')}</span>
                                        </p>
                                        <time dateTime="2022-01-03T10:00" className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">10AM</time>
                                    </a>
                                    <span className="flex flex-wrap-reverse lg:hidden -mx-0.5 mt-auto">
                                        <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                                    </span>
                                </div>
                            </DrawerTrigger>
                            <DrawerContent>
                                <EventDetails currentEvent={element?.event} />
                            </DrawerContent>
                        </Drawer> */}
            </li>
          )
        ) 
      )}
      {events?.length > 2 && (
        <div className="cursor-default">{events?.length - 2} more...</div>
      )}
    </ol>
  );
};

export default EventsList;
