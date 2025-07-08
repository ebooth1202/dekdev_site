// src/components/home/FeaturedProjects.js
import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturedProjects.css';

const FeaturedProjects = () => {
  const featuredProjects = [
    {
      id: 1,
      title: "Healthcare Patient Management System",
      description: "HIPAA-compliant web application serving 1000+ users with real-time appointment scheduling and EMR integration.",
      technologies: ["React", "Python", "FastAPI", "PostgreSQL"],
      status: "completed",
      image: "/api/placeholder/300/200",
      highlights: ["1000+ Active Users", "HIPAA Compliant", "Real-time Scheduling"]
    },
    {
      id: 2,
      title: "Agile Project Management Dashboard",
      description: "Scrum-based project management tool with sprint planning, burndown charts, and team collaboration features.",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      status: "completed",
      image: "/api/placeholder/300/200",
      highlights: ["Real-time Collaboration", "Sprint Analytics", "Custom Workflows"]
    },
    {
      id: 3,
      title: "AI-Powered Diagnosis Assistant",
      description: "Machine learning application to assist healthcare professionals with preliminary diagnosis suggestions.",
      technologies: ["Python", "TensorFlow", "React", "FastAPI"],
      status: "in-progress",
      image: "/api/placeholder/300/200",
      highlights: ["ML Models", "Clinical Decision Support", "FDA Compliant"]
    }
  ];

  const getStatusColor = (status) => {
    return status === 'completed' ? '#10b981' : '#f59e0b';
  };

  const getStatusText = (status) => {
    return status === 'completed' ? 'Completed' : 'In Progress';
  };

  return (
    <section className="featured-projects">
      <div className="featured-projects-container">
        <div className="section-header">
          <h2>Featured Projects</h2>
          <p>Innovative solutions combining healthcare expertise with modern technology</p>
        </div>

        <div className="projects-grid">
          {featuredProjects.map((project) => (
            <div key={project.id} className="featured-project-card">
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
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="project-highlights">
                  {project.highlights.map((highlight, index) => (
                    <span key={index} className="highlight-badge">
                      ✓ {highlight}
                    </span>
                  ))}
                </div>

                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects-cta">
          <Link to="/projects" className="btn btn-primary">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;