/*
  Warnings:

  - The primary key for the `Calendar` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CalendarEvents` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserCalendars` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserEvents` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "CalendarEvents" DROP CONSTRAINT "CalendarEvents_calendarId_fkey";

-- DropForeignKey
ALTER TABLE "CalendarEvents" DROP CONSTRAINT "CalendarEvents_eventId_fkey";

-- DropForeignKey
ALTER TABLE "UserCalendars" DROP CONSTRAINT "UserCalendars_calendarId_fkey";

-- DropForeignKey
ALTER TABLE "UserCalendars" DROP CONSTRAINT "UserCalendars_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserEvents" DROP CONSTRAINT "UserEvents_eventId_fkey";

-- DropForeignKey
ALTER TABLE "UserEvents" DROP CONSTRAINT "UserEvents_userId_fkey";

-- AlterTable
ALTER TABLE "Calendar" DROP CONSTRAINT "Calendar_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Calendar_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Calendar_id_seq";

-- AlterTable
ALTER TABLE "CalendarEvents" DROP CONSTRAINT "CalendarEvents_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "calendarId" SET DATA TYPE TEXT,
ALTER COLUMN "eventId" SET DATA TYPE TEXT,
ADD CONSTRAINT "CalendarEvents_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CalendarEvents_id_seq";

-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Event_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "UserCalendars" DROP CONSTRAINT "UserCalendars_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "calendarId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserCalendars_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserCalendars_id_seq";

-- AlterTable
ALTER TABLE "UserEvents" DROP CONSTRAINT "UserEvents_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "eventId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserEvents_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserEvents_id_seq";

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
