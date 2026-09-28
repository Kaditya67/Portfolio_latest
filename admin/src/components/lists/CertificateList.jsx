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
          <div key={cert._id} className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-gray-200 dark:border-neutral-700 flex flex-col shadow-sm justify-between h-full transition hover:shadow-md">
            <div className="flex items-center gap-2.5 mb-2">
              {cert.imageUrl ? (
                <img src={cert.imageUrl} alt={cert.title} className="w-10 h-10 rounded object-cover border" />
              ) : (
                <FiAward className="text-xl text-red-500 flex-shrink-0" />
              )}
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white truncate">{cert.title}</h3>
                <span className="block text-[11px] text-gray-500 dark:text-gray-300 truncate">{cert.issuer}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300 mt-1">
              <span>Issued:</span>
              <span className="font-medium">{formatDate(cert.issuedAt)}</span>
            </div>
            {cert.credentialId && (
              <div className="mt-1 text-[11px] text-orange-700 dark:text-orange-300 truncate">
                ID: {cert.credentialId}
              </div>
            )}
            <div className="flex gap-1.5 mt-3 pt-2.5 border-t border-gray-100 dark:border-neutral-800">
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-100 rounded text-xs font-medium transition hover:bg-blue-50 dark:hover:bg-blue-900"
                >
                  <FiExternalLink className="text-xs" /> View
                </a>
              )}
              <button
                onClick={() => onEdit(cert._id)}
                className="flex items-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition"
              >
                <FiEdit2 className="text-xs" /> Edit
              </button>
              <button
                onClick={() => onDelete(cert._id)}
                className="flex items-center gap-1 px-2.5 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-medium transition ml-auto"
              >
                <FiTrash2 className="text-xs" /> Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
