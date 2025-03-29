import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./DataTable.css";

const DataTable = ({ data }) => {
  const [columns, setColumns] = useState([]);
  const [filter, setFilter] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    if (data && data.length > 0) {
      setColumns(Object.keys(data[0]));
    }
  }, [data]);

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newColumns = [...columns];
    const [movedColumn] = newColumns.splice(result.source.index, 1);
    newColumns.splice(result.destination.index, 0, movedColumn);

    setColumns(newColumns);
  };

  const handleSort = (column) => {
    let direction = "asc";
    if (sortConfig.key === column && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: column, direction });

    data.sort((a, b) => {
      if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
      if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const handleFilterChange = (column, value) => {
    setFilter({ ...filter, [column]: value.toLowerCase() });
  };

  const filteredData = data.filter((row) =>
    columns.every((col) =>
      filter[col] ? String(row[col]).toLowerCase().includes(filter[col]) : true
    )
  );

  const downloadCSV = () => {
    const csvRows = [];
    csvRows.push(columns.join(","));
    filteredData.forEach(row => {
      csvRows.push(columns.map(col => row[col]).join(","));
    });
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="table-container">
      <button onClick={downloadCSV} className="download-btn">Download CSV</button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <table>
          <thead>
            <Droppable droppableId="columns" direction="horizontal">
              {(provided) => (
                <tr ref={provided.innerRef} {...provided.droppableProps}>
                  {columns.map((col, index) => (
                    <Draggable key={col} draggableId={col} index={index}>
                      {(provided) => (
                        <th
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => handleSort(col)}
                          className={sortConfig.key === col ? `sorted ${sortConfig.direction}` : ""}
                        >
                          {col} {sortConfig.key === col ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                        </th>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tr>
              )}
            </Droppable>
            <tr>
              {columns.map((col) => (
                <th key={col}>
                  <input
                    type="text"
                    placeholder={`Filter ${col}`}
                    onChange={(e) => handleFilterChange(col, e.target.value)}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </DragDropContext>
    </div>
  );
};

export default DataTable;
