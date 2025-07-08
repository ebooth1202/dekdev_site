// src/components/projects/ProjectCard.js
import React, { useState } from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#10b981';
      case 'in-progress':
        return '#f59e0b';
      case 'planned':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'planned':
        return 'Planned';
      default:
        return 'Unknown';
    }
  };

  const handleLinkClick = (url, type) => {
    // Track project interaction
    console.log(`User clicked ${type} for project: ${project.title}`);
    if (url && url !== '#') {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="project-card">
      <div className="project-image">
        <div className="project-placeholder">
          <span>Project Screenshot</span>
        </div>
        <div
          className="project-status"
          style={{ backgroundColor: getStatusColor(project.status) }}
        >
          {getStatusText(project.status)}
        </div>
      </div>

      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

        <div className="project-technologies">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        <button
          className="expand-button"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show Less' : 'Show Details'}
        </button>

        {isExpanded && (
          <div className="project-details">
            <h4>Key Highlights:</h4>
            <ul className="project-highlights">
              {project.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="project-actions">
          <button
            className="action-button primary"
            onClick={() => handleLinkClick(project.demoUrl, 'demo')}
            disabled={project.demoUrl === '#'}
          >
            <span>🔗</span>
            Live Demo
          </button>
          <button
            className="action-button secondary"
            onClick={() => handleLinkClick(project.githubUrl, 'github')}
            disabled={project.githubUrl === '#'}
          >
            <span>📂</span>
            View Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;