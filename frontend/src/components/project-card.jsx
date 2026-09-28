import React from "react"
import { Link } from "react-router-dom"

export function ProjectCard({ project }) {
  const img = project.imageUrl || project.image;
  const tags = project.technologies || project.tech || project.tags || [];
  const repo = project.repoUrl || project.repo;
  const demo = project.demoUrl || project.demo;

  return (
    <article className="rounded-lg border border-border bg-card dark:bg-neutral-800 p-4 md:p-5 hover:shadow-sm transition">
      {img && (
        <div className="mb-4 overflow-hidden rounded-md">
          <img
            src={img || "/placeholder.svg"}
            alt={`${project.title} screenshot`}
            className="h-44 w-full object-cover"
          />
        </div>
      )}
      <h3 className="text-lg font-medium">{project.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground dark:text-gray-300">{project.description}</p>
      {project.highlights?.length > 0 && (
        <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground dark:text-gray-300">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}
      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {tags.map((t) => (
            <span key={t} className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground dark:text-gray-300">
              {t}
            </span>
          ))}
        </div>
      )}
      <div className="mt-4 flex items-center gap-3">
        {repo && (
          <a href={repo} className="text-sm underline underline-offset-4 hover:text-primary" target="_blank" rel="noreferrer">
            GitHub
          </a>
        )}
        {demo && (
          <a href={demo} className="text-sm underline underline-offset-4 hover:text-primary" target="_blank" rel="noreferrer">
            Live Demo
          </a>
        )}
        {project.slug && (
          <Link to={`/projects/${project.slug}`} className="text-sm underline underline-offset-4 hover:text-primary">
            Details
          </Link>
        )}
      </div>
    </article>
  )
}
