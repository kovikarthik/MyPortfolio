import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavBar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = Array.from(document.querySelectorAll('section[id]'));
      const triggerPoint = window.scrollY + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.offsetTop <= triggerPoint) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { id: 'home', label: 'HOME', code: '00' },
    { id: 'about', label: 'ABOUT', code: '01' },
    { id: 'experience', label: 'EXPERIENCE', code: '02' },
    { id: 'skills', label: 'SKILLS', code: '03' },
    { id: 'projects', label: 'WORK', code: '04' },
    { id: 'contact', label: 'CONTACT', code: '05' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0B0F19]/80 backdrop-blur-xl border-b border-indigo-500/20 py-4 shadow-lg shadow-indigo-500/5'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
          className="group flex items-center space-x-2 text-left"
        >
          <span className="font-black text-3xl tracking-wider bg-gradient-to-r from-white via-indigo-300 to-cyan-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
            KK
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative py-2 group text-[12px] font-semibold tracking-[0.2em] uppercase font-montserrat transition-colors"
              >
                <span className={isActive ? 'text-cyan-400' : 'text-gray-300 group-hover:text-white'}>
                  <span className="text-indigo-400/60 mr-1 font-mono">{item.code}.</span>
                  {item.label}
                </span>

                {/* Electric Indigo-Cyan Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 to-cyan-400 shadow-[0_0_10px_rgba(99,102,241,0.8)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2.5 rounded-full border border-indigo-500/30 bg-[#111827]/60 text-cyan-400 hover:border-cyan-400 transition-all shadow-md"
          aria-label="Toggle Navigation"
        >
          <i className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'} text-2xl text-cyan-400`} />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0B0F19]/95 backdrop-blur-2xl border-b border-indigo-500/20 px-6 py-6"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMenuOpen(false);
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`flex items-center justify-between text-left py-2.5 font-montserrat text-sm tracking-[0.2em] border-b border-white/5 ${
                    activeSection === item.id ? 'text-cyan-400 font-semibold' : 'text-gray-300'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-indigo-400/60 font-mono">{item.code}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
