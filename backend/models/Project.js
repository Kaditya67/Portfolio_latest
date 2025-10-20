import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    slug: { type: String, index: true, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    highlights: [{ type: String }],
    tech: [{ type: String }],
    tags: [{ type: String }],
    repoUrl: { type: String },
    demoUrl: { type: String },
    imageUrl: { type: String },
    status: {
      type: String,
      enum: ["planned", "ongoing", "completed"],
      default: "ongoing",
    },
    content: { type: String },

    // 🔗 Version hierarchy
    parentProject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },
    version: { type: String },

    // ✅ Latest marker
    latest: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Compound index
ProjectSchema.index({ slug: 1, version: 1 }, { unique: true });

// 🗑 Cascade delete
ProjectSchema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getFilter());
  if (doc) {
    await mongoose.model("Project").deleteMany({ parentProject: doc._id });
  }
  next();
});

export const Project = mongoose.model("Project", ProjectSchema);
