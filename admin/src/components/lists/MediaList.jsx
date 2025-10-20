import { FiEdit2, FiTrash2, FiLink, FiImage, FiVideo } from "react-icons/fi";

const TYPE_ICONS = {
  image: FiImage,
  video: FiVideo,
  link: FiLink,
};

export default function MediaList({ items, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
      {items.length === 0 ? (
        <div className="col-span-full text-gray-500 dark:text-gray-400 italic text-center py-6 flex flex-col items-center">
          <FiImage className="text-2xl mb-1" />
          No media added yet.
        </div>
      ) : (
        items.map((media) => {
          const TypeIcon = TYPE_ICONS[media.type] || FiLink;
          return (
            <div key={media._id} className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-gray-200 dark:border-neutral-700 flex flex-col shadow justify-between h-full transition hover:shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                {media.imageUrl && media.imageUrl !== "" && media.type === "image" ? (
                  <img src={media.imageUrl} alt={media.title} className="w-12 h-12 rounded object-cover border" />
                ) : (
                  <TypeIcon className="text-2xl text-pink-600 dark:text-pink-400" />
                )}
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{media.title}</h3>
                  <span className="block text-xs text-gray-500 dark:text-gray-300 capitalize">{media.type}</span>
                </div>
              </div>
              <a href={media.url} target="_blank" rel="noopener noreferrer" className="text-xs text-pink-700 dark:text-pink-200 truncate hover:underline flex gap-1 items-center">
                <FiLink className="inline-block" /> {media.url}
              </a>
              {media.tags && media.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {media.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-200 px-2 py-1 rounded font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => onEdit(media._id)}
                  className="flex items-center gap-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition"
                >
                  <FiEdit2 className="text-sm" /> Edit
                </button>
                <button
                  onClick={() => onDelete(media._id)}
                  className="flex items-center gap-1 px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium transition"
                >
                  <FiTrash2 className="text-sm" /> Delete
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
