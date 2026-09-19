import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../Utils/data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative w-full text-white font-sans py-24 sm:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden selection:bg-indigo-500 selection:text-white"
    >
      {/* Background Glows */}
      <div className="absolute top-1/4 right-1/4 w-[32rem] h-[32rem] bg-indigo-600/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[28rem] h-[28rem] bg-sky-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mb-6"
        >
          <span className="text-[11px] font-semibold tracking-[0.35em] uppercase text-indigo-400 font-montserrat">
            04 / CAREER MILESTONES
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-indigo-500 via-sky-400 to-transparent" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 className="text-5xl sm:text-7xl font-black uppercase tracking-tight text-white">
            PROFESSIONAL <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">EXPERIENCE</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 font-light max-w-2xl mt-2">
            A track record of engineering leadership, scalable product releases, and impactful full-stack execution.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-8"
        >
          {experience.map((exp, idx) => (
            <motion.div
              key={exp.company}
              variants={fadeUpVariants}
              className="relative bg-slate-900/60 border border-indigo-500/25 rounded-3xl p-8 sm:p-12 hover:border-indigo-400 transition-all duration-500 overflow-hidden group shadow-2xl backdrop-blur-2xl"
            >
              {/* Top Accent Flare */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-indigo-500/20 pb-6 mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-xs font-montserrat text-indigo-400 font-semibold tracking-widest uppercase">
                      0{idx + 1} - {exp.location}
                    </span>
                    {exp.current && (
                      <span className="px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-[10px] font-montserrat tracking-widest uppercase font-bold">
                        PRESENT ROLE
                      </span>
                    )}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black text-white tracking-wide">
                    {exp.role} <span className="bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">@ {exp.company}</span>
                  </h3>
                </div>

                <div className="mt-4 lg:mt-0 text-left lg:text-right">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-black/50 border border-indigo-500/30 text-xs font-mono text-indigo-300">
                    {exp.period}
                  </span>
                </div>
              </div>

              {/* Achievements List */}
              <ul className="space-y-3 mb-8 text-sm sm:text-base text-gray-300 font-light">
                {exp.achievements.map((item, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <i className="bx bx-chevron-right text-sky-400 text-xl mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Pills */}
              <div className="pt-4 border-t border-indigo-500/15 flex flex-wrap gap-2">
                {exp.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full bg-black/40 border border-indigo-500/20 text-xs font-montserrat text-indigo-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
