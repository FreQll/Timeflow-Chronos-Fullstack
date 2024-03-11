import { Fragment, useEffect, useRef } from "react";
// import {
//   ChevronDownIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   EllipsisHorizontalIcon,
// } from "@heroicons/react/20/solid";
// import { Menu, Transition } from "@headlessui/react";
// import moment from "moment";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const WeekView = ({
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
  const containerNav = useRef(null);
  const containerOffset = useRef(null);

  function calculateGridRow(event) {
    const startHour = new Date(event.event.start).getUTCHours();
    const startMinute = new Date(event.event.start).getUTCMinutes();
    return (startHour - 6) * 12 + Math.ceil(startMinute / 5) + 1;
  }

  // Function to calculate grid span based on event duration
  function calculateGridSpan(event) {
    const start = new Date(event.event.start);
    const end = new Date(event.event.end);
    const durationInMinutes = (end - start) / (1000 * 60);
    return Math.ceil(durationInMinutes / 5);
  }

  // Function to format time as "hh:mm AM/PM"
  function formatTime(dateTime) {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(dateTime).toLocaleTimeString([], options);
  }

  function eventColor(event) {
    switch (event.event.type) {
      case "ARRANGEMENT":
        return "blue";
      case "REMINDER":
        return "pink";
      // Add more cases for other event types if needed
      default:
        return "gray";
    }
  }

  useEffect(() => {
    // Set the container scroll position based on the current time.
    const currentMinute = new Date().getHours() * 60;
    container.current.scrollTop =
      ((container.current.scrollHeight -
        containerNav.current.offsetHeight -
        containerOffset.current.offsetHeight) *
        currentMinute) /
      1440;
  }, []);

  console.log(events);

  const currentDate = new Date();
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - currentDate.getDay()); // Start from Sunday
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6); // End on Saturday

  console.log(currentDate + " " + startDate + " " + endDate);

  // Generate days of the week

  const from_date = today.clone().startOf("week");
  const to_date = today.clone().endOf("week");
  console.log({
    from_date: from_date.toString(),
    to_date: to_date.toString(),
  });

  const daysOfWeek = [];
  for (let i = 0; i <= to_date.diff(from_date, "days"); i++) {
    const currentDay = from_date.clone().add(i, "days").toDate(); // Convert to JavaScript Date
    daysOfWeek.push(currentDay);
    console.log(currentDay.toLocaleDateString("en-US", { weekday: "short" }));
  }

  return (
    <div className="flex h-full flex-col">
      <div
        ref={container}
        className="isolate flex flex-auto flex-col overflow-auto bg-white"
      >
        <div
          style={{ width: "165%" }}
          className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
        >
          <div
            ref={containerNav}
            className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
          >
            <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
              {/* <button
                type="button"
                className="flex flex-col items-center pb-3 pt-2"
              >
                M{" "}
                <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                  10
                </span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center pb-3 pt-2"
              >
                T{" "}
                <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                  11
                </span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center pb-3 pt-2"
              >
                W{" "}
                <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
                  12
                </span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center pb-3 pt-2"
              >
                T{" "}
                <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                  13
                </span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center pb-3 pt-2"
              >
                F{" "}
                <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                  14
                </span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center pb-3 pt-2"
              >
                S{" "}
                <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                  15
                </span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center pb-3 pt-2"
              >
                S{" "}
                <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                  16
                </span>
              </button> */}
              {daysOfWeek.map((day, index) => (
                <button
                  key={index}
                  type="button"
                  className="flex flex-col items-center pb-3 pt-2"
                >
                  {day.toLocaleDateString("en-US", { weekday: "short" })}
                  <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                    {day.getDate()}
                  </span>
                </button>
              ))}
            </div>

            <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
              <div className="col-end-1 w-14" />
              {daysOfWeek.map((day, index) => (
                <button
                  key={index}
                  type="button"
                  className="flex items-center justify-center py-3"
                >
                  {day.toLocaleDateString("en-US", { weekday: "short" })}
                  <span className="items-center justify-center font-semibold text-gray-900">
                    {day.getDate()}
                  </span>
                </button>
              ))}
              {/* <div className="flex items-center justify-center py-3">
                <span>
                  Mon{" "}
                  <span className="items-center justify-center font-semibold text-gray-900">
                    10
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Tue{" "}
                  <span className="items-center justify-center font-semibold text-gray-900">
                    11
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span className="flex items-baseline">
                  Wed{" "}
                  <span className="ml-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
                    12
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Thu{" "}
                  <span className="items-center justify-center font-semibold text-gray-900">
                    13
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Fri{" "}
                  <span className="items-center justify-center font-semibold text-gray-900">
                    14
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Sat{" "}
                  <span className="items-center justify-center font-semibold text-gray-900">
                    15
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Sun{" "}
                  <span className="items-center justify-center font-semibold text-gray-900">
                    16
                  </span>
                </span>
              </div> */}
            </div>
          </div>
          <div className="flex flex-auto">
            <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                style={{ gridTemplateRows: "repeat(48, minmax(3.5rem, 1fr))" }}
              >
                <div ref={containerOffset} className="row-end-1 h-7"></div>
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    12AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    1AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    2AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    3AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    4AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    5AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    6AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    7AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    8AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    9AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    10AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    11AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    12PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    1PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    2PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    3PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    4PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    5PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    6PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    7PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    8PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    9PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    10PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    11PM
                  </div>
                </div>
                <div />
              </div>

              {/* Vertical lines */}
              <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
                <div className="col-start-1 row-span-full" />
                <div className="col-start-2 row-span-full" />
                <div className="col-start-3 row-span-full" />
                <div className="col-start-4 row-span-full" />
                <div className="col-start-5 row-span-full" />
                <div className="col-start-6 row-span-full" />
                <div className="col-start-7 row-span-full" />
                <div className="col-start-8 row-span-full w-8" />
              </div>

              {/* Events */}
              <ol
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
                style={{
                  gridTemplateRows: "1.75rem repeat(288, minmax(0, 1fr)) auto",
                }}
              >
                {events.map((event, index) => {
                  return (
                    <li
                      key={index}
                      className="relative mt-px flex sm:col-start-3"
                      style={{
                        gridRow: `${calculateGridRow(
                          event
                        )} / span ${calculateGridSpan(event)}`,
                      }}
                    >
                      <a
                        href="#"
                        className={`group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-${eventColor(
                          event
                        )}-50 p-2 text-xs leading-5 hover:bg-${eventColor(
                          event
                        )}-100`}
                      >
                        <p
                          className={`order-1 font-semibold text-${eventColor(
                            event
                          )}-700`}
                        >
                          {event.event.name}
                        </p>
                        <p
                          className={`text-${eventColor(
                            event
                          )}-500 group-hover:text-${eventColor(event)}-700`}
                        >
                          <time dateTime={event.event.start}>
                            {formatTime(event.event.start)} -{" "}
                            {formatTime(event.event.end)}
                          </time>
                        </p>
                      </a>
                    </li>
                  );
                })}
              </ol>
              {/* <ol
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
                style={{
                  gridTemplateRows: "1.75rem repeat(288, minmax(0, 1fr)) auto",
                }}
              >
                <li
                  className="relative mt-px flex sm:col-start-3"
                  style={{ gridRow: "74 / span 12" }}
                >
                  <a
                    href="#"
                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
                  >
                    <p className="order-1 font-semibold text-blue-700">
                      Breakfast
                    </p>
                    <p className="text-blue-500 group-hover:text-blue-700">
                      <time dateTime="2022-01-12T06:00">6:00 AM</time>
                    </p>
                  </a>
                </li>
                <li
                  className="relative mt-px flex sm:col-start-3"
                  style={{ gridRow: "92 / span 30" }}
                >
                  <a
                    href="#"
                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100"
                  >
                    <p className="order-1 font-semibold text-pink-700">
                      Flight to Paris
                    </p>
                    <p className="text-pink-500 group-hover:text-pink-700">
                      <time dateTime="2022-01-12T07:30">7:30 AM</time>
                    </p>
                  </a>
                </li>
                <li
                  className="relative mt-px hidden sm:col-start-6 sm:flex"
                  style={{ gridRow: "122 / span 24" }}
                >
                  <a
                    href="#"
                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-100 p-2 text-xs leading-5 hover:bg-gray-200"
                  >
                    <p className="order-1 font-semibold text-gray-700">
                      Meeting with design team at Disney
                    </p>
                    <p className="text-gray-500 group-hover:text-gray-700">
                      <time dateTime="2022-01-15T10:00">10:00 AM</time>
                    </p>
                  </a>
                </li>
              </ol> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
