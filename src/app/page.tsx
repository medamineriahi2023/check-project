'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeFiles, exportToSAP, AnalysisResult, ProgressUpdate } from '@/services/api';
import FileUploader from '@/components/FileUploader';
import AnalysisResults from '@/components/AnalysisResults';
import ThemeToggle from '@/components/ThemeToggle';
import Notification from '@/components/Notification';
import ProgressBar from '@/components/ProgressBar';
import Background3D from '@/components/Background3D';
import AnimatedText from '@/components/AnimatedText';
import SplashScreen from '@/components/SplashScreen';
import AnimatedBackground from '@/components/AnimatedBackground';
import AnimatedLogo from '@/components/AnimatedLogo';
import { fadeIn, zoomIn, staggerContainer, slideIn, floatAnimation, pulseAnimation } from '@/hooks/useAnimations';

export default function Home() {
  // State
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [notification, setNotification] = useState<{ 
    message: string; 
    type: 'success' | 'error' | 'info'; 
    visible: boolean;
  } | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Effect to check system theme preference
  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(isDarkMode ? 'dark' : 'light');
    
    // Apply theme class to document
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  // Handle theme toggle
  const handleThemeToggle = useCallback(() => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      return newTheme;
    });
  }, []);

  // Show notification
  const showNotification = useCallback((type: 'success' | 'error' | 'info', message: string) => {
    setNotification({
      type,
      message,
      visible: true
    });

    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setNotification(prev => prev ? { ...prev, visible: false } : null);
    }, 5000);
  }, []);

  // Handle file selection
  const handleFilesSelected = useCallback(async (files: File[]) => {
    if (!files.length) return;

    setIsAnalyzing(true);
    setProgress(null);

    try {
      // Reset any previous results
      setResults([]);

      // Show notification
      showNotification('info', `Analyzing ${files.length} file${files.length > 1 ? 's' : ''}...`);

      // Call API with progress tracking
      const analysisResults = await analyzeFiles(files, handleProgressUpdate);

      setResults(analysisResults);

      // Show success notification
      const successCount = analysisResults.filter(r => r.status === 'success').length;
      const errorCount = analysisResults.filter(r => r.status === 'error').length;

      if (errorCount === 0) {
        showNotification('success', `Successfully analyzed all ${files.length} file${files.length > 1 ? 's' : ''}`);
      } else if (successCount === 0) {
        showNotification('error', `Failed to analyze ${files.length} file${files.length > 1 ? 's' : ''}`);
      } else {
        showNotification('info', `Analyzed ${files.length} file${files.length > 1 ? 's' : ''}: ${successCount} successful, ${errorCount} failed`);
      }
    } catch (error) {
      console.error('Error analyzing files:', error);
      showNotification('error', 'An error occurred while analyzing files');
    } finally {
      setIsAnalyzing(false);
      setProgress(null);
    }
  }, [showNotification]);

  // Progress update handler
  const handleProgressUpdate = useCallback((update: ProgressUpdate) => {
    if (update.progress !== undefined) {
      setProgress(update.progress);
    }
  }, []);

  // Handle export to SAP
  const handleExportToSAP = useCallback(async () => {
    try {
      showNotification('info', 'Exporting to SAP...');

      const successfulResults = results.filter(r => r.status === 'success');
      const response = await exportToSAP(successfulResults);

      if (response.success) {
        showNotification('success', 'Successfully exported to SAP');
      } else {
        showNotification('error', `Export failed: ${response.message}`);
      }

      return response.success;
    } catch (error) {
      console.error('Error exporting to SAP:', error);
      showNotification('error', 'An error occurred while exporting to SAP');
      return false;
    }
  }, [results, showNotification]);

  // Skip intro animation
  const handleSkipIntro = useCallback(() => {
    setShowIntro(false);
  }, []);

  // Handle ESC key to skip intro
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showIntro) {
        handleSkipIntro();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showIntro, handleSkipIntro]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
      </div>
      
      {/* Splash Screen with multi-scene animations */}
      <AnimatePresence>
        {showIntro && (
          <SplashScreen onComplete={handleSkipIntro} />
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <AnimatePresence>
        {!showIntro && (
          <motion.main 
            className="container mx-auto px-4 py-8 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Animated Header */}
            <motion.div 
              className="text-center mb-12"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1 
                className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 15, 
                  delay: 0.4 
                }}
              >
                Check Analysis System
              </motion.h1>
              <motion.p 
                className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Upload your check images for instant analysis and seamless SAP integration
              </motion.p>
            </motion.div>

            {/* Animated Cards Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {[
                {
                  title: "Upload",
                  description: "Drag & drop or select check images in PNG, JPG, or PDF format",
                  icon: (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  ),
                  delay: 0.8
                },
                {
                  title: "Analyze",
                  description: "Our AI processes your checks with advanced recognition technology",
                  icon: (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  ),
                  delay: 1.0
                },
                {
                  title: "Export",
                  description: "Send your processed data directly to SAP with one click",
                  icon: (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                  ),
                  delay: 1.2
                }
              ].map((card, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800 bg-opacity-70' : 'bg-white bg-opacity-90'} backdrop-blur-sm`}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: card.delay }}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: theme === 'dark' 
                      ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)' 
                      : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                  }}
                >
                  <motion.div 
                    className={`mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 10 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: card.delay + 0.2,
                      type: "spring"
                    }}
                  >
                    {card.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{card.description}</p>
                </motion.div>
              ))}
            </div>
            
            {/* File Uploader with Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="mb-8"
            >
              <FileUploader
                onFilesSelected={handleFilesSelected}
                theme={theme}
              />
            </motion.div>

            {/* Control Buttons with Animation */}
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <motion.button
                className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 ${
                  isAnalyzing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                } text-white shadow-lg transition-all duration-300`}
                disabled={isAnalyzing || files.length === 0}
                onClick={() => handleFilesSelected(files)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {isAnalyzing ? 'Analyzing...' : 'Analyze Files'}
              </motion.button>
              
              <motion.button
                className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 ${
                  !results.length ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                } text-white shadow-lg transition-all duration-300`}
                disabled={!results.length}
                onClick={handleExportToSAP}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Export to SAP
              </motion.button>
            </motion.div>

            {/* Progress Bar with Animation */}
            {isAnalyzing && progress !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <ProgressBar 
                  progress={progress}
                  className="mb-8"
                />
              </motion.div>
            )}

            {/* Analysis Results with Animation */}
            <AnimatePresence>
              {results.length > 0 && !isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.8 }}
                >
                  <AnalysisResults 
                    results={results}
                    onExportToSAP={handleExportToSAP}
                    theme={theme} 
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          isVisible={notification.visible}
          onClose={() => setNotification(null)}
          theme={theme}
        />
      )}

      {/* Theme Toggle */}
      <motion.div 
        className="absolute top-4 right-4 z-20"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: showIntro ? 4.5 : 0.3, duration: 0.5 }}
      >
        <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
      </motion.div>
    </div>
  );
}
