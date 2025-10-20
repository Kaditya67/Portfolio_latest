import { useState, useEffect } from "react";
import { api } from "../../api/client";
import CertificateList from "../lists/CertificateList";
import CertificateForm from "../forms/CertificateForm";
import { FiAward, FiPlus, FiX } from "react-icons/fi";

export default function CertificatesTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getCertificates();
      setItems(data.items || []);
    } catch (err) {
      setError(err.message || "Failed to load certificates.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this certificate?")) return;
    try {
      await api.deleteCertificate(id);
      setItems((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete.");
    }
  };

  const handleSave = async (data) => {
    try {
      if (editingId) await api.updateCertificate(editingId, data);
      else await api.createCertificate(data);
      setShowForm(false);
      setEditingId(null);
      await fetchCertificates();
    } catch (err) {
      setError(err.message || "Failed to save.");
    }
  };

  const currentCertificate = editingId
    ? items.find((c) => c._id === editingId)
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
          <FiAward className="text-xl text-red-500" />
          Certificates
        </h2>
        <button
          onClick={() => {
            if (showForm && !editingId) handleFormCancel();
            else {
              setEditingId(null);
              setShowForm(true);
            }
          }}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition disabled:opacity-60"
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
          <CertificateForm
            editingId={editingId}
            initialData={currentCertificate}
            onSave={handleSave}
            onCancel={handleFormCancel}
          />
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-24 text-gray-600 dark:text-gray-300">
          <FiAward className="animate-spin text-xl mr-2 text-red-500" />
          <span className="text-base">Loading certificates...</span>
        </div>
      ) : (
        <CertificateList
          items={items}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
