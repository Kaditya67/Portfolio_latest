import React from "react";

const Resume = () => {
  const resumeUrl = "/resume.pdf"; // Ensure file is in /public

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-background text-foreground dark:bg-neutral-900 dark:text-white transition-colors duration-300">
      <section className="w-full max-w-4xl">
        {/* === Header === */}
        <h1 className="text-3xl font-bold mb-2">Resume</h1>
        <p className="text-muted-foreground dark:text-gray-300 mb-6">
          View or download my resume below.
        </p>

        {/* === PDF Preview Section === */}
        <div className="rounded-xl border border-border bg-card dark:bg-neutral-800 dark:border-gray-700 p-2 sm:p-4 shadow-sm">
          <div className="flex items-center justify-between px-2 py-2 mb-2 border-b border-border/70 dark:border-gray-700/60 text-xs">
            <span className="text-muted-foreground dark:text-gray-300 font-medium">Document Preview</span>
            <div className="flex items-center gap-3">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Open in new tab ↗
              </a>
              <a
                href={resumeUrl}
                download="Aditya_Ojha_Resume.pdf"
                className="text-primary hover:underline font-medium"
              >
                Download ↓
              </a>
            </div>
          </div>

          <div className="w-full h-[650px] sm:h-[750px] rounded-lg overflow-hidden border border-border/60 dark:border-gray-700/60 bg-white">
            <iframe
              src={`${resumeUrl}#toolbar=1&navpanes=0`}
              title="Resume PDF"
              className="w-full h-full border-0"
            >
              <object
                data={resumeUrl}
                type="application/pdf"
                className="w-full h-full"
              >
                <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-gray-50 dark:bg-neutral-800">
                  <p className="text-sm font-medium text-foreground dark:text-white mb-2">
                    PDF Preview is not supported by your browser or mobile device.
                  </p>
                  <p className="text-xs text-muted-foreground dark:text-gray-400 mb-4">
                    You can view the document directly or download it to your device.
                  </p>
                  <div className="flex gap-3">
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-md border border-border bg-card dark:bg-neutral-700 text-xs font-medium hover:bg-accent transition"
                    >
                      Open in New Tab ↗
                    </a>
                    <a
                      href={resumeUrl}
                      download="Aditya_Ojha_Resume.pdf"
                      className="px-4 py-2 rounded-md bg-primary text-white text-xs font-medium hover:bg-primary/90 transition shadow-sm"
                    >
                      Download Resume ↓
                    </a>
                  </div>
                </div>
              </object>
            </iframe>
          </div>
        </div>

        {/* === Download Button === */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={resumeUrl}
            download="Aditya_Ojha_Resume.pdf"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition shadow-sm"
          >
            Download Resume (PDF)
          </a>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-border bg-card dark:bg-neutral-800 text-foreground dark:text-white text-sm font-medium hover:bg-accent dark:hover:bg-neutral-700 transition"
          >
            Open in New Window ↗
          </a>
        </div>
      </section>
    </main>
  );
};

export default Resume;
