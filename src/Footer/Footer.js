import React from 'react';

export default function Footer() {
  return (
    <footer className="py-16 bg-[#0B0F19] border-t border-indigo-500/20 text-white relative z-10">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
        <div>
          <div className="text-4xl font-black bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent mb-2">
            KARTHIK KOVI
          </div>
          <p className="text-xs font-montserrat tracking-[0.25em] text-gray-400 uppercase font-semibold">
            Crafting the future of digital experiences, one line of code at a time.
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          {[
            { icon: 'bxl-linkedin', href: 'https://www.linkedin.com/in/karthikkovi/', label: 'LinkedIn' },
            { icon: 'bxl-github', href: 'https://github.com/kovikarthik', label: 'GitHub' },
            { icon: 'bx-envelope', href: 'mailto:karthikkovik@gmail.com', label: 'Email' },
            { icon: 'bx-phone', href: 'tel:+15622840297', label: 'Phone' },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-indigo-500/20 flex items-center justify-center text-gray-300 hover:text-indigo-400 hover:border-indigo-400 hover:scale-110 transition-all backdrop-blur-md"
              title={social.label}
            >
              <i className={`bx ${social.icon} text-lg`} />
            </a>
          ))}
        </div>

        <div className="text-[11px] font-mono text-gray-500 pt-4 border-t border-white/5">
          © {new Date().getFullYear()} Karthik Kovi. Built with React, Three.js & Framer Motion.
        </div>
      </div>
    </footer>
  );
}
