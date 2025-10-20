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
        <div className="grid sm:grid-cols-2 gap-6">
          {items.map(exp => (
            <div key={exp._id} className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-gray-200 dark:border-neutral-700 shadow-md flex flex-col justify-between h-full transition hover:shadow-lg">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{exp.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-[13px] text-gray-600 dark:text-gray-300 mt-1">
                      <span className="font-semibold text-emerald-800 dark:text-emerald-200">{exp.company}</span>
                      {exp.location && (
                        <span className="inline-flex items-center gap-0.5 ml-2">
                          <FiMapPin className="inline-block" /> {exp.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => onEdit(exp._id)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition flex items-center text-sm font-medium gap-1"
                    >
                      <FiEdit2 /> Edit
                    </button>
                    <button onClick={() => onDelete(exp._id)}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded transition flex items-center text-sm font-medium gap-1"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300 mb-1">
                  <FiCalendar className="text-base" />
                  <span>
                    {formatDate(exp.startDate)} - {exp.current ? (
                      <span className="font-semibold flex items-center gap-0.5"><FiPlay className="inline-block"/> Present</span>
                    ) : (
                      formatDate(exp.endDate)
                    )}
                  </span>
                </div>
                {exp.description && <div className="mt-1 text-sm whitespace-pre-line text-gray-700 dark:text-gray-200 line-clamp-4">{exp.description}</div>}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="mt-2 ml-2 list-disc text-sm text-emerald-700 dark:text-emerald-300 pl-5 space-y-0.5">
                    {exp.highlights.map((h, i) =>
                      <li key={i}><FiCheckCircle className="inline align-text-bottom mr-1" />{h}</li>
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
