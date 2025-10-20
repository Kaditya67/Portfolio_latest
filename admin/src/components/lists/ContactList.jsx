import { FiMail, FiCheckCircle, FiTrash2, FiStar, FiBookmark } from "react-icons/fi";

export function ContactList({ items, onMarkRead, onDelete, onToggleSave }) {
  return (
    <div className="w-full max-w-3xl mx-auto grid grid-cols-1 gap-3">
      {items.length === 0 ? (
        <div className="col-span-full text-gray-500 dark:text-gray-400 italic flex items-center gap-2 py-8 justify-center">
          <FiMail className="text-2xl" />
          No contact messages.
        </div>
      ) : (
        items.map(msg => (
          <div
            key={msg._id}
            className={`p-3 rounded-lg border ${
              msg.status === "unread"
                ? "border-blue-300 bg-blue-50 dark:bg-blue-900/50"
                : "border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900"
            } shadow-sm flex flex-col gap-1 transition hover:shadow-md`}
          >
            <div className="flex items-center justify-between mb-1">
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">{msg.name}</span>
                <span className="text-xs text-gray-500 ml-2">{msg.email}</span>
              </div>
              <span
                className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-semibold ${
                  msg.status === "unread"
                    ? "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200"
                }`}
              >
                {msg.status === "unread" ? <FiMail /> : <FiCheckCircle />}
                {msg.status}
              </span>
            </div>
            <div className="whitespace-pre-line text-gray-800 dark:text-gray-100 text-sm">{msg.message}</div>
            <div className="flex items-end justify-between mt-2 gap-2">
              <div className="text-xs text-gray-400">
                {new Date(msg.createdAt).toLocaleString()}
              </div>
              <div className="flex gap-1">
                {/* Save/Unsave */}
                <button
                  onClick={() => onToggleSave(msg._id, !msg.saved)}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition
                    ${msg.saved ? "bg-yellow-100 text-yellow-700" : "bg-gray-200 text-gray-600"}`}
                  title={msg.saved ? "Unsave this message" : "Save this message"}
                >
                  {msg.saved ? <FiStar /> : <FiBookmark />}
                  {msg.saved ? "Saved" : "Save"}
                </button>
                {/* Mark as Read */}
                {msg.status === "unread" && (
                  <button
                    onClick={() => onMarkRead(msg._id)}
                    className="flex items-center gap-1 px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-medium transition"
                  >
                    <FiCheckCircle /> Mark as Read
                  </button>
                )}
                {/* Only allow delete if not saved */}
                <button
                  onClick={() => onDelete(msg._id)}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition ${msg.saved 
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600 text-white"}`}
                  disabled={msg.saved}
                  title={msg.saved ? "Unsave before delete" : "Delete"}
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}