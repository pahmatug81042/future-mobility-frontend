import React, { useEffect, useState } from "react";
import { apiClient } from "../../api/apiClient";
import FleetCard from "./FleetCard";

function FleetList() {
  const [fleets, setFleets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFleets() {
      try {
        const { data } = await apiClient.get("/fleets");
        setFleets(data);
      } catch (error) {
        console.error("Error fetching fleets:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFleets();
  }, []);

  if (loading) return <p>Loading fleets...</p>;
  if (fleets.length === 0) return <p>No fleets available.</p>;

  return (
    <div className="flex-column">
      {fleets.map((fleet) => (
        <FleetCard key={fleet._id} fleet={fleet} />
      ))}
    </div>
  );
}

export default FleetList;