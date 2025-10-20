import { createContext, useState, useEffect, useCallback } from "react";
import { apiCall } from "../api/client"; 

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
          credentials: "include", // send cookies automatically
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null); // invalid or expired cookie
        }
      } catch (err) {
        console.error("[AuthContext] Auth check failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Login user
  const login = useCallback(async (email, password) => {
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // receive HTTP-only cookie
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Login failed");
      }

      const data = await res.json();
      setUser(data.user);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, []);

  // Logout user
  const logout = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) console.warn("[AuthContext] Logout failed");
    } catch (err) {
      console.error("[AuthContext] Logout error:", err);
    } finally {
      setUser(null);
    }
  }, []);

  // Optional helper to make authenticated API calls
  const authApiCall = useCallback(
    (endpoint, options = {}) => {
      return apiCall(endpoint, { ...options, credentials: "include" });
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        authApiCall, // use this for admin API requests
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
