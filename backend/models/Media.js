import mongoose from "mongoose"

const MediaSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["image", "video", "link"], required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    imageUrl: { type: String },
    tags: [{ type: String }],
  },
  { timestamps: true }
)

export const Media = mongoose.model("Media", MediaSchema)
