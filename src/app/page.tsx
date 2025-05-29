'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';
import SplashScreen from '@/components/SplashScreen';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Home() {
  // State
  const [showIntro, setShowIntro] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Effect to check system theme preference
  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(isDarkMode ? 'dark' : 'light');

    // Apply theme class to document
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  // Handle theme toggle
  const handleThemeToggle = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      return newTheme;
    });
  };

  // Skip intro animation
  const handleSkipIntro = () => {
    setShowIntro(false);
  };

  // Handle ESC key to skip intro
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showIntro) {
        handleSkipIntro();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showIntro]);

  // Scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
          <>
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
              <AnimatedBackground scene={0} />
            </div>

            {/* Navigation */}
            <motion.nav
              className="sticky top-0 z-40 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-sm"
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="container mx-auto p-6 flex justify-between items-center">
                <motion.div
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <img src="/logo-check.png" alt="Check Logo" className="h-16" />
                </motion.div>

                <motion.div
                  className="hidden md:flex space-x-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, staggerChildren: 0.1 }}
                >
                  <motion.button
                    onClick={() => scrollToSection('features')}
                    className="font-medium hover:text-blue-500 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Features
                  </motion.button>
                  <motion.button
                    onClick={() => scrollToSection('benefits')}
                    className="font-medium hover:text-blue-500 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Benefits
                  </motion.button>
                  <motion.button
                    onClick={() => scrollToSection('testimonials')}
                    className="font-medium hover:text-blue-500 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Testimonials
                  </motion.button>
                  <motion.button
                    onClick={() => scrollToSection('contact')}
                    className="font-medium hover:text-blue-500 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Contact
                  </motion.button>
                </motion.div>

                <motion.button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => scrollToSection('contact')}
                >
                  Talk to Sales
                </motion.button>
              </div>
            </motion.nav>

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center">
              <div className="container mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <motion.h1
                    className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                      Revolutionize
                    </span> Your Check Processing Workflow
                  </motion.h1>

                  <motion.p
                    className="text-xl text-gray-600 dark:text-gray-300 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    Streamline your financial operations with our advanced check processing system.
                    Automate data extraction, reduce errors, and seamlessly integrate with SAP.
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                  >
                    <motion.button
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection('contact')}
                    >
                      Schedule a Demo
                    </motion.button>

                    <motion.button
                      className="bg-transparent border border-blue-500 text-blue-500 dark:text-blue-400 px-8 py-3 rounded-full font-medium hover:bg-blue-500/10 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection('features')}
                    >
                      Explore Features
                    </motion.button>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <div className="relative z-10 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-4 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/20">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="w-32 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg shadow-lg transform -rotate-6"></div>
                        <div className="w-full h-8 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
                        <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-700 rounded-md mb-2 mx-auto"></div>
                        <div className="w-1/2 h-4 bg-gray-200 dark:bg-gray-700 rounded-md mx-auto"></div>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div className="h-2 bg-blue-400/50 rounded-full"></div>
                      <div className="h-2 bg-purple-400/50 rounded-full"></div>
                      <div className="h-2 bg-blue-400/50 rounded-full"></div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"></div>
                </motion.div>
              </div>

              {/* Scroll indicator */}
              <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <motion.div
                  className="w-8 h-12 border-2 border-blue-500 rounded-full flex justify-center"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <motion.div
                    className="w-1.5 h-3 bg-blue-500 rounded-full mt-2"
                    animate={{ y: [0, 16, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                </motion.div>
              </motion.div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800/50">
              <div className="container mx-auto px-4">
                <motion.div
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Our advanced check processing system comes with everything you need to streamline your financial operations.
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: (
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      ),
                      title: "Multi-Format Support",
                      description: "Process checks in various formats including PNG, JPG, and PDF with our intelligent recognition system."
                    },
                    {
                      icon: (
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      ),
                      title: "AI-Powered Analysis",
                      description: "Our advanced algorithms extract data with high accuracy, reducing manual entry and errors."
                    },
                    {
                      icon: (
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                      ),
                      title: "SAP Integration",
                      description: "Seamlessly export processed check data directly to your SAP system with one click."
                    },
                    {
                      icon: (
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                      ),
                      title: "Secure Processing",
                      description: "Bank-grade security ensures your financial data remains protected throughout the process."
                    },
                    {
                      icon: (
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      ),
                      title: "Real-time Processing",
                      description: "Process checks in real-time with immediate feedback and validation of the extracted data."
                    },
                    {
                      icon: (
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      ),
                      title: "Comprehensive Analytics",
                      description: "Gain insights into your check processing with detailed analytics and reporting."
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <motion.div
                        className="text-blue-500 mb-4"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 300, delay: index * 0.1 + 0.2 }}
                      >
                        {feature.icon}
                      </motion.div>
                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section id="benefits" className="py-20">
              <div className="container mx-auto px-4">
                <motion.div
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose CHECK</h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Our solution delivers measurable benefits that improve your financial operations.
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-16 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="relative">
                      <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-3/4 h-3/4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 flex flex-col justify-between">
                            <div className="flex justify-between items-center mb-8">
                              <div className="w-16 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg"></div>
                              <div className="flex space-x-2">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="w-full h-4 bg-gray-200/20 rounded-md"></div>
                              <div className="w-5/6 h-4 bg-gray-200/20 rounded-md"></div>
                              <div className="w-4/6 h-4 bg-gray-200/20 rounded-md"></div>
                            </div>
                            <div className="mt-8 grid grid-cols-3 gap-4">
                              <div className="h-16 bg-blue-400/20 rounded-lg"></div>
                              <div className="h-16 bg-purple-400/20 rounded-lg"></div>
                              <div className="h-16 bg-blue-400/20 rounded-lg"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
                      <div className="absolute -top-8 -left-8 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"></div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="space-y-8">
                      {[
                        {
                          title: "Reduce Processing Time by 85%",
                          description: "Automate check processing and eliminate manual data entry, saving hours of work every day."
                        },
                        {
                          title: "Improve Accuracy to 99.8%",
                          description: "Our AI-powered recognition system minimizes errors and ensures data integrity."
                        },
                        {
                          title: "Cut Operational Costs by 60%",
                          description: "Streamline workflows and reduce the resources needed for check processing."
                        },
                        {
                          title: "Enhance Compliance & Security",
                          description: "Meet regulatory requirements with our secure, auditable processing system."
                        }
                      ].map((benefit, index) => (
                        <motion.div
                          key={index}
                          className="flex gap-4"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800/50">
              <div className="container mx-auto px-4">
                <motion.div
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Trusted by financial institutions and businesses of all sizes.
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      quote: "CHECK has transformed our accounts payable process. We've reduced processing time by 80% and virtually eliminated manual errors.",
                      author: "Sarah Johnson",
                      position: "CFO, Global Financial Services",
                      avatar: "👩‍💼"
                    },
                    {
                      quote: "The SAP integration is seamless. Our financial data flows automatically into our ERP system, saving us countless hours of work.",
                      author: "Michael Chen",
                      position: "IT Director, Retail Chain",
                      avatar: "👨‍💼"
                    },
                    {
                      quote: "Customer support is exceptional. The team helped us customize the solution to our specific needs and was always available when we needed them.",
                      author: "Emma Rodriguez",
                      position: "Operations Manager, Healthcare Provider",
                      avatar: "👩‍⚕️"
                    }
                  ].map((testimonial, index) => (
                    <motion.div
                      key={index}
                      className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="text-5xl mb-4 text-blue-500">❝</div>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 italic">"{testimonial.quote}"</p>
                      <div className="flex items-center">
                        <div className="text-3xl mr-4">{testimonial.avatar}</div>
                        <div>
                          <h4 className="font-bold">{testimonial.author}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.position}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20">
              <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="grid md:grid-cols-2">
                    <motion.div
                      className="p-8 md:p-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                      <p className="mb-8">
                        Ready to transform your check processing workflow? Our team is here to help you get started.
                      </p>

                      <div className="space-y-6">
                        <div className="flex items-center">
                          <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>+1 (555) 123-4567</span>
                        </div>

                        <div className="flex items-center">
                          <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>sales@checkprocessing.com</span>
                        </div>

                        <div className="flex items-center">
                          <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>123 Business Avenue, Suite 500<br />San Francisco, CA 94107</span>
                        </div>
                      </div>

                      <div className="mt-10">
                        <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                          <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                          </a>
                          <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                          </a>
                          <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="p-8 md:p-12"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      <h2 className="text-2xl font-bold mb-6">Contact Sales</h2>
                      <p className="mb-8 text-gray-600 dark:text-gray-400">
                        Fill out the form below and our sales team will get back to you within 24 hours.
                      </p>

                      <form className="space-y-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="John Doe"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="john@example.com"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Company
                          </label>
                          <input
                            type="text"
                            id="company"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your Company"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Message
                          </label>
                          <textarea
                            id="message"
                            rows={4}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="How can we help you?"
                          ></textarea>
                        </div>
                        
                        <motion.button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Send Message
                        </motion.button>
                      </form>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>

            {/* Call Sales Section */}
            <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <div className="container mx-auto px-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Check Processing?</h2>
                  <p className="text-xl mb-8 max-w-3xl mx-auto">
                    Our sales team is ready to help you implement the perfect solution for your business needs.
                  </p>
                  <motion.div
                    className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-full font-bold shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Sales: +1 (555) 123-4567
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
              <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">CHECK</h3>
                    <p className="text-gray-400 mb-4">
                      Advanced check processing solution with seamless SAP integration.
                    </p>
                    <div className="flex space-x-4">
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-4">Product</h3>
                    <ul className="space-y-2">
                      <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                      <li><a href="#benefits" className="text-gray-400 hover:text-white transition-colors">Benefits</a></li>
                      <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                      <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                      <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Release Notes</a></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-4">Company</h3>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                      <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                      <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Customers</a></li>
                      <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Partners</a></li>
                      <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-4">Resources</h3>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                      <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Webinars</a></li>
                      <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Case Studies</a></li>
                      <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                      <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Documentation</a></li>
                    </ul>
                  </div>
                </div>
                
                <div className="pt-8 mt-8 border-t border-gray-800 text-center text-gray-500">
                  <p>&copy; {new Date().getFullYear()} CHECK Processing. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </>
        )}
      </AnimatePresence>

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
