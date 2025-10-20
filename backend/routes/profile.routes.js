import { Router } from "express"
import { get, update } from "../controllers/profile.controller.js"
import { auth, adminOnly } from "../middleware/auth.js"

const router = Router()
router.get("/", get)                  // Public GET profile
router.put("/", auth, adminOnly, update)  // Admin-only update

export default router