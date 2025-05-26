'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AnimatedLogoProps {
  size?: number;
  color?: string;
  glowColor?: string;
  glowIntensity?: number;
}

const AnimatedLogo = ({
  size = 200,
  color = '#3b82f6',
  glowColor = '#60a5fa',
  glowIntensity = 10
}: AnimatedLogoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = size;
    canvas.height = size;
    
    // Animation variables
    let angle = 0;
    let hue = 0;
    const particles: Particle[] = [];
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      life: number;
      
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = color;
        this.life = 100;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 1;
        
        if (this.size > 0.2) this.size -= 0.05;
      }
      
      draw() {
        ctx!.fillStyle = this.color;
        ctx!.globalAlpha = this.life / 100;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }
    
    // Draw the check logo
    const drawLogo = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw outer circle
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2 - 10, 0, Math.PI * 2);
      ctx.stroke();
      
      // Draw checkmark
      ctx.strokeStyle = color;
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      // Calculate checkmark points with animation
      const startX = size * 0.25;
      const midX = size * 0.45;
      const endX = size * 0.75;
      
      const startY = size * 0.5;
      const midY = size * 0.65 + Math.sin(angle) * 5;
      const endY = size * 0.35 + Math.sin(angle + 1) * 5;
      
      // Draw the checkmark path
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(midX, midY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      
      // Add glow effect
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = glowIntensity + Math.sin(angle * 2) * 5;
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // Add particles at checkmark points
      if (Math.random() > 0.7) {
        particles.push(new Particle(startX, startY));
        particles.push(new Particle(midX, midY));
        particles.push(new Particle(endX, endY));
      }
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Remove dead particles
        if (particles[i].life <= 0 || particles[i].size <= 0.2) {
          particles.splice(i, 1);
          i--;
        }
      }
      
      // Update animation variables
      angle += 0.02;
      hue += 0.5;
    };
    
    // Animation loop
    let animationId: number;
    const animate = () => {
      drawLogo();
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [size, color, glowColor, glowIntensity]);
  
  return (
    <motion.div
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 1.5
      }}
      className="relative"
      style={{ width: size, height: size }}
    >
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="absolute top-0 left-0"
      />
    </motion.div>
  );
};

export default AnimatedLogo;
