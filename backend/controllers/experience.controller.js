import { z } from "zod";
import { Experience } from "../models/Experience.js";
import cache from "../utils/cache.js";

const schema = z.object({
  title: z.string().min(1),
  company: z.string().min(1),
  location: z.string().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  current: z.boolean().optional(),
  description: z.string().optional(),
  highlights: z.array(z.string()).optional(),
})

export const list = async (_req, res) => {
  const cacheKey = "experience:list";
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);
  
  const items = await Experience.find().select("-__v").sort({ startDate: -1 }).lean();
  const result = { items };
  cache.set(cacheKey, result, 300);
  return res.json(result);
};

export const create = async (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const item = await Experience.create(parsed.data);
  cache.delPattern("experience:");
  res.status(201).json({ item });
};

export const update = async (req, res) => {
  const parsed = schema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const item = await Experience.findByIdAndUpdate(req.params.id, { $set: parsed.data }, { new: true });
  if (!item) return res.status(404).json({ error: "Not found" });
  cache.delPattern("experience:");
  res.json({ item });
};

export const remove = async (req, res) => {
  const item = await Experience.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  cache.delPattern("experience:");
  res.json({ message: "Deleted" });
};
