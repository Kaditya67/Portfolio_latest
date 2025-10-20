import { useState, useEffect } from "react";
import { FiEdit2, FiPlus, FiX } from "react-icons/fi";

export default function LearningForm({ onSave, editingId, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    level: "beginner",
    status: "In Progress",
    category: "",
  });

  useEffect(() => {
    if (editingId && initialData) {
      setFormData({
        name: initialData.name || "",
        level: initialData.level || "beginner",
        status: initialData.status || "In Progress",
        category: initialData.category || "",
      });
    } else {
      setFormData({
        name: "",
        level: "beginner",
        status: "In Progress",
        category: "",
      });
    }
  }, [editingId, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xl mx-auto">
      <input
        type="text"
        name="name"
        required
        placeholder="What are you learning? (e.g., GraphQL)"
        value={formData.name}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="expert">Expert</option>
        </select>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white"
        >
          <option value="In Progress">In Progress</option>
          <option value="Exploring">Exploring</option>
          <option value="Building">Building</option>
          <option value="Applied">Applied</option>
        </select>
        <input
          type="text"
          name="category"
          placeholder="Category (Frontend, Backend, etc.)"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-2">
        <button
          type="submit"
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium text-sm transition"
        >
          {editingId ? <><FiEdit2 /> Update</> : <><FiPlus /> Create</>} Item
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
