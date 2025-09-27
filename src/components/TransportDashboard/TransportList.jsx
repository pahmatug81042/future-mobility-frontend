import React, { useEffect, useState } from "react";
import { apiClient } from "../../api/apiClient";
import TransportCard from "./TransportCard";

function TransportList() {
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransports() {
      try {
        const { data } = await apiClient.get("/transports");
        setTransports(data);
      } catch (error) {
        console.error("Error fetching transports:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTransports();
  }, []);

  if (loading) return <p>Loading transports...</p>;
  if (transports.length === 0) return <p>No transports available.</p>;

  return (
    <div className="flex-column">
      {transports.map((transport) => (
        <TransportCard key={transport._id} transport={transport} />
      ))}
    </div>
  );
}

export default TransportList;