import { Router } from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
} from "../controllers/UserController.js";
import { isAuth } from "../middleware/isAuth.js";

const router = Router();

router.get("/", isAuth, getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
