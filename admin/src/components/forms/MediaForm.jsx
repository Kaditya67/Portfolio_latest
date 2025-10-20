import { useState, useEffect } from "react";
import { FiEdit2, FiPlus, FiX } from "react-icons/fi";

export default function MediaForm({ onSave, editingId, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    type: "image",
    title: "",
    url: "",
    imageUrl: "",
    tags: [],
    tagsString: ""
  });

  useEffect(() => {
    if (editingId && initialData) {
      setFormData({
        type: initialData.type || "image",
        title: initialData.title || "",
        url: initialData.url || "",
        imageUrl: initialData.imageUrl || "",
        tags: initialData.tags || [],
        tagsString: (initialData.tags || []).join(", "),
      });
    } else {
      setFormData({
        type: "image",
        title: "",
        url: "",
        imageUrl: "",
        tags: [],
        tagsString: ""
      });
    }
  }, [editingId, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTags = (e) => {
    const tagsString = e.target.value;
    setFormData((prev) => ({
      ...prev,
      tags: tagsString.split(",").map(t => t.trim()).filter(Boolean),
      tagsString,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      tags: formData.tagsString.split(",").map(t => t.trim()).filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xl mx-auto">
      <select
        name="type"
        required
        value={formData.type}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white"
      >
        <option value="image">Image</option>
        <option value="video">Video</option>
        <option value="link">Link</option>
      </select>
      <input
        type="text"
        name="title"
        required
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white"
      />
      <input
        type="url"
        name="url"
        required
        placeholder="Media URL"
        value={formData.url}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white"
      />
      <input
        type="url"
        name="imageUrl"
        placeholder="Image URL (for thumbnails, optional)"
        value={formData.imageUrl}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white"
      />
      <input
        type="text"
        name="tagsString"
        placeholder="Tags (comma separated, e.g. nature,web,portfolio)"
        value={formData.tagsString}
        onChange={handleTags}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white"
      />
      <div className="flex flex-col sm:flex-row gap-2 mt-2">
        <button
          type="submit"
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium text-sm transition"
        >
          {editingId ? <><FiEdit2 /> Update</> : <><FiPlus /> Create</>} Media
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 font-medium text-sm transition"
          >
            <FiX /> Cancel
          </button>
        )}
      </div>
    </form>
  );
}
