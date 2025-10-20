import { useState, useEffect } from "react";
import { api } from "../../api/client";
import { FiUser, FiEdit2, FiX, FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiGlobe, FiTwitter, FiInstagram } from "react-icons/fi";
import ProfileForm from "../forms/ProfileForm";

function getSocialIcon(key) {
  switch (key) {
    case "github": return FiGithub;
    case "linkedin": return FiLinkedin;
    case "twitter": return FiTwitter;
    case "website": return FiGlobe;
    case "instagram": return FiInstagram;
    default: return null;
  }
}

export default function ProfileTab() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getProfile();
      setProfile(data.item || null);
    } catch (err) {
      setError(err.message || "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (newData) => {
    setError(null);
    try {
      await api.updateProfile(newData);
      setEditing(false);
      await fetchProfile();
    } catch (err) {
      setError(err.message || "Failed to update.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32 text-gray-600 dark:text-gray-300">
        <FiUser className="animate-spin text-2xl mr-2" />
        Loading profile...
      </div>
    );
  }

  if (!profile || editing) {
    return (
      <div className="w-full max-w-xl mx-auto">
        <div className="text-2xl font-bold flex items-center gap-2 mb-6">
          <FiUser className="text-cyan-500" />
          Profile
        </div>
        {error && (
          <div className="p-3 bg-red-100 text-red-700 border border-red-200 rounded-md mb-4 flex justify-between items-center">
            <span>{error}</span>
            <button className="px-2" onClick={() => setError(null)}>&times;</button>
          </div>
        )}
        <ProfileForm
          initialData={profile}
          onSave={handleSave}
          onCancel={() => setEditing(false)}
        />
      </div>
    );
  }

  const { name, headline, bio, avatarUrl, location, email, phone, socials = {} } = profile;

  return (
    <div className="w-full max-w-xl mx-auto text-gray-900 dark:text-gray-100">
      <div className="flex items-center gap-5 mb-5">
        <div>
          {avatarUrl ? (
            <img src={avatarUrl} className="w-20 h-20 rounded-full object-cover border" alt={name} />
          ) : (
            <div className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center text-white text-3xl font-bold">
              {name ? name[0].toUpperCase() : <FiUser />}
            </div>
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{name}</h2>
          {headline && <div className="text-sm text-cyan-700 dark:text-cyan-300">{headline}</div>}
          {location && <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-300 mt-1">
            <FiMapPin /> {location}
          </div>}
        </div>
        <button
          onClick={() => setEditing(true)}
          className="flex gap-1 items-center px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded transition ml-4"
        >
          <FiEdit2 /> Edit
        </button>
      </div>
      {bio && <div className="mb-3 whitespace-pre-line text-gray-700 dark:text-gray-100">{bio}</div>}
      <div className="flex flex-wrap gap-3 text-sm mb-4">
        {email && (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200">
            <FiMail /> {email}
          </span>
        )}
        {phone && (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200">
            <FiPhone /> {phone}
          </span>
        )}
      </div>
      {/* Social Links */}
      {Object.keys(socials).filter(key => socials[key]).length > 0 && (
        <div className="flex flex-wrap gap-3 my-2">
          {Object.entries(socials).map(([key, url]) => {
            if (!url) return null;
            const Icon = getSocialIcon(key);
            return (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-gray-100 dark:bg-neutral-800 hover:bg-cyan-100 dark:hover:bg-cyan-900 text-cyan-700 dark:text-cyan-200 transition"
              >
                {Icon && <Icon className="text-base" />}
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}