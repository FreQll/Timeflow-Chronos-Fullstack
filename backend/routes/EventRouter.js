import { Router } from "express";
import {
  getAllEvents,
  getUserEvents,
  confirmAddingUserToEvent,
  createEvent,
  addUserToEvent,
  updateEvent,
  deleteEvent,
  getEventById,
} from "../controllers/EventController.js";
import { isAuth } from "../middleware/isAuth.js";

const router = Router();

router.get("/", isAuth, getAllEvents);
router.get("/eventInfo/:eventId", isAuth, getEventById);
router.get("/:id", isAuth, getUserEvents);
router.post("/addUserToEvent/:id/:token", isAuth, confirmAddingUserToEvent);
router.post("/", isAuth, createEvent);
router.post("/addUserToEvent", isAuth, addUserToEvent);
router.patch("/:id", isAuth, updateEvent);
router.delete("/:id", isAuth, deleteEvent);

export default router;
