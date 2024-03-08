import prisma from "../DB/db.config.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../tools/sendEmail.js";
import cron from "node-cron";
import moment from "moment";
import { reminderHTML } from "../public/emails/reminderHTML.js";
import { birthdayHTML } from "../public/emails/birthdayHTML.js";
import { addToEventHTML } from "../public/emails/addToEventHTML.js";

export const getAllEvents = async (req, res) => {
  const events = await prisma.event.findMany();

  return res.status(200).json(events);
};

export const getEventById = async (req, res) => {
  const eventId = req.params.eventId;
  const event = await prisma.event.findUnique({ where: { id: eventId } });

  if (!event) {
    return res.status(404).json({ message: "Event not found." });
  }

  return res.status(200).json(event);
};

export const getUserEvents = async (req, res) => {
  const userId = req.params.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  // ? User can see only confirmed events? Right?

  const events = await prisma.userEvents.findMany({
    where: {
      userId: userId,
      isConfirmed: true,
    },
    select: {
      event: true,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  return res.status(200).json(events);
};

export const createEvent = async (req, res) => {
  const {
    name,
    color,
    content,
    start,
    end,
    type,
    userId,
    calendarId,
    remindDelay,
  } = req.body;

  const calendar = await prisma.calendar.findUnique({
    where: {
      id: calendarId,
    },
  });

  if (!calendar) {
    return res.status(404).json({ message: "Calendar not found." });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const userCalendar = await prisma.userCalendars.findFirst({
    where: {
      userId: userId,
      calendarId: calendarId,
    },
  });

  if (!userCalendar) {
    return res.status(404).json({ message: "User is not in the calendar." });
  }

  if (userCalendar.role === "GUEST") {
    return res
      .status(403)
      .json({ message: "User is not allowed to add events." });
  }

  let startDate;
  let endDate;

  if (type === "BIRTHDAY") {
    startDate = moment(start).startOf("day");
    endDate = moment(start).endOf("day");
  }

  //console.log(startDate, endDate);

  const event = await prisma.event.create({
    data: {
      name,
      color,
      content,
      start: startDate || start,
      end: endDate || end,
      type,
    },
  });

  const calendarEvent = await prisma.calendarEvents.create({
    data: {
      calendarId,
      eventId: event.id,
    },
  });

  const userEvent = await prisma.userEvents.create({
    data: {
      role: userCalendar.role,
      userId,
      eventId: event.id,
    },
  });

  if (type === "REMINDER") {
    const delay = remindDelay || "15 minutes"; //! remindDelay should be in format "15 minutes", "2 hours", "2 days", "2 weeks", "2 months", "2 years"
    const delayArray = delay.split(" ");

    const scheduledTime = moment(start)
      .subtract(parseInt(delayArray[0]), delayArray[1])
      .format();
    const reminderDate = new Date(
      moment(scheduledTime).utc().format("YYYY-MM-DDTHH:mm:ss")
    ); //! need to test this times more

    const month = reminderDate.getMonth() + 1;
    const day = reminderDate.getDate();
    const hour = reminderDate.getHours();
    const minute = reminderDate.getUTCMinutes();

    const cronExpression = `${minute} ${hour} ${day} ${month} *`;

    cron.schedule(cronExpression, async () => {
      await sendEmail(
        user.email,
        `🔔 ${name} reminder 🔔`,
        reminderHTML(
          user.full_name,
          name,
          content,
          moment(start).utc().format("DD.MM.YYYY [at] HH:mm"),
          "google.com"
        )
      );
      cron.cancel(cronExpression);
    });
  }

  if (type === "BIRTHDAY") {
    const scheduledTime = moment(start).format();
    const reminderDate = moment(scheduledTime).toDate();

    const month = reminderDate.getMonth() + 1;
    const day = reminderDate.getDate();

    const cronExpression = `0 9 ${day} ${month} *`;

    cron.schedule(cronExpression, async () => {
      await sendEmail(
        user.email,
        `🎂 ${name} Birthday 🎂`,
        birthdayHTML(user.full_name, name)
      );
      cron.cancel(cronExpression);
    });
  }

  return res.status(201).json({ event, userEvent, calendarEvent });
};

export const updateEvent = async (req, res) => {
  const eventId = req.params.id;
  const { name, color, content, start, end, type, calendarId } = req.body;
  const event = await prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      name,
      color,
      content,
      start,
      end,
      type,
    },
  });

  const calendarEvent = await prisma.calendarEvents.updateMany({
    where: {
      eventId: eventId,
    },
    data: {
      calendarId: calendarId
    }
  });

  return res.status(200).json({event: event, calendarId: calendarId});
};

export const deleteEvent = async (req, res) => {
  const eventId = req.params.id;

  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    return res.status(404).json({ message: "Event not found." });
  }

  await prisma.userEvents.deleteMany({
    where: {
      eventId: eventId,
    },
  });

  await prisma.calendarEvents.deleteMany({
    where: {
      eventId: eventId,
    },
  });

  await prisma.event.delete({
    where: {
      id: eventId,
    },
  });

  return res.status(200).json({ message: "Event deleted." });
};

export const addUserToEvent = async (req, res) => {
  const { email, ownerId, role, eventId } = req.body;

  const userToAdd = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!userToAdd) {
    return res.status(404).json({ message: "User not found." });
  }

  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    return res.status(404).json({ message: "Event not found." });
  }

  const owner = await prisma.user.findUnique({
    where: {
      id: ownerId,
    },
  });

  if (!owner) {
    return res.status(404).json({ message: "Owner not found." });
  }

  const userEvent = await prisma.userEvents.findFirst({
    where: {
      userId: userToAdd.id,
      eventId: eventId,
    },
  });

  if (userEvent) {
    return res.status(400).json({ message: "User is already in the event." });
  }

  const secret = process.env.SECRET_KEY + userToAdd.password;
  const payload = {
    email: userToAdd.email,
    id: userToAdd.id,
    eventId: event.id,
  };
  const token = await jwt.sign(payload, secret, { expiresIn: "1h" });

  // console.log(token);

  const link = `http://${process.env.HOST}:${process.env.PORT}/api/event/addUserToEvent/${userToAdd.id}/${token}`;
  // const message = `<b>${owner.login}</b> wants to add you to the event <b>"${event.name}"</b>.
  // Here is <a href="${link}">link to confirm adding to the event</a>, remember it is valid for 1 hour and can be used only once.`;
  // await sendEmail(
  //   userToAdd.email,
  //   `${owner.login} wants to add you to the event.`,
  //   message
  // );

  await sendEmail(
    userToAdd.email,
    `📅 ${owner.full_name} wants to add you to the event 📅`,
    addToEventHTML(userToAdd.full_name, owner.full_name, event.name, link)
  );

  await prisma.userEvents.create({
    data: {
      userId: userToAdd.id,
      eventId: event.id,
      role: role,
    },
  });

  return res
    .status(200)
    .json({ message: "User added to event. Waiting for confirmation." });
};

export const confirmAddingUserToEvent = async (req, res) => {
  const { id, token } = req.params;
  const { calendarId } = req.body;

  if (!id || !token) {
    return res.status(400).json({ message: "Invalid data." });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const calendar = await prisma.calendar.findUnique({
    where: {
      id: calendarId,
    },
  });

  if (!calendar) {
    return res.status(404).json({ message: "Calendar not found." });
  }

  const secret = process.env.SECRET_KEY + user.password;
  try {
    const payload = jwt.verify(token, secret);
    if (payload.id !== user.id) {
      return res.status(400).json({ message: "Invalid data." });
    }
    const userEvent = await prisma.userEvents.findFirst({
      where: {
        userId: user.id,
        eventId: payload.eventId,
      },
    });

    await prisma.userEvents.update({
      where: {
        id: userEvent.id,
      },
      data: {
        isConfirmed: true,
      },
    });

    await prisma.calendarEvents.create({
      data: {
        calendarId: calendarId,
        eventId: payload.eventId,
      },
    });

    return res.status(200).json({ message: "User confirmed adding to event." });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
