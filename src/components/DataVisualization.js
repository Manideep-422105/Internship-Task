import React from "react";
import html2canvas from "html2canvas";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import "./DataVisualization.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DataVisualization = ({ data, chartType }) => {
  if (!data || data.length === 0) return <p>No data to visualize</p>;

  const keys = Object.keys(data[0]);
  const numericKeys = keys.filter((key) => typeof data[0][key] === "number");

  if (numericKeys.length === 0)
    return <p>No numeric data available for visualization</p>;

  const downloadChartAsImage = () => {
    const chartElement = document.querySelector(
      ".data-visualization-container"
    );
    html2canvas(chartElement).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "chart.png";
      link.click();
    });
  };

  return (
    <div className="data-visualization-container">
      <h3 className="data-visualization-heading">
        {chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        {chartType === "bar" && (
          <BarChart data={data}>
            <XAxis dataKey={keys[0]} />
            <YAxis />
            <Tooltip />
            <Legend />
            {numericKeys.map((key, index) => (
              <Bar
                key={index}
                dataKey={key}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </BarChart>
        )}
        {chartType === "line" && (
          <LineChart data={data}>
            <XAxis dataKey={keys[0]} />
            <YAxis />
            <Tooltip />
            <Legend />
            {numericKeys.map((key, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={key}
                stroke={COLORS[index % COLORS.length]}
              />
            ))}
          </LineChart>
        )}
        {chartType === "pie" && (
          <PieChart>
            <Pie
              data={data}
              dataKey={numericKeys[0]}
              nameKey={keys[0]}
              cx="50%"
              cy="50%"
              outerRadius={80}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
        {chartType === "scatter" && (
          <ScatterChart>
            <XAxis dataKey={keys[0]} type="category" />
            <YAxis dataKey={numericKeys[0]} />
            <Tooltip />
            <Legend />
            <Scatter name="Data" data={data} fill={COLORS[0]} />
          </ScatterChart>
        )}
      </ResponsiveContainer>

      <button className="download-btn" onClick={downloadChartAsImage}>
        Download Chart as PNG
      </button>
    </div>
  );
};

export default DataVisualization;
