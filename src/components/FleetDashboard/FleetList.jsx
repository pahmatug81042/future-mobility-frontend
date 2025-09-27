import React, { useEffect, useState } from "react";
import { apiClient } from "../../api/apiClient";
import FleetItem from "./FleetItem";

function FleetList() {
  const [fleets, setFleets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchFleets() {
    setLoading(true);
    try {
      const { data } = await apiClient.get("/fleets");
      setFleets(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch fleets.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFleets();
  }, []);

  if (loading) return <p>Loading fleets...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (fleets.length === 0) return <p>No fleets available.</p>;

  return (
    <div className="flex-column">
      {fleets.map((fleet) => (
        <FleetItem key={fleet._id} fleet={fleet} refreshFleets={fetchFleets} />
      ))}
    </div>
  );
}

export default FleetList;