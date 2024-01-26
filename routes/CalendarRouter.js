import { Router } from "express";
import {
  getUserCalendars,
  getCalendarEvents,
  confirmAddingToCalendar,
  createCalendar,
  addUserToCalendar,
  updateCalendar,
  deleteCalendar,
} from "../controllers/CalendarController.js";

const router = Router();

router.get("/:id", getUserCalendars);
router.get("/events/:id", getCalendarEvents);
router.get("/addUserToCalendar/:id/:token", confirmAddingToCalendar);
router.post("/", createCalendar);
router.post("/addUserToCalendar", addUserToCalendar);
router.patch("/:id", updateCalendar);
router.delete("/:id", deleteCalendar);

export default router;
