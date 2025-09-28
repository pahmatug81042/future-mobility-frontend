import React, { useEffect, useState } from "react";
import { apiClient } from "../../api/apiClient";

function AnalyticsOverview() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSummary() {
      try {
        const { data } = await apiClient.get("/analytics/summary");
        setSummary(data);
      } catch (err) {
        console.error("Error fetching analytics summary:", err);
        setError("Failed to fetch analytics summary.");
      }
    }
    fetchSummary();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!summary) return <p>Loading analytics summary...</p>;

  return (
    <div className="card flex">
      <div>
        <h3>Total Fleets</h3>
        <p>{summary.totalFleets}</p>
      </div>
      <div>
        <h3>Total Transports</h3>
        <p>{summary.totalTransports}</p>
      </div>
      <div>
        <h3>Avg Sustainability Score</h3>
        <p>{summary.avgSustainabilityScore}/100</p>
      </div>
    </div>
  );
}

export default AnalyticsOverview;