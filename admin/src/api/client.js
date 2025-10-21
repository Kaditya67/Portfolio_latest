const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

export async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}), // ✅ attach JWT
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `API error: ${response.status}`);
  }

  return response.json();
}

export const api = {
  // --- Projects ---
  getProjects: () => apiCall("/projects/admin/all"),
  getProject: (slug) => apiCall(`/projects/${encodeURIComponent(slug)}`),
  createProject: (data) =>
    apiCall("/projects", { method: "POST", body: JSON.stringify(data) }),
  updateProject: (slug, data) =>
    apiCall(`/projects/${encodeURIComponent(slug)}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteProject: (slug) =>
    apiCall(`/projects/${encodeURIComponent(slug)}`, { method: "DELETE" }),

  // --- Skills ---
  getSkills: () => apiCall("/skills"),
  createSkill: (data) => apiCall("/skills", { method: "POST", body: JSON.stringify(data) }),
  updateSkill: (id, data) => apiCall(`/skills/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteSkill: (id) => apiCall(`/skills/${id}`, { method: "DELETE" }),

  // --- Learning ---
  getLearning: () => apiCall("/learning"),
  createLearning: (data) => apiCall("/learning", { method: "POST", body: JSON.stringify(data) }),
  updateLearning: (id, data) => apiCall(`/learning/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteLearning: (id) => apiCall(`/learning/${id}`, { method: "DELETE" }),

  // --- Experience ---
  getExperience: () => apiCall("/experience"),
  createExperience: (data) => apiCall("/experience", { method: "POST", body: JSON.stringify(data) }),
  updateExperience: (id, data) => apiCall(`/experience/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteExperience: (id) => apiCall(`/experience/${id}`, { method: "DELETE" }),

  // --- Certificates ---
  getCertificates: () => apiCall("/certificates"),
  createCertificate: (data) => apiCall("/certificates", { method: "POST", body: JSON.stringify(data) }),
  updateCertificate: (id, data) => apiCall(`/certificates/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteCertificate: (id) => apiCall(`/certificates/${id}`, { method: "DELETE" }),

  // --- Media ---
  getMedia: () => apiCall("/media"),
  createMedia: (data) => apiCall("/media", { method: "POST", body: JSON.stringify(data) }),
  updateMedia: (id, data) => apiCall(`/media/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteMedia: (id) => apiCall(`/media/${id}`, { method: "DELETE" }),

  // --- Profile ---
  getProfile: () => apiCall("/profile"),
  updateProfile: (data) => apiCall("/profile", { method: "PUT", body: JSON.stringify(data) }),

  // --- About ---
  getAbout: () => apiCall("/about"),
  updateAbout: (data) => apiCall("/about", { method: "PUT", body: JSON.stringify(data) }),

  // --- Contact ---
  getContacts: () => apiCall("/contact"),
  updateContactStatus: (id, status) =>
    apiCall(`/contact/${id}/status`, { method: "PUT", body: JSON.stringify({ status }) }),
  deleteContact: (id) => apiCall(`/contact/${id}`, { method: "DELETE" }),
  updateContactSave: (id, saved) =>
    apiCall(`/contact/${id}/save`, { method: "PUT", body: JSON.stringify({ saved }) }),
};
