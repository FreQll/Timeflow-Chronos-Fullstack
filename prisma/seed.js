import prisma from "../DB/db.config.js";
import { faker } from "@faker-js/faker";

async function main() {
  const users = [];
  const calendars = [];
  const events = [];

  // Create users
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        login: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        full_name: faker.person.fullName(),
      },
    });
    users.push(user);
  }

  // Create calendars
  for (let i = 0; i < 5; i++) {
    const calendar = await prisma.calendar.create({
      data: {
        name: faker.lorem.words(),
        color: faker.internet.color(),
        description: faker.lorem.sentence(),
      },
    });
    calendars.push(calendar);
  }

  // Create events
  for (let i = 0; i < 10; i++) {
    const event = await prisma.event.create({
      data: {
        name: faker.lorem.words(),
        content: faker.lorem.paragraph(),
        color: faker.internet.color(),
        start: faker.date.future(),
        end: faker.date.future(),
        type: "ARRANGMENT",
      },
    });
    events.push(event);
  }

  // Connect users to calendars with roles
  for (const user of users) {
    const calendar = calendars[Math.floor(Math.random() * calendars.length)];
    await prisma.userCalendars.create({
      data: {
        user: { connect: { id: user.id } },
        calendar: { connect: { id: calendar.id } },
        role: "GUEST", // Modify role as needed
        isConfirmed: true, // Modify confirmation status as needed
      },
    });
  }

  // Connect users to events with roles
  for (const user of users) {
    const event = events[Math.floor(Math.random() * events.length)];
    await prisma.userEvents.create({
      data: {
        user: { connect: { id: user.id } },
        event: { connect: { id: event.id } },
        role: "GUEST", // Modify role as needed
        isConfirmed: true, // Modify confirmation status as needed
      },
    });
  }

  // Connect calendars to events
  for (const calendar of calendars) {
    const event = events[Math.floor(Math.random() * events.length)];
    await prisma.calendarEvents.create({
      data: {
        calendar: { connect: { id: calendar.id } },
        event: { connect: { id: event.id } },
      },
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    prisma.$disconnect();
  });
