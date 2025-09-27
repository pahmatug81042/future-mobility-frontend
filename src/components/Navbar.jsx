import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
  const { user, logout, loading } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/analytics">Analytics</Link>
      <Link to="/fleet">Fleets</Link>
      <Link to="/transport">Transports</Link>
      <Link to="/about">About</Link>

      <button onClick={toggleTheme} style={{ marginLeft: "auto" }}>
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>

      {loading ? (
        <span style={{ marginLeft: "1rem", color: "#fff" }}>
          Checking session...
        </span>
      ) : user ? (
        <>
          <span style={{ marginLeft: "1rem" }}>Welcome, {user.name}</span>
          <button onClick={logout} style={{ marginLeft: "1rem" }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginLeft: "1rem" }}>
            Login
          </Link>
          <Link to="/register" style={{ marginLeft: "1rem" }}>
            Register
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;