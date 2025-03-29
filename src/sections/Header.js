import React, { useState, useEffect } from "react";
import { FaDatabase, FaSun, FaMoon, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import Email from "../components/Email";
import "./Header.css";

const Header = ({ query, data, onVisualizeClick }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [showEmailForm, setShowEmailForm] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="header">
      {/* Left Side: Project Name + SQL Logo */}
      <div className="header-left">
        <FaDatabase className="logo" />
        <h1 className="project-name">SQL Visualizer</h1>
      </div>

      {/* Right Side: Navigation Links */}
      <nav className="header-right">
        <Link to="/" className="nav-link">
          Home
        </Link>

        {/* Changed from Link to button styled as a link */}
        <button 
          onClick={onVisualizeClick} 
          className="nav-link"
        >
          Visualize
        </button>

        {/* Send Email Button */}
        <button className="email-btn" onClick={() => setShowEmailForm(true)}>
          <FaEnvelope className="icon" />
        </button>

        {/* Dark Mode Toggle */}
        <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FaSun className="icon" /> : <FaMoon className="icon" />}
        </button>
      </nav>

      {/* Email Form Modal */}
      {showEmailForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowEmailForm(false)}>
              &times;
            </span>
            <Email query={query} queryResult={data} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;