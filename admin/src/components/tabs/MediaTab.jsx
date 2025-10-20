import { useState, useEffect } from "react";
import { api } from "../../api/client";

import { FiImage, FiPlus, FiX } from "react-icons/fi";
import MediaForm from "../forms/MediaForm";
import MediaList from "../lists/MediaList";

export default function MediaTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getMedia();
      setItems(data.items || []);
    } catch (err) {
      setError(err.message || "Failed to load media.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this media item?")) return;
    try {
      await api.deleteMedia(id);
      setItems((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete.");
    }
  };

  const handleSave = async (data) => {
    try {
      if (editingId) await api.updateMedia(editingId, data);
      else await api.createMedia(data);
      setShowForm(false);
      setEditingId(null);
      await fetchMedia();
    } catch (err) {
      setError(err.message || "Failed to save.");
    }
  };

  const currentMedia = editingId
    ? items.find((m) => m._id === editingId)
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
          <FiImage className="text-xl text-pink-500" />
          Media
        </h2>
        <button
          onClick={() => {
            if (showForm && !editingId) handleFormCancel();
            else {
              setEditingId(null);
              setShowForm(true);
            }
          }}
          className="flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition disabled:opacity-60"
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
        <div className="p-4 bg-pink-100 text-pink-700 border border-pink-200 rounded-lg mb-4 flex justify-between items-center">
          <span>{error}</span>
          <button className="px-2 text-lg" onClick={() => setError(null)} aria-label="Dismiss">
            &times;
          </button>
        </div>
      )}

      {showForm && (
        <div className="mb-5 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl shadow p-6">
          <MediaForm
            editingId={editingId}
            initialData={currentMedia}
            onSave={handleSave}
            onCancel={handleFormCancel}
          />
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-24 text-gray-600 dark:text-gray-300">
          <FiImage className="animate-spin text-xl mr-2 text-pink-500" />
          <span className="text-base">Loading media...</span>
        </div>
      ) : (
        <MediaList
          items={items}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
