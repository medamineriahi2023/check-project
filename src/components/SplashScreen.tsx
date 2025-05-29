'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedText from './AnimatedText';
import { fadeIn, zoomIn, staggerContainer, slideIn, floatAnimation, pulseAnimation } from '@/hooks/useAnimations';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [currentScene, setCurrentScene] = useState(0);
  const totalScenes = 4;
  
  // Auto-advance through scenes
  useEffect(() => {
    if (currentScene < totalScenes) {
      const timer = setTimeout(() => {
        setCurrentScene(prev => prev + 1);
      }, 4000); // 4 seconds per scene
      
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [currentScene, onComplete]);

  // Handle skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onComplete();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  // Progress indicator
  const ProgressIndicator = () => (
    <motion.div 
      className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {Array.from({ length: totalScenes }).map((_, i) => (
        <motion.div
          key={i}
          className={`w-3 h-3 rounded-full ${i === currentScene ? 'bg-blue-500' : 'bg-gray-600'}`}
          initial={{ scale: i === currentScene ? 0 : 1 }}
          animate={{ 
            scale: i === currentScene ? [0, 1.2, 1] : 1,
            backgroundColor: i === currentScene ? '#3b82f6' : i < currentScene ? '#3b82f6' : '#4b5563'
          }}
          transition={{ duration: 0.4 }}
        />
      ))}
    </motion.div>
  );

  // Scene 1: Initial logo reveal
  const Scene1 = () => (
    <motion.div 
      className="flex flex-col items-center justify-center text-center z-10 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative">
        {/* Logo reveal */}
        <motion.div
          className="relative z-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.3,
            type: "spring",
            stiffness: 200
          }}
        >
          <motion.div
            animate={{
              filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"],
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              repeatType: "mirror",
              type: "tween" 
            }}
            className="flex justify-center"
          >
            <img src="/logo-check-white.png" alt="Check Logo" className="h-36" />
          </motion.div>
        </motion.div>

        
        {/* Tagline with character-by-character animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-6 mb-12"
        >
          <div className="font-montserrat text-xl text-blue-200 tracking-wide overflow-hidden">
            {Array.from("Transforming check processing").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.2 + index * 0.05,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="inline-block"
              >
                {char === " " ? <span>&nbsp;</span> : char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  // Scene 2: Features showcase
  const Scene2 = () => (
    <motion.div 
      className="flex flex-col items-center justify-center text-center z-10 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Main heading */}
      <motion.h2 
        className="text-5xl font-poppins font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Powerful Features
      </motion.h2>
      
      {/* Features list with staggered animation */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {[
          {
            icon: "📄",
            title: "Multiple File Formats",
            description: "Process PNG, JPG, and PDF check images with ease"
          },
          {
            icon: "🔍",
            title: "Intelligent Analysis",
            description: "Advanced algorithms extract check data accurately"
          },
          {
            icon: "🔄",
            title: "SAP Integration",
            description: "Seamlessly export processed data to SAP systems"
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-sm p-6 rounded-xl border border-blue-800/30"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.5 + index * 0.2,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <motion.div 
              className="text-4xl mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                delay: 0.7 + index * 0.2,
                type: "spring",
                stiffness: 400,
                damping: 10
              }}
            >
              {feature.icon}
            </motion.div>
            <h3 className="text-xl font-montserrat font-semibold text-blue-200 mb-2">{feature.title}</h3>
            <p className="text-blue-300/80 font-poppins text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );

  // Scene 3: Process visualization
  const Scene3 = () => (
    <motion.div 
      className="flex flex-col items-center justify-center text-center z-10 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Main heading */}
      <motion.h2 
        className="text-5xl font-poppins font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Streamlined Workflow
      </motion.h2>
      
      {/* Process steps with flowing animation */}
      <motion.div 
        className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {[
          {
            icon: "📁",
            title: "Upload",
            description: "Select multiple check images or PDFs"
          },
          {
            icon: "⚡",
            title: "Analyze",
            description: "AI-powered data extraction"
          },
          {
            icon: "✅",
            title: "Verify",
            description: "Review and confirm results"
          },
          {
            icon: "🔄",
            title: "Export",
            description: "Send to SAP with one click"
          }
        ].map((step, index) => (
          <div key={index} className="flex items-center">
            {/* Connecting line between steps */}
            {index > 0 && (
              <motion.div 
                className="hidden md:block h-0.5 w-12 bg-gradient-to-r from-blue-500 to-indigo-500"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "48px", opacity: 1 }}
                transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
              />
            )}
            
            {/* Step card */}
            <motion.div
              className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-sm p-6 rounded-xl border border-blue-800/30 w-64"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.5 + index * 0.2,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <motion.div 
                className="text-4xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: 0.7 + index * 0.2,
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }}
              >
                {step.icon}
              </motion.div>
              <h3 className="text-xl font-montserrat font-semibold text-blue-200 mb-2">{step.title}</h3>
              <p className="text-blue-300/80 font-poppins text-sm">{step.description}</p>
              
              {/* Step number */}
              <motion.div 
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.9 + index * 0.2, type: "spring" }}
              >
                {index + 1}
              </motion.div>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );

  // Scene 4: Final call to action
  const Scene4 = () => (
    <motion.div 
      className="flex flex-col items-center justify-center text-center z-10 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Final logo animation */}
      <motion.div
        className="mb-8"
        variants={pulseAnimation(0)}
      >
        <motion.div
          className="text-7xl font-bold font-playfair text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 inline-block"
          initial={{ filter: "blur(10px)" }}
          animate={{ filter: "blur(0px)" }}
          transition={{ duration: 1, type: "tween" }}
        >
          <img src="/logo-check-white.png" alt="Check Logo" className="h-36" />
        </motion.div>
      </motion.div>
      
      {/* Animated tagline with staggered words */}
      <motion.div 
        className="mb-12 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="font-poppins text-2xl text-blue-100 tracking-wide">
          {["Intelligent", "•", "Efficient", "•", "Secure"].map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.8 + index * 0.2,
                duration: 0.6,
                ease: "easeOut"
              }}
              className="inline-block mx-2"
            >
              {word}
            </motion.span>
          ))}
        </div>
      </motion.div>
      
      {/* Animated button */}
      <motion.div
        variants={fadeIn('up', 1.2)}
        className="relative mt-8"
      >
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 rounded-full opacity-70 blur-md"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.button
          className="relative px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-poppins font-medium text-lg"
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.7)",
            textShadow: "0 0 5px rgba(255, 255, 255, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
        >
          <motion.span 
            className="flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Get Started
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
              initial={{ x: -5, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </motion.svg>
          </motion.span>
        </motion.button>
      </motion.div>
      
      {/* Animated particles around button */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 80;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-blue-400"
            style={{
              left: "calc(50%)",
              top: "calc(50% + 80px)",
            }}
            animate={{
              x: [0, x, 0],
              y: [0, y, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              delay: 1.5 + i * 0.1,
              repeat: Infinity,
              repeatDelay: i * 0.2
            }}
          />
        );
      })}
    </motion.div>
  );

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Dynamic background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-black"
        animate={{ 
          background: [
            "radial-gradient(circle at 30% 30%, rgba(30, 58, 138, 0.3), rgba(0, 0, 0, 1) 70%)",
            "radial-gradient(circle at 70% 70%, rgba(30, 58, 138, 0.3), rgba(0, 0, 0, 1) 70%)",
            "radial-gradient(circle at 30% 70%, rgba(30, 58, 138, 0.3), rgba(0, 0, 0, 1) 70%)",
            "radial-gradient(circle at 70% 30%, rgba(30, 58, 138, 0.3), rgba(0, 0, 0, 1) 70%)",
          ]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      />
      
      {/* Floating particles */}
      {Array.from({ length: 30 }).map((_, i) => {
        // Use deterministic positions based on index instead of random
        const size = 2 + (i % 4);
        const speed = 20 + (i % 10);
        const initialX = (i % 10) * 10; // Deterministic X position
        const initialY = Math.floor(i / 10) * 30; // Deterministic Y position
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-400"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${initialX}%`,
              top: `${initialY}%`,
              opacity: 0.3 + (i % 7) * 0.1,
            }}
            animate={{
              y: [0, -500],
              x: [0, Math.sin(i * 0.5) * 50]
            }}
            transition={{
              duration: speed,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              delay: i * 0.2
            }}
          />
        );
      })}
      
      {/* Scene container */}
      <AnimatePresence mode="wait">
        {currentScene === 0 && <Scene1 key="scene1" />}
        {currentScene === 1 && <Scene2 key="scene2" />}
        {currentScene === 2 && <Scene3 key="scene3" />}
        {currentScene === 3 && <Scene4 key="scene4" />}
      </AnimatePresence>
      
      {/* Progress indicator */}
      <ProgressIndicator />
      
      {/* Skip button */}
      <motion.button
        className="absolute bottom-8 right-8 text-gray-400 text-sm flex items-center space-x-2 opacity-70 hover:opacity-100 transition-opacity"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1 }}
        onClick={onComplete}
      >
        <span>Skip Intro</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
    </motion.div>
  );
};

export default SplashScreen;
