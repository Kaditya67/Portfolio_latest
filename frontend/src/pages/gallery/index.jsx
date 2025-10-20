import React, { useEffect, useState } from "react";
import api from "../../api/api.js";
import { Section } from "../../components/section.jsx";

const GalleryPage = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchMedia = async () => {
      try {
        const result = await api.getMedia();
        console.debug("Media API result:", result);

        if (isMounted && result?.items?.length > 0) {
          setMedia(result.items);
        } else {
          console.warn("Empty API response for media");
        }
      } catch (err) {
        console.error("Media API error:", err);
        setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMedia();
    return () => {
      isMounted = false;
    };
  }, []);

  const openModal = (item, index) => {
    setSelectedMedia(item);
    setCurrentIndex(index);
  };

  const closeModal = () => setSelectedMedia(null);

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % media.length;
    setCurrentIndex(nextIndex);
    setSelectedMedia(media[nextIndex]);
  };

  const goToPrev = () => {
    const prevIndex = (currentIndex - 1 + media.length) % media.length;
    setCurrentIndex(prevIndex);
    setSelectedMedia(media[prevIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedMedia) return;
      switch (e.key) {
        case "Escape":
          closeModal();
          break;
        case "ArrowRight":
          goToNext();
          break;
        case "ArrowLeft":
          goToPrev();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedMedia, currentIndex, media]);

  return (
    <main className="min-h-screen bg-background text-foreground dark:bg-neutral-900 dark:text-white p-8 transition-colors duration-300">
      <Section
        title="Gallery"
        subtitle="Photos and snapshots showcasing my projects, skills, and work."
      >
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-56 w-full bg-neutral-200 dark:bg-neutral-800 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">
            Failed to load gallery. Please try again later.
          </p>
        ) : media.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {media.map((m, idx) => (
              <figure
                key={m._id || idx}
                className="group rounded-xl border border-border overflow-hidden bg-card dark:bg-neutral-800 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => openModal(m, idx)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={m.imageUrl || "/placeholder.svg"}
                    alt={m.title || "Media"}
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <figcaption className="p-4">
                  <div className="text-sm font-semibold line-clamp-2">
                    {m.title}
                  </div>
                  {m.tags?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1 text-xs text-muted-foreground">
                      {m.tags.sort().map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-full border border-border dark:border-gray-600 bg-background dark:bg-neutral-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <p className="text-muted dark:text-neutral-400 text-center">
            No media found.
          </p>
        )}
      </Section>

      {/* Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm">
          <div className="relative max-w-6xl max-h-[90vh] w-full mx-4">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 z-10 text-white hover:text-gray-300 p-2"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {media.length > 1 && (
              <>
                <button
                  onClick={goToPrev}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            {media.length > 1 && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {media.length}
              </div>
            )}

            <div className="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-2/3 flex items-center justify-center p-4">
                  <img
                    src={selectedMedia.imageUrl || "/placeholder.svg"}
                    alt={selectedMedia.title || "Media"}
                    className="max-h-[70vh] w-auto object-contain rounded-lg"
                  />
                </div>

                <div className="lg:w-1/3 p-6 flex flex-col">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4">
                      {selectedMedia.title}
                    </h2>
                    {selectedMedia.description && (
                      <p className="text-muted-foreground dark:text-gray-300 mb-6 leading-relaxed">
                        {selectedMedia.description}
                      </p>
                    )}

                    {selectedMedia.tags?.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide">
                          Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedMedia.tags.sort().map((tag, i) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2 text-sm text-muted-foreground dark:text-gray-400">
                      {selectedMedia.type && (
                        <div className="flex items-center">
                          <span className="w-20 font-medium">Type:</span>
                          <span className="capitalize">
                            {selectedMedia.type}
                          </span>
                        </div>
                      )}
                      {selectedMedia.createdAt && (
                        <div className="flex items-center">
                          <span className="w-20 font-medium">Added:</span>
                          <span>
                            {new Date(
                              selectedMedia.createdAt
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-6 border-t border-border dark:border-gray-700">
                    <a
                      href={selectedMedia.imageUrl || selectedMedia.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-center flex items-center justify-center gap-2 transition-colors"
                    >
                      Open Original
                    </a>
                    <button
                      onClick={closeModal}
                      className="flex-1 border border-border dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-neutral-700 text-foreground dark:text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default GalleryPage;
