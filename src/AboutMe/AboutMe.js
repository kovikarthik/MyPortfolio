import React from 'react'

export default function AboutMe() {
  return (
    <>
    <section id="about" className="min-h-screen py-24 xl:py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl xl:text-7xl font-black mb-2 md:mb-8">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full shadow-lg shadow-cyan-500/50" />
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
            <div className="space-y-10">
              <div className="text-xl leading-relaxed space-y-8 text-gray-300">
                <p className="text-2xl leading-relaxed">
                  I'm a visionary <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text font-bold">Full Stack Developer</span> currently pursuing 
                  my Master's in Computer Science at <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text font-semibold">California State University, Long Beach</span>. 
                  With a stellar <span className="text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text font-bold">3.67 GPA</span>, I merge academic excellence 
                  with industry-leading expertise.
                </p>
                <p className="text-lg">
                  My transformative journey spans from leading elite development teams to architecting scalable applications 
                  that serve <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text font-bold">30,000+ users</span>. 
                  I specialize in cutting-edge web technologies, cloud infrastructure, and creating 
                  revolutionary user experiences that set new industry standards.
                </p>
                <p className="text-lg">
                  Beyond coding, I'm an award-winning innovator with prestigious recognition from ISTE AP 
                  and Smart India Hackathon. I believe in building technology that creates meaningful, 
                  lasting impact on people's lives and drives digital transformation.
                </p>
                          </div>
                          
                          {/* <div className="relative">
              <div className="relative w-full max-w-lg mx-auto">
              
                
              {[
                  { icon: 'bxl-react', position: 'top-0 left-8', color: 'text-cyan-400' },
                  { icon: 'bxl-nodejs', position: 'top-8 right-0', color: 'text-green-400' },
                  { icon: 'bxl-aws', position: 'bottom-0 left-0', color: 'text-orange-400' },
                  { icon: 'bxl-python', position: 'bottom-8 right-8', color: 'text-yellow-400' }
                ].map((tech, index) => (
                  <div key={index} className={`absolute ${tech.position} w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20 animate-bounce`} style={{animationDelay: `${index * 0.5}s`}}>
                    <i className={`bx ${tech.icon} text-2xl ${tech.color}`} />
                  </div>
                ))}
                              
              </div>
            </div> */}

            
            </div>

            <div>
                <div className="grid grid-cols-2 gap-6">
                    {[
                    { label: 'Projects Delivered', value: '25+', icon: 'bx-check-circle', color: 'from-green-400 to-emerald-500' },
                    { label: 'Users Impacted', value: '42K+', icon: 'bx-user', color: 'from-blue-400 to-cyan-500' },
                    { label: 'Tech Stack', value: '20+', icon: 'bx-code-alt', color: 'from-purple-400 to-pink-500' },
                    { label: 'Experience', value: '3+ Years', icon: 'bx-time', color: 'from-orange-400 to-red-500' }
                    ].map((stat) => (
                    <div key={stat.label} className="group relative">
                        <div className="bg-white/10 p-4 md:p-8 rounded-2xl backdrop-blur-2xl border border-white/20 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 hover:rotate-1">
                        <div className="flex flex-row items-center justify-center space-x-2 xl:space-x-4 mb-4">
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                            <i className={`bx ${stat.icon} text-xl xl:text-2xl text-white`} />
                            </div>
                            <div className={`text-xl md:text-2xl xl:text-3xl leading-6 font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                            {stat.value}
                            </div>
                        </div>
                        <div className="text-sm text-gray-400 font-medium tracking-wide">{stat.label}</div>
                        </div>
                    </div>
                    ))}
                </div>
                <br/>
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-8 rounded-2xl border border-cyan-400/30 backdrop-blur-xl">
                <h3 className="text-2xl font-bold text-cyan-300 mb-4 flex items-center space-x-3">
                  <i className="bx bx-trophy text-3xl" />
                  <span>Notable Achievements</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                  <div className="flex items-center space-x-3">
                    <i className="bx bx-medal text-yellow-400 text-xl" />
                    <span>ISTE AP Gold Medal Winner</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="bx bx-trending-up text-green-400 text-xl" />
                    <span>HackerRank Top 5%</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="bx bx-brain text-purple-400 text-xl" />
                    <span>SIH National Finalist</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="bx bx-group text-blue-400 text-xl" />
                    <span>Tech Club Coordinator</span>
                  </div>
                </div>
              </div>
           </div>
          </div>
        </div>
      </section>
    </>
  )
}
