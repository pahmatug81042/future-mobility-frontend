import React from "react";
import { apiClient } from "../../api/apiClient";

function FleetItem({ fleet, refreshFleets }) {
  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this fleet?")) return;
    try {
      await apiClient.delete(`/fleets/${fleet._id}`);
      refreshFleets();
    } catch (err) {
      console.error(err);
      alert("Failed to delete fleet.");
    }
  }

  return (
    <div className="card">
      <h3>{fleet.name}</h3>
      <p>
        <strong>Type:</strong> {fleet.type}
      </p>
      <p>
        <strong>Status:</strong> {fleet.status}
      </p>
      <p>
        <strong>Utilization:</strong> {fleet.utilization}%
      </p>
      <button onClick={handleDelete} style={{ marginTop: "0.5rem" }}>
        Delete
      </button>
    </div>
  );
}

export default FleetItem;