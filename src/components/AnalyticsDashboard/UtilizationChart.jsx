import React, { useEffect, useState, useCallback } from "react";
import { apiClient } from "../../api/apiClient";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

function UtilizationChart({ refreshSignal }) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUtilization = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await apiClient.get("/analytics/utilization");
      // Ensure data is an array
      const dataArray = Array.isArray(response.data) ? response.data : [];

      // Sanitize data for chart
      const labels = dataArray.map((item) =>
        item?.type ? String(item.type) : "Unknown"
      );
      const dataValues = dataArray.map((item) =>
        typeof item?.averageUtilization === "number"
          ? item.averageUtilization
          : 0
      );

      setChartData({
        labels,
        datasets: [
          {
            label: "Fleet Utilization (%)",
            data: dataValues,
            backgroundColor: "rgba(0, 123, 255, 0.6)",
          },
        ],
      });
    } catch (err) {
      console.error("Error fetching utilization data:", err);
      setError("Failed to load utilization chart.");
      setChartData({
        labels: [],
        datasets: [],
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch chart on mount and when refreshSignal changes
  useEffect(() => {
    fetchUtilization();
  }, [fetchUtilization, refreshSignal]);

  if (loading) return <p>Loading utilization chart...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!chartData || chartData.labels.length === 0)
    return <p>No utilization data available.</p>;

  return (
    <div className="card">
      <h3>Fleet Utilization by Transport Type</h3>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Fleet Utilization" },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              title: { display: true, text: "Utilization (%)" },
            },
            x: {
              title: { display: true, text: "Transport Type" },
            },
          },
        }}
      />
    </div>
  );
}

export default UtilizationChart;