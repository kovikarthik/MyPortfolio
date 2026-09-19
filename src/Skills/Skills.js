import React, { useState } from 'react';
import { motion } from 'framer-motion';

const bentoCategories = [
  {
    title: 'FRONTEND ARCHITECTURE',
    badge: 'CORE PILLAR',
    items: ['React.js', 'React Native', 'Next.js', 'Angular', 'Tailwind CSS', 'TypeScript'],
    description: 'Specialized in building high-performance client applications, custom component libraries, and cross-platform mobile interfaces.',
    stat: '100% RESPONSIVE',
    colSpan: 'lg:col-span-7',
  },
  {
    title: 'DISTRIBUTED BACKEND & APIS',
    badge: 'HIGH THROUGHPUT',
    items: ['Node.js', 'Express.js', 'NestJS', 'GraphQL', 'RESTful APIs', 'C# / .NET'],
    description: 'Engineered RESTful & GraphQL microservices, role-based access control, caching layers, and multi-tenant SaaS backend isolation.',
    stat: '< 50ms LATENCY',
    colSpan: 'lg:col-span-5',
  },
  {
    title: 'DATABASE & CLOUD INFRASTRUCTURE',
    badge: 'SCALABILITY',
    items: ['AWS (EC2, S3, Lambda)', 'MongoDB', 'PostgreSQL', 'Redis', 'Docker', 'CI/CD Pipelines'],
    description: 'Designing resilient relational and document database schemas with Redis caching layers and containerized deployments on AWS.',
    stat: '99.9% UPTIME',
    colSpan: 'lg:col-span-5',
  },
  {
    title: 'ALGORITHMS & COMPUTER SCIENCE',
    badge: 'PROBLEM SOLVING',
    items: ['Python', 'C++', 'Java', 'Data Structures', 'System Design', 'GitOps'],
    description: 'Top 5% HackerRank problem solver. Deep expertise in memory optimization, asynchronous execution, and software architecture.',
    stat: 'TOP 5% HACKERRANK',
    colSpan: 'lg:col-span-7',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25, filter: 'blur(6px)' },
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

export default function Skills() {
  const [, setHoveredIdx] = useState(null);

  return (
    <section
      id="skills"
      className="relative w-full text-white font-sans py-24 sm:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden flex flex-col justify-center selection:bg-indigo-500 selection:text-white"
    >
      {/* Glow Orbs */}
      <div className="absolute top-1/3 left-1/4 w-[34rem] h-[34rem] bg-indigo-600/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[28rem] h-[28rem] bg-sky-500/10 rounded-full blur-[160px] pointer-events-none" />

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
            03 / TECH MATRIX
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-indigo-500 via-sky-400 to-transparent" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <h2 className="text-5xl sm:text-7xl font-black uppercase tracking-tight text-white">
            CORE COMPETENCIES & <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">STACK MATRIX</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 font-light max-w-2xl mt-2">
            A comprehensive breakdown of technologies, frameworks, and architectural practices powering production systems.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {bentoCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              variants={cardVariants}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`${cat.colSpan} relative bg-slate-900/60 border border-indigo-500/25 rounded-3xl p-8 sm:p-10 hover:border-indigo-400 transition-all duration-500 overflow-hidden group flex flex-col justify-between backdrop-blur-2xl shadow-xl`}
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div>
                <div className="flex items-center justify-between border-b border-indigo-500/20 pb-4 mb-6">
                  <span className="text-xs font-montserrat font-bold tracking-[0.25em] text-indigo-400 uppercase">
                    {cat.title}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[10px] font-montserrat tracking-widest font-semibold uppercase">
                    {cat.badge}
                  </span>
                </div>

                <p className="text-sm text-gray-300 font-light leading-relaxed mb-6">
                  {cat.description}
                </p>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="px-3.5 py-1.5 rounded-full bg-black/40 border border-indigo-500/20 text-xs font-montserrat text-indigo-200 group-hover:border-indigo-400/60 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Stat Footer */}
              <div className="pt-4 border-t border-indigo-500/15 flex items-center justify-between">
                <span className="text-[10px] font-montserrat text-gray-400 tracking-widest uppercase">BENCHMARK</span>
                <span className="text-xs font-mono font-semibold text-sky-400 tracking-wider">{cat.stat}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
