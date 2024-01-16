-- CreateEnum
CREATE TYPE "Role" AS ENUM ('GUEST', 'MODERATOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('ARRANGMENT', 'REMINDER', 'TASK', 'BIRTHDAY');

-- CreateTable
CREATE TABLE "Calendar" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Calendar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "content" TEXT,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "type" "EventType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCalendars" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "calendarId" INTEGER NOT NULL,
    "role" "Role" NOT NULL,
    "isConfirmed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserCalendars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserEvents" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "role" "Role" NOT NULL,
    "isConfirmed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserEvents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalendarEvents" (
    "id" SERIAL NOT NULL,
    "calendarId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "CalendarEvents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserCalendars" ADD CONSTRAINT "UserCalendars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCalendars" ADD CONSTRAINT "UserCalendars_calendarId_fkey" FOREIGN KEY ("calendarId") REFERENCES "Calendar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEvents" ADD CONSTRAINT "UserEvents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEvents" ADD CONSTRAINT "UserEvents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarEvents" ADD CONSTRAINT "CalendarEvents_calendarId_fkey" FOREIGN KEY ("calendarId") REFERENCES "Calendar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarEvents" ADD CONSTRAINT "CalendarEvents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
