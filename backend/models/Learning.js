import mongoose from "mongoose"

const LearningSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g., "GraphQL"
    level: { 
      type: String, 
      enum: ["beginner", "intermediate", "advanced", "expert"], 
      default: "beginner" 
    },
    status: { 
      type: String, 
      enum: ["In Progress", "Exploring", "Building", "Applied"], 
      default: "In Progress" 
    }, // progress tracker
    category: { type: String }, // e.g., Frontend, Backend, DevOps, Language
  },
  { timestamps: true }
)

export const Learning = mongoose.model("Learning", LearningSchema)
