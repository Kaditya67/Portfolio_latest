import { Router } from "express";
import {
  list,
  listAll, // new endpoint for admin
  getOne,
  create,
  update,
  remove,
} from "../controllers/projects.controller.js";
import { auth, adminOnly } from "../middleware/auth.js";

const router = Router();

// Public routes
router.get("/", list);          // latest projects
router.get("/:slug", getOne);   // get single project + versions

// Admin routes
router.get("/admin/all", auth, adminOnly, listAll); // see all projects in admin

router.post("/", auth, adminOnly, create);
router.put("/:slug", auth, adminOnly, update);
router.delete("/:slug", auth, adminOnly, remove);

export default router;
