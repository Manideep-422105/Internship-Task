import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./DataTable.css";

const DataTable = ({ data }) => {
  // Ensure columns state is always initialized to avoid conditional hook calls
  const [columns, setColumns] = useState(data && data.length > 0 ? Object.keys(data[0]) : []);

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  // Handle Drag-and-Drop
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newColumns = [...columns];
    const [movedColumn] = newColumns.splice(result.source.index, 1);
    newColumns.splice(result.destination.index, 0, movedColumn);

    setColumns(newColumns);
  };

  return (
    <div className="table-container">
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
                        >
                          {col}
                        </th>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tr>
              )}
            </Droppable>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
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
