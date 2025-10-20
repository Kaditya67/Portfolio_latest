import { Router } from "express"
import { get, update } from "../controllers/about.controller.js"
import { auth, adminOnly } from "../middleware/auth.js"

const router = Router()
router.get("/", get)                     // public GET
router.put("/", auth, adminOnly, update) // admin-only PUT

export default router
