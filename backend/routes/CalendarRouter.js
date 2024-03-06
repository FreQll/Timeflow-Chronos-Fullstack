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

router.get("/:id", isAuth, getUserCalendars);
router.get("/calendarInfo/:calendarId", isAuth, getCalendarById);
router.get("/events/:id", isAuth, getCalendarEvents);
router.get("/addUserToCalendar/:id/:token", confirmAddingToCalendar);
router.post("/", isAuth, createCalendar);
router.post("/addUserToCalendar", isAuth, addUserToCalendar);
router.patch("/:id", isAuth, updateCalendar);
router.delete("/:id", isAuth, deleteCalendar);

export default router;
