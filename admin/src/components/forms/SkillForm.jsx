import { useState, useEffect } from "react";
import { FiEdit2, FiPlus, FiX } from "react-icons/fi";

export default function SkillForm({ onSave, editingId, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    level: "intermediate",
    category: "",
  });

  useEffect(() => {
    if (editingId && initialData) {
      setFormData({
        name: initialData.name || "",
        level: initialData.level || "intermediate",
        category: initialData.category || "",
      });
    } else {
      setFormData({
        name: "",
        level: "intermediate",
        category: "",
      });
    }
  }, [editingId, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-2xl mx-auto">
      {/* Skill Name */}
      <Input
        label="Skill Name"
        name="name"
        placeholder="Skill name (e.g., React)"
        value={formData.name}
        onChange={handleChange}
        required
      />

      {/* Level + Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Select
          label="Level"
          name="level"
          value={formData.level}
          onChange={handleChange}
          options={[
            { value: "beginner", label: "Beginner" },
            { value: "intermediate", label: "Intermediate" },
            { value: "advanced", label: "Advanced" },
            { value: "expert", label: "Expert" },
          ]}
        />

        <Input
          label="Category"
          name="category"
          placeholder="Category (e.g., Frontend)"
          value={formData.category}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        <button className="flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2 px-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium text-sm transition">
          {editingId ? <><FiEdit2 /> Update</> : <><FiPlus /> Create</>} Skill
        </button>
        {onCancel && (
          <button className="flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2 px-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-800 font-medium text-sm transition">
            <FiX /> Cancel
          </button>
        )}
      </div>
    </form>
  );
}

function Input({ label, className = "", ...props }) {
  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>}
      <input
        {...props}
        className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
      />
    </div>
  );
}

function Select({ label, options, className = "", ...props }) {
  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>}
      <select
        {...props}
        className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
