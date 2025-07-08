// src/components/about/Certifications.js
import React from 'react';
import './Certifications.css';

const Certifications = () => {
  const certifications = [
    {
      title: "Certified Scrum Master (CSM)",
      issuer: "Scrum Alliance",
      date: "2023",
      credentialId: "",
      description: "Demonstrated proficiency in Scrum framework, facilitating agile ceremonies, and leading high-performing teams.",
      type: "agile"
    },
    {
      title: "Registered Nurse (RN)",
      issuer: "State Board of Nursing",
      date: "2021",
      credentialId: "",
      description: "Licensed to practice nursing with specialization in critical care and emergency medicine.",
      type: "healthcare"
    },
    {
      title: "Basic Life Support (BLS)",
      issuer: "American Heart Association",
      date: "2023",
      credentialId: "BLS345678",
      description: "Current certification in cardiopulmonary resuscitation and emergency cardiovascular care.",
      type: "healthcare"
    },
    // {
    //   title: "HIPAA Compliance Training",
    //   issuer: "Healthcare Security Institute",
    //   date: "2023",
    //   credentialId: "HIPAA901234",
    //   description: "Comprehensive training in healthcare data privacy, security regulations, and compliance standards.",
    //   type: "compliance"
    // },
    // {
    //   title: "AWS Cloud Practitioner",
    //   issuer: "Amazon Web Services",
    //   date: "2023",
    //   credentialId: "AWS567890",
    //   description: "Foundational understanding of AWS cloud services, security, and pricing models.",
    //   type: "tech"
    // }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'agile': return '#10b981';
      case 'healthcare': return '#ef4444';
      case 'compliance': return '#f59e0b';
      case 'tech': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'agile': return '🔄';
      case 'healthcare': return '🏥';
      case 'compliance': return '🛡️';
      case 'tech': return '💻';
      default: return '📋';
    }
  };

  return (
    <section className="certifications">
      <div className="certifications-header">
        <h2>Certifications & Licenses</h2>
        <p>Professional credentials spanning healthcare, technology, and project management</p>
      </div>

      <div className="certifications-grid">
        {certifications.map((cert, index) => (
          <div key={index} className="certification-card">
            <div className="cert-header">
              <div
                className="cert-icon"
                style={{ backgroundColor: getTypeColor(cert.type) }}
              >
                {getTypeIcon(cert.type)}
              </div>
              <div className="cert-info">
                <h3>{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <p className="cert-date">Issued: {cert.date}</p>
              </div>
            </div>

            <div className="cert-body">
              <p className="cert-description">{cert.description}</p>
              <div className="cert-credential">
                <span className="credential-label">Credential ID:</span>
                <span className="credential-id">{cert.credentialId}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="certification-note">
        <p><strong>Note:</strong> All healthcare certifications are maintained current and in good standing.
        Technology certifications are actively pursued to stay current with industry standards.</p>
      </div>
    </section>
  );
};

export default Certifications;