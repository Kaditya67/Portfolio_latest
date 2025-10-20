import { useState, useEffect } from "react";
import { FiEdit2, FiPlus, FiX } from "react-icons/fi";

export default function CertificateForm({ onSave, editingId, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    issuedAt: "",
    credentialId: "",
    url: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (editingId && initialData) {
      setFormData({
        title: initialData.title || "",
        issuer: initialData.issuer || "",
        issuedAt: initialData.issuedAt ? initialData.issuedAt.slice(0, 10) : "",
        credentialId: initialData.credentialId || "",
        url: initialData.url || "",
        imageUrl: initialData.imageUrl || "",
      });
    } else {
      setFormData({
        title: "",
        issuer: "",
        issuedAt: "",
        credentialId: "",
        url: "",
        imageUrl: "",
      });
    }
  }, [editingId, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  const payload = {
  title: formData.title.trim(),
  issuer: formData.issuer.trim(),
  issuedAt: formData.issuedAt, // can send string like "2024-07-01"
  credentialId: formData.credentialId?.trim() || undefined,
  url: formData.url?.trim() || undefined,
  imageUrl: formData.imageUrl?.trim() || undefined,
};

console.log("📤 Certificate payload:", payload);
onSave(payload);


  console.log("📤 Certificate payload to send:", payload);

    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xl mx-auto">
      <input
        type="text"
        name="title"
        required
        placeholder="Certificate Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white"
      />
      <input
        type="text"
        name="issuer"
        required
        placeholder="Issuer (e.g., Coursera)"
        value={formData.issuer}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white"
      />
      <input
        type="date"
        name="issuedAt"
        required
        placeholder="Date Issued"
        value={formData.issuedAt}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white"
      />
      <input
        type="text"
        name="credentialId"
        placeholder="Credential ID (optional)"
        value={formData.credentialId}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white"
      />
      <input
        type="url"
        name="url"
        placeholder="Credential URL (optional)"
        value={formData.url}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white"
      />
      <input
        type="url"
        name="imageUrl"
        placeholder="Image URL (optional)"
        value={formData.imageUrl}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white"
      />
      <div className="flex flex-col sm:flex-row gap-2 mt-2">
        <button
          type="submit"
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition"
        >
          {editingId ? <><FiEdit2 /> Update</> : <><FiPlus /> Create</>} Certificate
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
