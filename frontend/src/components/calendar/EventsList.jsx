import { useEffect, useState } from "react";
import axios, { GET_CONFIG } from "../../../API/axios";
import { cutString } from "../../helper/stringFunc";
import EventDetails from "./EventDetails";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
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
  const [isHovered, setIsHovered] = useState();

  const getEventByDay = async (date) => {
    try {
      const response = await axios.get(
        `/api/calendar/getEventsByTime/${calendarId}?startDate=${formatDate(
          date,
          "DD-MM-YYYY"
        )}&endDate=${formatDate(date, "DD-MM-YYYY")}`,
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

  const handleMouseEnter = (event) => {
    setIsHovered(event);
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
  };

  useEffect(() => {
    getEventByDay(date);
  }, [calendarId, activeEventTypes, location]);

  return (
    <ol className="mt-1 mx-2 flex flex-col px-[4px]">
      {events?.map(
        (element, id) =>
          id < 2 &&
          activeEventTypes?.includes(element?.event.type) && (
            <li
              key={id}
              onClick={() => handleClickEvent(element.event)}
              className="rounded-[4px]"
            >
              <Popover>
                <PopoverTrigger asChild>
                  <div>
                    <a
                      href="#"
                      className="hidden lg:flex group"
                      onMouseEnter={() => handleMouseEnter(element?.event)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="w-[100%] flex items-center gap-[5px]">
                        <div
                          style={{
                            backgroundColor:
                              enumEventTypes[element?.event.type].color,
                          }}
                          className="rounded-[50%] h-[5px] w-[5px]"
                        ></div>
                        <p
                          style={{
                            color:
                              isHovered?.id == element?.event.id &&
                              enumEventTypes[element?.event.type].color,
                          }}
                          className={`flex-auto truncate font-medium text-gray-900`}
                        >
                          <span className="hidden lg:flex leading-[150%]">
                            {cutString(element?.event.name, 20, "...")}
                          </span>
                          <span className="flex lg:hidden">
                            {cutString(element?.event.name, 10, "...")}
                          </span>
                        </p>
                      </div>
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
            </li>
          )
      )}
      {events?.length > 2 && (
        <div className="cursor-default">{events?.length - 2} more...</div>
      )}
    </ol>
  );
};

export default EventsList;
