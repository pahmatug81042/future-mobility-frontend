import React from "react";
import { apiClient } from "../../api/apiClient";

function TransportItem({ transport, refreshTransports }) {
  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this transport?"))
      return;
    try {
      await apiClient.delete(`/transports/${transport._id}`);
      refreshTransports();
    } catch (err) {
      console.error(err);
      alert("Failed to delete transport.");
    }
  }

  return (
    <div className="card">
      <h3>{transport.name}</h3>
      <p>
        <strong>Type:</strong> {transport.type}
      </p>
      <p>
        <strong>Status:</strong> {transport.status}
      </p>
      <p>
        <strong>Capacity:</strong> {transport.capacity}
      </p>
      <p>
        <strong>Assigned Fleet:</strong> {transport.fleetName}
      </p>
      <button onClick={handleDelete} style={{ marginTop: "0.5rem" }}>
        Delete
      </button>
    </div>
  );
}

export default TransportItem;