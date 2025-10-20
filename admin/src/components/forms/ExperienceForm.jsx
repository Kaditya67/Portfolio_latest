import { useState, useEffect } from "react";
import { FiEdit2, FiPlus, FiX, FiCalendar } from "react-icons/fi";

export default function ExperienceForm({ onSave, editingId, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    highlights: [""],
  });

  useEffect(() => {
    if (editingId && initialData) {
      setFormData({
        title: initialData.title || "",
        company: initialData.company || "",
        location: initialData.location || "",
        startDate: initialData.startDate ? initialData.startDate.slice(0, 10) : "",
        endDate: initialData.endDate ? initialData.endDate.slice(0, 10) : "",
        current: !!initialData.current,
        description: initialData.description || "",
        highlights: (initialData.highlights && initialData.highlights.length)
          ? initialData.highlights : [""],
      });
    } else {
      setFormData({
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
        highlights: [""],
      });
    }
  }, [editingId, initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "current" && checked ? { endDate: null } : {}), // set endDate null if current
    }));
  };

  const handleHighlightChange = (val, idx) => {
    setFormData((f) => ({
      ...f,
      highlights: f.highlights.map((h, i) => (i === idx ? val : h)),
    }));
  };

  const handleAddHighlight = () =>
    setFormData((f) => ({ ...f, highlights: [...f.highlights, ""] }));

  const handleRemoveHighlight = (idx) =>
    setFormData((f) => ({ ...f, highlights: f.highlights.filter((_, i) => i !== idx) }));

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clean empty highlights
    const cleanedHighlights = formData.highlights.filter((h) => h.trim());

    // Prepare payload for backend: convert "" endDate to null
    const payload = {
      ...formData,
      highlights: cleanedHighlights,
      endDate: formData.current ? null : formData.endDate || undefined,
    };

    onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          required
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white"
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          required
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <input
          type="text"
          name="location"
          placeholder="Location (optional)"
          value={formData.location}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white"
        />
        <div className="flex flex-wrap items-center gap-2">
          <FiCalendar className="text-lg" />
          <input
            type="date"
            name="startDate"
            required
            value={formData.startDate}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white w-[125px] flex-shrink"
          />
          <span>-</span>
          <input
            type="date"
            name="endDate"
            disabled={formData.current}
            value={formData.endDate || ""}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white w-[125px] flex-shrink"
          />
          <label className="ml-2 flex items-center gap-1 cursor-pointer">
            <input
              type="checkbox"
              name="current"
              checked={formData.current}
              onChange={handleChange}
              className="accent-emerald-600"
            />
            <span className="text-[13px] text-gray-700 dark:text-gray-200">Current</span>
          </label>
        </div>
      </div>

      <textarea
        name="description"
        placeholder="Role description (optional)"
        value={formData.description}
        onChange={handleChange}
        rows={3}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white min-h-[80px]"
      />

      <div>
        <label className="font-medium text-sm text-gray-900 dark:text-gray-200 block mb-1">
          Highlights (1 per line)
        </label>
        <div className="space-y-2">
          {formData.highlights.map((hl, idx) => (
            <div key={idx} className="flex gap-2 items-center w-full flex-wrap">
              <input
                type="text"
                value={hl}
                onChange={(e) => handleHighlightChange(e.target.value, idx)}
                placeholder="e.g., Led a team of 4 engineers"
                className="flex-1 min-w-[0] px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white text-sm"
              />
              {formData.highlights.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveHighlight(idx)}
                  className="p-1 text-xs bg-red-100 dark:bg-red-800 rounded-full text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-700 flex-shrink-0"
                  aria-label="Remove highlight"
                >
                  <FiX className="text-sm" />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddHighlight}
          className="mt-2 flex items-center gap-1 px-3 py-1.5 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-700 text-sm font-medium"
        >
          <FiPlus className="text-sm" /> Add highlight
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mt-2">
        <button
          type="submit"
          className="flex-1 flex items-center justify-center gap-2 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium"
        >
          {editingId ? <><FiEdit2 /> Update</> : <><FiPlus /> Create</>}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 font-medium"
          >
            <FiX /> Cancel
          </button>
        )}
      </div>
    </form>
  );
}
