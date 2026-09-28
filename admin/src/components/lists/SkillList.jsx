import { FiEdit2, FiTrash2, FiTool, FiLayers } from "react-icons/fi";

export default function SkillList({ skills, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {skills.length === 0 ? (
        <div className="col-span-full text-gray-500 dark:text-gray-400 italic text-center py-6 flex flex-col items-center">
          <FiTool className="text-2xl mb-1" />
          No skills yet.
        </div>
      ) : (
        skills.map((skill) => (
          <div key={skill._id}
            className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-gray-200 dark:border-neutral-700 flex flex-col shadow-sm justify-between h-full transition hover:shadow-md"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FiTool className="text-blue-500 dark:text-blue-400 text-sm" />
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white truncate">{skill.name}</h3>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                {skill.category && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-[10px] font-medium w-fit">
                    <FiLayers className="text-[12px]" />
                    {skill.category}
                  </span>
                )}
                <span className="inline-block px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200 text-[10px] uppercase tracking-wide font-semibold w-fit">
                  {skill.level}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-1.5 mt-3 pt-2.5 border-t border-gray-100 dark:border-neutral-800">
              <button
                onClick={() => onEdit(skill._id)}
                className="flex items-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition"
              >
                <FiEdit2 className="text-xs" /> Edit
              </button>
              <button
                onClick={() => onDelete(skill._id)}
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
