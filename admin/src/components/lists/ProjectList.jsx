export default function ProjectList({ projects, onEdit, onDelete }) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      {projects.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 italic text-center py-6">
          No projects yet.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-4 shadow-sm flex flex-col h-full justify-between transition hover:shadow-md"
            >
              <div>
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1 truncate">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 line-clamp-2 leading-relaxed">{project.description}</p>
                {project.tech && project.tech.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200 px-1.5 py-0.5 rounded font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2 mt-3 pt-2 border-t border-gray-100 dark:border-neutral-800">
                <button
                  onClick={() => onEdit(project.slug)}
                  className="flex-1 px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(project.slug)}
                  className="flex-1 px-2.5 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-xs font-medium transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
