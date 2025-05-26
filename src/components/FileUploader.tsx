'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  isAnalyzing?: boolean;
  theme?: 'light' | 'dark';
}

export default function FileUploader({ onFilesSelected, isAnalyzing = false, theme = 'light' }: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isDark = theme === 'dark';

  // Handle dropped files
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Filter out duplicate files
    const newFiles = acceptedFiles.filter(
      (newFile) => !files.some((existingFile) => 
        existingFile.name === newFile.name && 
        existingFile.size === newFile.size
      )
    );
    
    if (newFiles.length > 0) {
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
    }
  }, [files]);

  // Configure dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'application/pdf': []
    },
    maxSize: 10485760, // 10MB
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    onDropAccepted: () => setIsDragging(false),
    onDropRejected: () => setIsDragging(false)
  });

  // Trigger file input click
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Remove a file from the list
  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  // Clear all files
  const clearFiles = () => {
    setFiles([]);
  };

  // Submit files for analysis
  const handleSubmit = () => {
    if (files.length > 0) {
      onFilesSelected(files);
    }
  };

  // Get file icon based on type
  const getFileIcon = (file: File) => {
    if (file.type.includes('pdf')) {
      return (
        <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path>
        </svg>
      );
    } else {
      return (
        <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
        </svg>
      );
    }
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className={`${isDark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-md rounded-3xl shadow-2xl p-8 mb-10 border ${isDark ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300`}>
      <div className="space-y-6">
        <div 
          {...getRootProps()} 
          className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ease-in-out ${
            isDragActive || isDragging
              ? isDark 
                ? 'border-blue-400 bg-blue-900/20' 
                : 'border-blue-500 bg-blue-50'
              : isDark
                ? 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
                : 'border-gray-300 hover:border-gray-400 bg-gray-50'
          }`}
        >
          <input {...getInputProps()} ref={fileInputRef} />
          
          <div className="flex flex-col items-center justify-center text-center">
            <motion.div
              animate={{
                y: isDragActive ? [0, -10, 0] : 0,
                scale: isDragActive ? 1.05 : 1
              }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              <svg 
                className={`w-16 h-16 ${
                  isDragActive 
                    ? 'text-blue-500' 
                    : isDark ? 'text-gray-400' : 'text-gray-400'
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="1.5" 
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
            </motion.div>
            
            <h3 className={`text-lg font-medium ${
              isDragActive 
                ? isDark ? 'text-blue-400' : 'text-blue-600' 
                : isDark ? 'text-gray-200' : 'text-gray-700'
            }`}>
              {isDragActive ? 'Drop files here' : 'Drag and drop check images'}
            </h3>
            
            <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Upload PNG, JPG, or PDF files (max 10MB each)
            </p>
            
            <div className="mt-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleButtonClick}
                type="button"
                className={`inline-flex items-center px-5 py-2.5 rounded-full shadow-sm text-sm font-medium ${
                  isDark 
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 border-gray-600' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200`}
              >
                <svg className={`-ml-1 mr-2 h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Browse Files
              </motion.button>
            </div>
          </div>
          
          {/* Animated particles when dragging */}
          <AnimatePresence>
            {isDragging && (
              <>
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      opacity: 0,
                      x: Math.random() * 400 - 200,
                      y: Math.random() * 400 - 200,
                      scale: 0
                    }}
                    animate={{ 
                      opacity: [0, 0.8, 0],
                      x: Math.random() * 400 - 200,
                      y: Math.random() * 400 - 200,
                      scale: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    className={`absolute w-3 h-3 rounded-full ${isDark ? 'bg-blue-500/60' : 'bg-blue-400'}`}
                    style={{
                      top: '50%',
                      left: '50%',
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                Selected Files ({files.length})
              </h4>
              <button
                onClick={clearFiles}
                className={`text-sm ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
              >
                Clear All
              </button>
            </div>
            
            <div className={`max-h-60 overflow-y-auto pr-2 space-y-2 ${isDark ? 'scrollbar-dark' : 'scrollbar-light'}`}>
              {files.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`}
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    {getFileIcon(file)}
                    <div className="overflow-hidden">
                      <p className={`font-medium truncate max-w-[200px] ${isDark ? 'text-gray-200' : 'text-gray-700'}`} title={file.name}>
                        {file.name}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className={`p-1 rounded-full ${isDark ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'} transition-colors`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </motion.div>
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={isAnalyzing}
              className={`w-full py-3 px-4 rounded-xl font-medium text-white transition-all duration-200 ${
                isAnalyzing
                  ? isDark ? 'bg-blue-600/50 cursor-not-allowed' : 'bg-blue-400 cursor-not-allowed'
                  : isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
              } shadow-lg ${isDark ? 'shadow-blue-900/20' : 'shadow-blue-500/20'}`}
            >
              {isAnalyzing ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Analyzing...</span>
                </div>
              ) : (
                <span>Analyze Checks</span>
              )}
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
