import mongoose from "mongoose"

// Sub-schema for section lists
const SectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },         // description or text
  highlights: [{ type: String }],    // bullet points
})

const AboutSchema = new mongoose.Schema(
  {
    introduction: { type: String },          // short intro
    background: { type: String },            // professional/education background
    passions: [{ type: String }],            // array of passions/interests
    skills: [{
      name: { type: String, required: true },
      category: { type: String, required: true },
    }],
    goals: [{ type: String }],               // personal/professional goals
    hobbies: [{ type: String }],             // fun/hobbies
    mood: { type: String },                  // current mood/personality
    likes: [{ type: String }],               // likes/favorites
    image: { type: String },                 // profile/about image
    sections: [SectionSchema],               // flexible multiple sections
  },
  { timestamps: true }
)

export const About = mongoose.model("About", AboutSchema)
