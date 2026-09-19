import React, { useState, useEffect } from 'react';
import ThreeBackground from './components/ThreeBackground';
import CustomCursor from './components/CustomCursor';
import NavBar from './NavBar/NavBar';
import HeroSection from './HeroSection/HeroSection';
import AboutMe from './AboutMe/AboutMe';
import Experience from './Experience/Experience';
import Skills from './Skills/Skills';
import Projects from './Projects/Projects';
import AwardsAndCertificates from './AwardsAndCertificates/AwardsAndCertificates';
import ContactMe from './ContactMe/ContactMe';
import Footer from './Footer/Footer';

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      {/* 3D Three.js Interactive Wireframe & Particle Canvas */}
      <ThreeBackground />

      {/* Spring Physics Cyan Custom Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <NavBar />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutMe />

      {/* Experience Section */}
      <Experience />

      {/* Skills / Tech Matrix Section */}
      <Skills />

      {/* Projects / Featured Work Section */}
      <Projects />

      {/* Honors & Awards Section */}
      <AwardsAndCertificates />

      {/* Contact Section */}
      <ContactMe />

      {/* Footer */}
      <Footer />

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-indigo-600 to-sky-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30 hover:scale-110 transition-all duration-300 z-40 border border-indigo-500/40 ${
          scrollY > 400 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        title="Back to Top"
      >
        <i className="bx bx-up-arrow-alt text-2xl" />
      </button>
    </div>
  );
}