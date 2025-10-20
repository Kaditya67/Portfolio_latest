import { useState, useEffect } from "react";
import { FiEdit2, FiPlus, FiTrash, FiX } from "react-icons/fi";

// Edit, add, and delete for structured skills/sections array
export default function AboutForm({ initialData, onSave, onCancel }) {
  const [form, setForm] = useState({
    introduction: "",
    background: "",
    passions: [],
    skills: [],
    goals: [],
    hobbies: [],
    likes: [],
    mood: "",
    image: "",
    sections: [],
  });

  // Initialize form from incoming data (edit mode)
  useEffect(() => {
    if (initialData) {
      setForm({
        ...form,
        ...initialData,
        passions: Array.isArray(initialData.passions) ? initialData.passions.join(", ") : "",
        goals: Array.isArray(initialData.goals) ? initialData.goals.join(", ") : "",
        hobbies: Array.isArray(initialData.hobbies) ? initialData.hobbies.join(", ") : "",
        likes: Array.isArray(initialData.likes) ? initialData.likes.join(", ") : "",
        skills: Array.isArray(initialData.skills)
          ? initialData.skills.filter(s => s && typeof s === 'object' && s.name)
          : [],
        sections: Array.isArray(initialData.sections)
          ? initialData.sections.map(s => ({
              ...s,
              highlights: Array.isArray(s.highlights) ? s.highlights.join("\n") : ""
            }))
          : [],
      });
    }
    // eslint-disable-next-line
  }, [initialData]);

  // Basic string fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Skills editing logic
  const handleSkillChange = (idx, field, value) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.map((s, i) => i === idx ? { ...s, [field]: value } : s)
    }));
  };
  const handleAddSkill = () => setForm(prev => ({
    ...prev,
    skills: [...prev.skills, { name: "", category: "" }]
  }));
  const handleRemoveSkill = (idx) => setForm(prev => ({
    ...prev,
    skills: prev.skills.filter((_, i) => i !== idx)
  }));

  // Sections editing logic
  const handleSectionChange = (idx, field, value) => {
    setForm(prev => ({
      ...prev,
      sections: prev.sections.map((s, i) => i === idx ? { ...s, [field]: value } : s)
    }));
  };
  const handleAddSection = () => setForm(prev => ({
    ...prev,
    sections: [...prev.sections, { title: "", content: "", highlights: "" }]
  }));
  const handleRemoveSection = (idx) => setForm(prev => ({
    ...prev,
    sections: prev.sections.filter((_, i) => i !== idx)
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      passions: form.passions ? form.passions.split(",").map(s => s.trim()).filter(Boolean) : [],
      goals: form.goals ? form.goals.split(",").map(s => s.trim()).filter(Boolean) : [],
      hobbies: form.hobbies ? form.hobbies.split(",").map(s => s.trim()).filter(Boolean) : [],
      likes: form.likes ? form.likes.split(",").map(s => s.trim()).filter(Boolean) : [],
      skills: form.skills.filter(s => s.name && s.category),
      sections: form.sections.filter(s => s.title || s.content || s.highlights)
        .map(s => ({
          ...s,
          highlights: s.highlights
            ? s.highlights.split("\n").map(h => h.trim()).filter(Boolean)
            : [],
        })),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Standard fields */}
      <input
        name="introduction"
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800 rounded-lg"
        placeholder="Introduction"
        value={form.introduction}
        onChange={handleChange}
      />
      <input
        name="image"
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800 rounded-lg"
        placeholder="Image URL"
        value={form.image}
        onChange={handleChange}
      />
      <input
        name="mood"
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800 rounded-lg"
        placeholder="Mood/personality"
        value={form.mood}
        onChange={handleChange}
      />
      <textarea
        name="background"
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800 rounded-lg"
        rows={2}
        placeholder="Background (optional)"
        value={form.background}
        onChange={handleChange}
      />
      {/* SKILLS section */}
      <div>
        <label className="block mb-1 font-semibold">Skills</label>
        <div className="flex flex-col gap-2">
          {form.skills.map((s, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                value={s.name}
                placeholder="Skill name"
                onChange={e => handleSkillChange(idx, "name", e.target.value)}
                className="px-2 py-1 border rounded"
              />
              <input
                value={s.category}
                placeholder="Category"
                onChange={e => handleSkillChange(idx, "category", e.target.value)}
                className="px-2 py-1 border rounded"
              />
              <button type="button" aria-label="Remove skill" onClick={() => handleRemoveSkill(idx)} className="text-red-500">
                <FiTrash className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="mt-2 px-2 py-1 bg-cyan-50 text-cyan-700 border rounded flex items-center gap-1"
          onClick={handleAddSkill}
        >
          <FiPlus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>
      {/* Other array fields */}
      <input name="goals" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800 rounded-lg" placeholder="Goals (comma separated)" value={form.goals} onChange={handleChange} />
      <input name="passions" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800 rounded-lg" placeholder="Passions (comma separated)" value={form.passions} onChange={handleChange} />
      <input name="hobbies" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800 rounded-lg" placeholder="Hobbies (comma separated)" value={form.hobbies} onChange={handleChange} />
      <input name="likes" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800 rounded-lg" placeholder="Likes (comma separated)" value={form.likes} onChange={handleChange} />
      {/* SECTIONS */}
      <div>
        <label className="block mb-1 font-semibold">Sections</label>
        <div className="flex flex-col gap-4">
          {form.sections.map((sec, idx) => (
            <div key={idx} className="border rounded p-3 relative bg-gray-50 dark:bg-neutral-800">
              <button
                type="button"
                aria-label="Delete section"
                className="absolute top-3 right-3 text-red-600 hover:text-red-700"
                onClick={() => handleRemoveSection(idx)}
              >
                <FiTrash className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={sec.title}
                onChange={e => handleSectionChange(idx, "title", e.target.value)}
                placeholder="Section Title"
                className="w-full mb-1 px-2 py-1 border rounded"
              />
              <textarea
                rows={2}
                value={sec.content}
                onChange={e => handleSectionChange(idx, "content", e.target.value)}
                placeholder="Section Content"
                className="w-full mb-1 px-2 py-1 border rounded"
              />
              <textarea
                rows={2}
                value={sec.highlights}
                onChange={e => handleSectionChange(idx, "highlights", e.target.value)}
                placeholder="Highlights (separate lines)"
                className="w-full px-2 py-1 border rounded"
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          className="mt-2 px-2 py-1 bg-cyan-50 text-cyan-700 border rounded flex items-center gap-1"
          onClick={handleAddSection}
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Section</span>
        </button>
      </div>
      {/* Submit and Cancel */}
      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium text-sm transition"
        >
          <FiEdit2 /> Save
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
