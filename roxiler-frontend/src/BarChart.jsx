import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box } from "@mui/material";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.range),
    datasets: [
      {
        label: "Number of Items",
        data: data.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#333",
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Price Range Distribution",
        color: "#333",
        font: {
          size: 18,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#333",
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: "#e0e0e0",
        },
        ticks: {
          color: "#333",
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Bar data={chartData} options={options} />
    </Box>
  );
};

export default BarChart;
