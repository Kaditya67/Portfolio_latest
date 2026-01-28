import { z } from "zod";
import { Certificate } from "../models/Certificate.js";
import cache from "../utils/cache.js";

const schema = z.object({
  title: z.string().min(1),
  issuer: z.string().min(1),
  issuedAt: z.coerce.date(),
  credentialId: z.string().optional(),
  url: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
})

export const list = async (_req, res) => {
  const cacheKey = "certificates:list";
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);
  
  const items = await Certificate.find().select("-__v").sort({ issuedAt: -1 }).lean();
  const result = { items };
  cache.set(cacheKey, result, 300);
  return res.json(result);
};

export const create = async (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const item = await Certificate.create(parsed.data);
  cache.delPattern("certificates:");
  res.status(201).json({ item });
};

export const update = async (req, res) => {
  const parsed = schema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const item = await Certificate.findByIdAndUpdate(req.params.id, { $set: parsed.data }, { new: true });
  if (!item) return res.status(404).json({ error: "Not found" });
  cache.delPattern("certificates:");
  res.json({ item });
};

export const remove = async (req, res) => {
  const item = await Certificate.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  cache.delPattern("certificates:");
  res.json({ message: "Deleted" });
};
