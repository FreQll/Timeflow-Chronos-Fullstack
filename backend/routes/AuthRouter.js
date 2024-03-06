import { Router } from "express";
import {
  login,
  register,
  logout,
  resetPassword,
  confirmResetPassword,
} from "../controllers/AuthController.js";
import { isAuth } from "../middleware/isAuth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuth, logout);
router.post("/reset-password", resetPassword);
router.post("/reset-password/confirm", confirmResetPassword);

export default router;
