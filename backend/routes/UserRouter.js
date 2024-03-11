import { Router } from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserAvatar,
  updateUserAvatar,
  findUsersByEmail,
} from "../controllers/UserController.js";
import { isAuth } from "../middleware/isAuth.js";
import multer from "multer";

const upload = multer({ dest: "public/avatars" });

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/email/:email", findUsersByEmail);
router.post("/", isAuth, createUser);
router.patch("/:id", isAuth, updateUser);
router.delete("/:id", isAuth, deleteUser);

router.get("/avatar/:login", getUserAvatar);
router.patch("/avatar/:userId", upload.single("avatar"), updateUserAvatar);

export default router;
