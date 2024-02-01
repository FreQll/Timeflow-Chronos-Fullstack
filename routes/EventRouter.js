import { Router } from "express";
import {
  getAllEvents,
  getUserEvents,
  confirmAddingUserToEvent,
  createEvent,
  addUserToEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/EventController.js";
import { isAuth } from "../middleware/isAuth.js";

const router = Router();

router.get("/", isAuth, getAllEvents);
router.get("/:id", getUserEvents);
router.post("/addUserToEvent/:id/:token", confirmAddingUserToEvent);
router.post("/", createEvent);
router.post("/addUserToEvent", addUserToEvent);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
