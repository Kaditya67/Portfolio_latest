import { z } from "zod";
import slugify from "slugify";
import { Project } from "../models/Project.js";
import cache from "../utils/cache.js";

const projectSchema = z.object({
  slug: z.string().min(1).optional(),
  title: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  highlights: z.array(z.string()).optional(),
  tech: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  repoUrl: z.string().url().optional().or(z.literal("")),
  demoUrl: z.string().url().optional().or(z.literal("")),
  imageUrl: z.string().url().optional().or(z.literal("")),
  status: z.enum(["planned", "ongoing", "completed"]).optional(),
  content: z.string().optional(),
  parentProject: z.string().optional().nullable(),
  version: z.string().optional(),
});

export const list = async (_req, res) => {
  const cacheKey = "projects:list";
  const cached = cache.get(cacheKey);

  if (cached) {
    return res.json(cached);
  }

  const items = await Project.find({ latest: true })
    .populate("parentProject", "slug title version")
    .select("-__v") // Exclude version field
    .sort({ createdAt: -1 })
    .lean();

  const result = { items };
  cache.set(cacheKey, result, 300); // Cache for 5 minutes

  return res.json(result);
};

// List all projects for admin
export const listAll = async (_req, res) => {
  const cacheKey = "projects:listAll";
  const cached = cache.get(cacheKey);

  if (cached) {
    return res.json(cached);
  }

  const items = await Project.find()
    .populate("parentProject", "slug title version")
    .select("-__v")
    .sort({ createdAt: -1 })
    .lean();

  const result = { items };
  cache.set(cacheKey, result, 300); // Cache for 5 minutes

  return res.json(result);
};

export const getOne = async (req, res) => {
  const { slug } = req.params;
  const cacheKey = `projects:${slug}`;
  const cached = cache.get(cacheKey);

  if (cached) {
    return res.json(cached);
  }

  const item = await Project.findOne({ slug })
    .populate("parentProject", "slug title version")
    .select("-__v")
    .lean();

  if (!item) return res.status(404).json({ error: "Not found" });

  const versions = await Project.find({ parentProject: item._id })
    .select("-__v")
    .sort({ createdAt: -1 })
    .lean();

  const result = { item, versions };
  cache.set(cacheKey, result, 300); // Cache for 5 minutes

  return res.json(result);
};

export const create = async (req, res) => {
  const parsed = projectSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });

  const slug = parsed.data.slug || slugify(parsed.data.title, { lower: true, strict: true });

  let parentProjectId = null;

  // 🔗 Handle parent and toggle its latest flag
  if (parsed.data.parentProject) {
    const parent = await Project.findOne({ slug: parsed.data.parentProject });
    if (!parent) return res.status(400).json({ error: "Parent project not found" });

    parentProjectId = parent._id;
    await Project.updateOne({ _id: parent._id }, { $set: { latest: false } });
  }

  const exists = await Project.findOne({ slug, version: parsed.data.version });
  if (exists) return res.status(409).json({ error: "Slug + Version already exists" });

  const item = await Project.create({
    ...parsed.data,
    slug,
    parentProject: parentProjectId,
    latest: true,
  });

  // Invalidate cache
  cache.delPattern("projects:");

  return res.status(201).json({ item });
};

export const update = async (req, res) => {
  const { slug } = req.params;

  const parsed = projectSchema.partial().safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });

  let parentProjectId = null;

  if (parsed.data.parentProject) {
    const parent = await Project.findOne({ slug: parsed.data.parentProject });
    if (!parent)
      return res.status(400).json({ error: "Parent project not found" });

    parentProjectId = parent._id;

    // 🔄 Mark previous latest sibling as not latest
    await Project.updateMany(
      { parentProject: parent._id },
      { $set: { latest: false } }
    );

    parsed.data.latest = true; // ✅ mark current project as latest
  }

  // ⚠ Optional: enforce slug + version uniqueness on update
  if (parsed.data.version) {
    const currentProject = await Project.findOne({ slug });
    const conflict = await Project.findOne({
      slug,
      version: parsed.data.version,
      _id: { $ne: currentProject?._id },
    });
    if (conflict) return res.status(409).json({ error: "Slug + Version already exists" });
  }

  const item = await Project.findOneAndUpdate(
    { slug },
    { $set: { ...parsed.data, parentProject: parentProjectId } },
    { new: true }
  );

  if (!item) return res.status(404).json({ error: "Not found" });

  // Invalidate cache
  cache.delPattern("projects:");

  return res.json({ item });
};

export const remove = async (req, res) => {
  const { slug } = req.params;
  const item = await Project.findOneAndDelete({ slug });
  if (!item) return res.status(404).json({ error: "Not found" });

  // Invalidate cache
  cache.delPattern("projects:");

  return res.json({ message: "Deleted along with child versions" });
};
