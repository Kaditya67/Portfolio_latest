import { Router } from "express"
import { list, create, update, remove } from "../controllers/learning.controller.js"
import { auth, adminOnly } from "../middleware/auth.js"

const router = Router()
router.get("/", list)
router.post("/", auth, adminOnly, create)
router.put("/:id", auth, adminOnly, update)
router.delete("/:id", auth, adminOnly, remove)

export default router
