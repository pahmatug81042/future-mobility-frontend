import React from "react";
import { apiClient } from "../../api/apiClient";
import TransportCard from "./TransportCard";

function TransportItem({ transport, refreshTransports }) {
  // Handle transport deletion
  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this transport?"))
      return;

    try {
      if (!transport._id) throw new Error("Invalid transport ID");
      await apiClient.delete(`/transports/${transport._id}`);
      refreshTransports?.(); // Refresh list after deletion
    } catch (err) {
      console.error("Failed to delete transport:", err);
      alert(err?.response?.data?.message || "Failed to delete transport.");
    }
  }

  return (
    <div className="transport-item-card" style={{ marginBottom: "1rem" }}>
      {/* Display transport info via reusable card component */}
      <TransportCard transport={transport} />

      {/* Optional assigned fleet info */}
      {transport.fleetName && (
        <p>
          <strong>Assigned Fleet:</strong> {transport.fleetName}
        </p>
      )}

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

export default TransportItem;