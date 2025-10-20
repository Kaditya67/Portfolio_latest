import { Router } from "express"
import { list, create, remove, markAsRead, toggleSave } from "../controllers/contact.controller.js";
import { auth, adminOnly } from "../middleware/auth.js"

const router = Router()

router.get("/", auth, adminOnly, list);
router.post("/", create);
router.put("/:id/status", auth, adminOnly, markAsRead);
router.put("/:id/save", auth, adminOnly, toggleSave); // NEW
router.delete("/:id", auth, adminOnly, remove);

export default router
