import { FiEdit2, FiTrash2, FiBookOpen, FiAward } from "react-icons/fi";

const LEVEL_COLORS = {
  beginner: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200",
  intermediate: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200",
  advanced: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200",
  expert: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200",
};

const STATUS_COLORS = {
  "In Progress": "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200",
  Building: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200",
  Applied: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200",
  Exploring: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-200",
};

export default function LearningList({ items, onEdit, onDelete }) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {items.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 italic flex items-center gap-2 py-6 justify-center">
          <FiBookOpen className="text-xl" />
          No learning items yet.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map(item => (
            <div key={item._id} className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm flex flex-col h-full justify-between transition hover:shadow-md">
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <FiBookOpen className="text-purple-500 text-sm flex-shrink-0" />
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white truncate">{item.name}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {item.level && (
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold capitalize ${LEVEL_COLORS[item.level]}`}>
                      <FiAward className="mr-0.5" />{item.level}
                    </span>
                  )}
                  {item.status && (
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold capitalize ${STATUS_COLORS[item.status]}`}>
                      {item.status}
                    </span>
                  )}
                  {item.category &&
                    <span className="inline-block px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200 text-[10px] font-semibold">
                      {item.category}
                    </span>
                  }
                </div>
                {item.description && (
                  <div className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">{item.description}</div>
                )}
              </div>
              <div className="flex gap-2 mt-3 pt-2 border-t border-gray-100 dark:border-neutral-800">
                <button
                  onClick={() => onEdit(item._id)}
                  className="flex items-center justify-center gap-1 flex-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium text-xs transition"
                >
                  <FiEdit2 className="text-xs" /> Edit
                </button>
                <button
                  onClick={() => onDelete(item._id)}
                  className="flex items-center justify-center gap-1 flex-1 px-2.5 py-1 bg-red-500 hover:bg-red-600 text-white rounded font-medium text-xs transition"
                >
                  <FiTrash2 className="text-xs" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
