import React from "react";
import FleetList from "../components/FleetDashboard/FleetList";

function FleetPage() {
  return (
    <div>
      <h2>Fleet Management</h2>
      <p>
        Track and monitor all registered fleets with utilization and status.
      </p>
      <FleetList />
    </div>
  );
}

export default FleetPage;
