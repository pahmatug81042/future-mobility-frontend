import React, { useEffect, useState } from "react";
import { apiClient } from "../../api/apiClient";

function FleetAnalytics() {
  const [fleetData, setFleetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchFleetAnalytics() {
      setLoading(true);
      try {
        const { data } = await apiClient.get("/analytics/fleet-utilization");
        // replace with actual backend endpoint
        setFleetData(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch fleet analytics.");
      } finally {
        setLoading(false);
      }
    }
    fetchFleetAnalytics();
  }, []);

  if (loading) return <p>Loading fleet analytics...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!fleetData.length) return <p>No fleet analytics available.</p>;

  return (
    <div>
      <h3>Fleet Utilization</h3>
      <ul>
        {fleetData.map((fleet) => (
          <li key={fleet._id}>
            {fleet.name}: {fleet.utilization}%
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FleetAnalytics;