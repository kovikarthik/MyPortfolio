import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.2,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 25, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const rotatingTitles = [
  'SDE @ Amazon',
  'Full Stack Developer',
  'Mobile & Cloud Architect',
  'AI Automations Engineer',
];

export default function HeroSection() {
  const [titleIdx, setTitleIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIdx((prev) => (prev + 1) % rotatingTitles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen text-white font-sans overflow-hidden flex items-center pt-24 pb-16 px-6 sm:px-12 lg:px-20 selection:bg-indigo-500 selection:text-white"
    >
      {/* Ambient Lighting & Glowing Orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-[36rem] h-[36rem] bg-indigo-600/20 rounded-full blur-[170px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-sky-500/15 rounded-full blur-[180px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-center items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center max-w-5xl"
        >
          {/* Eyebrow Header */}
          <motion.div variants={fadeUpVariants} className="flex items-center space-x-3 mb-6">
            <span className="text-[11px] font-semibold tracking-[0.35em] uppercase text-indigo-400 font-montserrat">
              00 / INTRO
            </span>
            <div className="w-16 h-[1px] bg-gradient-to-r from-indigo-500 via-sky-400 to-transparent" />
          </motion.div>

          {/* Dynamic Rotating Title Badge */}
          <motion.div variants={fadeUpVariants} className="mb-6 h-10 flex items-center justify-center">
            <span className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500/15 via-sky-500/10 to-emerald-500/10 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-montserrat font-bold tracking-[0.2em] uppercase backdrop-blur-xl shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              {rotatingTitles[titleIdx]}
            </span>
          </motion.div>

          {/* Cinematic Main Title */}
          <motion.h1
            variants={fadeUpVariants}
            className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tight uppercase leading-[0.88] mb-8 select-none"
          >
            <span className="bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent block">
              KARTHIK
            </span>
            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent block mt-2 drop-shadow-[0_0_35px_rgba(99,102,241,0.3)]">
              KOVI
            </span>
          </motion.h1>

          {/* Description Paragraph */}
          <motion.p
            variants={fadeUpVariants}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed font-light max-w-3xl mb-10 font-sans"
          >
            Architecting the future of digital experiences through scalable cloud platforms, responsive mobile apps, and high-concurrency systems serving{' '}
            <span className="text-sky-400 font-medium">30,000+ active users</span>.
          </motion.p>

          {/* Tech Tag Pills */}
          <motion.div variants={fadeUpVariants} className="flex flex-wrap justify-center gap-3 mb-12">
            {['React Native', 'React.js', 'Node.js', 'SpringBoot', 'AWS', 'GraphQL', 'TypeScript', 'GitOps', 'Python'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-1.5 rounded-full bg-white/5 border border-indigo-500/30 text-indigo-200 text-xs font-montserrat tracking-wider hover:border-sky-400 hover:scale-105 hover:bg-sky-400/10 hover:text-sky-300 transition-all duration-300 backdrop-blur-md"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row gap-5 mb-16">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-9 py-4 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 text-white font-montserrat font-bold text-xs tracking-[0.2em] uppercase overflow-hidden hover:scale-105 transition-all duration-300 shadow-xl shadow-indigo-500/30"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-emerald-500 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <span className="relative z-10 flex items-center space-x-2">
                <span>EXPLORE MY WORK</span>
                <i className="bx bx-right-arrow-alt text-lg group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-9 py-4 rounded-full bg-white/5 border border-indigo-500/40 text-white font-montserrat font-semibold text-xs tracking-[0.2em] uppercase backdrop-blur-2xl hover:bg-indigo-500/20 hover:border-sky-300 hover:scale-105 transition-all duration-300 shadow-xl shadow-indigo-500/10"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>LET'S CONNECT</span>
                <i className="bx bx-paper-plane text-lg group-hover:rotate-12 transition-transform text-sky-400" />
              </span>
            </button>
          </motion.div>

          {/* Social Links Bar */}
          <motion.div variants={fadeUpVariants} className="flex items-center space-x-5">
            {[
              { icon: 'bxl-linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/karthikkovi/' },
              { icon: 'bxl-github', label: 'GitHub', href: 'https://github.com/kovikarthik' },
              { icon: 'bx-envelope', label: 'Email', href: 'mailto:karthikkovik@gmail.com' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-sky-400 hover:border-indigo-400 hover:bg-indigo-500/20 hover:scale-110 transition-all duration-300 backdrop-blur-xl"
                title={social.label}
              >
                <i className={`bx ${social.icon} text-xl`} />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
