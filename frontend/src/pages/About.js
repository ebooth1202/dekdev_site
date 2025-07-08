// src/pages/About.js
import React, { useEffect } from 'react';
import PersonalInfo from '../components/about/PersonalInfo';
import WorkHistory from '../components/about/WorkHistory';
import Skills from '../components/about/Skills';
import Certifications from '../components/about/Certifications';
import Analytics from '../services/Analytics';
import './About.css';

const About = () => {
  useEffect(() => {
    Analytics.trackPageView('/about');
  }, []);

  return (
    <div className="about">
      <div className="about-container">
        <div className="about-header">
          <h1>About Me</h1>
          <p className="about-intro">
            Discover my journey from healthcare to transportation & logistics, combining compassion
            with innovation to create meaningful solutions.
          </p>
        </div>

        <PersonalInfo />
        <WorkHistory />
        <Skills />
        <Certifications />
      </div>
    </div>
  );
};

export default About;