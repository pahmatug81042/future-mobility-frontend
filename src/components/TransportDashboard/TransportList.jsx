import React, { useEffect, useState } from "react";
import { apiClient } from "../../api/apiClient";
import TransportItem from "./TransportItem";

function TransportList() {
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchTransports() {
    setLoading(true);
    try {
      const { data } = await apiClient.get("/transports");
      setTransports(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch transports.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTransports();
  }, []);

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