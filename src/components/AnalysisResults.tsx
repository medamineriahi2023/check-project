'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnalysisResult } from '@/services/api';

interface AnalysisResultsProps {
  results: AnalysisResult[];
  onExportToSAP: () => void;
  theme?: 'light' | 'dark';
}

export default function AnalysisResults({ results, onExportToSAP, theme = 'light' }: AnalysisResultsProps) {
  const [selectedResult, setSelectedResult] = useState<AnalysisResult | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const isDark = theme === 'dark';

  // Count success and error results
  const successCount = results.filter(r => r.status === 'success').length;
  const errorCount = results.filter(r => r.status === 'error').length;

  // Handle export with loading state
  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExportToSAP();
    } finally {
      setIsExporting(false);
    }
  };

  // Open detail modal for a result
  const openDetail = (result: AnalysisResult) => {
    setSelectedResult(result);
  };

  // Close detail modal
  const closeDetail = () => {
    setSelectedResult(null);
  };

  return (
    <div className={`${isDark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-md rounded-3xl shadow-2xl p-8 border ${isDark ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300`}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Analysis Results</h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="text-sm font-medium">
              <span className={`${isDark ? 'text-green-400' : 'text-green-600'}`}>{successCount} successful</span>
              {errorCount > 0 && (
                <span className={`ml-3 ${isDark ? 'text-red-400' : 'text-red-500'}`}>{errorCount} failed</span>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleExport}
              disabled={successCount === 0 || isExporting}
              className={`px-5 py-2.5 rounded-full text-white text-sm font-medium flex items-center transition-all duration-200 ${
                successCount === 0 || isExporting
                  ? isDark ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-400 cursor-not-allowed'
                  : isDark ? 'bg-green-500 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isExporting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
                  </svg>
                  <span>Export to SAP</span>
                </>
              )}
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 ${
                result.status === 'success' 
                  ? isDark ? 'border-green-500' : 'border-green-500' 
                  : isDark ? 'border-red-500' : 'border-red-500'
              }`}
              onClick={() => openDetail(result)}
            >
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'} truncate max-w-[180px]`} title={result.fileName}>
                      {result.fileName}
                    </h4>
                    <p className="text-sm mt-1">
                      {result.status === 'success' ? (
                        <span className={`${isDark ? 'text-green-400' : 'text-green-600'} font-medium`}>Success</span>
                      ) : (
                        <span className={`${isDark ? 'text-red-400' : 'text-red-500'} font-medium`}>Failed</span>
                      )}
                    </p>
                  </div>
                  <div className={`rounded-full w-9 h-9 flex items-center justify-center ${
                    result.status === 'success' 
                      ? isDark ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-600' 
                      : isDark ? 'bg-red-900/50 text-red-400' : 'bg-red-100 text-red-500'
                  }`}>
                    {result.status === 'success' ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    )}
                  </div>
                </div>
                
                {result.status === 'success' && result.data && (
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Amount:</span>
                      <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{result.data.amount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Date:</span>
                      <span className={`${isDark ? 'text-gray-300' : 'text-gray-800'}`}>{result.data.date}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Payee:</span>
                      <span className={`${isDark ? 'text-gray-300' : 'text-gray-800'} truncate max-w-[150px]`} title={result.data.payee}>
                        {result.data.payee}
                      </span>
                    </div>
                  </div>
                )}
                
                {result.status === 'error' && result.error && (
                  <div className="mt-3">
                    <p className={`text-sm ${isDark ? 'text-red-400' : 'text-red-500'}`}>{result.error}</p>
                  </div>
                )}
                
                <div className={`mt-4 text-xs ${isDark ? 'text-blue-400' : 'text-blue-600'} flex items-center`}>
                  <span>View details</span>
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm"
              onClick={closeDetail}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 20 }}
                className={`${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-xl shadow-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{selectedResult.fileName}</h3>
                      <p className={`text-sm mt-1 ${
                        selectedResult.status === 'success' 
                          ? isDark ? 'text-green-400' : 'text-green-600' 
                          : isDark ? 'text-red-400' : 'text-red-500'
                      }`}>
                        {selectedResult.status === 'success' ? 'Successfully analyzed' : 'Analysis failed'}
                      </p>
                    </div>
                    <button
                      onClick={closeDetail}
                      className={`${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                  
                  {selectedResult.status === 'success' && selectedResult.data && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className={`text-sm uppercase font-semibold mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Check Information</h4>
                          <div className="space-y-3">
                            <div>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Amount</p>
                              <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{selectedResult.data.amount}</p>
                            </div>
                            <div>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Date</p>
                              <p className={`${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{selectedResult.data.date}</p>
                            </div>
                            <div>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Payee</p>
                              <p className={`${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{selectedResult.data.payee}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className={`text-sm uppercase font-semibold mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Bank Details</h4>
                          <div className="space-y-3">
                            <div>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Bank Name</p>
                              <p className={`${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{selectedResult.data.bankName || 'N/A'}</p>
                            </div>
                            <div>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Account Number</p>
                              <p className={`${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{selectedResult.data.accountNumber || 'N/A'}</p>
                            </div>
                            <div>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Routing Number</p>
                              <p className={`${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{selectedResult.data.routingNumber || 'N/A'}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className={`text-sm uppercase font-semibold mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Additional Information</h4>
                        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {selectedResult.data.memo || 'No additional information available.'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={closeDetail}
                          className={`px-5 py-2.5 rounded-full text-sm font-medium ${
                            isDark 
                              ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                          } transition-all duration-200`}
                        >
                          Close
                        </motion.button>
                      </div>
                    </div>
                  )}
                  
                  {selectedResult.status === 'error' && selectedResult.error && (
                    <div className="space-y-6">
                      <div className={`p-4 rounded-lg ${isDark ? 'bg-red-900/20 border border-red-800/30' : 'bg-red-50 border border-red-100'}`}>
                        <h4 className={`text-sm font-semibold mb-2 ${isDark ? 'text-red-400' : 'text-red-600'}`}>Error Details</h4>
                        <p className={`${isDark ? 'text-red-300' : 'text-red-700'}`}>{selectedResult.error}</p>
                      </div>
                      
                      <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <h4 className={`text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Troubleshooting Tips</h4>
                        <ul className={`list-disc pl-5 space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          <li>Ensure the check image is clear and not blurry</li>
                          <li>Make sure all four corners of the check are visible</li>
                          <li>Check that the amount and signature are clearly visible</li>
                          <li>Try uploading the image in a different format (PNG or JPG)</li>
                        </ul>
                      </div>
                      
                      <div className="flex justify-end space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={closeDetail}
                          className={`px-5 py-2.5 rounded-full text-sm font-medium ${
                            isDark 
                              ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                          } transition-all duration-200`}
                        >
                          Close
                        </motion.button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
