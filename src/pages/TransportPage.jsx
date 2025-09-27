import React from "react";
import TransportList from "../components/TransportDashboard/TransportList";

function TransportPage() {
  return (
    <div>
      <h2>Transport Management</h2>
      <p>
        View all available transport options with details and sustainability
        metrics.
      </p>
      <TransportList />
    </div>
  );
}

export default TransportPage;