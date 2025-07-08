// src/components/projects/ProjectFilter.js
import React from 'react';
import './ProjectFilter.css';

const ProjectFilter = ({ selectedFilter, onFilterChange }) => {
  const filters = [
    { key: 'all', label: 'All Projects', icon: '📋' },
    { key: 'healthcare', label: 'Healthcare', icon: '🏥' },
    { key: 'web-development', label: 'Web Development', icon: '💻' },
    { key: 'management', label: 'Project Management', icon: '🔄' },
    { key: 'ai-ml', label: 'AI & Machine Learning', icon: '🤖' },
    { key: 'iot', label: 'IoT & Devices', icon: '📡' }
  ];

  return (
    <div className="project-filter">
      <h3>Filter by Category</h3>
      <div className="filter-buttons">
        {filters.map((filter) => (
          <button
            key={filter.key}
            className={`filter-btn ${selectedFilter === filter.key ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.key)}
          >
            <span className="filter-icon">{filter.icon}</span>
            <span className="filter-label">{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectFilter;