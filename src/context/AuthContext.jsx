/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react";
import { apiClient } from "../api/apiClient";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Load persisted user from localStorage
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(true);

  // Sync localStorage whenever user changes
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // Validate session on mount
  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await apiClient.get("/auth/me"); // cookies sent automatically
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  // Login
  async function login(credentials) {
    const { data } = await apiClient.post("/auth/login", credentials);
    setUser(data.user);
  }

  // Register
  async function register(payload) {
    const { data } = await apiClient.post("/auth/register", payload);
    setUser(data.user);
  }

  // Logout
  async function logout() {
    await apiClient.post("/auth/logout");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}[]