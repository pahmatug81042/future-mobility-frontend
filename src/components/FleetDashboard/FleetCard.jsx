import React from "react";

function FleetCard({ fleet }) {
  if (!fleet) return null;

  return (
    <div className="card" style={{ marginBottom: "1rem", padding: "1rem" }}>
      <h3>{fleet.name || "Unnamed Fleet"}</h3>
      <p>
        <strong>Owner Type:</strong> {fleet.ownerType || "company"}
      </p>
      <p>
        <strong>Vehicle Type:</strong> {fleet.vehicleType || "bus"}
      </p>
      <p>
        <strong>Status:</strong> {fleet.status || "active"}
      </p>
      <p>
        <strong>Capacity:</strong> {fleet.capacity || 0}
      </p>
      {fleet.assignedRoutes && fleet.assignedRoutes.length > 0 && (
        <p>
          <strong>Assigned Routes:</strong> {fleet.assignedRoutes.length}
        </p>
      )}
    </div>
  );
}

export default FleetCard;