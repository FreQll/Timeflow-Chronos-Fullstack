import { Router } from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserAvatar,
  updateUserAvatar,
} from "../controllers/UserController.js";
import { isAuth } from "../middleware/isAuth.js";
import multer from "multer";

const upload = multer({ dest: "public/avatars" });

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

router.get("/avatar/:login", getUserAvatar);
router.patch("/avatar/:userId", upload.single("avatar"), updateUserAvatar);

export default router;
