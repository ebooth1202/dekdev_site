// src/components/about/PersonalInfo.js
import React from 'react';
import './PersonalInfo.css';

const PersonalInfo = () => {
  return (
    <section className="personal-info">
      <div className="personal-content">
        <div className="personal-text">
          <h2>My Story</h2>
          <p>
            I'm Ethan, a unique professional who bridges the worlds of healthcare, transportation & logistics, and technology.
            My journey began as a Paramedic and afterwards became a Registered Nurse, then eventually leading a startup trucking
            company into a large, successful, multi-faceted logistics and transportation business.
          </p>
          <p>
            With each twist and turn, the one constant that never wavers is the dire need for meaningful communication. I have
            been blessed, fortunate, and grateful for the vast exposure to so many individuals, companies, teams, vendors and
            more that has molded my capacity to communicate across the spectrum of customers and teammates alike!
          </p>
          <p>
            Today, I specialize in full-stack development with an emphasis in Python and React, while working within hospital
            patient logistics. My current focus and passion is within AI but more specifically Agentic systems, building
            programs to seamlessly integrate AI into existing workflows. My greatest desire is to increase AI literacy and
            help others leverage AI to increase and enhance their own efficiency!
          </p>
        </div>

        <div className="personal-stats">
          <div className="stat-card">
            <h3>Transportation & Logistics</h3>
            <div className="stat-details">
              <p><strong>2+ Years</strong> in Business Development</p>
              <p><strong>Systems</strong> Analyst & Design</p>
              <p><strong>Agile Leadership</strong> as Scrum Master</p>
            </div>
          </div>

          <div className="stat-card">
            <h3>Technology Journey</h3>
            <div className="stat-details">
              <p><strong>3+ Years</strong> in Software Development</p>
              <p><strong>Full-Stack</strong> Python & React</p>
              <p><strong>Agile Leadership</strong> as Scrum Master</p>
            </div>
          </div>

          <div className="stat-card">
            <h3>Healthcare Experience</h3>
            <div className="stat-details">
              <p><strong>10+ Years</strong> as a Medic + RN</p>
              <p><strong>Life Flight</strong> Helicopter</p>
              <p><strong>ICU & Emergency</strong> Departments</p>
              </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PersonalInfo;