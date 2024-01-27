import prisma from "../DB/db.config.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../tools/sendEmail.js";

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
  const message = `<b>${owner.login}</b> wants to add you to the event <b>"${event.name}"</b>. 
  Here is <a href="${link}">link to confirm adding to the event</a>, remember it is valid for 1 hour and can be used only once.`;
  await sendEmail(
    userToAdd.email,
    `${owner.login} wants to add you to the event.`,
    message
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

    return res.status(200).json({ message: "User confirmed adding to event." });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
