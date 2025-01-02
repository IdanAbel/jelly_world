import express from "express";
import {
  login,
  googleLogin,
  register,
  getUserProfile,
  updateUserProfile,
  getAll,
  deleteUser,
  getById,
} from "../controllers/authController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", protect, getAll);
router.get("/:id", getById);
router.get("/profile", protect, getUserProfile);
router.post("/", register);
router.post("/login", protect, login);
router.post("/googleLogin", googleLogin);
router.put("/profile", updateUserProfile);
router.delete("/:id", protect, deleteUser);

export default router;
