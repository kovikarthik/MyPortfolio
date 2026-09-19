import React from 'react';
import { motion } from 'framer-motion';
import { certifications } from '../Utils/data';

export default function AwardsAndCertificates() {
  return (
    <section className="relative w-full text-white font-sans py-24 sm:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden selection:bg-indigo-500 selection:text-white">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="text-[11px] font-semibold tracking-[0.35em] uppercase text-indigo-400 font-montserrat block mb-2">
            HONORS & RECOGNITION
          </span>
          <h2 className="text-5xl sm:text-6xl font-black uppercase tracking-tight text-white">
            HONORED FOR <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">INNOVATION</span>
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-slate-900/60 border border-indigo-500/25 rounded-3xl p-8 text-center hover:border-indigo-400 hover:scale-[1.03] transition-all duration-300 group shadow-xl backdrop-blur-xl flex flex-col items-center justify-between"
            >
              <div>
                <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mx-auto mb-6 group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-sky-500 group-hover:text-white transition-all">
                  <i className={`bx ${cert.icon} text-3xl`} />
                </div>
                <h3 className="text-xl font-bold tracking-wide text-white mb-2">{cert.name}</h3>
                <div className="text-xs font-montserrat text-indigo-400 font-semibold tracking-wider uppercase mb-1">
                  {cert.type}
                </div>
              </div>
              <div className="text-xs font-mono text-gray-400 mt-4 pt-4 border-t border-indigo-500/15 w-full">
                {cert.year}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
