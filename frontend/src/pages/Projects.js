// src/pages/Projects.js
import React, { useState, useEffect, useMemo } from 'react';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectFilter from '../components/projects/ProjectFilter';
import Analytics from '../services/Analytics';
import './Projects.css';

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    Analytics.trackPageView('/projects');
  }, []);

  const projects = useMemo(() => [
    {
      id: 1,
      title: "Pig",
      description: "A fun, simple game for all to enjoy!",
      technologies: ["HTML", "CSS", "JavaScript"],
      category: "Web Development",
      status: "completed",
      demoUrl: "https://funpigggame.netlify.app/",
      githubUrl: "#",
      imageUrl: "/api/placeholder/400/250",
      highlights: [
        "Great for a little competition",
        "Surprisingly intense",
      ]
    },
    {
      id: 2,
      title: "Guess My Number",
      description: "Another simple game created for fun and to enhance development skills",
      technologies: ["React", "HTML", "JS", "CSS"],
      category: "web-development",
      status: "completed",
      demoUrl: "https://sillygame.netlify.app/",
      githubUrl: "#",
      imageUrl: "/api/placeholder/400/250",
      highlights: [
        "Test your guessing ability",
        "Spirited, fun game to help pass the time",
        "Easy flow and comprehension",
      ]
    },
    {
      id: 3,
      title: "AI Joke Battles",
      description: "Ask for any type of joke(s) and watch Groq, OpenAI, Anthropic & Gemini fight for your vote!",
      technologies: ["React", "Python", "Heroku", "FastAPI", "AI"],
      category: "ai-ml",
      status: "completed",
      demoUrl: "https://your-joke-battles-293fabf45c6e.herokuapp.com/",
      githubUrl: "#",
      imageUrl: "/api/placeholder/400/250",
      highlights: [
        "AI promptng",
        "Real-time LLM extraction",
        "Mobile-responsive design",
        "Instant leaderboard updates"
      ]
    },
    {
      id: 4,
      title: "Cosmetology Website",
      description: "Cosmetology website with many interactive features and a clean, sleek design and flow",
      technologies: ["JS", "HTML", "CSS", "API"],
      category: "web-development",
      status: "in-progress",
      demoUrl: "https://ebooth.dev/",
      githubUrl: "#",
      imageUrl: "/api/placeholder/400/250",
      highlights: [
        "Real-time device monitoring",
        "Predictive maintenance alerts",
        "Historical data analysis",
        "Mobile app companion"
      ]
    },
    {
      id: 5,
      title: "Food Recipe Web App",
      description: "Machine learning application to assist with categorizing, creating and finding recipes!",
      technologies: ["Python", "AI", "React", "FastAPI", "Docker", "MongoDB"],
      category: "ai-ml",
      status: "in-progress",
      demoUrl: "https://www.ondekrecipe.com/",
      githubUrl: "#",
      imageUrl: "/api/placeholder/400/250",
      highlights: [
        "Machine learning model",
        "Recipe decision support",
        "Integration with database"
      ]
    },
    {
      id: 6,
      title: "Portfolio Website",
      description: "This very website! Built with React and Python, featuring an AI chatbot and analytics tracking.",
      technologies: ["React", "Python", "FastAPI", "PostgreSQL", "OpenAI"],
      category: "web-development",
      status: "completed",
      demoUrl: "#",
      githubUrl: "#",
      imageUrl: "/api/placeholder/400/250",
      highlights: [
        "AI-powered chatbot",
        "Analytics tracking",
        "Responsive design",
        "SEO optimized"
      ]
    }
  ], []); // Empty dependency array since this data doesn't change

  useEffect(() => {
    if (selectedFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === selectedFilter));
    }
  }, [selectedFilter, projects]);

  return (
    <div className="projects">
      <div className="projects-container">
        <div className="projects-header">
          <h1>My Projects</h1>
          <p>Explore my journey through code, from healthcare solutions to innovative applications</p>
        </div>

        <ProjectFilter
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="no-projects">
            <p>No projects found for the selected category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;