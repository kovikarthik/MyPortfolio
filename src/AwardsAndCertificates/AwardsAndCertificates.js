import React from 'react'
import { certifications } from '../Utils/data'

export default function AwardsAndCertificates() {
  return (
    <>
      <section className="py-14 md:py-24 xl:py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl xl:text-7xl font-black mb-2 md:mb-8">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Awards & Recognition
              </span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-yellow-400 to-red-500 mx-auto rounded-full shadow-lg shadow-yellow-500/50" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {certifications.map((cert, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/30 to-red-500/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/10 p-8 rounded-2xl backdrop-blur-2xl border border-white/20 hover:border-yellow-400/50 transition-all duration-500 hover:scale-110 hover:rotate-2 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    <i className={`bx ${cert.icon} text-3xl text-white`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{cert.name}</h3>
                  <div className="text-yellow-400 font-semibold mb-2">{cert.type}</div>
                  <div className="text-gray-400 text-sm">{cert.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
