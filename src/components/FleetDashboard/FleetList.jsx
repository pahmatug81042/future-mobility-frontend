import React, { useEffect, useState } from "react";
import { apiClient } from "../../api/apiClient";
import FleetItem from "./FleetItem";
import FleetForm from "./FleetForm";

function FleetList() {
  const [fleets, setFleets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch fleets safely
  async function fetchFleets() {
    setLoading(true);
    setError("");

    try {
      const response = await apiClient.get("/fleets");

      // Ensure array
      let fleetData = Array.isArray(response.data?.data)
        ? response.data.data
        : Array.isArray(response.data)
        ? response.data
        : [];

      // Sanitize each fleet
      fleetData = fleetData.map((fleet) => ({
        _id: fleet?._id || `temp-${Math.random().toString(36).substr(2, 9)}`,
        name: fleet?.name || "Unnamed Fleet",
        ownerType: fleet?.ownerType || "company",
        vehicleType: fleet?.vehicleType || "bus",
        capacity: typeof fleet?.capacity === "number" ? fleet.capacity : 0,
        status: fleet?.status || "active",
        assignedRoutes: Array.isArray(fleet?.assignedRoutes)
          ? fleet.assignedRoutes
          : [],
      }));

      setFleets(fleetData);
    } catch (err) {
      console.error("Error fetching fleets:", err);
      setFleets([]);
      setError("Failed to fetch fleets. Please try again later.");
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
    <div className="fleet-list-container">
      {/* Pass refreshFleets down to FleetForm */}
      <FleetForm refreshFleets={fetchFleets} />

      {fleets.map((fleet) => (
        <FleetItem key={fleet._id} fleet={fleet} refreshFleets={fetchFleets} />
      ))}
    </div>
  );
}

export default FleetList;