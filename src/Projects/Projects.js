import React, { useState } from 'react'
import { projects } from '../Utils/data'

export default function Projects() {
  const [currentProject, setCurrentProject] = useState(0);

  return (
    <>
    <section id="projects" className="py-14 md:py-24 xl:py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl xl:text-7xl font-black mb-2 md:mb-8">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full shadow-lg shadow-cyan-500/50" />
            <p className="text-xl text-gray-400 mt-8 max-w-3xl mx-auto">
              Showcasing innovative solutions that have impacted thousands of users worldwide
            </p>
          </div>

          {/* Featured Projects Carousel */}
          <div className="mb-20">
            <div className="relative max-w-7xl mx-auto">
              <div className="overflow-hidden rounded-3xl">
                <div className="flex transition-transform duration-700 ease-out" style={{transform: `translateX(-${currentProject * 100}%)`}}>
                  {projects.filter(p => p.featured).map((project) => (
                    <div key={project.id} className="w-full flex flex-shrink-0">
                      <div className="grid lg:grid-cols-2 gap-12 items-center p-5 md:p-8 xl:p-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl">
                        <div className="space-y-4 md:space-y-6 xl:space-y-8">
                          <div>
                            <div className="flex flex-wrap gap-2 items-center mb-4">
                              {project.categories.map(category =><span className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full text-cyan-400 text-xs md:text-sm font-bold border border-cyan-400/30">
                                {category}
                              </span>)}
                              <span className="text-gray-400 font-medium">{project.year}</span>
                            </div>
                            <h3
                              onClick={() => project?.navigationLink && window.open(project.navigationLink, "_blank")}
                              className="text-4xl font-black text-white mb-6 cursor-pointer transition-colors hover:underline duration-100 transition-transform active:scale-95 ease-in-out"
                            >
                              {project.title}
                            </h3>
                            <p className="text-xl text-gray-300 leading-relaxed mb-8">{project.longDescription}</p>
                          </div>

                          <div className="grid grid-cols-3 gap-2 md:gap-4 xl:gap-6">
                            {Object.entries(project.stats).map(([key, value]) => (
                              <div key={key} className="text-center p-3 md:p-4 bg-white/5 rounded-xl border border-white/10">
                                <div className="text-sm md:text-xl xl:text-2xl font-bold text-cyan-400">{key}</div>
                                <div className="text-xs text-gray-400 uppercase md:tracking-widest">{value}</div>
                              </div>
                            ))}
                          </div>

                          <div className="flex flex-wrap gap-3">
                            {project.tech.map((tech) => (
                              <span key={tech} className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-400/30 hover:scale-110 transition-transform">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="relative group/image">
                          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-2xl blur-xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-500"></div>
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="relative w-full h-80 object-cover rounded-2xl border border-white/20 group-hover/image:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel controls */}
              <div className="flex justify-center space-x-4 mt-8">
                {projects.filter(p => p.featured).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentProject(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      currentProject === index 
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 scale-125 shadow-lg shadow-cyan-500/50' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* All Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <div key={project.id} className="group relative flex flex-1 justify-between">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/10 rounded-2xl backdrop-blur-2xl border border-white/20 overflow-hidden hover:border-cyan-400/50 hover:scale-105 transition-all duration-500 flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full text-cyan-300 text-xs font-bold border border-cyan-400/50 backdrop-blur-xl">
                        {project.year}
                      </span>
                    </div>
                    <div className="flex absolute bottom-2 left-2 gap-2">
                      {project.categories.map(category =><span className="px-3 py-1 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full text-purple-300 text-xs font-bold border border-purple-400/50 backdrop-blur-xl">
                          {category}
                        </span>)}
                    </div>
                  </div>

                  <div className="p-8 flex flex-col justify-between flex-1">
                    <h3 
                    onClick={() => project?.navigationLink && window.open(project.navigationLink, "_blank")}
                    className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors cursor-pointer hover:underline duration-100 transition-transform active:scale-95 ease-in-out"
                    >
                      {project.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-6">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-white/10 text-cyan-400 rounded-lg text-xs font-medium border border-cyan-400/20">
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="px-3 py-1 bg-white/10 text-gray-400 rounded-lg text-xs font-medium border border-white/20">
                          +{project.tech.length - 4} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-4">
                        {Object.entries(project.stats).slice(0, 2).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-lg font-bold text-cyan-400">{key}</div>
                            <div className="text-xs text-gray-500 uppercase">{value}</div>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => project?.navigationLink && window.open(project.navigationLink, "_blank")}
                        className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center hover:scale-125 hover:rotate-12 transition-all duration-300 group/btn">
                        <i className="bx bx-right-arrow-alt text-xl text-white group-hover/btn:translate-x-1 transition-transform" />
                      </button>
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
