/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react";
import { apiClient } from "../api/apiClient";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(true);

  // Sync user with localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // Validate session on mount
  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await apiClient.get("/auth/me");
        setUser(data.user);
      } catch (err) {
        // 401 or other errors
        setUser(null);
        console.error(err)
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
    try {
      await apiClient.post("/auth/logout");
    } catch (err) {
      console.error(err);
    }
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}