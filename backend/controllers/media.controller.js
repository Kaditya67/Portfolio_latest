import { z } from "zod"
import { Media } from "../models/Media.js"

const schema = z.object({
  type: z.enum(["image", "video", "link"]),
  title: z.string().min(1),
  url: z.string().url(),
  imageUrl: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
})

export const list = async (_req, res) =>
  res.json({ items: await Media.find().sort({ createdAt: -1 }) })

export const create = async (req, res) => {
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() })
  const item = await Media.create(parsed.data)
  res.status(201).json({ item })
}

export const update = async (req, res) => {
  const parsed = schema.partial().safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() })
  const item = await Media.findByIdAndUpdate(req.params.id, { $set: parsed.data }, { new: true })
  if (!item) return res.status(404).json({ error: "Not found" })
  res.json({ item })
}

export const remove = async (req, res) => {
  const item = await Media.findByIdAndDelete(req.params.id)
  if (!item) return res.status(404).json({ error: "Not found" })
  res.json({ message: "Deleted" })
}
