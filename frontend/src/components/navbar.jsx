import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  User,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Award,
  Image,
  FileText,
  Mail,
  ChevronRight,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/projects", label: "Projects", icon: FolderGit2 },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/learning", label: "Learning", icon: GraduationCap },
  { href: "/certificates", label: "Certificates", icon: Award },
  { href: "/gallery", label: "Gallery", icon: Image },
  { href: "/resume", label: "Resume", icon: FileText },
  { href: "/contact", label: "Contact", icon: Mail },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  // Close mobile drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 dark:bg-neutral-900/90 text-foreground dark:text-white backdrop-blur">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-13 items-center justify-between">
            <NavLink to="/" className="font-semibold tracking-tight text-base sm:text-lg flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
              <span>Aditya's Portfolio</span>
            </NavLink>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center gap-3.5 lg:gap-5">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `text-xs lg:text-sm transition-colors py-1 ${
                      isActive
                        ? "text-primary dark:text-blue-400 font-semibold"
                        : "text-foreground/80 dark:text-gray-200 hover:text-primary dark:hover:text-blue-400"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="pl-1">
                <ThemeToggle />
              </div>
            </nav>

            {/* Mobile menu trigger */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card dark:bg-neutral-800 text-foreground dark:text-white transition-colors hover:bg-muted"
                onClick={() => setOpen((prev) => !prev)}
                aria-label={open ? "Close menu" : "Open navigation menu"}
                aria-expanded={open}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Content */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-[82vw] max-w-xs bg-background dark:bg-neutral-900 border-l border-border dark:border-neutral-800 p-5 shadow-2xl flex flex-col md:hidden transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
        aria-label="Mobile Navigation"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border dark:border-neutral-800 mb-3">
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-foreground dark:text-white">Navigation</span>
            <span className="text-[11px] text-muted-foreground dark:text-gray-400">Select a section</span>
          </div>
          <button
            type="button"
            className="p-1.5 rounded-md hover:bg-muted dark:hover:bg-neutral-800 text-foreground dark:text-gray-300 transition"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation items list */}
        <nav className="flex-1 overflow-y-auto space-y-1 py-1 pr-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? "bg-primary text-white dark:bg-blue-600 shadow-sm"
                      : "text-foreground dark:text-gray-200 hover:bg-muted dark:hover:bg-neutral-800/80"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 opacity-80" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              </NavLink>
            );
          })}
        </nav>

        {/* Drawer Footer */}
        <div className="pt-4 border-t border-border dark:border-neutral-800 mt-2 flex items-center justify-between text-xs text-muted-foreground dark:text-gray-400">
          <span>Theme</span>
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}
