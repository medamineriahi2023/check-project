'use client';

import { motion } from 'framer-motion';
import { textContainer, textLetter } from '@/hooks/useAnimations';

interface AnimatedTextProps {
  text: string;
  className?: string;
  charDelay?: number;
}

const AnimatedText = ({ text, className = '', charDelay = 0.04 }: AnimatedTextProps) => {
  return (
    <motion.div
      variants={textContainer}
      initial="hidden"
      animate="show"
      className={`w-full flex justify-center items-center ${className}`}
    >
      <div className="flex overflow-hidden">
        {Array.from(text).map((letter, index) => (
          <motion.span
            variants={textLetter}
            key={index}
            custom={index}
            className={letter === ' ' ? 'mr-2' : ''}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default AnimatedText;
