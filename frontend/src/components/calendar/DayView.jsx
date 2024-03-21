import { formatDate } from "@/helper/momentFunc";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import EventDetails from "./EventDetails";
import { PopoverTrigger, Popover } from "@radix-ui/react-popover";
import { enumEventTypes } from "@/helper/enumEventTypes";
import { addBgOpacity } from "@/helper/stringFunc";

const DayView = ({
  events,
  today,
  startOfCalendar,
  currentEvent,
  setCurrentEvent,
  activeEventTypes,
  calendars,
  selectedCalendar,
}) => {
  const container = useRef(null);
  const containerOffset = useRef(null);
  const [dailyEvents, setDailyEvents] = useState([]);

  const hours = [
    "12am",
    "1am",
    "2am",
    "3am",
    "4am",
    "5am",
    "6am",
    "7am",
    "8am",
    "9am",
    "10am",
    "11am",
    "12pm",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
    "6pm",
    "7pm",
    "8pm",
    "9pm",
    "10pm",
    "11pm",
  ];

  const isOverlap = (start1, end1, start2, end2) => {
    return start1 < end2 && end1 > start2;
  };

  useEffect(() => {
    events?.forEach((element, index) => {
      const startTime = formatDate(element.event.start, "HH:mm");
      const startTimeHour = formatDate(element.event.start, "HH");
      const startTimeMinutes = formatDate(element.event.start, "mm");
      const endTime = formatDate(element.event.end, "HH:mm");

      const durationMinutes =
        moment(element.event.end).diff(moment(element.event.start), "minutes") /
        60;

      let overlappingIndex = 0;
      let overlappingCount = 1;
      events?.forEach((item, i) => {
        if (item !== element) {
          if (
            isOverlap(
              element.event.start,
              element.event.end,
              item.event.start,
              item.event.end
            )
          ) {
            overlappingCount++;
            if (index < i) overlappingIndex++;
          }
        }
      });

      setDailyEvents((prevState) => {
        const newDailyEvents = prevState.filter(
          (item) => item.event.id !== element.event.id
        );
        return [
          ...newDailyEvents,
          {
            event: element.event,
            gridRow: `${
              2 + 12 * startTimeHour + startTimeMinutes * 0.2
            } / span ${parseInt(12 * durationMinutes)}`,
            gridColumn: `${
              overlappingIndex == 0
                ? 1
                : parseInt((overlappingIndex * 48) / overlappingCount + 1)
            } / span ${
              overlappingCount == 1 ? 48 : parseInt(48 / overlappingCount)
            }`,
            overlappingCount: overlappingCount,
          },
        ];
      });
    });
  }, [events]);

  return (
    <div className="flex h-full flex-col">
      <div className="isolate flex flex-auto overflow-hidden bg-white">
        <div ref={container} className="flex flex-auto flex-col overflow-auto">
          <div className="flex w-full flex-auto">
            <div className="w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div
              style={{ gridTemplateColumns: "repeat(48, minmax(auto, 1fr))" }}
              className="grid flex-auto grid-rows-1"
            >
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                style={{ gridTemplateRows: "repeat(48, minmax(3.5rem, 1fr))" }}
              >
                <div ref={containerOffset} className="row-end-1 h-7"></div>
                {hours.map((hour, index) => (
                  <>
                    <div>
                      <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                        {hour}
                      </div>
                    </div>
                    <div />
                  </>
                ))}
                <div />
              </div>

              <ol
                className="col-start-1 col-end-[48] row-start-1 grid"
                style={{
                  gridTemplateRows: "1.75rem repeat(288, minmax(0, 1fr)) auto",
                  gridTemplateColumns:
                    "1.75rem repeat(48, minmax(0, 1fr)) auto",
                }}
              >
                {dailyEvents?.map((element, index) => (
                  <li
                    key={index}
                    className="relative mt-px flex"
                    style={{
                      gridRow: element.gridRow,
                      gridColumn: element.gridColumn,
                    }}
                  >
                    <Popover>
                      <PopoverTrigger asChild>
                        <a
                          href="#"
                          style={{
                            backgroundColor: addBgOpacity(
                              enumEventTypes[element?.event.type].color,
                              "20"
                            ),
                          }}
                          className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg p-2 text-xs leading-5 hover:bg-blue-100"
                        >
                          <p
                            style={{
                              color: enumEventTypes[element?.event.type].color,
                            }}
                            className="order-1 text-[14px] font-semibold"
                          >
                            {element.event?.name}
                          </p>
                          <p
                            style={{
                              color: enumEventTypes[element?.event.type].color,
                            }}
                            className="group-hover:text-blue-700"
                          >
                            <time>
                              {formatDate(element.event.start, "HH:mm")}
                            </time>
                          </p>
                        </a>
                      </PopoverTrigger>
                      <EventDetails
                        currentEvent={element?.event}
                        calendars={calendars}
                        selectedCalendar={selectedCalendar}
                      />
                    </Popover>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayView;
