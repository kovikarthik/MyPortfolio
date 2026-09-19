import React from 'react'

export default function OnAppLoading() {
  return (
    <div className="fixed inset-0 bg-[#0B0F19] flex items-center justify-center z-50">
        <div className="text-center relative">
          {/* Animated loading rings */}
          <div className="relative w-40 h-40 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-2 border-3 border-sky-400/60 rounded-full border-r-transparent animate-spin" style={{animationDirection: 'reverse', animationDuration: '2s'}}></div>
            <div className="absolute inset-4 border-2 border-emerald-400/40 rounded-full border-b-transparent animate-spin" style={{animationDuration: '3s'}}></div>
          </div>
          
          <div className="text-4xl font-black mb-6">
            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent animate-pulse">
              KARTHIK KOVI
            </span>
          </div>
          
          <div className="text-indigo-400 text-lg mb-4 tracking-[0.3em] uppercase font-light animate-pulse">
            Software Engineer
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
  )
}
