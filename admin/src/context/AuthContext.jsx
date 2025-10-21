  import { createContext, useState, useEffect, useCallback } from "react";
  import { apiCall } from "../api/client";

  export const AuthContext = createContext();

  export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE_URL =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

    // 🧠 Check auth on mount using stored token
    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        try {
          const res = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (res.ok) {
            const data = await res.json();
            setUser(data.user);
          } else {
            localStorage.removeItem("token");
            setUser(null);
          }
        } catch (err) {
          console.error("[AuthContext] Auth check failed:", err);
          localStorage.removeItem("token");
          setUser(null);
        } finally {
          setLoading(false);
        }
      };

      checkAuth();
    }, []);

    // 🔑 Login user (store token)
    const login = useCallback(async (email, password) => {
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Invalid credentials");

        // ✅ Save token and user
        localStorage.setItem("token", data.token);
        setUser(data.user);
        return true;
      } catch (err) {
        console.error("[AuthContext] Login failed:", err);
        setError(err.message);
        return false;
      }
    }, []);

    // 🚪 Logout user (clear token)
    const logout = useCallback(() => {
      localStorage.removeItem("token");
      setUser(null);
    }, []);

    // 🧩 Authenticated API helper
    const authApiCall = useCallback(async (endpoint, options = {}) => {
      const token = localStorage.getItem("token");
      const headers = {
        ...(options.headers || {}),
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      };

      return apiCall(endpoint, { ...options, headers });
    }, []);

    return (
      <AuthContext.Provider
        value={{ user, loading, error, login, logout, authApiCall }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
