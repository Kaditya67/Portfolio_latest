import { FiEdit2, FiTrash2, FiLink, FiImage, FiVideo } from "react-icons/fi";

const TYPE_ICONS = {
  image: FiImage,
  video: FiVideo,
  link: FiLink,
};

export default function MediaList({ items, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {items.length === 0 ? (
        <div className="col-span-full text-gray-500 dark:text-gray-400 italic text-center py-6 flex flex-col items-center text-sm">
          <FiImage className="text-xl mb-1" />
          No media added yet.
        </div>
      ) : (
        items.map((media) => {
          const TypeIcon = TYPE_ICONS[media.type] || FiLink;
          return (
            <div key={media._id} className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-gray-200 dark:border-neutral-800 flex flex-col shadow-sm justify-between h-full transition hover:shadow-md">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  {media.imageUrl && media.imageUrl !== "" && media.type === "image" ? (
                    <img src={media.imageUrl} alt={media.title} className="w-10 h-10 rounded-lg object-cover border border-gray-200 dark:border-neutral-800" />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-pink-50 dark:bg-pink-950/40 flex items-center justify-center">
                      <TypeIcon className="text-lg text-pink-600 dark:text-pink-400" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white truncate">{media.title}</h3>
                    <span className="block text-[11px] text-gray-500 dark:text-gray-400 capitalize">{media.type}</span>
                  </div>
                </div>
                <a href={media.url} target="_blank" rel="noopener noreferrer" className="text-xs text-pink-700 dark:text-pink-300 truncate hover:underline flex gap-1 items-center">
                  <FiLink className="inline-block text-[11px] flex-shrink-0" /> <span className="truncate">{media.url}</span>
                </a>
                {media.tags && media.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {media.tags.map((tag) => (
                      <span key={tag} className="text-[10px] bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-200 px-1.5 py-0.5 rounded font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2 mt-3 pt-2 border-t border-gray-100 dark:border-neutral-800">
                <button
                  onClick={() => onEdit(media._id)}
                  className="flex items-center justify-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium text-xs transition flex-1"
                >
                  <FiEdit2 className="text-xs" /> Edit
                </button>
                <button
                  onClick={() => onDelete(media._id)}
                  className="flex items-center justify-center gap-1 px-2.5 py-1 bg-red-500 hover:bg-red-600 text-white rounded font-medium text-xs transition flex-1"
                >
                  <FiTrash2 className="text-xs" /> Delete
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
