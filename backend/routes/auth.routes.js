import { Router } from "express";
import {
  login,
  me,
  logout,
  registerAdmin,
  changePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();

// 🔑 Auth Flow
router.post("/login", login);
router.get("/me", auth, me);
router.post("/logout", auth, logout);

// 🛠 Admin setup
router.post("/register-admin", registerAdmin);

// 🔒 Password management
router.post("/change-password", auth, changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
