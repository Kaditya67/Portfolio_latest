import React, { useState } from "react";

export function CertificateCard({ cert }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Format dates nicely
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const shortDate = cert.issuedAt
    ? new Date(cert.issuedAt).toLocaleDateString(undefined, { 
        year: "numeric", 
        month: "short" 
      })
    : "";

  return (
    <>
      {/* Card Component */}
      <article 
        className="rounded-lg border border-border bg-card dark:bg-neutral-800 p-4 hover:shadow-sm transition cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {cert.imageUrl && (
          <img
            src={cert.imageUrl}
            alt={`${cert.title} certificate preview`}
            className="mb-4 h-40 w-full rounded-md object-cover"
          />
        )}
        <h3 className="text-lg font-medium line-clamp-2">{cert.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {cert.issuer} · {shortDate}
        </p>
        <div className="mt-3 flex gap-3">
          {cert.url && (
            <a
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline underline-offset-4 hover:text-primary"
              onClick={(e) => e.stopPropagation()}
            >
              View Credential
            </a>
          )}
          <button 
            className="text-sm text-muted-foreground hover:text-primary"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            View Details
          </button>
        </div>
      </article>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div 
            className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start p-6 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {cert.title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                  {cert.issuer}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Certificate Image */}
              {cert.imageUrl && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Certificate Preview
                  </h3>
                  <img
                    src={cert.imageUrl}
                    alt={`${cert.title} certificate`}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700"
                  />
                </div>
              )}

              {/* Certificate Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Issued Date
                    </h4>
                    <p className="text-gray-900 dark:text-white">
                      {formatDate(cert.issuedAt)}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Credential ID
                    </h4>
                    <p className="text-sm font-mono text-gray-900 dark:text-white break-all">
                      {cert.credentialId || "N/A"}
                    </p>
                  </div>

                  {cert.createdAt && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Created
                      </h4>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {formatDateTime(cert.createdAt)}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {cert.updatedAt && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Last Updated
                      </h4>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {formatDateTime(cert.updatedAt)}
                      </p>
                    </div>
                  )}

                  {cert.__v !== undefined && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Version
                      </h4>
                      <p className="text-sm text-gray-900 dark:text-white">
                        v{cert.__v}
                      </p>
                    </div>
                  )}

                  {cert._id && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Database ID
                      </h4>
                      <p className="text-xs font-mono text-gray-600 dark:text-gray-400 break-all">
                        {cert._id}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Official Credential
                  </a>
                )}
                
                {cert.imageUrl && (
                  <a
                    href={cert.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Open Image
                  </a>
                )}
                
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}