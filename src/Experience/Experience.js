import React from 'react'
import { experience } from '../Utils/data'

export default function Experience() {
  return (
    <>
      <section id="experience" className="py-14 md:py-24 xl:py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl xl:text-7xl font-black mb-2 md:mb-8">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Professional Journey
              </span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full shadow-lg shadow-cyan-500/50" />
          </div>

          <div className="max-w-6xl mx-auto space-y-16">
            {experience.map((exp, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/10 p-5 md:p-8 xl:p-10 rounded-3xl backdrop-blur-2xl border border-white/20 hover:border-cyan-400/50 transition-all duration-500 group-hover:scale-[1.02]">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                    <div className="flex items-start space-x-4 xl:space-x-6 text-left">
                      <div className={`p-3 xl:p-4 w-16 rounded-full bg-gradient-to-r ${exp.current ? 'from-green-400 to-emerald-500' : 'from-blue-400 to-purple-500'} flex items-center justify-center`}>
                        <i className="bx bx-briefcase text-xl xl:text-2xl text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl xl:text-3xl font-black text-white mb-3">{exp.role}</h3>
                        <div className="text-cyan-400 text-xl font-bold mb-2">{exp.company}</div>
                        <div className="text-gray-400 flex items-center space-x-2">
                          <i className="bx bx-map text-lg" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`${exp.current ? 'bg-green-400/20 border-green-400/50 text-green-300' : 'bg-blue-400/20 border-blue-400/50 text-blue-300'} font-bold px-6 py-3 rounded-full border backdrop-blur-xl mt-6 lg:mt-0 flex items-center space-x-2`}>
                      {exp.current && <i className="bx bx-time-five animate-pulse" />}
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-10">
                    <div>
                      <h4 className="text-xl font-bold text-white mb-6 flex items-center space-x-3">
                        <i className="bx bx-rocket text-cyan-400 text-2xl" />
                        <span>Key Achievements</span>
                      </h4>
                      <ul className="space-y-4">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start space-x-4 group/item">
                            <i className="bx bx-check-circle text-cyan-400 text-xl mt-1 group-hover/item:scale-125 transition-transform" />
                            <span className="text-gray-300 text-start leading-relaxed text-lg group-hover/item:text-white transition-colors">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-white mb-6 flex items-center space-x-3">
                        <i className="bx bx-cog text-purple-400 text-2xl" />
                        <span>Technologies Used</span>
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {exp.tech.map((tech, techIndex) => (
                          <span key={tech} className="group/tech relative px-4 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-xl text-sm font-semibold border border-cyan-400/30 hover:border-cyan-300 hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-default">
                            <span className="relative z-10">{tech}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300"></div>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
