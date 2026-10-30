import React from "react";

const Resume = () => {
  // Same-origin path so the browser displays the inline PDF viewer on all devices
  // without triggering a forced download.
  const previewUrl = "/Resume_Aditya_Ojha.pdf";
  const downloadUrl = "https://raw.githubusercontent.com/Kaditya67/kaditya67/main/Resume_Aditya_Ojha.pdf";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-background text-foreground dark:bg-neutral-900 dark:text-white transition-colors duration-300">
      <section className="w-full max-w-4xl">
        {/* === Header === */}
        <h1 className="text-3xl font-bold mb-2">Resume</h1>
        <p className="text-muted-foreground dark:text-gray-300 mb-6">
          View my resume below or download a copy.
        </p>

        {/* === PDF Preview Section === */}
        <div className="rounded-xl border border-border bg-card dark:bg-neutral-800 dark:border-gray-700 p-2 sm:p-4 shadow-sm">
          <div className="flex items-center justify-between px-2 py-2 mb-2 border-b border-border/70 dark:border-gray-700/60 text-xs">
            <span className="text-muted-foreground dark:text-gray-300 font-medium">Document Preview</span>
            <div className="flex items-center gap-3">
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Open in new tab ↗
              </a>
              <a
                href={downloadUrl}
                download="Resume_Aditya_Ojha.pdf"
                className="text-primary hover:underline font-medium"
              >
                Download ↓
              </a>
            </div>
          </div>

          <div className="w-full h-[650px] sm:h-[750px] rounded-lg overflow-hidden border border-border/60 dark:border-gray-700/60 bg-white">
            <iframe
              src={previewUrl}
              title="Resume Preview"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Resume;
