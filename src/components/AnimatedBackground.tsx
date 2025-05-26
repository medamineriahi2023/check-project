'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  scene: number;
}

const AnimatedBackground = ({ scene }: AnimatedBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Create particles
    const particleCount = 100;
    const particles: Particle[] = [];
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        
        // Color based on current scene
        const colors = [
          ['#3b82f6', '#60a5fa', '#93c5fd'], // Scene 1: Blue theme
          ['#8b5cf6', '#a78bfa', '#c4b5fd'], // Scene 2: Purple theme
          ['#10b981', '#34d399', '#6ee7b7'], // Scene 3: Green theme
          ['#f59e0b', '#fbbf24', '#fcd34d']  // Scene 4: Yellow theme
        ];
        
        const sceneColors = colors[Math.min(scene, colors.length - 1)];
        this.color = sceneColors[Math.floor(Math.random() * sceneColors.length)];
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Connect particles with lines
    const connectParticles = () => {
      const maxDistance = 150;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            if (!ctx) return;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 130, 246, ${1 - distance / maxDistance})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Animation loop
    let animationFrameId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
      
      connectParticles();
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Scene-specific animations
    switch (scene) {
      case 0: // Scene 1
        // Default animation
        break;
      case 1: // Scene 2
        // Swirl effect
        for (const particle of particles) {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const dx = particle.x - centerX;
          const dy = particle.y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > 0) {
            particle.speedX += -dy / distance * 0.01;
            particle.speedY += dx / distance * 0.01;
          }
        }
        break;
      case 2: // Scene 3
        // Grid alignment
        for (const particle of particles) {
          const gridSize = 50;
          const targetX = Math.round(particle.x / gridSize) * gridSize;
          const targetY = Math.round(particle.y / gridSize) * gridSize;
          
          particle.speedX = (targetX - particle.x) * 0.02;
          particle.speedY = (targetY - particle.y) * 0.02;
        }
        break;
      case 3: // Scene 4
        // Explosion effect
        for (const particle of particles) {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const dx = particle.x - centerX;
          const dy = particle.y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > 0) {
            particle.speedX = dx / distance * 2;
            particle.speedY = dy / distance * 2;
          }
        }
        break;
    }
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scene]);
  
  return (
    <motion.div
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ mixBlendMode: 'screen' }}
      />
    </motion.div>
  );
};

export default AnimatedBackground;
