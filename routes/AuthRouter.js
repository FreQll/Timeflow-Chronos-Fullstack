import { Router } from "express";
import {
  login,
  register,
  logout,
  resetPassword,
  confirmResetPassword,
} from "../controllers/AuthController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/reset-password", resetPassword);
router.post("/reset-password/:id/:token", confirmResetPassword);

export default router;
