import { useState, useEffect } from "react";
import { api } from "../../api/client";
import { FiBookOpen, FiPlus, FiX } from "react-icons/fi";
import LearningList from "../lists/LearningList";
import LearningForm from "../forms/LearningForm";

export default function LearningTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchLearning();
  }, []);

  const fetchLearning = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getLearning();
      setItems(data.learning || data.items || []);
    } catch (err) {
      setError(err.message || "Failed to load learning items.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this learning item?")) return;
    try {
      await api.deleteLearning(id);
      setItems((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete.");
    }
  };

  const handleSave = async (data) => {
    try {
      if (editingId) await api.updateLearning(editingId, data);
      else await api.createLearning(data);
      setShowForm(false);
      setEditingId(null);
      await fetchLearning();
    } catch (err) {
      setError(err.message || "Failed to save.");
    }
  };

  const currentItem = editingId
    ? items.find((item) => item._id === editingId)
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FiBookOpen className="text-xl text-purple-500" />
          Learning
        </h2>
        <button
          onClick={() => {
            if (showForm && !editingId) handleFormCancel();
            else {
              setEditingId(null);
              setShowForm(true);
            }
          }}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition disabled:opacity-60"
        >
          {showForm && !editingId ? (
            <>
              <FiX className="text-lg" /> Cancel
            </>
          ) : (
            <>
              <FiPlus className="text-lg" /> Add
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 border border-red-200 rounded-lg mb-4 flex justify-between items-center">
          <span>{error}</span>
          <button className="px-2 text-lg" onClick={() => setError(null)} aria-label="Dismiss">
            &times;
          </button>
        </div>
      )}

      {showForm && (
        <div className="mb-5 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl shadow p-6">
          <LearningForm
            editingId={editingId}
            initialData={currentItem}
            onSave={handleSave}
            onCancel={handleFormCancel}
          />
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-24 text-gray-600 dark:text-gray-300">
          <FiBookOpen className="animate-spin text-xl mr-2 text-purple-500" />
          <span className="text-base">Loading learning...</span>
        </div>
      ) : (
        <LearningList
          items={items}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
