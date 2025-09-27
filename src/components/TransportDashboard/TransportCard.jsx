import React from "react";

function TransportCard({ transport }) {
  return (
    <div className="card">
      <h3>{transport.name}</h3>
      <p>
        <strong>Mode:</strong> {transport.mode}
      </p>
      <p>
        <strong>Capacity:</strong> {transport.capacity}
      </p>
      <p>
        <strong>Status:</strong> {transport.status}
      </p>
      <p>
        <strong>Sustainability Score:</strong> {transport.sustainabilityScore}
        /100
      </p>
    </div>
  );
}

export default TransportCard;