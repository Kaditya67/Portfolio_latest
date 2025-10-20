import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api.js";
import { Section } from "../components/section.jsx";
import { ProjectCard } from "../components/project-card.jsx";

export default function HomePage() {
  const [projects, setProjects] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const [projRes, profRes] = await Promise.all([
          api.getProjects(),
          api.getProfile(),
        ]);

        if (isMounted) {
          setProjects(projRes?.items || []);
          setProfile(profRes?.item || null);
        }
      } catch (err) {
        console.error("Failed to load homepage API:", err);
        if (isMounted) {
          setProjects([]);
          setProfile(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();
    return () => { isMounted = false; };
  }, []);

  if (loading) {
    // Loading skeleton
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground dark:bg-neutral-900 dark:text-white">
        <div className="text-center">
          <div className="animate-spin border-4 border-t-blue-500 border-gray-200 rounded-full w-16 h-16 mx-auto mb-4"></div>
          <p className="text-lg">Loading homepage...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground dark:bg-neutral-900 dark:text-white">
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-14 md:pt-14 md:pb-20">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          {profile && (
            <Link to="/about" tabIndex={0}>
              <img
                src={profile.avatarUrl || "/profile-portrait.png"}
                alt={profile.name || "Profile"}
                className="h-48 w-48 md:h-60 md:w-60 rounded-full border border-border object-cover cursor-pointer focus:ring-2 focus:ring-accent"
              />
            </Link>
          )}

          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-semibold text-balance">
              Hi, I’m {profile?.name || "Visitor"}
              {profile?.headline ? ` — ${profile.headline}` : ""}
            </h1>

            <p className="mt-3 text-muted-foreground dark:text-gray-300">
              {profile?.bio || "Welcome to my portfolio."}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/projects"
                className="rounded-md border border-border bg-card dark:bg-neutral-800 px-4 py-2 hover:bg-accent dark:hover:bg-gray-700 transition"
              >
                View Projects
              </Link>
              <Link
                to="/resume"
                className="rounded-md border border-border bg-card dark:bg-neutral-800 px-4 py-2 hover:bg-accent dark:hover:bg-gray-700 transition"
              >
                Resume
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <Section title="Featured Projects" subtitle="A selection of side projects and learning builds.">
        {projects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p) => (
              <ProjectCard key={p._id || p.slug} project={p} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No projects to display.
          </p>
        )}

        {projects.length > 0 && (
          <div className="mt-8 text-center">
            <Link to="/projects" className="text-sm underline underline-offset-4 hover:text-primary">
              Browse all projects →
            </Link>
          </div>
        )}
      </Section>
    </main>
  );
}
