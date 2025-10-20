import { Router } from "express"
import authRoutes from "./auth.routes.js"
import projectRoutes from "./projects.routes.js"
import experienceRoutes from "./experience.routes.js"
import skillsRoutes from "./skills.routes.js"
import learningRoutes from "./learning.routes.js"
import certificatesRoutes from "./certificates.routes.js"
import mediaRoutes from "./media.routes.js"
import aboutRoutes from "./about.routes.js"
import profileRoutes from "./profile.routes.js"
import contactRoutes from "./contact.routes.js"

const api = Router()

api.use("/auth", authRoutes)
api.use("/projects", projectRoutes)
api.use("/experience", experienceRoutes)
api.use("/skills", skillsRoutes)
api.use("/learning", learningRoutes)
api.use("/certificates", certificatesRoutes)
api.use("/media", mediaRoutes)
api.use("/about", aboutRoutes)
api.use("/profile", profileRoutes)
api.use("/contact", contactRoutes)

export default api
