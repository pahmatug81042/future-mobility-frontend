import React, { useEffect, useState } from "react";
import { apiClient } from "../../api/apiClient";

function TransportAnalytics() {
  const [transportData, setTransportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTransportAnalytics() {
      setLoading(true);
      try {
        const { data } = await apiClient.get("/analytics/transport-summary");
        // replace with actual backend endpoint
        setTransportData(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch transport analytics.");
      } finally {
        setLoading(false);
      }
    }
    fetchTransportAnalytics();
  }, []);

  if (loading) return <p>Loading transport analytics...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!transportData.length) return <p>No transport analytics available.</p>;

  return (
    <div>
      <h3>Transport Summary</h3>
      <ul>
        {transportData.map((transport) => (
          <li key={transport._id}>
            {transport.name}: {transport.status}, Capacity: {transport.capacity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransportAnalytics;