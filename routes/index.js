import { Router } from "express";
import UserRouter from "./UserRouter.js";
import AuthRouter from "./AuthRouter.js";

const router = Router();

router.use("/api/user", UserRouter);
router.use("/api/auth", AuthRouter);

export default router;
