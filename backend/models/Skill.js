import mongoose from "mongoose"

const SkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    level: { 
      type: String, 
      enum: ["beginner", "intermediate", "advanced", "expert"], 
      default: "intermediate" 
    },
    category: { type: String }, // Frontend, Backend, DevOps, Language, etc.
  },
  { timestamps: true }
)

export const Skill = mongoose.model("Skill", SkillSchema)
