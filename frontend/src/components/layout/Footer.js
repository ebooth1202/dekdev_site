// src/components/layout/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>DekDev</h3>
            <p>Building innovative solutions that bridge technology and healthcare.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/projects">Projects</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="https://linkedin.com/in/derek-dev" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">💼</a>
              <a href="https://github.com/derek-dev" aria-label="GitHub" target="_blank" rel="noopener noreferrer">📂</a>
              <a href="mailto:derek@dekdev.com" aria-label="Email">✉️</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Derek - DekDev. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;