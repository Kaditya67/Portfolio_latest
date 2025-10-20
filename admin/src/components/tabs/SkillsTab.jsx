import { useState, useEffect } from "react";
import { api } from "../../api/client";
import SkillForm from "../forms/SkillForm";
import SkillList from "../lists/SkillList";
import { FiTool, FiPlus, FiX } from "react-icons/fi";

export default function SkillsTab() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getSkills();
      setSkills(data.skills || data.items || []);
    } catch (err) {
      setError(err.message || "Failed to load skills.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill?")) return;
    try {
      await api.deleteSkill(id);
      setSkills((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete.");
    }
  };

  const handleSave = async (data) => {
    try {
      if (editingId) await api.updateSkill(editingId, data);
      else await api.createSkill(data);
      setShowForm(false);
      setEditingId(null);
      await fetchSkills();
    } catch (err) {
      setError(err.message || "Failed to save.");
    }
  };

  const currentSkill = editingId
    ? skills.find((s) => s._id === editingId)
    : null;

  const handleEdit = (id) => {
    setEditingId(id);
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div className="text-gray-900 dark:text-gray-100 transition-colors duration-300 w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
        <h2 className="text-2xl font-bold flex items-center gap-2 flex-1 min-w-[180px]">
          <FiTool className="text-xl text-blue-600 dark:text-blue-400" />
          Skills
        </h2>
        <button
          onClick={() => {
            if (showForm && !editingId) handleFormCancel();
            else {
              setEditingId(null);
              setShowForm(true);
            }
          }}
          className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium text-sm transition whitespace-nowrap"
        >
          {showForm && !editingId ? (
            <>
              <FiX className="text-base" />
              Cancel
            </>
          ) : (
            <>
              <FiPlus className="text-base" />
              Add
            </>
          )}
        </button>
      </div>
      {/* Error */}
      {error && (
        <div className="p-3 bg-red-100 text-red-700 border border-red-200 rounded-md mb-4 flex justify-between items-center">
          <span>{error}</span>
          <button
            className="px-2 text-lg"
            onClick={() => setError(null)}
            aria-label="Dismiss"
          >
            &times;
          </button>
        </div>
      )}
      {/* Form */}
      {showForm && (
        <div className="mb-5 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl shadow p-4 sm:p-6">
          <SkillForm
            editingId={editingId}
            initialData={currentSkill}
            onSave={handleSave}
            onCancel={handleFormCancel}
          />
        </div>
      )}
      {/* Loading / Skill List */}
      {loading ? (
        <div className="flex justify-center items-center h-24 text-gray-600 dark:text-gray-300 gap-2">
          <FiTool className="animate-spin text-xl text-blue-600 dark:text-blue-400" />
          <span className="text-base">Loading skills...</span>
        </div>
      ) : (
        <SkillList
          skills={skills}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
