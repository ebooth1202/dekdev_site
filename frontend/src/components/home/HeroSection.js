// src/components/home/HeroSection.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">Ethan</span>
            </h1>
            <h2 className="hero-subtitle">
              Software Developer | Scrum Master | Healthcare Professional
            </h2>
            <p className="hero-description">
              Passionate about creating innovative solutions that bridge technology
              and the Customer. From developing applications to leading teams,
              I bring a unique perspective combining technical expertise, transportation & logistics, along
              with healthcare insights and more!
            </p>
            <div className="hero-buttons">
              <Link to="/projects" className="btn btn-primary">
                View My Work
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="photo-container">
              <img
                src="/professional-photo.jpg"
                alt="Derek - Professional Photo"
                className="professional-photo"
                onError={(e) => {
                  console.log('Image failed to load:', e.target.src);
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div class="image-placeholder"><span>Photo Loading...</span></div>';
                }}
              />
            </div>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">10+</span>
            <span className="stat-label">Years in Healthcare</span>
          </div>
          <div className="stat">
            <span className="stat-number">3+</span>
            <span className="stat-label">Years in Tech</span>
          </div>
          <div className="stat">
            <span className="stat-number">10+</span>
            <span className="stat-label">Projects Completed</span>
          </div>
          <div className="stat">
            <span className="stat-number">CSM</span>
            <span className="stat-label">Certified Scrum Master</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;