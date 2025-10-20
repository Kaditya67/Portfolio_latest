import { useState, useEffect } from "react";
import { FiEdit2, FiPlus, FiX, FiGithub, FiTwitter, FiLinkedin, FiInstagram, FiGlobe } from "react-icons/fi";

export default function ProfileForm({ initialData, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    headline: "",
    bio: "",
    avatarUrl: "",
    location: "",
    email: "",
    phone: "",
    socials: {
      github: "",
      linkedin: "",
      twitter: "",
      website: "",
      instagram: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        headline: initialData.headline || "",
        bio: initialData.bio || "",
        avatarUrl: initialData.avatarUrl || "",
        location: initialData.location || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        socials: {
          ...(initialData.socials || {}),
        },
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      socials: { ...prev.socials, [name]: value }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        required
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800 rounded-lg"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="headline"
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800 rounded-lg"
        placeholder="Headline (e.g., Fullstack Developer)"
        value={form.headline}
        onChange={handleChange}
      />
      <input
        name="avatarUrl"
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800 rounded-lg"
        placeholder="Avatar URL"
        value={form.avatarUrl}
        onChange={handleChange}
      />
      <input
        name="location"
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800 rounded-lg"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
      />
      <input
        name="email"
        type="email"
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800 rounded-lg"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="phone"
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800 rounded-lg"
        placeholder="Phone (optional)"
        value={form.phone}
        onChange={handleChange}
      />
      <textarea
        name="bio"
        rows={3}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800 rounded-lg"
        placeholder="Bio (optional)"
        value={form.bio}
        onChange={handleChange}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <input
          name="github"
          placeholder="GitHub URL"
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800 rounded-lg"
          value={form.socials.github || ""}
          onChange={handleSocialChange}
          icon={<FiGithub />}
        />
        <input
          name="linkedin"
          placeholder="LinkedIn URL"
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800 rounded-lg"
          value={form.socials.linkedin || ""}
          onChange={handleSocialChange}
          icon={<FiLinkedin />}
        />
        <input
          name="twitter"
          placeholder="Twitter URL"
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800 rounded-lg"
          value={form.socials.twitter || ""}
          onChange={handleSocialChange}
          icon={<FiTwitter />}
        />
        <input
          name="website"
          placeholder="Personal Website"
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800 rounded-lg"
          value={form.socials.website || ""}
          onChange={handleSocialChange}
          icon={<FiGlobe />}
        />
        <input
          name="instagram"
          placeholder="Instagram URL"
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800 rounded-lg"
          value={form.socials.instagram || ""}
          onChange={handleSocialChange}
          icon={<FiInstagram />}
        />
      </div>
      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium text-sm transition"
        >
          <FiEdit2 /> Save
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 font-medium text-sm transition"
          >
            <FiX /> Cancel
          </button>
        )}
      </div>
    </form>
  );
}
