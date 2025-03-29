import React from "react";
import { FaGithub } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">© 2025 A.Manideep Reddy</p>
      <p className="footer-text">Built with 💙 for Data Enthusiasts</p>
      <a
        href="https://github.com/Manideep-422105"
        target="_blank"
        rel="noopener noreferrer"
        className="github-link"
      >
        <FaGithub size={24} />
      </a>
    </footer>
  );
};

export default Footer;
