import {
  getStartAndEndDateOfMonth,
  isDateBeforeDate,
  isCurrentDate,
} from "../../helper/momentFunc";
import moment from "moment";
import EventsList from "./EventsList";

const MonthView = ({
  events,
  today,
  startOfCalendar,
  currentEvent,
  setCurrentEvent,
  activeEventTypes,
  calendars,
  selectedCalendar,
}) => {
  const totalDays = 42;
  const calendarId = selectedCalendar?.id;

  const day = startOfCalendar.clone().subtract(1, "day");
  const datesArray = [...Array(totalDays)].map(() => day.add(1, "day").clone());
  const startOfMonth = getStartAndEndDateOfMonth(today).start;
  const endOfMonth = getStartAndEndDateOfMonth(today).end;

  const isEventOnDay = (date) => {
    let flag = false;
    events.forEach((element) => {
      const start = moment(element.event.start);
      const end = moment(element.event.end);

      if (isDateBeforeDate(start, date) && isDateBeforeDate(date, end)) {
        flag = true;
        return true;
      }
    });
    return flag;
  };

  return (
    <div className="w-full grid grid-cols-7 grid-rows-6 gap-px h-[-webkit-fill-available]">
      {datesArray.map((date) => (
        <div
          key={date}
          className={`relative py-2
                    ${
                      isDateBeforeDate(date, startOfMonth) ||
                      isDateBeforeDate(endOfMonth, date)
                        ? "bg-gray-50 text-gray-500"
                        : "bg-white text-gray-900"
                    } 
                `}
        >
          <time
            className={`flex justify-end items-center md:justify-start mx-3
                        ${
                          isCurrentDate(date) &&
                          "md:h-6 md:w-6 md:justify-center rounded-full md:bg-indigo-600 font-semibold md:text-white text-indigo-600"
                        }
                    `}
          >
            {date.date()}
          </time>

          {isEventOnDay(date) && (
            <EventsList
              date={date}
              currentEvent={currentEvent}
              setCurrentEvent={setCurrentEvent}
              activeEventTypes={activeEventTypes}
              calendarId={calendarId}
              calendars={calendars}
              selectedCalendar={selectedCalendar}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MonthView;
