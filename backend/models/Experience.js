import mongoose from "mongoose"

const ExperienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date }, // null if current
    current: { type: Boolean, default: false },
    description: { type: String },
    highlights: [{ type: String }],
  },
  { timestamps: true }
)

export const Experience = mongoose.model("Experience", ExperienceSchema)
