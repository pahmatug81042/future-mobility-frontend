import React from "react";

function FleetCard({ fleet }) {
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
    </div>
  );
}

export default FleetCard;