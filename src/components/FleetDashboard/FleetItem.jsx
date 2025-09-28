import React from "react";
import { apiClient } from "../../api/apiClient";
import FleetCard from "./FleetCard";

function FleetItem({ fleet, refreshFleets }) {
  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this fleet?")) return;

    try {
      if (!fleet?._id) throw new Error("Invalid Fleet ID");
      await apiClient.delete(`/fleets/${fleet._id}`);
      refreshFleets?.(); // refresh list after deletion
    } catch (err) {
      console.error("Failed to delete fleet:", err);
      alert(err?.response?.data?.message || "Failed to delete fleet.");
    }
  }

  return (
    <div className="fleet-item-card">
      <FleetCard fleet={fleet} />
      <button
        onClick={handleDelete}
        style={{
          marginTop: "0.5rem",
          padding: "0.4rem 0.8rem",
          backgroundColor: "#ff4d4f",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default FleetItem;