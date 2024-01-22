import prisma from "../DB/db.config.js";

export const getAllEvents = async (req, res) => {
  const events = await prisma.event.findMany();

  return res.status(200).json(events);
};

export const getUserEvents = async (req, res) => {
  const userId = req.params.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      events: true,
      calendars: true,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  return res.status(200).json(user.events);
};

export const createEvent = async (req, res) => {
  const { name, color, content, start, end, type, role, userId, calendarId } =
    req.body;

  const event = await prisma.event.create({
    data: {
      name,
      color,
      content,
      start,
      end,
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
      role,
      userId,
      eventId: event.id,
    },
  });

  return res.status(201).json({ event, userEvent, calendarEvent });
};

export const updateEvent = async (req, res) => {
  const eventId = req.params.id;
  const { name, color, content, start, end, type } = req.body;

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

  return res.status(200).json(event);
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
