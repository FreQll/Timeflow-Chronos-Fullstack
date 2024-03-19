import moment from "moment";

moment.updateLocale("en", { week: { dow: 1 } });

export const getTodayDate = () => {
  return moment();
};

export const getStartAndEndDateOfMonth = (date) => {
  if (!date) date = moment();
  return {
    start: date.clone().startOf("month"),
    end: date.clone().endOf("month"),
  };
};

export const getStartAndEndDateOfCalendar = (date) => {
  if (!date) date = moment();
  return {
    start: date.clone().startOf("month").startOf("week"),
    end: date.clone().endOf("month").endOf("week"),
  };
};

export const getCalendarDates = ({ start }) => {
  if (!start) start = getStartAndEndDateOfCalendar().start;
  const end = getStartAndEndDateOfCalendar().end;
  const currentDay = start;
  const daysOfMonth = [];

  while (currentDay.isSameOrBefore(end, "day")) {
    daysOfMonth.push(currentDay.clone());
    currentDay.add(1, "day");
  }
  return daysOfMonth;
};

export const isDateBeforeDate = (start, end) => {
  return moment(start)
    .startOf("day")
    .isSameOrBefore(moment(end).startOf("day"));
};

export const isCurrentDate = (date) => {
  return moment().isSame(date, "day");
};

export const formatDate = (date, formatString) => {
  return moment.utc(date).format(formatString);
};

export const formatStringToIso = (
  startHour,
  startMinutes,
  endHour,
  endMinutes,
  startDay,
  endDay
) => {
  const timeStart = (startHour || "09") + ":" + (startMinutes || "00") + ":00";
  const timeEnd = (endHour || "10") + ":" + (endMinutes || "00") + ":00";

  const formatDateStart =
    moment(startDay).format("YYYY-MM-DD").toString() +
    "T" +
    timeStart +
    ".000Z";
  const formatDateEnd =
    moment(endDay || startDay)
      .format("YYYY-MM-DD")
      .toString() +
    "T" +
    timeEnd +
    ".000Z";

  return {
    formatDateStart: formatDateStart,
    formatDateEnd: formatDateEnd,
  };
};
