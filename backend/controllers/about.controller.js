import { z } from "zod";
import { About } from "../models/About.js";
import cache from "../utils/cache.js";

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
  const cacheKey = "about:data";
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);
  
  const item = await About.findOne().select("-__v").lean();
  const result = { item };
  cache.set(cacheKey, result, 300);
  res.json(result);
};

export const update = async (req, res) => {
  const parsed = schema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const existing = (await About.findOne()) || (await About.create({ introduction: "Your intro here" }));
  existing.set(parsed.data);
  await existing.save();
  
  cache.delPattern("about:");
  res.json({ item: existing });
};
