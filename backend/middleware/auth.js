import { verifyToken } from "../utils/jwt.js"

export const auth = (req, res, next) => {
  try {
    const token = req.cookies?.token
    if (!token) return res.status(401).json({ error: "Unauthorized" })
    const decoded = verifyToken(token)
    req.user = decoded
    return next()
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" })
  }
}

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") return res.status(403).json({ error: "Forbidden" })
  next()
}
