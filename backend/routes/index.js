import { Router } from "express";
import UserRouter from "./UserRouter.js";
import AuthRouter from "./AuthRouter.js";
import EventRouter from "./EventRouter.js";
import CalendarRouter from "./CalendarRouter.js";

const router = Router();

router.use("/api/user", UserRouter);
router.use("/api/auth", AuthRouter);
router.use("/api/event", EventRouter);
router.use("/api/calendar", CalendarRouter);

export default router;
