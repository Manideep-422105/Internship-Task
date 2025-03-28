import React from "react";
import "./QuerySelector.css";

const QuerySelector = ({ queries, onSelect }) => {
  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      {queries.map((q, index) => (
        <option key={q.id} value={index}>{q.query}</option>
      ))}
    </select>
  );
};

export default QuerySelector;
