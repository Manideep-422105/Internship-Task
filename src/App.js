import './App.css';
import {Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import DataVisualization from "./components/DataVisualization";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visualize" element={<DataVisualization />} />
      </Routes>
    </div>
  )
}

export default App