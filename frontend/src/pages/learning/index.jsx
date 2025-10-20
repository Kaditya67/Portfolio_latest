import React, { useEffect, useState } from "react";
import api from "../../api/api.js";
import { Section } from "../../components/section.jsx";
import { skills as defaultSkills } from "../../data/skills.js";
import { learning as defaultLearning } from "../../data/learning.js";

// Group skills by category and sort alphabetically
function groupSkills(skillsArr) {
  if (!Array.isArray(skillsArr)) return [];
  const groups = {};
  skillsArr.forEach(skill => {
    const cat = skill.category || "Other";
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(skill);
  });
  
  return Object.entries(groups)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, items]) => ({ 
      category, 
      items: items.sort((a, b) => a.name.localeCompare(b.name))
    }));
}

// Map level/status to badge color
function badgeColor(level) {
  switch ((level || "").toLowerCase()) {
    case "beginner":
    case "exploring":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800";
    case "intermediate":
    case "in progress":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800";
    case "advanced":
    case "building":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700";
  }
}

// Connecting lines component for skills
const SkillsGridWithLines = ({ skills }) => {
  return (
    <div className="relative">
      {/* Horizontal connecting lines */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-200 dark:via-blue-800 to-transparent -translate-y-1/2 hidden lg:block"></div>
      
      {/* Vertical connecting lines */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-blue-200 dark:via-blue-800 to-transparent -translate-x-1/2 hidden lg:block"></div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 relative z-10">
        {skills.map((group, index) => (
          <div
            key={group.category}
            className="rounded-lg border border-border dark:border-gray-700 p-4 bg-card dark:bg-neutral-800 transition hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 relative"
          >
            {/* Category connector dots */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 rounded-full opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 rounded-full opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 rounded-full opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-lg">{group.category}</h3>
              <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                {group.items.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item, itemIndex) => (
                <div
                  key={item._id || item.name}
                  className="flex flex-col items-start px-3 py-2 rounded-md border border-border dark:border-gray-700 bg-white/50 dark:bg-neutral-700/50 hover:bg-white dark:hover:bg-neutral-700 transition-colors group relative"
                >
                  {/* Skill connector lines */}
                  <div className="absolute -right-2 top-1/2 w-2 h-0.5 bg-blue-300 dark:bg-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="text-sm font-semibold">{item.name}</span>
                  <span
                    className={`mt-1 text-xs px-2 py-1 rounded-full ${badgeColor(item.level || item.status)}`}
                  >
                    {item.level || item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Learning timeline with connecting lines
const LearningTimeline = ({ learning }) => {
  return (
    <div className="relative">
      {/* Main timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform -translate-x-1/2"></div>
      
      <div className="space-y-6">
        {learning.map((item, index) => (
          <div
            key={item._id || item.topic}
            className="relative flex items-center gap-4 group"
          >
            {/* Timeline dot with connecting line */}
            <div className="absolute left-6 w-4 h-4 rounded-full border-2 border-white bg-blue-500 transform -translate-x-1/2 z-10 shadow-lg"></div>
            
            {/* Optional: Add small connecting lines between dots */}
            {index < learning.length - 1 && (
              <div className="absolute left-6 top-4 w-0.5 h-8 bg-gradient-to-b from-blue-500 to-purple-500 transform -translate-x-1/2 -translate-y-1/2"></div>
            )}
            
            {/* Content card */}
            <div className="ml-12 flex-1 bg-card dark:bg-neutral-800 rounded-lg border border-border dark:border-gray-700 p-4 transition-all duration-300 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <span className="text-foreground dark:text-white font-medium">{item.name || item.topic}</span>
                  {item.description && (
                    <p className="text-xs text-muted-foreground dark:text-gray-400 mt-1">
                      {item.description}
                    </p>
                  )}
                </div>
                <span className={`text-xs font-medium rounded-full px-3 py-1 ml-2 flex-shrink-0 ${badgeColor(item.status || item.level)}`}>
                  {item.status || item.level}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function LearningPage() {
  const [skills, setSkills] = useState(() => groupSkills(defaultSkills));
  const [learning, setLearning] = useState(() => 
    [...defaultLearning].sort((a, b) => (a.name || a.topic).localeCompare(b.name || b.topic))
  );

  useEffect(() => {
    let active = true;

    async function fetchAll() {
      try {
        const skillsResult = await api.getSkills();
        if (active && skillsResult?.items && skillsResult.items.length > 0) {
          setSkills(groupSkills(skillsResult.items));
        } else {
          setSkills(groupSkills(defaultSkills));
        }
      } catch {
        setSkills(groupSkills(defaultSkills));
      }

      try {
        const learnResult = await api.getLearning();
        if (active && learnResult?.items && learnResult.items.length > 0) {
          const sortedLearning = [...learnResult.items].sort((a, b) => 
            (a.name || a.topic).localeCompare(b.name || b.topic)
          );
          setLearning(sortedLearning);
        } else {
          setLearning([...defaultLearning].sort((a, b) => 
            (a.name || a.topic).localeCompare(b.name || b.topic)
          ));
        }
      } catch {
        setLearning([...defaultLearning].sort((a, b) => 
          (a.name || a.topic).localeCompare(b.name || b.topic)
        ));
      }
    }

    fetchAll();
    return () => { active = false; };
  }, []);

  return (
    <main className="bg-background dark:bg-neutral-900 min-h-screen text-foreground dark:text-white transition-colors duration-300">
      {/* Skills Section */}
      <Section title="What I Know" subtitle="Skills and tools I use regularly.">
        <SkillsGridWithLines skills={skills} />
      </Section>

      {/* Learning Section */}
      <Section title="What I'm Learning" subtitle="Topics I'm exploring and improving.">
        <LearningTimeline learning={learning} />
      </Section>

      <style jsx>{`
        @keyframes drawLine {
          from {
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-draw {
          animation: drawLine 2s ease-in-out forwards;
        }
      `}</style>
    </main>
  );
}