import "dotenv/config"
import { randomBytes } from "crypto"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { env } from "../config/env.js"
import { User } from "../models/User.js"

async function run() {
  await mongoose.connect(env.MONGO_URI)

  const email = process.env.ADMIN_EMAIL || "aditya@admin.com"
  const name = process.env.ADMIN_NAME || "Admin"
  const password = process.env.ADMIN_PASSWORD || `${randomBytes(6).toString("base64url")}!Aa1`

  const existing = await User.findOne({ email })
  if (existing) {
    console.log("Admin already exists:", email)
  } else {
    const passwordHash = await bcrypt.hash(password, 12)
    await User.create({ email, name, passwordHash, role: "admin" })
    console.log("Admin created:")
    console.log("  email:", email)
    console.log("  name :", name)
    console.log("  password:", password)
    console.log("NOTE: Store this password safely. You can change it later via POST /api/v1/auth/change-password.")
  }

  await mongoose.disconnect()
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
