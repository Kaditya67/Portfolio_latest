import React, { useState, useEffect } from "react";
import api from "../../api/api.js";
import { Section } from "../../components/section.jsx";
import { FiHeart, FiSmile, FiAward, FiTarget } from "react-icons/fi";

function groupSkillsByCategory(skills) {
  if (!Array.isArray(skills)) return {};
  const groups = {};
  skills.forEach((skill) => {
    const category = skill?.category || "General";
    const name = skill?.name;
    if (!groups[category]) groups[category] = [];
    if (name) groups[category].push(name);
  });
  return groups;
}

const iconMap = {
  Goals: <FiTarget className="inline-block mr-1" />,
  Passions: <FiHeart className="inline-block mr-1 text-pink-500" />,
  Hobbies: <FiSmile className="inline-block mr-1 text-yellow-500" />,
  Likes: <FiAward className="inline-block mr-1 text-purple-500" />,
};

const About = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchAbout() {
      try {
        const result = await api.getAbout();
        if (isMounted && result?.item) {
          setAbout(result.item);
        }
      } catch (err) {
        console.error("Failed to fetch About data:", err);
        if (isMounted) setAbout(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchAbout();
    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground dark:bg-neutral-900 dark:text-white">
        <div className="text-center">
          <div className="animate-spin border-4 border-t-blue-500 border-gray-200 rounded-full w-16 h-16 mx-auto mb-4"></div>
          <p className="text-lg">Loading about section...</p>
        </div>
      </main>
    );
  }

  if (!about) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground dark:bg-neutral-900 dark:text-white">
        <p className="text-gray-500 dark:text-gray-400">No about information available.</p>
      </main>
    );
  }

  const {
    background,
    image,
    goals,
    passions,
    hobbies,
    likes,
    highlights,
    sections = [],
    skills = [],
  } = about;

  const skillGroups = groupSkillsByCategory(skills);

  return (
    <main className="min-h-screen bg-background text-foreground dark:bg-neutral-900 dark:text-white transition-colors duration-300">
      <Section
        title="About Me"
        subtitle="A detailed snapshot of my background, interests, and skills."
      >
        <div className="max-w-4xl bg-white/70 dark:bg-neutral-800/70 p-5 md:p-7 rounded-xl border border-border shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
            <img
              src={image || "/student-coding-desk.jpg"}
              alt="Profile"
              className="rounded-full border-2 border-border w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover shadow-sm flex-shrink-0"
            />
            <div className="flex-1 flex flex-col gap-2 text-center md:text-left">
              {background && (
                <p className="text-sm text-muted-foreground dark:text-gray-300 leading-relaxed">{background}</p>
              )}

              {Array.isArray(highlights) && highlights.length > 0 && (
                <div className="mt-3">
                  <div className="text-[11px] font-semibold uppercase mb-1.5 text-primary tracking-wide">Highlights</div>
                  <ul className="list-disc pl-5 space-y-0.5 text-muted-foreground dark:text-gray-300 text-xs">
                    {highlights.map((item, i) => <li key={item + i}>{item}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-5">
            {[ { label: "Goals", data: goals }, { label: "Passions", data: passions }, { label: "Hobbies", data: hobbies }, { label: "Likes", data: likes } ].map(
              ({ label, data }) => Array.isArray(data) && data.length > 0 && (
                <div key={label}>
                  <div className="text-xs font-semibold uppercase mb-1 text-gray-500 flex items-center">
                    {iconMap[label]} {label}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {data.map((d, i) => (
                      <span key={d + i} className="inline-block px-3 py-1 rounded-full bg-gradient-to-tr from-cyan-100 to-cyan-50 dark:from-cyan-900 dark:to-cyan-800 text-cyan-700 dark:text-cyan-200 text-xs font-medium shadow">{d}</span>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>

          {Object.keys(skillGroups).length > 0 && (
            <div className="space-y-5 mt-8">
              <div className="text-xs font-semibold uppercase mb-2 text-blue-600 tracking-widest">Technical Skills</div>
              <div className="flex flex-wrap gap-5">
                {Object.entries(skillGroups).map(([cat, list]) => (
                  <div key={cat} className="flex flex-col min-w-[7rem] max-w-xs">
                    <span className="font-bold text-xs text-blue-500 uppercase mb-1 tracking-wider">{cat}</span>
                    <div className="flex flex-wrap gap-2">
                      {list.map((skill, i) => (
                        <span key={skill + i} className="inline-block px-3 py-1 rounded bg-cyan-100 dark:bg-cyan-800 text-cyan-700 dark:text-cyan-200 text-xs">{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {sections.length > 0 && (
          <div className="max-w-4xl grid md:grid-cols-2 gap-6 mt-6">
            {sections.map((sec, idx) => (
              <div key={sec.title + idx} className="border border-border rounded-2xl p-5 bg-white/70 dark:bg-neutral-900/60 shadow-md hover:shadow-lg transition-shadow">
                <div className="font-bold text-lg text-cyan-700 dark:text-cyan-200 mb-1">{sec.title}</div>
                {sec.content && <div className="text-sm mb-2 text-gray-700 dark:text-gray-200 whitespace-pre-line">{sec.content}</div>}
                {Array.isArray(sec.highlights) && sec.highlights.length > 0 && (
                  <ul className="list-disc pl-6 space-y-0.5 text-cyan-700 dark:text-cyan-300 mt-1 text-xs">
                    {sec.highlights.map((h, hidx) => <li key={h + hidx}>{h}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </Section>
    </main>
  );
};

export default About;
