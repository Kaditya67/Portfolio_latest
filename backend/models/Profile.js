import mongoose from "mongoose"

// Socials sub-schema
const SocialSchema = new mongoose.Schema(
  {
    github: { type: String },
    linkedin: { type: String },
    twitter: { type: String }, // renamed from `x` for clarity
    instagram: { type: String },
    website: { type: String },
  },
  { _id: false }
)

const ProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    headline: { type: String },
    bio: { type: String },
    role: { type: String },
    avatarUrl: { type: String },
    location: { type: String },
    email: { type: String },
    phone: { type: String },
    socials: SocialSchema,
  },
  { timestamps: true }
)

export const Profile = mongoose.model("Profile", ProfileSchema)
