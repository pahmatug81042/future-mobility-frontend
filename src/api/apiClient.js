import axios from "axios";

// Axios instance for backend API calls
export const apiClient = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true, // ✅ Send cookies/auth headers automatically
    headers: {
        "Content-Type": "application/json",
    },
});