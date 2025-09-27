import React from "react";
import LogisticsList from "../components/LogisticsDashboard/LogisticsList";

function LogisticsPage() {
  return (
    <div>
      <h2>Logistics Management</h2>
      <p>Track movements, deliveries, and supply chain efficiency.</p>
      <LogisticsList />
    </div>
  );
}

export default LogisticsPage;