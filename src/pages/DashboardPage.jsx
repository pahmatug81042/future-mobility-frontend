import React from "react";
import AnalyticsOverview from "../components/AnalyticsDashboard/AnalyticsOverview";
import UtilizationChart from "../components/AnalyticsDashboard/UtilizationChart";

function DashboardPage() {
  return (
    <div>
      <h2>Welcome to Future Mobility Dashboard</h2>
      <p>Monitor Fleets, Transports, Logistics, and Analytics in real-time.</p>

      {/* Display live summary metrics */}
      <AnalyticsOverview />

      {/* Display fleet utilization chart */}
      <UtilizationChart />
    </div>
  );
}

export default DashboardPage;