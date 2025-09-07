import React from 'react'

export default function HeroSection() {

  return (
    <>
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="mb-12 mt-32 sm:mt-15 md:mt-10 xl:mt-5">
            <div className="text-xl text-cyan-400 mb-6 tracking-[0.5em] uppercase font-light opacity-0 animate-fade-in-up" style={{animationDelay: '0.3s', animationFillMode: 'forwards'}}>
               Full Stack Developer
            </div>
            
            <h1 className="text-5xl md:text-5xl lg:text-7xl font-black mb-8 leading-none opacity-0 animate-fade-in-up" style={{animationDelay: '0.6s', animationFillMode: 'forwards'}}>
              <span className="bg-gradient-to-r from-white via-blue-200 to-blue-300 bg-clip-text text-transparent block">
                KARTHIK
              </span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent block mt-4">
                KOVI
              </span>
            </h1>
            
            <div className="max-w-5xl mx-auto mb-12 opacity-0 animate-fade-in-up" style={{animationDelay: '0.9s', animationFillMode: 'forwards'}}>
              <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed mb-6">
                Architecting the future of digital experiences through
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-lg">
                {['Technology', 'Innovation', 'Expertise', 'Integration'].map((tech, index) => (
                  <span key={tech} className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-400/30 text-cyan-300 font-medium hover:scale-110 transition-transform duration-300 cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-20 opacity-0 animate-fade-in-up" style={{animationDelay: '1.2s', animationFillMode: 'forwards'}}>
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-bold text-xl overflow-hidden hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              <span className="relative flex items-center justify-center space-x-3">
                <i className="bx bx-rocket text-2xl" />
                <span>Explore My Work</span>
                <i className="bx bx-right-arrow-alt text-2xl group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
            
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-10 py-5 bg-white/5 border-2 border-cyan-400/50 rounded-full font-bold text-xl backdrop-blur-2xl overflow-hidden hover:bg-cyan-400/20 hover:border-cyan-300 hover:shadow-2xl hover:shadow-cyan-400/50 transition-all duration-500"
            >
              <span className="relative flex items-center justify-center space-x-3">
                <i className="bx bx-message-dots text-2xl group-hover:scale-125 transition-transform" />
                <span>Let's Connect</span>
                <i className="bx bx-paper-plane text-2xl group-hover:rotate-12 transition-transform" />
              </span>
            </button>
          </div>

          <div className="flex justify-center space-x-6 opacity-0 animate-fade-in-up" style={{animationDelay: '1.5s', animationFillMode: 'forwards'}}>
            {[
              { icon: 'bxl-linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/karthikkovi/', color: 'hover:text-blue-400' },
              { icon: 'bxl-github', label: 'GitHub', href: 'https://github.com/kovikarthik', color: 'hover:text-gray-300' },
              { icon: 'bx-envelope', label: 'Email', href: 'mailto:karthikkovik@gmail.com', color: 'hover:text-red-400' },
              { icon: 'bx-phone', label: 'Phone', href: 'tel:+15622840297', color: 'hover:text-green-400' }
            ].map((social) => (
              <a
                key={social.label}
                    href={social.href}
                    target='_blank'
                    rel="noreferrer"
                className={`group w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-2xl border border-white/20 hover:border-cyan-400/70 hover:bg-cyan-400/20 transition-all ease-in-out duration-100 active:scale-100 hover:scale-125 hover:rotate-12 ${social.color}`}
                title={social.label}
              >
                <i className={`bx ${social.icon} text-2xl transition-all duration-300`} />
              </a>
            ))}
          </div>
        </div>

        {/* Animated scroll indicator */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <div className="text-cyan-400 text-sm font-medium tracking-widest">SCROLL</div>
            <div className="w-6 h-12 border-2 border-cyan-400/70 rounded-full p-1">
              <div className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mx-auto animate-pulse" />
            </div>
          </div>
        </div> */}
      </section>
    </>
  )
}
