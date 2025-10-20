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
        <div className="rounded-lg border border-border bg-card dark:bg-neutral-800 dark:border-gray-700 p-4 shadow">
          <object
            data={resumeUrl}
            type="application/pdf"
            className="w-full h-[600px] rounded-md border border-border dark:border-gray-700"
          >
            <p className="text-center text-muted-foreground dark:text-gray-400">
              PDF preview not supported —{" "}
              <a href={resumeUrl} download className="underline text-primary">
                click here to download
              </a>
              .
            </p>
          </object>
        </div>

        {/* === Download Button === */}
        <div className="mt-6 flex justify-center">
          <a
            href={resumeUrl}
            download
            className="inline-flex items-center px-5 py-2.5 rounded-md bg-primary text-white font-medium hover:bg-primary/90 transition-all duration-200 shadow-sm"
          >
            Download Resume
          </a>
        </div>
      </section>
    </main>
  );
};

export default Resume;
