import { z } from "zod"
import { Contact } from "../models/Contact.js"

// Schema for creating contact
const createSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
})

// Schema for updating status (admin only)
const statusSchema = z.object({
  status: z.enum(["unread", "read"])
})

const saveSchema = z.object({
  saved: z.boolean(),
});

export const toggleSave = async (req, res) => {
  const parsed = saveSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const item = await Contact.findByIdAndUpdate(
    req.params.id,
    { $set: { saved: parsed.data.saved } },
    { new: true }
  );
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json({ item });
};


export const list = async (_req, res) => {
  const items = await Contact.find().sort({ createdAt: -1 })
  res.json({ items })
}

export const create = async (req, res) => {
  const parsed = createSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() })

  const item = await Contact.create(parsed.data)
  res.status(201).json({ item })
}

export const markAsRead = async (req, res) => {
  const parsed = statusSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() })

  const item = await Contact.findByIdAndUpdate(
    req.params.id,
    { $set: { status: parsed.data.status } },
    { new: true }
  )

  if (!item) return res.status(404).json({ error: "Not found" })
  res.json({ item })
}

export const remove = async (req, res) => {
  try {
    const item = await Contact.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    if (item.saved) return res.status(403).json({ error: "Cannot delete a saved message" });

    // Use Mongoose remove or findByIdAndDelete
    await Contact.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

