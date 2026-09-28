import { FiEdit2, FiTrash2, FiMapPin, FiCalendar, FiPlay, FiCheckCircle, FiBriefcase } from "react-icons/fi";

function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
}

export default function ExperienceList({ items, onEdit, onDelete }) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      {items.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 italic flex items-center gap-2 justify-center py-6">
          <FiBriefcase className="text-xl" />
          No experience added yet.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map(exp => (
            <div key={exp._id} className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between h-full transition hover:shadow-md">
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white truncate">{exp.title}</h3>
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300 mt-0.5">
                      <span className="font-medium text-emerald-700 dark:text-emerald-300">{exp.company}</span>
                      {exp.location && (
                        <span className="inline-flex items-center gap-0.5 text-gray-500">
                          <FiMapPin className="inline-block text-[11px]" /> {exp.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button onClick={() => onEdit(exp._id)}
                      className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition flex items-center text-xs font-medium gap-1"
                    >
                      <FiEdit2 className="text-xs" /> Edit
                    </button>
                    <button onClick={() => onDelete(exp._id)}
                      className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition flex items-center text-xs font-medium gap-1"
                    >
                      <FiTrash2 className="text-xs" /> Delete
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-blue-700 dark:text-blue-300 mb-1.5">
                  <FiCalendar className="text-xs" />
                  <span>
                    {formatDate(exp.startDate)} - {exp.current ? (
                      <span className="font-semibold flex items-center gap-0.5"><FiPlay className="inline-block text-[10px]"/> Present</span>
                    ) : (
                      formatDate(exp.endDate)
                    )}
                  </span>
                </div>
                {exp.description && <div className="mt-1 text-xs whitespace-pre-line text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">{exp.description}</div>}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="mt-2 ml-1 text-xs text-emerald-700 dark:text-emerald-300 space-y-0.5">
                    {exp.highlights.map((h, i) =>
                      <li key={i} className="flex items-start gap-1"><FiCheckCircle className="text-[11px] mt-0.5 flex-shrink-0" /><span>{h}</span></li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
