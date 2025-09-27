import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout, loading } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/analytics">Analytics</Link>
      <Link to="/fleet">Fleets</Link>
      <Link to="/transport">Transports</Link>
      <Link to="/about">About</Link>
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