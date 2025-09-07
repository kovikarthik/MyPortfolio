import React from 'react'

export default function Footer() {
  return (
    <>
    <footer className="py-16 relative border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
              KARTHIK KOVI
            </div>
            <p className="text-gray-400 text-lg">
              Crafting the future, one line of code at a time.
            </p>
          </div>
          
          <div className="flex justify-center space-x-8 mb-8">
            {[
              { icon: 'bxl-linkedin', href: 'https://linkedin.com/in/karthikkovi/' },
              { icon: 'bxl-github', href: 'https://github.com/kovikarthik' },
              { icon: 'bx-envelope', href: 'mailto:karthikkovik@gmail.com' },
              { icon: 'bx-phone', href: 'tel:+15622840297' }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target='_blank'
                rel="noreferrer"
                className="group w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20 hover:border-cyan-400/50 hover:bg-cyan-400/20 transition-all hover:scale-125 hover:rotate-12 ease-in-out duration-100 active:scale-100"
              >
                <i className={`bx ${social.icon} text-xl group-hover:text-cyan-400 transition-colors`} />
              </a>
            ))}
          </div>
          
          <div className="text-gray-500 text-sm">
            © 2025 Karthik Kovi. Designed with passion and innovation.
          </div>
        </div>
      </footer>
    </>
  )
}
