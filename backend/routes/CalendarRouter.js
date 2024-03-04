import { Router } from "express";
import {
  getUserCalendars,
  getCalendarEvents,
  confirmAddingToCalendar,
  createCalendar,
  addUserToCalendar,
  updateCalendar,
  deleteCalendar,
  getCalendarById,
} from "../controllers/CalendarController.js";
import { isAuth } from "../middleware/isAuth.js";

const router = Router();

router.get("/:id", getUserCalendars);
router.get("/calendarInfo/:calendarId", getCalendarById);
router.get("/events/:id", getCalendarEvents);
router.get("/addUserToCalendar/:id/:token", confirmAddingToCalendar);
router.post("/", isAuth, createCalendar);
router.post("/addUserToCalendar", isAuth, addUserToCalendar);
router.patch("/:id", isAuth, updateCalendar);
router.delete("/:id", isAuth, deleteCalendar);

export default router;
