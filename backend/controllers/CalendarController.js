import prisma from "../DB/db.config.js";
import moment from "moment";
import jwt from "jsonwebtoken";
import { sendEmail } from "../tools/sendEmail.js";
import { addToCalendarHTML } from "../public/emails/addToCalendarHTML.js";

export const getCalendarById = async (req, res) => {
  const calendarId = req.params.calendarId;
  const calendar = await prisma.calendar.findUnique({
    where: { id: calendarId },
  });

  if (!calendar) {
    return res.status(404).json({ message: "Calendar not found." });
  }

  return res.status(200).json(calendar);
};

export const getCalendarByEvent = async (req, res) => {
  const eventId = req.params.eventId;
  const calendar = await prisma.calendarEvents.findMany({
    where: { eventId: eventId },
  });

  if (!calendar || calendar.length == 0) {
    return;
  } else {
    console.log(calendar);
    const calendarInfo = await prisma.calendar.findUnique({
      where: { id: calendar[0].calendarId },
    });

    return res.status(200).json(calendarInfo);
  }
};

export const getUserCalendars = async (req, res) => {
  const userId = req.params.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const calendars = await prisma.userCalendars.findMany({
    where: {
      userId: userId,
      isConfirmed: true,
    },
    select: {
      calendar: true,
    },
  });

  return res.status(200).json(calendars);
};

export const getAllCalendarEvents = async (req, res) => {
  const calendarId = req.params.id;

  const calendar = await prisma.calendar.findUnique({
    where: {
      id: calendarId,
    },
  });

  if (!calendar) {
    return res.status(404).json({ message: "Calendar not found." });
  }

  const calendarEvents = await prisma.calendarEvents.findMany({
    where: {
      calendarId: calendarId,
    },
    select: {
      event: true,
    },
  });

  return res.status(200).json(calendarEvents);
};

export const getCalendarEventsByTime = async (req, res) => {
  const calendarId = req.params.id;
  const calendar = await prisma.calendar.findUnique({
    where: {
      id: calendarId,
    },
  });
  if (!calendar) {
    return res.status(404).json({ message: "Calendar not found." });
  }

  const { startDate, endDate } = req.query;
  if (!startDate || !endDate) {
    return res.status(400).json({ message: "Missing parameters." });
  }

  // console.log(
  //   moment(startDate, "DD-MM-YYYY").toISOString(),
  //   moment(endDate, "DD-MM-YYYY").toISOString()
  // );

  console.log("\nDATE:");
  console.log(moment(startDate, "DD-MM-YYYY").toISOString());
  console.log(moment(endDate, "DD-MM-YYYY").toISOString());

  const calendarEvents = await prisma.calendarEvents.findMany({
    where: {
      calendarId: calendarId,
      event: {
        AND: [
          {
            start: {
              lte: moment(endDate, "DD-MM-YYYY").add(2, "day").toISOString(),
            },
          },
          { end: { gte: moment(startDate, "DD-MM-YYYY").toISOString() } },
        ],
      },
    },
    select: {
      event: true,
    },
  });

  return res.status(200).json(calendarEvents);
};

// export const getCalendarEvents = async (req, res) => {
//   const calendarId = req.params.id;

//   const timeSegment = req.query.timeSegment;
//   let { startDate, endDate } = req.query;
//   const momentDate = moment(new Date());

//   if (timeSegment) {
//     switch (timeSegment) {
//       case "day":
//         startDate = momentDate.clone().startOf("day");
//         endDate = momentDate.clone().endOf("day");
//         break;
//       case "week":
//         startDate = momentDate.clone().startOf("week");
//         endDate = momentDate.clone().endOf("week");
//         break;
//       case "month":
//         startDate = momentDate.clone().startOf("month");
//         endDate = momentDate.clone().endOf("month");
//         break;
//       case "year":
//         startDate = momentDate.clone().startOf("year");
//         endDate = momentDate.clone().endOf("year");
//         break;
//       default:
//         startDate = momentDate.clone().startOf("day");
//         endDate = momentDate.clone().endOf("day");
//         break;
//     }
//   }

//   if (startDate && endDate) {
//     startDate = moment(startDate, "DD-MM-YYYY").toDate();
//     endDate = moment(endDate, "DD-MM-YYYY").toDate();
//   }

//   console.log(startDate, endDate);

//   let calendar;

//   if (timeSegment) {
//     calendar = await prisma.calendarEvents.findMany({
//       where: {
//         calendarId: calendarId,
//         event: {
//           AND: [
//             { start: { gte: startDate, lte: endDate } },
//             // Uncomment the line below if you want to include events that started before the start date but end within the range
//             // { end: { gte: startDate.toDate(), lte: endDate.toDate() } },
//           ],
//         },
//       },
//       select: {
//         event: true,
//       },
//     });
//   } else if (startDate && endDate) {
//     calendar = await prisma.calendarEvents.findMany({
//       where: {
//         calendarId: calendarId,
//         event: {
//           AND: [{ start: { gte: startDate, lte: endDate } }],
//         },
//       },
//       select: {
//         event: true,
//       },
//     });
//   } else {
//     calendar = await prisma.calendarEvents.findMany({
//       where: {
//         calendarId: calendarId,
//       },
//       select: {
//         event: true,
//       },
//     });
//   }

//   if (!calendar) {
//     return res.status(404).json({ message: "Calendar not found." });
//   }

//   return res.status(200).json(calendar);
// };

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
      isConfirmed: true,
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

  if (calendar.isMain) {
    return res.status(400).json({ message: "Cannot delete main calendar." });
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

export const addUserToCalendar = async (req, res) => {
  const { email, ownerId, calendarId, role } = req.body;

  const userToAdd = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  console.log(userToAdd);

  if (!userToAdd) {
    return res.status(404).json({ message: "User not found." });
  }

  const owner = await prisma.user.findUnique({
    where: {
      id: ownerId,
    },
  });

  if (!owner) {
    return res.status(404).json({ message: "Owner not found." });
  }

  const userCalendar = await prisma.userCalendars.findFirst({
    where: {
      userId: userToAdd.id,
      calendarId: calendarId,
    },
  });

  if (userCalendar) {
    return res
      .status(400)
      .json({ message: "User is already in the calendar." });
  }

  const calendar = await prisma.calendar.findUnique({
    where: {
      id: calendarId,
    },
  });

  if (!calendar) {
    return res.status(404).json({ message: "Calendar not found." });
  }

  // *Send email

  const secret = process.env.SECRET_KEY + userToAdd.password;
  const payload = {
    email: userToAdd.email,
    id: userToAdd.id,
    calendarId: calendar.id,
  };
  const token = await jwt.sign(payload, secret, { expiresIn: "1h" });

  const link = `http://${process.env.HOST}:${process.env.PORT}/api/calendar/addUserToCalendar/${userToAdd.id}/${token}`;

  await sendEmail(
    userToAdd.email,
    `🗓️ ${owner.full_name} wants to add you to the calendar 🗓️`,
    addToCalendarHTML(userToAdd.full_name, owner.full_name, calendar.name, link)
  );

  await prisma.userCalendars.create({
    data: {
      userId: userToAdd.id,
      calendarId: calendar.id,
      role: role,
    },
  });

  return res
    .status(200)
    .json({ message: "User added to calendar. Waiting for confirmation." });
};

export const confirmAddingToCalendar = async (req, res) => {
  const { id, token } = req.params;

  if (!id || !token) {
    return res.status(400).json({ message: "Missing parameters." });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const secret = process.env.SECRET_KEY + user.password;
  try {
    const payload = jwt.verify(token, secret);
    if (payload.id !== user.id) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    // console.log(payload);
    // console.log(user.id + " " + payload.calendarId);

    const userCalendar = await prisma.userCalendars.findFirst({
      where: {
        userId: user.id,
        calendarId: payload.calendarId,
      },
    });

    await prisma.userCalendars.update({
      where: {
        id: userCalendar.id,
      },
      data: {
        isConfirmed: true,
      },
    });

    // console.log(userCalendar);

    return res
      .status(200)
      .json({ message: "User confirmed adding to the calendar." });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
