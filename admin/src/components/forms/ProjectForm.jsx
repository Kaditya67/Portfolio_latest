import { useState, useEffect } from "react"
import { FiSend, FiEdit2, FiXCircle, FiPlus } from "react-icons/fi"
import { api } from "../../api/client"

export default function ProjectForm({ onSave, onCancel, editingId, initialData, loading }) {
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    category: "",
    description: "",
    highlights: "",
    tech: "",
    tags: "",
    repoUrl: "",
    demoUrl: "",
    imageUrl: "",
    status: "ongoing",
    content: "",
    version: "",
    parentProject: "",
  })

  const [formError, setFormError] = useState(null)
  const [projects, setProjects] = useState([])

  // 🧩 Fetch all projects for the parentProject dropdown
  useEffect(() => {
    api
      .getProjects()
      .then((res) => {
        if (Array.isArray(res.items)) setProjects(res.items)
        else setProjects([])
      })
      .catch((err) => console.error("Failed to load projects", err))
  }, [])

  // 🧩 Handle edit mode (prefill data)
  useEffect(() => {
    if (editingId && initialData) {
      // console.log("[v0] EDIT MODE - editingId:", editingId)
      // console.log("[v0] EDIT MODE - initialData:", initialData)

      setFormData({
        slug: initialData.slug || "",
        title: initialData.title || "",
        category: initialData.category || "",
        description: initialData.description || "",
        highlights: Array.isArray(initialData.highlights)
          ? initialData.highlights.join(", ")
          : initialData.highlights || "",
        tech: Array.isArray(initialData.tech)
          ? initialData.tech.join(", ")
          : initialData.tech || "",
        tags: Array.isArray(initialData.tags)
          ? initialData.tags.join(", ")
          : initialData.tags || "",
        repoUrl: initialData.repoUrl || "",
        demoUrl: initialData.demoUrl || "",
        imageUrl: initialData.imageUrl || "",
        status: initialData.status || "ongoing",
        content: initialData.content || "",
        version: initialData.version || "",
        parentProject: initialData.parentProject?.slug || "",
      })
    } else {
      // reset form when not editing
      setFormData({
        slug: "",
        title: "",
        category: "",
        description: "",
        highlights: "",
        tech: "",
        tags: "",
        repoUrl: "",
        demoUrl: "",
        imageUrl: "",
        status: "ongoing",
        content: "",
        version: "",
        parentProject: "",
      })
    }
  }, [editingId, initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setFormError(null)
  }

  // 🧩 Handle Create / Update submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.slug || !formData.title) {
      setFormError("Slug and Title are required.")
      return
    }

    const payload = {
      ...formData,
      highlights: formData.highlights
        ? formData.highlights.split(",").map((h) => h.trim()).filter(Boolean)
        : [],
      tech: formData.tech
        ? formData.tech.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      tags: formData.tags
        ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      parentProject: formData.parentProject || null,
    }

    console.log("[v0] SUBMIT - Final payload:", payload)

    try {
      await onSave(payload)
    } catch (err) {
      console.error("[v0] SUBMIT ERROR:", err)
      setFormError(err.message || "Failed to save project.")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl p-5 md:p-6 shadow-sm transition-all duration-300 hover:shadow-md max-w-4xl mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
        {editingId ? <FiEdit2 className="inline text-blue-500" /> : <FiPlus className="inline text-blue-500" />}
        {editingId ? "Edit Project" : "Create New Project"}
      </h2>

      {formError && (
        <div className="p-3 mb-4 rounded-lg bg-red-100 text-red-700 border border-red-200 text-sm flex items-center gap-2">
          <FiXCircle className="text-red-500" /> {formError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input
          label="Slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="my-awesome-project"
          required
          disabled={!!editingId}
        />
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Project Title"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
        <Input
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Web App, Extension, etc."
        />
        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={[
            { value: "planned", label: "Planned" },
            { value: "ongoing", label: "Ongoing" },
            { value: "completed", label: "Completed" },
          ]}
        />
      </div>

      <TextArea
        label="Short Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Briefly describe your project"
        className="mt-3"
      />

      {/* ✅ New Highlights field */}
      <Input
        label="Highlights (comma-separated)"
        name="highlights"
        value={formData.highlights}
        onChange={handleChange}
        placeholder="Fast API, Scalable, Clean UI"
        className="mt-3"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
        <Input
          label="Tech Stack"
          name="tech"
          value={formData.tech}
          onChange={handleChange}
          placeholder="React, Node.js, MongoDB"
        />
        <Input
          label="Tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="frontend, backend, portfolio"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
        <Input
          label="Repository URL"
          name="repoUrl"
          type="url"
          value={formData.repoUrl}
          onChange={handleChange}
          placeholder="https://github.com/..."
        />
        <Input
          label="Demo URL"
          name="demoUrl"
          type="url"
          value={formData.demoUrl}
          onChange={handleChange}
          placeholder="https://yourproject.live"
        />
      </div>

      <Input
        label="Image URL"
        name="imageUrl"
        type="url"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="https://example.com/image.jpg"
        className="mt-3"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
        <Input
          label="Version"
          name="version"
          value={formData.version}
          onChange={handleChange}
          placeholder="v1.0, v2.1, etc."
        />

        <Input
          label="Parent Project (optional)"
          name="parentProject"
          list="parent-projects"
          value={formData.parentProject}
          onChange={handleChange}
          placeholder="Type or choose a project slug"
        />
        <datalist id="parent-projects">
          {projects.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.title}
            </option>
          ))}
        </datalist>
      </div>

      <TextArea
        label="Detailed Content"
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Explain your project in depth..."
        className="mt-3"
        rows={5}
      />

      <div className="flex flex-wrap gap-2 mt-5">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          <FiSend className="inline mb-0.5" />
          {loading ? (editingId ? "Updating..." : "Creating...") : editingId ? "Update" : "Create"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-neutral-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-neutral-800 font-medium text-sm transition"
          >
            <FiXCircle className="inline mb-0.5" />
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

/* 🔹 Reusable UI components */
function Input({ label, className = "", ...props }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <input
        {...props}
        className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-neutral-600 bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
      />
    </div>
  )
}

function TextArea({ label, className = "", ...props }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <textarea
        {...props}
        className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-neutral-600 bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
      />
    </div>
  )
}

function Select({ label, options, className = "", ...props }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <select
        {...props}
        className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-neutral-600 bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
