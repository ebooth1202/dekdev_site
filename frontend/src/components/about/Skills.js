// src/components/about/Skills.js
import React from 'react';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
      {
      title: "Atlassian",
      skills: [
        { name: "JIRA Competence", level: 95 },
        { name: "Confluence Workflows", level: 85 },
        { name: "Kanban", level: 90 },
        { name: "Personal/Customization", level: 90 },
        { name: "JIRA+Confluence Integration", level: 85 }
      ]
    },
      {
      title: "Frontend Development",
      skills: [
        { name: "React", level: 80 },
        { name: "JavaScript/ES6+", level: 85 },
        { name: "HTML5/CSS3", level: 90 },
        { name: "TypeScript", level: 75 },
        { name: "Responsive Design", level: 90 }
      ]
    },
    {
      title: "Backend Development",
      skills: [
        { name: "Python", level: 85 },
        { name: "FastAPI", level: 80 },
        { name: "Django", level: 60 },
        { name: "REST APIs", level: 90 },
        { name: "Database Design", level: 80 }
      ]
    },
    {
      title: "Database & Cloud",
      skills: [
        { name: "PostgreSQL", level: 85 },
        { name: "MongoDB", level: 80 },
        { name: "AWS", level: 70 },
        { name: "Docker", level: 85 },
        { name: "Redis", level: 75 }
      ]
    },
    {
      title: "Agile & Leadership",
      skills: [
        { name: "Scrum Master", level: 90 },
        { name: "Project Management", level: 90 },
        { name: "Team Leadership", level: 95 },
        { name: "Stakeholder Communication", level: 90 },
        { name: "Process Improvement", level: 85 }
      ]
    },
    {
      title: "Healthcare Domain",
      skills: [
        { name: "HIPAA Compliance", level: 98 },
        { name: "Clinical Workflows", level: 95 },
        { name: "EMR Integration", level: 85 },
        { name: "Patient Safety Standards", level: 95 },
        { name: "Healthcare Analytics", level: 75 }
      ]
    }
  ];

  return (
    <section className="skills">
      <div className="skills-header">
        <h2>Skills & Expertise</h2>
        <p>Technical capabilities refined through healthcare and technology experience</p>
      </div>

      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-category">
            <h3>{category.title}</h3>
            <div className="skills-list">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-progress"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;