import { Router } from "express";
import {
  getUserCalendars,
  getCalendarEvents,
  createCalendar,
  updateCalendar,
  deleteCalendar,
} from "../controllers/CalendarController.js";

const router = Router();

router.get("/:id", getUserCalendars);
router.get("/events/:id", getCalendarEvents);
router.post("/", createCalendar);
router.patch("/:id", updateCalendar);
router.delete("/:id", deleteCalendar);

export default router;
