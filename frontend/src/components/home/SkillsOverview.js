// src/components/home/SkillsOverview.js
import React from 'react';
import { Link } from 'react-router-dom';
import './SkillsOverview.css';

const SkillsOverview = () => {
  const skillAreas = [
    {
      icon: '💻',
      title: 'Full-Stack Development',
      description: 'Building modern web applications with React, Python, and cloud technologies',
      technologies: ['React', 'Python', 'FastAPI', 'PostgreSQL']
    },
    {
      icon: '🏥',
      title: 'Healthcare Technology',
      description: 'Specialized in HIPAA-compliant solutions and clinical workflow optimization',
      technologies: ['EMR Integration', 'HIPAA Compliance', 'Patient Safety', 'Clinical Data']
    },
    {
      icon: '🔄',
      title: 'Agile Leadership',
      description: 'Certified Scrum Master with experience leading high-performing development teams',
      technologies: ['Scrum Master', 'Project Management', 'Team Leadership', 'Process Improvement']
    },
    {
      icon: '☁️',
      title: 'Cloud & DevOps',
      description: 'Deploying scalable applications with modern cloud infrastructure and automation',
      technologies: ['AWS', 'Docker', 'CI/CD', 'Infrastructure as Code']
    }
  ];

  return (
    <section className="skills-overview">
      <div className="skills-overview-container">
        <div className="section-header">
          <h2>Core Competencies</h2>
          <p>Bridging healthcare expertise with modern technology solutions</p>
        </div>

        <div className="skills-grid">
          {skillAreas.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-icon">{skill.icon}</div>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
              <div className="skill-technologies">
                {skill.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="skills-cta">
          <Link to="/about" className="btn btn-secondary">
            View Full Skills & Experience
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SkillsOverview;