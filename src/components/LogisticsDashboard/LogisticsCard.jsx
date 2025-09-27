import React from "react";

function LogisticsCard({ logistics }) {
  return (
    <div className="card">
      <h3>{logistics.route}</h3>
      <p>
        <strong>Origin:</strong> {logistics.origin}
      </p>
      <p>
        <strong>Destination:</strong> {logistics.destination}
      </p>
      <p>
        <strong>Status:</strong> {logistics.status}
      </p>
      <p>
        <strong>Cost:</strong> ${logistics.cost}
      </p>
      <p>
        <strong>Emissions:</strong> {logistics.emissions} kg CO₂
      </p>
    </div>
  );
}

export default LogisticsCard;