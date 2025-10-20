import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api.js";
import { Section } from "../../components/section.jsx";

const Intro = () => {
  const [intro, setIntro] = useState(null); // start with null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function fetchAbout() {
      try {
        const result = await api.getAbout();
        if (active) {
          if (result?.item?.introduction) {
            setIntro({
              introduction: result.item.introduction,
              mood: result.item.mood || ""
            });
          } else {
            setIntro({
              introduction: "No introduction available.",
              mood: ""
            });
          }
        }
      } catch (err) {
        if (active) {
          setIntro({
            introduction: "Failed to load introduction.",
            mood: ""
          });
        }
      } finally {
        if (active) setLoading(false);
      }
    }
    fetchAbout();
    return () => { active = false; };
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground dark:bg-neutral-900 dark:text-white p-8">
        <div className="text-center">
          <div className="animate-spin border-4 border-t-blue-500 border-gray-200 rounded-full w-12 h-12 mx-auto mb-4"></div>
          <p className="text-lg">Loading introduction...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground dark:bg-neutral-900 dark:text-white p-8 transition-colors duration-300">
      <Section
        title="Introduction"
        subtitle="Who I am, my goals, and what drives me."
      >
        <div className="prose prose-neutral dark:prose-invert max-w-none leading-relaxed">
          <p>{intro.introduction}</p>
          {intro.mood && (
            <div className="mt-4">
              <span className="inline-block rounded-full px-4 py-1 text-xs bg-neutral-200 dark:bg-neutral-800 text-foreground dark:text-white font-semibold">
                Mood: {intro.mood}
              </span>
            </div>
          )}
          <div className="mt-6">
            <Link
              to="/about"
              className="
                inline-block px-4 py-2 rounded-lg border border-border
                bg-card dark:bg-neutral-900 text-foreground dark:text-white
                font-medium text-sm transition hover:bg-neutral-200 dark:hover:bg-neutral-800
              "
            >
              Learn more about me
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Intro;
