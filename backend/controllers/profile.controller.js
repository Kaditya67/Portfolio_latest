import { z } from "zod";
import { Profile } from "../models/Profile.js";
import cache from "../utils/cache.js";

const schema = z.object({
  name: z.string().min(1),
  headline: z.string().optional(),
  bio: z.string().optional(),
  avatarUrl: z.string().url().optional(),
  location: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  socials: z
    .object({
      github: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      twitter: z.string().url().optional(),
      website: z.string().url().optional(),
      instagram: z.string().url().optional(),
    })
    .partial()
    .optional(),
})

export const get = async (_req, res) => {
  const cacheKey = "profile:data";
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);
  
  const item = await Profile.findOne().select("-__v").lean();
  const result = { item };
  cache.set(cacheKey, result, 300);
  res.json(result);
};

export const update = async (req, res) => {
  const parsed = schema.partial().safeParse(req.body);
  if (!parsed.success) 
    return res.status(400).json({ error: parsed.error.flatten() });

  const existing =
    (await Profile.findOne()) || (await Profile.create({ name: "Your Name" }));

  existing.set(parsed.data);
  await existing.save();
  
  cache.delPattern("profile:");
  res.json({ item: existing });
};
