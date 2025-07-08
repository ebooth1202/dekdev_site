// src/components/about/TimelineItem.js
import React, { useState } from 'react';
import './TimelineItem.css';

const TimelineItem = ({ job, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'tech':
        return '💻';
      case 'management':
        return '📋';
      case 'healthcare':
        return '🏥';
      default:
        return '🔗';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'tech':
        return '#3b82f6';
      case 'management':
        return '#10b981';
      case 'healthcare':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="timeline-item">
      <div className="timeline-marker">
        <div
          className="timeline-icon"
          style={{ backgroundColor: getTypeColor(job.type) }}
        >
          {getTypeIcon(job.type)}
        </div>
        {!isLast && <div className="timeline-line"></div>}
      </div>

      <div className="timeline-content">
        <div className="timeline-header">
          <h3 className="job-title">{job.title}</h3>
          <span className="job-period">{job.period}</span>
        </div>

        <div className="job-company">{job.company}</div>

        <p className="job-description">{job.description}</p>

        <button
          className="toggle-details"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Hide Details' : 'Show Achievements'}
        </button>

        {isExpanded && (
          <div className="job-achievements">
            <h4>Key Achievements:</h4>
            <ul>
              {job.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;