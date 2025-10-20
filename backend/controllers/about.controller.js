import { z } from "zod"
import { About } from "../models/About.js"

const sectionSchema = z.object({
  title: z.string().min(1),
  content: z.string().optional(),
  highlights: z.array(z.string()).optional(),
})

const schema = z.object({
  introduction: z.string().optional(),
  background: z.string().optional(),
  passions: z.array(z.string()).optional(),
  skills: z.array(
    z.object({
      name: z.string().min(1),
      category: z.string().min(1),
    })
  ).optional(),
  goals: z.array(z.string()).optional(),
  hobbies: z.array(z.string()).optional(),
  likes: z.array(z.string()).optional(),
  mood: z.string().optional(),
  image: z.string().url().optional(),
  sections: z.array(sectionSchema).optional(),
})

export const get = async (_req, res) => {
  const item = await About.findOne()
  res.json({ item })
}

export const update = async (req, res) => {
  const parsed = schema.partial().safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() })

  const existing = (await About.findOne()) || (await About.create({ introduction: "Your intro here" }))
  existing.set(parsed.data)
  await existing.save()

  res.json({ item: existing })
}
