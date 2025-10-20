import { NavLink } from "react-router-dom" // use NavLink instead of Link
import { useState } from "react"
import { Menu } from "lucide-react"  
import { ThemeToggle } from "./theme-toggle"

const navItems = [
  { href: "/", label: "Home" }, 
  { href: "/intro", label: "Intro" }, 
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/learning", label: "Learning" },
  { href: "/certificates", label: "Certificates" },
  { href: "/gallery", label: "Gallery" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="
      sticky top-0 z-40 
      border-b border-border dark:border-gray-800
      bg-background/80 dark:bg-neutral-900/90 
      text-foreground dark:text-white 
      backdrop-blur
    ">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          <NavLink to="/" className="font-semibold tracking-tight text-lg">
            Aditya's Portfolio
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `text-sm transition-colors ${
                    isActive
                      ? "text-primary dark:text-blue-400 font-semibold"
                      : "text-foreground dark:text-gray-200 hover:text-primary dark:hover:text-blue-400"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile menu button */}
          <button
            className="
              md:hidden inline-flex h-9 w-9 items-center justify-center 
              rounded-md border border-border dark:border-gray-800
              bg-background dark:bg-neutral-900
              text-foreground dark:text-white
            "
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-3">
            <nav className="grid gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2 transition-colors ${
                      isActive
                        ? "bg-primary text-white dark:bg-blue-500 dark:text-white"
                        : "bg-muted dark:bg-neutral-800 text-foreground dark:text-gray-100 hover:bg-accent dark:hover:bg-neutral-700"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="px-3 py-2">
                <ThemeToggle />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
