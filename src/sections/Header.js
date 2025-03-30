import React, { useState, useEffect } from "react";
import {
  FaDatabase,
  FaSun,
  FaMoon,
  FaEnvelope,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Email from "../components/Email";
import "./Header.css";

const Header = ({ query, data, onVisualizeClick }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [showEmailForm, setShowEmailForm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-left">
        <FaDatabase className="logo" />
        <h1 className="project-name">SQL Visualizer</h1>
      </div>

      <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <nav className={`header-right ${mobileMenuOpen ? "mobile-open" : ""}`}>
        <Link to="/" className="nav-link" onClick={handleLinkClick}>
          Home
        </Link>

        <button
          onClick={() => {
            onVisualizeClick();
            handleLinkClick();
          }}
          className="nav-link"
        >
          Visualize
        </button>

        <button
          className="email-btn"
          onClick={() => {
            setShowEmailForm(true);
            handleLinkClick();
          }}
        >
          <FaEnvelope className="icon" />
          <span className="email-text">Email</span>
        </button>

        <button
          className="toggle-btn"
          onClick={() => {
            setDarkMode(!darkMode);
            handleLinkClick();
          }}
        >
          {darkMode ? <FaSun className="icon" /> : <FaMoon className="icon" />}
        </button>
      </nav>

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
