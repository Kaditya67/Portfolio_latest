import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import api from "../../api/api.js"
import { projects as defaultProjects } from "../../data/projects.js"

export default function ProjectDetail() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [versions, setVersions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const formatVersion = (ver) => ver?.toString().replace(/^v/i, "") || "0"

  useEffect(() => {
    let active = true

    async function fetchProject() {
      try {
        const result = await api.getProject(slug)
        if (active && result?.item) {
          setProject(result.item)
          setVersions(result.versions || [])
        } else {
          const fallback = defaultProjects.find((p) => p.slug === slug)
          setProject(fallback || null)
        }
      } catch (err) {
        console.error("Project API error:", err)
        setError("Failed to load project details.")
        const fallback = defaultProjects.find((p) => p.slug === slug)
        setProject(fallback || null)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
    return () => {
      active = false
    }
  }, [slug])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground dark:bg-neutral-900 dark:text-white">
        <div className="text-center">
          <div className="animate-spin border-4 border-t-blue-500 border-gray-200 rounded-full w-16 h-16 mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground dark:text-gray-300">Loading project...</p>
        </div>
      </main>
    )
  }

  if (!project) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center bg-background text-foreground dark:bg-neutral-900 dark:text-white px-4 py-16">
        <div className="text-center max-w-md">
          <div className="inline-flex p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 mb-4 border border-amber-200 dark:border-amber-800">
            <span className="text-2xl">🔍</span>
          </div>
          <h2 className="text-xl font-bold mb-2">Project Not Found</h2>
          <p className="text-xs text-muted-foreground dark:text-gray-400 mb-6 leading-relaxed">
            The project "{slug}" could not be located or may have been updated.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition"
          >
            ← Browse All Projects
          </Link>
        </div>
      </main>
    )
  }

  const name = project.title || project.name
  const repo = project.repoUrl || project.repo
  const demo = project.demoUrl || project.demo
  const image = project.imageUrl || project.image

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 min-h-screen bg-background text-foreground dark:bg-neutral-900 dark:text-white">
      <Link
        to="/projects"
        className="text-xs underline underline-offset-4 hover:text-primary dark:text-gray-400 dark:hover:text-primary mb-4 inline-block"
      >
        ← Back to projects
      </Link>

      <h1 className="text-2xl md:text-3xl font-bold mt-2">{name}</h1>
      <p className="mt-2 text-sm text-muted-foreground dark:text-gray-300 leading-relaxed">{project.description}</p>

      {image && (
        <img
          src={image}
          alt={name}
          className="mt-8 w-full rounded-lg border border-border dark:border-gray-700 object-cover"
        />
      )}

      {(project.category || project.status) && (
        <div className="mt-6 flex flex-wrap gap-2">
          {project.category && (
            <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary rounded-full">
              {project.category}
            </span>
          )}
          {project.status && (
            <span className="inline-block px-3 py-1 text-sm font-medium bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-secondary rounded-full">
              {project.status}
            </span>
          )}
        </div>
      )}

      {project.parentProject && (
        <div className="mt-6 p-4 border-l-4 border-primary bg-primary/5 dark:bg-primary/10 rounded-md">
          <p className="text-sm text-muted-foreground dark:text-gray-400">Previous version:</p>
          <Link
            to={`/projects/${project.parentProject.slug}`}
            className="text-primary font-medium hover:underline"
          >
            {project.parentProject.title} - Version {formatVersion(project.parentProject.version)}
          </Link>
        </div>
      )}

      {versions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Version History</h2>
          <ul className="space-y-1">
            {versions.map((v) => (
              <li key={v._id}>
                <Link
                  to={`/projects/${v.slug}`}
                  className={`text-sm ${
                    v.latest ? "text-primary font-semibold" : "text-muted-foreground dark:text-gray-400"
                  } hover:underline`}
                >
                  {v.title} - Version {formatVersion(v.version)} {v.latest && "- Latest"}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.tags?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-3 py-1 text-xs font-medium bg-accent/10 text-accent dark:bg-neutral-800 dark:text-gray-300 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {project.tech?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="inline-block px-3 py-1 text-sm bg-muted text-muted-foreground dark:bg-neutral-800 dark:text-gray-300 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {project.highlights?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3">Highlights</h2>
          <ul className="space-y-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-muted-foreground dark:text-gray-400">
                <span className="text-primary mt-1">•</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.content && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3">Details</h2>
          <p className="text-muted-foreground dark:text-gray-300 whitespace-pre-wrap">
            {project.content}
          </p>
        </div>
      )}

      <div className="mt-10 flex gap-4 border-t border-border dark:border-gray-700 pt-6">
        {repo && (
          <a
            href={repo}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            View on GitHub
          </a>
        )}
        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
          >
            Live Demo
          </a>
        )}
      </div>
    </main>
  )
}
