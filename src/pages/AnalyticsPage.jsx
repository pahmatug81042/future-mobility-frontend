import React from "react";
import AnalyticsOverview from "../components/AnalyticsDashboard/AnalyticsOverview";
import UtilizationChart from "../components/AnalyticsDashboard/UtilizationChart";

function AnalyticsPage() {
  return (
    <div>
      <h2>Analytics Dashboard</h2>
      <p>
        Gain insights into fleet utilization, sustainability, and performance.
      </p>
      <AnalyticsOverview />
      <UtilizationChart />
    </div>
  );
}

export default AnalyticsPage;