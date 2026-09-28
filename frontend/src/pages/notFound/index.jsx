import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search, Compass } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-background text-foreground dark:bg-neutral-900 dark:text-white">
      <div className="max-w-md w-full text-center">
        {/* Glow badge */}
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 mb-6 border border-blue-200/60 dark:border-blue-800/60 shadow-inner">
          <Compass className="w-10 h-10 animate-pulse" />
        </div>

        {/* 404 Headline */}
        <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="mt-3 text-xl sm:text-2xl font-semibold tracking-tight">
          Page Not Found
        </h2>

        <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground dark:text-gray-400 leading-relaxed">
          The page or link you entered does not exist or has been moved. Check the URL or return to explore the portfolio.
        </p>

        {/* Quick Nav Links */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium transition shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Go to Homepage</span>
          </Link>
          <Link
            to="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-accent dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700 text-xs sm:text-sm font-medium transition"
          >
            <Search className="w-4 h-4" />
            <span>Browse Projects</span>
          </Link>
        </div>

        {/* Back link */}
        <div className="mt-6">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go back to previous page</span>
          </button>
        </div>
      </div>
    </main>
  );
}
