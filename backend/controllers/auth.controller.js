import bcrypt from "bcryptjs"
import { User } from "../models/User.js"
import { signToken, verifyToken } from "../utils/jwt.js"
import { env } from "../config/env.js"

const cookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "lax",
  domain: env.COOKIE_DOMAIN,
  path: "/",
}

export const registerAdmin = async (req, res) => {
  try {
    const setup = req.headers["x-setup-token"] || req.body?.setupToken
    if (!env.ADMIN_SETUP_TOKEN) return res.status(400).json({ error: "ADMIN_SETUP_TOKEN not set on server" })
    if (setup !== env.ADMIN_SETUP_TOKEN) return res.status(403).json({ error: "Invalid setup token" })

    const existingCount = await User.countDocuments({})
    if (existingCount > 0) return res.status(409).json({ error: "Admin already exists. Use change-password or reset." })

    const { name, email, password } = req.body || {}
    if (!name || !email || !password) return res.status(400).json({ error: "name, email, password required" })
    if (String(password).length < env.PASSWORD_MIN_LENGTH) {
      return res.status(400).json({ error: `Password must be at least ${env.PASSWORD_MIN_LENGTH} characters` })
    }
    const passwordHash = await bcrypt.hash(password, 12)
    const user = await User.create({ name, email, passwordHash, role: "admin" })
    return res
      .status(201)
      .json({ message: "Admin created", user: { id: user._id, name: user.name, email: user.email } })
  } catch (e) {
    return res.status(500).json({ error: "Server error" })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) return res.status(400).json({ error: "Email and password required" })
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: "Invalid credentials" })
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ error: "Invalid credentials" })
    const token = signToken({ id: user._id, role: user.role, email: user.email })
    res.cookie("token", token, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 })
    return res.json({ message: "Logged in", user: { id: user._id, name: user.name, email: user.email } })
  } catch (e) {
    return res.status(500).json({ error: "Server error" })
  }
}

export const me = async (req, res) => {
  return res.json({ user: { id: req.user.id, email: req.user.email, role: req.user.role } })
}

export const logout = async (_req, res) => {
  res.clearCookie("token", cookieOptions)
  return res.json({ message: "Logged out" })
}

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body || {}
    if (!currentPassword || !newPassword)
      return res.status(400).json({ error: "currentPassword and newPassword required" })
    if (String(newPassword).length < env.PASSWORD_MIN_LENGTH) {
      return res.status(400).json({ error: `Password must be at least ${env.PASSWORD_MIN_LENGTH} characters` })
    }
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ error: "User not found" })
    const ok = await bcrypt.compare(currentPassword, user.passwordHash)
    if (!ok) return res.status(401).json({ error: "Invalid current password" })
    user.passwordHash = await bcrypt.hash(newPassword, 12)
    await user.save()
    return res.json({ message: "Password updated" })
  } catch (e) {
    return res.status(500).json({ error: "Server error" })
  }
}

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body || {}
    if (!email) return res.status(400).json({ error: "email required" })
    const user = await User.findOne({ email })
    if (!user) {
      // don't reveal whether user exists
      return res.json({ message: "If the account exists, a reset token has been generated" })
    }
    const token = signToken({ purpose: "reset", id: user._id, email: user.email }, `${env.RESET_TOKEN_EXPIRES_MIN}m`)
    // In production: email the token link. For local testing, return it.
    return res.json({
      message: "Reset token generated",
      resetToken: token,
      expiresInMinutes: env.RESET_TOKEN_EXPIRES_MIN,
    })
  } catch (e) {
    return res.status(500).json({ error: "Server error" })
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body || {}
    if (!token || !newPassword) return res.status(400).json({ error: "token and newPassword required" })
    if (String(newPassword).length < env.PASSWORD_MIN_LENGTH) {
      return res.status(400).json({ error: `Password must be at least ${env.PASSWORD_MIN_LENGTH} characters` })
    }
    const payload = verifyToken(token)
    if (payload?.purpose !== "reset" || !payload?.id) return res.status(400).json({ error: "Invalid reset token" })
    const user = await User.findById(payload.id)
    if (!user) return res.status(404).json({ error: "User not found" })
    user.passwordHash = await bcrypt.hash(newPassword, 12)
    await user.save()
    return res.json({ message: "Password has been reset" })
  } catch (e) {
    return res.status(400).json({ error: "Invalid or expired token" })
  }
}
