import React from "react";
import FleetAnalytics from "../components/AnalyticsDashboard/FleetAnalytics";
import TransportAnalytics from "../components/AnalyticsDashboard/TransportAnalytics";

function AnalyticsPage() {
  return (
    <div>
      <h2>Analytics Dashboard</h2>
      <p>
        View fleet and transport performance metrics and sustainability
        insights.
      </p>
      <FleetAnalytics />
      <TransportAnalytics />
    </div>
  );
}

export default AnalyticsPage;