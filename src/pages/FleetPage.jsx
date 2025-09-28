import React from "react";
import FleetForm from "../components/FleetDashboard/FleetForm";
import FleetList from "../components/FleetDashboard/FleetList";

function FleetPage() {
  return (
    <div>
      <h2>Fleet Management</h2>
      <p>Manage your fleets — view existing fleets or add new ones.</p>
      <FleetForm />
      <FleetList />
    </div>
  );
}

export default FleetPage;