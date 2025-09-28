import React, { useEffect, useState } from "react";
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

function UtilizationChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchUtilization() {
      try {
        const { data } = await apiClient.get("/analytics/utilization");
        setChartData({
          labels: data.map((item) => item.type),
          datasets: [
            {
              label: "Fleet Utilization (%)",
              data: data.map((item) => item.averageUtilization),
              backgroundColor: "rgba(0, 123, 255, 0.6)",
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching utilization data:", err);
      }
    }
    fetchUtilization();
  }, []);

  if (!chartData) return <p>Loading utilization chart...</p>;

  return (
    <div className="card">
      <h3>Fleet Utilization by Transport Type</h3>
      <Bar data={chartData} />
    </div>
  );
}

export default UtilizationChart;