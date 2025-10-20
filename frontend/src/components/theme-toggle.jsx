import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window === "undefined") return

    const stored = localStorage.getItem("theme")
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches

    const initialDark = stored ? stored === "dark" : prefersDark
    setIsDark(initialDark)

    if (initialDark) document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
  }, [])

  if (!mounted) return null

  const toggle = () => {
    const next = !isDark
    setIsDark(next)

    if (next) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card hover:bg-accent dark:bg-neutral-800 dark:border-gray-600 dark:hover:bg-gray-700 transition"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  ) 
}
