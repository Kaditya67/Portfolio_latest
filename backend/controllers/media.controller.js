import { z } from "zod";
import { Media } from "../models/Media.js";
import cache from "../utils/cache.js";

const schema = z.object({
  type: z.enum(["image", "video", "link"]),
  title: z.string().min(1),
  url: z.string().url(),
  imageUrl: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
})

export const list = async (_req, res) => {
  const cacheKey = "media:list";
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);
  
  const items = await Media.find().select("-__v").sort({ createdAt: -1 }).lean();
  const result = { items };
  cache.set(cacheKey, result, 300);
  return res.json(result);
};

export const create = async (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const item = await Media.create(parsed.data);
  cache.delPattern("media:");
  res.status(201).json({ item });
};

export const update = async (req, res) => {
  const parsed = schema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const item = await Media.findByIdAndUpdate(req.params.id, { $set: parsed.data }, { new: true });
  if (!item) return res.status(404).json({ error: "Not found" });
  cache.delPattern("media:");
  res.json({ item });
};

export const remove = async (req, res) => {
  const item = await Media.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  cache.delPattern("media:");
  res.json({ message: "Deleted" });
};
