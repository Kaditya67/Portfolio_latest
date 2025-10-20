import { Router } from "express"
import { login, me, logout } from "../controllers/auth.controller.js"
import { auth } from "../middleware/auth.js"
import { registerAdmin, changePassword, forgotPassword, resetPassword } from "../controllers/auth.controller.js"

const router = Router()
router.post("/login", login)
router.get("/me", auth, me)
router.post("/logout", auth, logout)
router.post("/register-admin", registerAdmin)
router.post("/change-password", auth, changePassword)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)

export default router