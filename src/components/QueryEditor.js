import React from "react";
import "./QueryEditor.css";

const QueryEditor = ({ query, onChange, onRun }) => {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(query)
      .then(() => alert("Query copied to clipboard!"))
      .catch((err) => alert("Failed to copy query: ", err));
  };
  return (
    <div className="query-editor">
      <textarea value={query} onChange={onChange} rows="4" />
      <div className="button-container">
        <button onClick={onRun}>Run Query</button>
        
        <button onClick={handleCopy} className="copy-button">
          Copy
        </button>
      </div>
    </div>
  );
};

export default QueryEditor;
