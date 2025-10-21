const API_BASE_URL = "https://aditya-portfolio-aji7.onrender.com/api/v1" || import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
   console.log("[apiCall] Request to:", url); // <--- log request
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: options.credentials || "same-origin",
  });
  // console.log("[apiCall] Response status:", response.status); // <--- log status

  const result = await response.json().catch(() => ({}));
    // console.log("[apiCall] Data:", result); // <--- log raw data
  if (!response.ok) {
    throw new Error(result.message || `API error: ${response.status}`);
    // console.error("[apiCall] Error caught:", err);
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
