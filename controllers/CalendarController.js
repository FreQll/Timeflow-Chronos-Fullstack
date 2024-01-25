import prisma from "../DB/db.config.js";
import moment from "moment";

export const getUserCalendars = async (req, res) => {
  const userId = req.params.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      calendars: true,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  return res.status(200).json(user.calendars);
};

export const getCalendarEvents = async (req, res) => {
  const calendarId = req.params.id;

  const timeSegment = req.query.timeSegment;
  let startDate, endDate;
  const momentDate = moment(new Date());

  if (timeSegment) {
    switch (timeSegment) {
      case "day":
        startDate = momentDate.clone().startOf("day");
        endDate = momentDate.clone().endOf("day");
        break;
      case "week":
        startDate = momentDate.clone().startOf("week");
        endDate = momentDate.clone().endOf("week");
        break;
      case "month":
        startDate = momentDate.clone().startOf("month");
        endDate = momentDate.clone().endOf("month");
        break;
      case "year":
        startDate = momentDate.clone().startOf("year");
        endDate = momentDate.clone().endOf("year");
        break;
      default:
        startDate = momentDate.clone().startOf("day");
        endDate = momentDate.clone().endOf("day");
        break;
    }
  }

  console.log(startDate.format(), endDate.format());

  let calendar;

  if (timeSegment) {
    calendar = await prisma.calendarEvents.findMany({
      where: {
        calendarId: calendarId,
        event: {
          AND: [
            { start: { gte: startDate, lte: endDate } },
            // Uncomment the line below if you want to include events that started before the start date but end within the range
            // { end: { gte: startDate.toDate(), lte: endDate.toDate() } },
          ],
        },
      },
      select: {
        event: true,
      },
    });
  } else {
    calendar = await prisma.calendarEvents.findMany({
      where: {
        calendarId: calendarId,
      },
      select: {
        event: true,
      },
    });
  }

  if (!calendar) {
    return res.status(404).json({ message: "Calendar not found." });
  }

  return res.status(200).json(calendar);
};

export const createCalendar = async (req, res) => {
  const { name, color, description, userId } = req.body;

  const calendar = await prisma.calendar.create({
    data: {
      name,
      color,
      description,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  await prisma.userCalendars.create({
    data: {
      userId: user.id,
      calendarId: calendar.id,
      role: "ADMIN",
    },
  });

  return res.status(200).json(calendar);
};

export const updateCalendar = async (req, res) => {
  const calendarId = req.params.id;
  const { name, color, description } = req.body;

  const calendar = await prisma.calendar.update({
    where: {
      id: calendarId,
    },
    data: {
      name,
      color,
      description,
    },
  });

  return res.status(200).json(calendar);
};

export const deleteCalendar = async (req, res) => {
  const calendarId = req.params.id;

  const calendar = await prisma.calendar.findUnique({
    where: {
      id: calendarId,
    },
  });

  if (!calendar) {
    return res.status(404).json({ message: "Calendar not found." });
  }

  await prisma.userCalendars.deleteMany({
    where: {
      calendarId: calendarId,
    },
  });

  await prisma.calendarEvents.deleteMany({
    where: {
      calendarId: calendarId,
    },
  });

  await prisma.calendar.delete({
    where: {
      id: calendarId,
    },
  });

  return res.status(200).json({ message: "Calendar deleted." });
};
