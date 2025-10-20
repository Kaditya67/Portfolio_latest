import { useState, useEffect } from "react";
import { api } from "../../api/client";
import ProjectForm from "../forms/ProjectForm";
import ProjectList from "../lists/ProjectList";
import { FiFolder, FiPlus, FiXCircle, FiLoader } from "react-icons/fi";

export default function ProjectsTab() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const currentProject = editingId
    ? projects.find((p) => p.slug === editingId)
    : null;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getProjects();
      setProjects(data.projects || data.items || []);
    } catch (err) {
      setError(err?.message || "Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      setLoading(true);
      await api.deleteProject(slug);
      setProjects((prev) => prev.filter((p) => p.slug !== slug));
    } catch (err) {
      setError(err?.message || "Failed to delete project.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data) => {
    setFormLoading(true);
    try {
      if (editingId) {
        await api.updateProject(editingId, data);
      } else {
        await api.createProject(data);
      }
      setShowForm(false);
      setEditingId(null);
      await fetchProjects();
    } catch (err) {
      setError(err?.message || "Failed to save project.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (slug) => {
    setError(null);
    setEditingId(slug);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div className="text-gray-900 dark:text-gray-100 transition-colors duration-300 w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <FiFolder className="inline mb-0.5 text-blue-600 dark:text-blue-400" />
          Projects
        </h2>
        <button 
          onClick={() => {
            setError(null);
            setShowForm((prev) => !prev);
            setEditingId(null);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg shadow-sm transition-all duration-200 disabled:opacity-60"
          disabled={formLoading || loading}
        >
          {showForm && !editingId ? (
            <>
              <FiXCircle className="text-lg" /> Cancel
            </>
          ) : (
            <>
              <FiPlus className="text-lg" /> Add
            </>
          )}
        </button>
      </div>

      {/* Error Box */}
      {error && (
        <div className="p-4 mb-4 rounded-lg border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 flex justify-between items-center gap-2">
          <span className="flex items-center gap-2">
            <FiXCircle className="text-lg" />
            {error}
          </span>
          <button
            className="px-2 text-lg hover:text-red-500 dark:hover:text-red-400"
            onClick={() => setError(null)}
            aria-label="Dismiss"
          >
            &times;
          </button>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="mb-5 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-6">
          <ProjectForm
            editingId={editingId}
            initialData={currentProject}
            onSave={handleSave}
            onCancel={handleCancel}
            loading={formLoading}
          />
        </div>
      )}

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-24 text-gray-600 dark:text-gray-300">
          <FiLoader className="animate-spin text-2xl mr-2 text-blue-600 dark:text-blue-400" />
          <span className="text-base">Loading projects...</span>
        </div>
      ) : (
        <ProjectList
          projects={projects}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
