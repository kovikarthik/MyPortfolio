import React from 'react'
import { skills } from '../Utils/data'

export default function Skills() {
  return (
    <>
      <section id="skills" className="py-14 md:py-24 xl:py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl xl:text-7xl font-black mb-2 md:mb-8">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Technical Arsenal
              </span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full shadow-lg shadow-cyan-500/50" />
          </div>

          <div className="max-w-7xl mx-auto mb-20">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {skills.map((skill, index) => (
                <div key={skill.name} className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-white/10 p-8 rounded-2xl backdrop-blur-2xl border border-white/20 hover:border-cyan-400/50 transition-all duration-500 hover:scale-110 hover:rotate-1 text-center">
                    <div className={`w-20 h-20 bg-gradient-to-r ${skill.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500`}>
                      <i className={`bx ${skill.icon} text-3xl text-white`} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">{skill.name}</h3>
                    <div className="text-sm text-cyan-400 font-medium mb-4 uppercase tracking-widest">{skill.category}</div>
                    
                    {/* Animated progress bar */}
                    <div className="relative w-full h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{width: `${skill.level}%`}}
                      />
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/30 to-transparent animate-pulse"></div>
                    </div>
                    <div className="text-right text-xs text-gray-400 mt-2 font-bold">{skill.level}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                category: 'Frontend Mastery',
                icon: 'bx-paint',
                color: 'from-cyan-400 to-blue-500',
                techs: ['React', 'Next.js', 'Angular', 'React Native', 'Tailwind']
              },
              {
                category: 'Backend Power',
                icon: 'bx-server',
                color: 'from-green-400 to-emerald-500',
                techs: ['Node.js', 'Express', 'NestJS', 'GraphQL', 'REST APIs']
              },
              {
                category: 'Cloud & DevOps',
                icon: 'bx-cloud',
                color: 'from-orange-400 to-red-500',
                techs: ['AWS', 'Docker', 'CI/CD', 'LightSail', 'S3']
              },
              {
                category: 'Data & AI',
                icon: 'bx-data',
                color: 'from-purple-400 to-pink-500',
                techs: ['MongoDB', 'PostgreSQL', 'Redis', 'TensorFlow', 'ML']
              }
            ].map((category, index) => (
              <div key={category.category} className="group">
                <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-2xl border border-white/10 hover:border-cyan-400/30 hover:scale-105 transition-all duration-500">
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-500`}>
                    <i className={`bx ${category.icon} text-2xl text-white`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 text-center">{category.category}</h3>
                  <div className="space-y-2">
                    {category.techs.map((tech) => (
                      <div key={tech} className="text-center py-1 px-3 bg-white/10 rounded-lg text-sm text-gray-300 hover:text-cyan-400 transition-colors">
                        {tech}
                      </div>
                    ))}
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
