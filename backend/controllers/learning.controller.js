import { z } from "zod"
import { Learning } from "../models/Learning.js"

const schema = z.object({
  name: z.string().min(1),
  level: z.enum(["beginner", "intermediate", "advanced", "expert"]).optional(),
  status: z.enum(["In Progress", "Exploring", "Building", "Applied"]).optional(),
  category: z.string().optional(),
})

export const list = async (_req, res) => 
  res.json({ items: await Learning.find().sort({ createdAt: -1 }) })

export const create = async (req, res) => {
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() })
  const item = await Learning.create(parsed.data)
  res.status(201).json({ item })
}

export const update = async (req, res) => {
  const parsed = schema.partial().safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() })
  const item = await Learning.findByIdAndUpdate(req.params.id, { $set: parsed.data }, { new: true })
  if (!item) return res.status(404).json({ error: "Not found" })
  res.json({ item })
}

export const remove = async (req, res) => {
  const item = await Learning.findByIdAndDelete(req.params.id)
  if (!item) return res.status(404).json({ error: "Not found" })
  res.json({ message: "Deleted" })
}
