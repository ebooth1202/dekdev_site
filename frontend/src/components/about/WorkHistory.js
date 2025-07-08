// src/components/about/WorkHistory.js
import React from 'react';
import TimelineItem from './TimelineItem';
import './WorkHistory.css';

const WorkHistory = () => {
  const workExperience = [
    {
      id: 1,
      title: "Patient Logistics",
      company: "Advocate Health | Atrium Health",
      period: "2025 - Present",
      type: "Healthcare, logistics",
      description: "Leading patient care by ensuring sensible, efficient, timely movement of patients ranging from different cities to different states.",
      achievements: [
        "Initiate and document provider orders, communications & other pertinent data",
        "Utilize clear, concise, closed-loop communication",
        "Reduce transfer delays for emergent patients"
      ]
    },
    {
      id: 2,
      title: "Operations Director | Project Management",
      company: "Advanced Transportation LLC",
      period: "2022 - 2025",
      type: "management, logistics, tech",
      description: "Facilitated the growth of a startup company by developing, testing, and implementing processes with built-in feedback loops",
      achievements: [
        "Improved gross income by > 500%",
        "Successfully designed and implemented an entire TMS overhaul",
        "Created the Company's entire policies and procedures handbook",
      ]
    },
    {
      id: 3,
      title: "Travel ICU Nurse",
      company: "Atrium Healthcare",
      period: "2022 - 2022",
      type: "healthcare",
      description: "Contracted, term-specific RN role to come into a new system and instantly integrate into their needs for critically sick and injured patients.",
      achievements: [
        "Coordinated complex care delivery in Intensive Care Units within a Level 1 Trauma teaching hospital",
        "Led multidisciplinary collaboration for critically ill patients, ensuring seamless communication between departments",
        "Adhered to HIPAA-compliant data handling"
      ]
    },
    {
      id: 4,
      title: "Travel ER Nurse",
      company: "Bon Secours Mercy",
      period: "2021 - 2022",
      type: "healthcare",
      description: "Provided critical and emergent care to patients in a Level 1 Trauma ER. Specialized in trauma care.",
      achievements: [
        "Was selected to train and mentor new-hire and graduate nurses",
        "Managed emergency response coordination in high-pressure, time-sensitive environments",
        "Mentored 10+ new graduate nurses"
      ]
    },
    // {
    //   id: 5,
    //   title: "Staff Nurse - Emergency Department",
    //   company: "City Medical Center",
    //   period: "2016 - 2018",
    //   type: "healthcare",
    //   description: "Delivered emergency medical care in fast-paced environment. Triaged patients and coordinated with multidisciplinary teams.",
    //   achievements: [
    //     "Handled 50+ patients per shift",
    //     "Completed trauma nursing certification",
    //     "Participated in code blue response team"
    //   ]
    // }
  ];

  return (
    <section className="work-history">
      <div className="section-header">
        <h2>Professional Journey</h2>
        <p>From bedside care to building solutions - my unique career path</p>
      </div>

      <div className="timeline">
        {workExperience.map((job, index) => (
          <TimelineItem
            key={job.id}
            job={job}
            isLast={index === workExperience.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default WorkHistory;