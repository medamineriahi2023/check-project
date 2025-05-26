'use client';

import { useState, useEffect } from 'react';

interface ThemeProps {
  theme?: 'light' | 'dark';
}

export default function Background3D({ theme = 'light' }: ThemeProps) {
  const isDark = theme === 'dark';
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full fixed top-0 left-0 -z-10 overflow-hidden">
      <div 
        className={`absolute inset-0 ${
          isDark ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
        }`}
      />
      
      {/* Animated circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 animate-pulse" />
      <div className="absolute top-3/4 left-2/3 w-96 h-96 rounded-full bg-blue-500/5 animate-pulse [animation-delay:2s]" />
      <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-blue-500/10 animate-pulse [animation-delay:1s]" />
      
      {/* Grid pattern */}
      <div className={`absolute inset-0 ${isDark ? 'opacity-10' : 'opacity-5'}`} 
        style={{
          backgroundImage: `linear-gradient(to right, ${isDark ? '#60a5fa' : '#3b82f6'} 1px, transparent 1px), 
                           linear-gradient(to bottom, ${isDark ? '#60a5fa' : '#3b82f6'} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center'
        }}
      />
      
      {/* Floating particles */}
      <div className="particle-container">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className={`absolute rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'} opacity-20`}
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-100px) translateX(50px);
          }
          50% {
            transform: translateY(-200px) translateX(0);
          }
          75% {
            transform: translateY(-100px) translateX(-50px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
