'use client';

import { motion } from 'framer-motion';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  setTheme?: (theme: 'light' | 'dark') => void;
  onToggle?: () => void;
  className?: string;
}

export default function ThemeToggle({ 
  theme, 
  setTheme, 
  onToggle, 
  className = '' 
}: ThemeToggleProps) {
  const isDark = theme === 'dark';
  
  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else if (setTheme) {
      setTheme(isDark ? 'light' : 'dark');
    }
  };
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleToggle}
      className={`p-2 rounded-full flex items-center justify-center w-10 h-10 shadow-lg transition-all duration-300 ${
        isDark 
          ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
          : 'bg-white text-gray-800 hover:bg-gray-100'
      } ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          ></path>
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          ></path>
        </svg>
      )}
    </motion.button>
  );
}
