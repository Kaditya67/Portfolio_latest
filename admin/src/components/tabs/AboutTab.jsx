import { useState, useEffect } from "react";
import { api } from "../../api/client";
import { FiUser, FiEdit2, FiX } from "react-icons/fi";
import AboutForm from "../forms/AboutForm";

// Updated FieldGroup for skills objects
function FieldGroup({ title, items, color }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="mb-2">
      <div className={`text-xs font-semibold uppercase mb-1 ${color || 'text-gray-500'}`}>{title}</div>
      <div className="flex flex-wrap gap-2">
        {items.map((v, idx) => {
          if (typeof v === "object" && v !== null && v.name) {
            return (
              <span key={v.name + v.category + idx}
                className="inline-block px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-800 text-cyan-700 dark:text-cyan-200 text-xs"
              >
                {v.name}
                {v.category && (
                  <span className="ml-1 text-cyan-500 dark:text-cyan-300 text-xxs font-semibold">({v.category})</span>
                )}
              </span>
            );
          }
          // fallback for string data
          return (
            <span
              key={v + idx}
              className="inline-block px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-800 text-cyan-700 dark:text-cyan-200 text-xs"
            >
              {v}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function SectionCard({ section }) {
  return (
    <div className="border border-gray-200 dark:border-neutral-700 rounded-xl p-4 bg-white dark:bg-neutral-900 shadow-sm mb-4">
      <div className="font-bold text-lg mb-1">{section.title}</div>
      {section.content && (
        <div className="text-sm mb-1 text-gray-700 dark:text-gray-200 whitespace-pre-line">{section.content}</div>
      )}
      {Array.isArray(section.highlights) && section.highlights.length > 0 && (
        <ul className="list-disc pl-6 space-y-0.5 text-sm text-cyan-700 dark:text-cyan-200 mt-1">
          {section.highlights.map((h, idx) => <li key={h + idx}>{h}</li>)}
        </ul>
      )}
    </div>
  );
}

export default function AboutTab() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAbout();
    // eslint-disable-next-line
  }, []);

  const fetchAbout = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getAbout();
      setAbout(data.item || null);
    } catch (err) {
      setError(err.message || "Failed to load about data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (newData) => {
    setError(null);
    try {
      await api.updateAbout(newData);
      setEditing(false);
      await fetchAbout();
    } catch (err) {
      setError(err.message || "Failed to update.");
    }
  };

  // LOADING/EDIT/ERROR STATES
  if (loading) {
    return (
      <div className="flex items-center justify-center h-32 text-gray-600 dark:text-gray-300">
        <FiUser className="animate-spin text-2xl mr-2" />
        Loading about info...
      </div>
    );
  }

  if (!about || editing) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-2xl font-bold flex items-center gap-2 mb-6">
          <FiUser className="text-cyan-500" />
          About
        </div>
        {error && (
          <div className="p-3 bg-red-100 text-red-700 border border-red-200 rounded-md mb-4 flex justify-between items-center">
            <span>{error}</span>
            <button className="px-2" onClick={() => setError(null)}>&times;</button>
          </div>
        )}
        <AboutForm
          initialData={about}
          onSave={handleSave}
          onCancel={() => setEditing(false)}
        />
      </div>
    );
  }

  // Pull out fields from loaded `about`
  const {
    introduction, image, background, passions, goals, skills, hobbies, likes, mood, sections = []
  } = about;

  return (
    <div className="w-full max-w-2xl mx-auto text-gray-900 dark:text-gray-100">
      <div className="flex items-start md:items-center gap-4 mb-4">
        {image &&
        <img src={image} alt="about" className="w-20 h-20 rounded-lg object-cover border" />
        }
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-0 flex items-center">
            About
            <button
              onClick={() => setEditing(true)}
              className="ml-3 flex gap-1 items-center px-2 py-1 text-xs font-semibold bg-cyan-600 hover:bg-cyan-700 text-white rounded transition duration-150"
            >
              <FiEdit2 className="text-sm" />
              Edit
            </button>
          </h2>
          {mood && (
            <span className="ml-2 rounded px-2 py-0.5 text-xs bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-200 font-semibold">
              Mood: {mood}
            </span>
          )}
        </div>
      </div>
      {introduction && (
        <div className="mb-3 text-lg whitespace-pre-line font-medium text-cyan-800 dark:text-cyan-200">{introduction}</div>
      )}
      {/* Stacked field groups */}
      <FieldGroup title="Skills" items={skills} color="text-blue-500" />
      <FieldGroup title="Goals" items={goals} color="text-green-500" />
      <FieldGroup title="Passions" items={passions} color="text-red-500" />
      <FieldGroup title="Hobbies" items={hobbies} color="text-yellow-600" />
      <FieldGroup title="Likes" items={likes} color="text-purple-600" />
      {background && (
        <div className="mb-3 mt-3">
          <div className="text-xs font-semibold uppercase mb-1 text-gray-500">Background</div>
          <div className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-line">{background}</div>
        </div>
      )}
      {sections && sections.length > 0 && (
        <div className="mt-5">
          {sections.map(sec =>
            <SectionCard key={sec.title + sec._id} section={sec} />
          )}
        </div>
      )}
    </div>
  );
}
