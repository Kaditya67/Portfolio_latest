import { FiEdit2, FiTrash2, FiExternalLink, FiAward } from "react-icons/fi";

function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short" });
}

export default function CertificateList({ items, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
      {items.length === 0 ? (
        <div className="col-span-full text-gray-500 dark:text-gray-400 italic text-center py-6 flex flex-col items-center">
          <FiAward className="text-2xl mb-1" />
          No certificates yet.
        </div>
      ) : (
        items.map((cert) => (
          <div key={cert._id} className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-gray-200 dark:border-neutral-700 flex flex-col shadow justify-between h-full transition hover:shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              {cert.imageUrl ? (
                <img src={cert.imageUrl} alt={cert.title} className="w-12 h-12 rounded object-cover border" />
              ) : (
                <FiAward className="text-2xl text-red-500" />
              )}
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{cert.title}</h3>
                <span className="block text-xs text-gray-500 dark:text-gray-300">{cert.issuer}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 mt-1">
              <span>Issued</span>
              <span className="font-semibold">{formatDate(cert.issuedAt)}</span>
            </div>
            {cert.credentialId && (
              <div className="mt-1 text-xs text-orange-700 dark:text-orange-300 truncate">
                Credential: {cert.credentialId}
              </div>
            )}
            <div className="flex gap-2 mt-4">
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-100 rounded-md text-sm font-medium transition hover:bg-blue-50 dark:hover:bg-blue-900"
                >
                  <FiExternalLink className="text-sm" /> View
                </a>
              )}
              <button
                onClick={() => onEdit(cert._id)}
                className="flex items-center gap-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition"
              >
                <FiEdit2 className="text-sm" /> Edit
              </button>
              <button
                onClick={() => onDelete(cert._id)}
                className="flex items-center gap-1 px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium transition"
              >
                <FiTrash2 className="text-sm" /> Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
