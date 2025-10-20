import mongoose from "mongoose"

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, index: true, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["unread", "read"], default: "unread" },
    saved: { type: Boolean, default: false }, // NEW FIELD
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", ContactSchema);