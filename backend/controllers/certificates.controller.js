import { z } from "zod"
import { Certificate } from "../models/Certificate.js"

const schema = z.object({
  title: z.string().min(1),
  issuer: z.string().min(1),
  issuedAt: z.coerce.date(),
  credentialId: z.string().optional(),
  url: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
})

export const list = async (_req, res) => 
  res.json({ items: await Certificate.find().sort({ issuedAt: -1 }) })

export const create = async (req, res) => {
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() })
  const item = await Certificate.create(parsed.data)
  res.status(201).json({ item })
}

export const update = async (req, res) => {
  const parsed = schema.partial().safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() })
  const item = await Certificate.findByIdAndUpdate(req.params.id, { $set: parsed.data }, { new: true })
  if (!item) return res.status(404).json({ error: "Not found" })
  res.json({ item })
}

export const remove = async (req, res) => {
  const item = await Certificate.findByIdAndDelete(req.params.id)
  if (!item) return res.status(404).json({ error: "Not found" })
  res.json({ message: "Deleted" })
}
