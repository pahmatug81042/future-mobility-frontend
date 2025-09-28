import React, { useEffect, useState, useCallback } from "react";
import { apiClient } from "../../api/apiClient";
import TransportItem from "./TransportItem";

function TransportList({ refetchTrigger }) {
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch transports safely
  const fetchTransports = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await apiClient.get("/transports");

      // Handle paginated response or array directly
      const transportArray = Array.isArray(response.data?.data)
        ? response.data.data
        : Array.isArray(response.data)
        ? response.data
        : [];

      // Sanitize transport objects
      const sanitized = transportArray.map((t) => ({
        _id: t?._id || `temp-${Math.random().toString(36).substr(2, 9)}`,
        name: t?.name || "Unnamed Transport",
        type: t?.type || "unknown",
        status: t?.status || "inactive",
        capacity: typeof t?.capacity === "number" ? t.capacity : 0,
        sustainabilityScore:
          typeof t?.sustainabilityScore === "number" ? t.sustainabilityScore : 0,
        fleetId: t?.fleetId || null,
      }));

      setTransports(sanitized);
    } catch (err) {
      console.error("Error fetching transports:", err);
      setTransports([]);
      setError("Failed to fetch transports. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch and refetch trigger
  useEffect(() => {
    fetchTransports();
  }, [fetchTransports, refetchTrigger]);

  if (loading) return <p>Loading transports...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (transports.length === 0) return <p>No transports available.</p>;

  return (
    <div className="flex-column">
      {transports.map((transport) => (
        <TransportItem
          key={transport._id}
          transport={transport}
          refreshTransports={fetchTransports}
        />
      ))}
    </div>
  );
}

export default TransportList;