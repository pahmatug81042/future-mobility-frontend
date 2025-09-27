/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react";
import { apiClient } from "../api/apiClient";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // On mount, check session
  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await apiClient.get("/auth/me");
        setUser(data.user);
      } catch {
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  async function login(credentials) {
    const { data } = await apiClient.post("/auth/login", credentials);
    setUser(data.user);
  }

  async function register(payload) {
    const { data } = await apiClient.post("/auth/register", payload);
    setUser(data.user);
  }

  async function logout() {
    await apiClient.post("/auth/logout");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}