import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../Utils/data';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', 'MOBILE APP', 'WEB APP', 'E-COMMERCE', 'AI/AUTOMATION'];

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => {
    if (activeCategory === 'ALL') return true;
    return p.categories.some((cat) => cat.toUpperCase().includes(activeCategory));
  });

  return (
    <section
      id="projects"
      className="relative w-full text-white font-sans py-24 sm:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden selection:bg-indigo-500 selection:text-white"
    >
      {/* Glow Backdrops */}
      <div className="absolute top-1/4 left-1/4 w-[36rem] h-[36rem] bg-indigo-600/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-sky-500/10 rounded-full blur-[170px] pointer-events-none" />

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
            02 / FEATURED WORK
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
            ARCHITECTING <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">SCALABLE SOLUTIONS</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 font-light max-w-2xl mt-2">
            Production-grade mobile applications, e-commerce platforms, and SaaS products engineered for high performance.
          </p>
        </motion.div>

        {/* ScrollStack Deck for Featured Work */}
        <div className="mb-24">
          <ScrollStack itemDistance={40} itemScale={0.03} baseScale={0.9} stackPosition="12%">
            {featuredProjects.map((project, idx) => (
              <ScrollStackItem key={project.id}>
                <div className="relative w-full bg-slate-900/80 border border-indigo-500/30 rounded-3xl p-8 sm:p-12 shadow-[0_0_50px_rgba(99,102,241,0.15)] backdrop-blur-2xl overflow-hidden group">
                  {/* Top Neon Flare */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left Details (7 Cols) */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="flex items-center justify-between border-b border-indigo-500/20 pb-4">
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="font-mono text-2xl text-indigo-400 font-bold">0{idx + 1}</span>
                          <span className="text-gray-500">/</span>
                          {project.categories.map((cat) => (
                            <span
                              key={cat}
                              className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[10px] font-montserrat tracking-widest font-semibold uppercase"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs font-mono text-gray-400">{project.year}</span>
                      </div>

                      <h3
                        onClick={() => project.navigationLink && window.open(project.navigationLink, '_blank')}
                        className="text-3xl sm:text-5xl font-black tracking-wide text-white hover:text-indigo-400 cursor-pointer transition-colors"
                      >
                        {project.title}
                      </h3>

                      <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
                        {project.longDescription || project.description}
                      </p>

                      {/* Stats Matrix */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                        {Object.entries(project.stats).map(([k, v]) => (
                          <div key={k} className="p-3 bg-black/50 rounded-xl border border-indigo-500/20">
                            <div className="text-lg font-bold text-sky-400 font-mono">{v}</div>
                            <div className="text-[9px] font-montserrat text-gray-400 uppercase tracking-widest mt-0.5">
                              {k}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 rounded-full bg-white/5 border border-indigo-500/20 text-indigo-200 text-xs font-montserrat"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Visual Image & Action Button (5 Cols) */}
                    <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6">
                      <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-indigo-500/30 group-hover:border-indigo-400 transition-colors shadow-lg">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      </div>

                      {project.navigationLink && (
                        <button
                          onClick={() => window.open(project.navigationLink, '_blank')}
                          className="w-full py-3.5 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 text-white font-montserrat text-xs font-bold tracking-[0.2em] uppercase hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-indigo-500/20"
                        >
                          <span>VISIT LIVE PLATFORM</span>
                          <i className="bx bx-right-arrow-alt text-lg" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>

        {/* Additional Projects Section with Category Filters */}
        <div className="pt-12 border-t border-indigo-500/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <h3 className="text-3xl font-black uppercase text-white tracking-wide">
              ALL <span className="text-indigo-400">PROJECT CATALOG</span>
            </h3>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-montserrat tracking-wider font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-indigo-600 to-sky-500 text-white shadow-md shadow-indigo-500/30'
                      : 'bg-white/5 border border-indigo-500/30 text-gray-300 hover:text-indigo-400 hover:border-indigo-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <div
                key={project.id}
                className="bg-slate-900/60 border border-indigo-500/20 rounded-2xl p-6 hover:border-indigo-400 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between backdrop-blur-xl group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-montserrat text-indigo-400 font-semibold tracking-widest uppercase">
                      {project.categories[0]}
                    </span>
                    <span className="text-xs font-mono text-gray-400">{project.year}</span>
                  </div>

                  <h4
                    onClick={() => project.navigationLink && window.open(project.navigationLink, '_blank')}
                    className={`text-2xl font-bold text-white ${
                      project.navigationLink ? 'hover:text-indigo-400 cursor-pointer' : ''
                    }`}
                  >
                    {project.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full bg-black/40 border border-indigo-500/20 text-[10px] font-montserrat text-indigo-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {project.navigationLink && (
                  <div className="pt-6 flex justify-end">
                    <button
                      onClick={() => window.open(project.navigationLink, '_blank')}
                      className="p-2.5 rounded-full border border-indigo-500/40 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-colors"
                      title="View Project"
                    >
                      <i className="bx bx-right-arrow-alt text-xl" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
