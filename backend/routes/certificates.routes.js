import { Router } from "express"
import { list, create, update, remove } from "../controllers/certificates.controller.js"
import { auth, adminOnly } from "../middleware/auth.js"

const router = Router()
router.get("/", list)                     // Public GET
router.post("/", auth, adminOnly, create) // Admin-only POST
router.put("/:id", auth, adminOnly, update) // Admin-only PUT
router.delete("/:id", auth, adminOnly, remove) // Admin-only DELETE

export default router
