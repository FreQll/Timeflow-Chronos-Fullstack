import { Router } from "express";
import {
  getAllEvents,
  getUserEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/EventController.js";

const router = Router();

router.get("/", getAllEvents);
router.get("/:id", getUserEvents);
router.post("/", createEvent);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
