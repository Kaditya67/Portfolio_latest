import React, { useEffect, useState } from "react";
import api from "../../api/api.js";
import { Section } from "../../components/section.jsx";
import { experiences as defaultExperiences } from "../../data/experience.js";

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState(defaultExperiences);

  // Calculate total career experience (years + months)
  const calculateTotalExperience = (exps) => {
    let totalMonths = 0;
    exps.forEach(exp => {
      const start = new Date(exp.start);
      const end = exp.current ? new Date() : new Date(exp.end);
      if (!isNaN(start) && !isNaN(end)) {
        totalMonths += (end.getFullYear() - start.getFullYear()) * 12 +
                       (end.getMonth() - start.getMonth());
      }
    });
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    return `${years > 0 ? years + " yr" : ""}${years > 0 && months > 0 ? " " : ""}${months > 0 ? months + " mo" : ""}` || "0 mo";
  };

  // Calculate duration for each experience
  const calculateDuration = (start, end, current) => {
    const startDate = new Date(start);
    const endDate = current ? new Date() : new Date(end);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return "";

    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                   (endDate.getMonth() - startDate.getMonth());

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years === 0) return `${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`;
    if (remainingMonths === 0) return `${years} year${years !== 1 ? "s" : ""}`;
    return `${years} year${years !== 1 ? "s" : ""} ${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`;
  };

  useEffect(() => {
    let active = true;
    async function fetchExperiences() {
      try {
        const result = await api.getExperiences();
        if (active && result?.items && result.items.length > 0) {
          setExperiences(result.items.map(e => ({
            role: e.title,
            org: e.company,
            location: e.location || "",
            start: e.startDate ? e.startDate.slice(0, 10) : "",
            end: e.current ? "Present" : (
              e.endDate && new Date(e.endDate).getFullYear() > 1970 ? e.endDate.slice(0, 10) : ""
            ),
            current: e.current || false,
            bullets: e.highlights?.length
              ? e.highlights
              : e.description
                ? e.description.split(". ").map(s => s.trim()).filter(Boolean)
                : []
          })));
        } else {
          setExperiences(defaultExperiences);
        }
      } catch (err) {
        console.error("Experience API error, using defaults:", err);
        setExperiences(defaultExperiences);
      }
    }
    fetchExperiences();
    return () => { active = false; };
  }, []);

  return (
    <main className="bg-background dark:bg-neutral-900 min-h-screen text-foreground dark:text-white">
      <Section 
        title="Professional Experience" 
        subtitle="My journey through internships, roles, and career growth."
      >
        {/* Timeline Layout */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500/30 to-purple-500/30 dark:from-blue-400/30 dark:to-purple-400/30"></div>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={`${exp.role}-${exp.org}-${exp.start}-${exp.end}`} className="relative">
                
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1 w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-400 border-4 border-background dark:border-neutral-900 z-10"></div>
                
                {/* Experience Card */}
                <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? 'md:mr-1/2 md:pr-8' : 'md:ml-1/2 md:pl-8'}`}>
                  <div className="bg-card dark:bg-neutral-800 rounded-xl border border-border dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 group">
                    
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {exp.role}
                        </h3>
                        <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mt-1">{exp.org}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            {exp.start} — {exp.end}
                          </span>
                          {exp.location && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                              {exp.location}
                            </span>
                          )}
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            {calculateDuration(exp.start, exp.end, exp.current)}
                          </span>
                        </div>
                      </div>

                      {/* Current Role Badge */}
                      {exp.current && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                          Current Role
                        </span>
                      )}
                    </div>

                    {/* Responsibilities */}
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide text-muted-foreground dark:text-gray-400">
                        Key Responsibilities & Achievements
                      </h4>
                      <ul className="space-y-2">
                        {exp.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start text-sm text-muted-foreground dark:text-gray-300">
                            <span className="mr-2">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career Stats Summary */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-card dark:bg-neutral-800 rounded-xl border border-border dark:border-gray-700">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {experiences.length}+
            </div>
            <div className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
              Professional Roles
            </div>
          </div>
          <div className="text-center p-6 bg-card dark:bg-neutral-800 rounded-xl border border-border dark:border-gray-700">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {experiences.filter(e => e.current).length}
            </div>
            <div className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
              Current Positions
            </div>
          </div>
          <div className="text-center p-6 bg-card dark:bg-neutral-800 rounded-xl border border-border dark:border-gray-700">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {new Set(experiences.map(e => e.org)).size}
            </div>
            <div className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
              Companies
            </div>
          </div>
          <div className="text-center p-6 bg-card dark:bg-neutral-800 rounded-xl border border-border dark:border-gray-700">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {calculateTotalExperience(experiences)}
            </div>
            <div className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
              Total Experience
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
