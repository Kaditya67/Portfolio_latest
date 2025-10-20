import React from "react"
import { Link } from "react-router-dom"

export function ProjectCard({ project }) {
  return (
    <article className="rounded-lg border border-border bg-card dark:bg-neutral-800 p-4 md:p-5 hover:shadow-sm transition">
      {project.image && (
        <div className="mb-4 overflow-hidden rounded-md">
          <img
            src={project.image || "/placeholder.svg"}
            alt={`${project.title} screenshot`}
            className="h-48 w-full object-cover"
          />
        </div>
      )}
      <h3 className="text-xl font-medium">{project.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground dark:text-gray-300">{project.description}</p>
      {project.highlights?.length && (
        <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground dark:text-gray-300">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {project.tags.map((t) => (
          <span key={t} className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground dark:text-gray-300">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3">
        {project.repo && (
          <a href={project.repo} className="text-sm underline underline-offset-4 hover:text-primary" target="_blank" rel="noreferrer">
            GitHub
          </a>
        )}
        {project.demo && (
          <a href={project.demo} className="text-sm underline underline-offset-4 hover:text-primary" target="_blank" rel="noreferrer">
            Live Demo
          </a>
        )}
        <Link to={`/projects/${project.slug}`} className="text-sm underline underline-offset-4 hover:text-primary">
          Details
        </Link>
      </div>
    </article>
  )
}
