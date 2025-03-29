import React, { useState, useEffect, useRef } from "react";
import { queries } from "../queries";
import QuerySelector from "./QuerySelector";
import QueryEditor from "./QueryEditor";
import DataTable from "./DataTable";
import DataVisualization from "./DataVisualization";
import Header from "../sections/Header";
import Footer from "../sections/Footer";
import "./Home.css";

const Home = () => {
  const [selectedQueryIndex, setSelectedQueryIndex] = useState(0);
  const [query, setQuery] = useState(queries[0].query);
  const [data, setData] = useState(queries[0].data);
  const [chartType, setChartType] = useState("bar");

  // Create a ref for the visualization section
  const visualizationRef = useRef(null);

  useEffect(() => {
    setQuery(queries[selectedQueryIndex].query);
    setData(queries[selectedQueryIndex].data);
  }, [selectedQueryIndex]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleRunQuery = () => {
    const result = queries.find((q) => q.query === query)?.data || [];
    setData(result);
    console.log("Query:", query); 
    console.log("Query Result:", result); 
  };

  // Function to scroll to visualization section
  const scrollToVisualization = () => {
    visualizationRef.current?.scrollIntoView({ 
      behavior: 'smooth'
    });
  };

  return (
    <div className="home-wrapper">
      <Header 
        query={query} 
        data={data} 
        onVisualizeClick={scrollToVisualization} 
      />
      <div className="main-content">
        <div className="container">
          <h2>Select SQL Query</h2>
          <QuerySelector queries={queries} onSelect={setSelectedQueryIndex} />
          <h3>SQL Query</h3>
          <QueryEditor query={query} onChange={handleQueryChange} onRun={handleRunQuery} />
        </div>

        <div className="results-container">
          <h3>Results</h3>
          <DataTable data={data} />
        </div>

        <div className="visualization-container" ref={visualizationRef}>
          <h3>Data Visualization</h3>
          <div className="chart-controls">
            <select onChange={(e) => setChartType(e.target.value)} value={chartType}>
              <option value="bar">Bar Chart</option>
              <option value="line">Line Chart</option>
              <option value="pie">Pie Chart</option>
              <option value="scatter">Scatter Plot</option>
            </select>
          </div>
          <DataVisualization data={data} chartType={chartType} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;