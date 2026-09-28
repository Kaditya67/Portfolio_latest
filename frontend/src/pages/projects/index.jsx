import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../api/api.js"
import { Section } from "../../components/section.jsx"

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true

    async function fetchProjects() {
      try {
        const result = await api.getProjects() // Or getAllProjects() for admin
        if (active && result?.items) {
          setProjects(result.items)
        } else {
          setProjects([])
        }
      } catch (err) {
        console.error("Projects API fetch failed:", err)
        setError("Failed to load projects.")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
    return () => {
      active = false
    }
  }, [])

  // Group projects by category
  const groupedProjects = projects.reduce((acc, project) => {
    const category = project.category || "Uncategorized"
    if (!acc[category]) acc[category] = []
    acc[category].push(project)
    return acc
  }, {})

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground dark:bg-neutral-900 dark:text-white">
        <div className="text-center">
          <div className="animate-spin border-4 border-t-blue-500 border-gray-200 rounded-full w-16 h-16 mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground dark:text-gray-300">Loading projects...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground dark:bg-neutral-900 dark:text-white">
        <p className="text-destructive">{error}</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground dark:bg-neutral-900 dark:text-white">
      <Section
        title="Projects"
        subtitle="Detailed breakdowns of my side projects and ongoing work."
      >
        {Object.keys(groupedProjects).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground dark:text-gray-400">No projects found.</p>
          </div>
        ) : (
          Object.keys(groupedProjects)
            .sort((a, b) => a.localeCompare(b)) // Sort categories alphabetically
            .map((category) => {
              const projectsInCategory = groupedProjects[category].sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt) // Newest first
              )
              return (
                <div key={category} className="mb-10">
                  <h2 className="text-xl font-semibold mb-4 text-foreground dark:text-white">{category}</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {projectsInCategory.map((project) => (
                      <div
                        key={project.slug || project._id}
                        className="group flex flex-col h-full rounded-lg border border-border bg-card dark:bg-neutral-800 hover:border-primary/50 transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md"
                      >
                        {project.imageUrl && (
                          <div className="relative w-full h-40 bg-muted overflow-hidden">
                            <img
                              src={project.imageUrl}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}

                        <div className="flex flex-col flex-grow p-4 sm:p-5">
                          <h3 className="font-semibold text-base mb-1.5 text-foreground dark:text-white group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>

                          <p className="text-xs text-muted-foreground dark:text-gray-300 mb-3 flex-grow line-clamp-2">
                            {project.description}
                          </p>

                          {((project.technologies && project.technologies.length > 0) || (project.tech && project.tech.length > 0)) && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {(project.technologies || project.tech).slice(0, 4).map((tech) => (
                                <span
                                  key={tech}
                                  className="inline-block px-2 py-0.5 text-[10px] font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-300 rounded-md"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}

                          {project.highlights?.length > 0 && (
                            <ul className="mb-3 space-y-0.5">
                              {project.highlights.slice(0, 2).map((h) => (
                                <li
                                  key={h}
                                  className="text-[11px] text-muted-foreground dark:text-gray-400 flex items-start gap-1.5"
                                >
                                  <span className="text-primary">•</span>
                                  <span className="line-clamp-1">{h}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          <div className="flex gap-3 mt-auto pt-3 border-t border-border dark:border-gray-700 text-xs">
                            {project.repoUrl && (
                              <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-0.5"
                              >
                                GitHub →
                              </a>
                            )}
                            {project.demoUrl && (
                              <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-0.5"
                              >
                                Live Demo →
                              </a>
                            )}
                            <Link
                              to={`/projects/${project.slug}`}
                              className="font-medium text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white transition-colors ml-auto"
                            >
                              Details →
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })
        )}
      </Section>
    </main>
  )
}
