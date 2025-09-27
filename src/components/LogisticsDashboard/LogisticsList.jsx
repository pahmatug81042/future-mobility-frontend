import React, { useEffect, useState } from "react";
import { apiClient } from "../../api/apiClient";
import LogisticsCard from "./LogisticsCard";

function LogisticsList() {
  const [logistics, setLogistics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogistics() {
      try {
        const { data } = await apiClient.get("/logistics");
        setLogistics(data);
      } catch (error) {
        console.error("Error fetching logistics:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLogistics();
  }, []);

  if (loading) return <p>Loading logistics...</p>;
  if (logistics.length === 0) return <p>No logistics records available.</p>;

  return (
    <div className="flex-column">
      {logistics.map((item) => (
        <LogisticsCard key={item._id} logistics={item} />
      ))}
    </div>
  );
}

export default LogisticsList;