import React from "react";

function TransportCard({ transport }) {
  // Safe defaults for optional/malformed fields
  const {
    name = "Unnamed Transport",
    type = "unknown",
    capacity = 0,
    status = "inactive",
    sustainabilityScore = 0,
  } = transport || {};

  return (
    <div
      className="card transport-card"
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "0.5rem",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h3>{name}</h3>
      <p>
        <strong>Type:</strong> {type}
      </p>
      <p>
        <strong>Capacity:</strong> {capacity}
      </p>
      <p>
        <strong>Status:</strong> {status}
      </p>
      <p>
        <strong>Sustainability Score:</strong> {sustainabilityScore}/100
      </p>
    </div>
  );
}

export default TransportCard;