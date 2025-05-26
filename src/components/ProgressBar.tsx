'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  currentFile?: string;
  processedFiles?: number;
  totalFiles?: number;
  theme?: 'light' | 'dark';
  className?: string;
}

export default function ProgressBar({ 
  progress, 
  currentFile, 
  processedFiles, 
  totalFiles, 
  theme = 'dark',
  className = ''
}: ProgressBarProps) {
  const isDark = theme === 'dark';
  
  return (
    <div className={`${isDark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-md rounded-3xl shadow-xl p-6 border ${isDark ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300 ${className}`}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Analyzing Files
          </h3>
          <div className={`text-sm font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
            {progress}%
          </div>
        </div>
        
        <div className="relative h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`absolute top-0 left-0 h-full ${isDark ? 'bg-blue-500' : 'bg-blue-600'} rounded-full`}
          />
        </div>
        
        {(processedFiles !== undefined && totalFiles !== undefined) && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm">
            <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <span className="font-medium">{processedFiles}</span> of <span className="font-medium">{totalFiles}</span> files processed
            </div>
            {currentFile && (
              <div className={`mt-2 sm:mt-0 ${isDark ? 'text-gray-400' : 'text-gray-500'} max-w-xs truncate`} title={currentFile}>
                Currently processing: <span className="font-medium">{currentFile}</span>
              </div>
            )}
          </div>
        )}
        
        {/* Animated dots */}
        <div className="flex items-center">
          <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
            Please wait
          </span>
          <motion.div
            animate={{
              opacity: [0.4, 1, 0.4],
              transition: { duration: 1.5, repeat: Infinity }
            }}
            className="flex ml-1"
          >
            <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>.</span>
            <motion.span
              animate={{
                opacity: [0.4, 1, 0.4],
                transition: { duration: 1.5, repeat: Infinity, delay: 0.2 }
              }}
              className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}
            >
              .
            </motion.span>
            <motion.span
              animate={{
                opacity: [0.4, 1, 0.4],
                transition: { duration: 1.5, repeat: Infinity, delay: 0.4 }
              }}
              className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}
            >
              .
            </motion.span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
