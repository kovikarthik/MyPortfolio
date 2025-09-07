import React, { useEffect, useState } from 'react'

export default function NavBar() {
    const [activeSection, setActiveSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(()=>{
          // Scroll tracking with intersection observer
      const sections = document.querySelectorAll('section[id]');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      }, { threshold: 0.5 });

      sections.forEach(section => observer.observe(section));

      return () => {
        observer.disconnect();
        }
    },[])

  return (
    <>  
    <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-2xl border-b border-white/10 shadow-2xl">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="text-4xl font-black tracking-wider">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent hover:scale-110 transition-transform cursor-pointer">
                KK
              </span>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              {[
                { id: 'home', label: 'Home', icon: 'bx-home-alt' },
                { id: 'about', label: 'About', icon: 'bx-user' },
                { id: 'experience', label: 'Experience', icon: 'bx-briefcase' },
                { id: 'skills', label: 'Skills', icon: 'bx-code-alt' },
                { id: 'projects', label: 'Projects', icon: 'bx-folder-open' },
                { id: 'contact', label: 'Contact', icon: 'bx-message-dots' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`group flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-500 ${
                    activeSection === item.id 
                      ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 border border-cyan-400/50 shadow-lg shadow-cyan-500/25 scale-105' 
                      : 'hover:text-cyan-400 hover:bg-white/10 hover:scale-105 hover:shadow-lg'
                  }`}
                >
                  <i className={`bx ${item.icon} text-xl group-hover:rotate-12 transition-transform`} />
                  <span className="font-semibold tracking-wide">{item.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-14 h-14 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-2xl border border-white/20 hover:border-cyan-400/50 hover:bg-cyan-400/20 transition-all duration-300"
            >
              <i className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'} text-2xl transition-transform duration-300 ${isMenuOpen ? 'rotate-180': '' }`} />
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-6 p-6 bg-black/80 rounded-2xl backdrop-blur-2xl border border-white/20 shadow-2xl">
              {[
                { id: 'home', label: 'Home', icon: 'bx-home-alt' },
                { id: 'about', label: 'About', icon: 'bx-user' },
                { id: 'experience', label: 'Experience', icon: 'bx-briefcase' },
                { id: 'skills', label: 'Skills', icon: 'bx-code-alt' },
                { id: 'projects', label: 'Projects', icon: 'bx-folder-open' },
                { id: 'contact', label: 'Contact', icon: 'bx-message-dots' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMenuOpen(false);
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center space-x-4 w-full p-4 rounded-xl hover:bg-white/10 hover:scale-105 transition-all duration-300 group"
                >
                  <i className={`bx ${item.icon} text-2xl text-cyan-400 group-hover:rotate-12 transition-transform`} />
                  <span className="text-lg font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
