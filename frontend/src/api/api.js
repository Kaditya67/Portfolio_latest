const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: options.credentials || "same-origin",
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.message || `API error: ${response.status}`);
  }
  return result;
}


export const api = {
  // Public GET endpoints
  getProjects: () => apiCall("/projects"),
  getProject: (slug) => apiCall(`/projects/${slug}`),
  getSkills: () => apiCall("/skills"),
  getLearning: () => apiCall("/learning"),
  getCertificates: () => apiCall("/certificates"),
  getMedia: () => apiCall("/media"),
  getProfile: () => apiCall("/profile"),
  getAbout: () => apiCall("/about"),
  getExperiences: () => apiCall("/experience"),

  // Public POST endpoint: contact form submission (no auth needed)
  postContact: (data) => apiCall("/contact", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  // You can add additional safe GETs if present in backend.
};

export default api;
