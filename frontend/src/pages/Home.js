// src/pages/Home.js
import React, { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import SkillsOverview from '../components/home/SkillsOverview';
import FeaturedProjects from '../components/home/FeaturedProjects';
import Analytics from '../services/Analytics';
import './Home.css';

const Home = () => {
  useEffect(() => {
    Analytics.trackPageView('/');
  }, []);

  return (
    <div className="home">
      <HeroSection />
      <SkillsOverview />
      {/*<FeaturedProjects />*/}
    </div>
  );
};

export default Home;