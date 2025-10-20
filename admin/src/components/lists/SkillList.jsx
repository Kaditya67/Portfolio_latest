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
            className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-gray-200 dark:border-neutral-700 flex flex-col shadow justify-between h-full transition hover:shadow-lg"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FiTool className="text-blue-500 dark:text-blue-400" />
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{skill.name}</h3>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-2 min-h-[28px]">
                {skill.category && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-medium w-fit">
                    <FiLayers className="text-[14px]" />
                    {skill.category}
                  </span>
                )}
                <span className="inline-block px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 text-xs uppercase tracking-wide font-bold w-fit">
                  {skill.level}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => onEdit(skill._id)}
                className="flex items-center gap-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition"
              >
                <FiEdit2 className="text-sm" /> Edit
              </button>
              <button
                onClick={() => onDelete(skill._id)}
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
