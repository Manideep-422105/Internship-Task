import React, { useState, useEffect } from "react";
import { queries } from "./queries";
import QuerySelector from "./components/QuerySelector";
import QueryEditor from "./components/QueryEditor";
import DataTable from "./components/DataTable";
import DataVisualization from "./components/DataVisualization";
import "./App.css";

const App = () => {
  const [selectedQueryIndex, setSelectedQueryIndex] = useState(0);
  const [query, setQuery] = useState(queries[0].query); // Initialize with the first query
  const [data, setData] = useState(queries[0].data);
  const [chartType, setChartType] = useState("bar"); // Default chart type

  // Update the query when a new selection is made
  useEffect(() => {
    setQuery(queries[selectedQueryIndex].query);
    setData(queries[selectedQueryIndex].data);
  }, [selectedQueryIndex]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleRunQuery = () => {
    // Simulate query execution by fetching data
    const result = queries.find((q) => q.query === query)?.data || [];
    setData(result);
  };

  return (
    <div>
      <div className="container">
        <h2>Dummy SQL Query Viewer</h2>
        <QuerySelector queries={queries} onSelect={setSelectedQueryIndex} />
        <h3>SQL Query</h3>
        <QueryEditor
          query={query}
          onChange={handleQueryChange}
          onRun={handleRunQuery}
        />
      </div>

      <div className="results-container">
        <h3>Results</h3>
        <DataTable data={data} />
      </div>

      <div className="container">
        <h3>Data Visualization</h3>
        <select
          onChange={(e) => setChartType(e.target.value)}
          value={chartType}
        >
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="scatter">Scatter Plot</option>
        </select>
        <DataVisualization data={data} chartType={chartType} />
      </div>
    </div>
  );
};

export default App;
