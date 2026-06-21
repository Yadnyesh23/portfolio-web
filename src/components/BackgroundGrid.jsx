import React from 'react';
import { motion } from 'framer-motion';

export default function BackgroundGrid() {
  // Generate random positions for floating particles
  const particles = Array.from({ length: 25 }).map((_, idx) => ({
    id: idx,
    x: Math.random() * 100, // percentage
    y: Math.random() * 100, // percentage
    size: Math.random() * 2 + 1, // 1px to 3px
    duration: Math.random() * 10 + 15, // 15s to 25s
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 w-full h-full -z-50 bg-bg-dark overflow-hidden pointer-events-none">
      {/* Dynamic Animated Gradient Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent-blue/10 blur-[150px] animate-blob-1" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent-blue/5 blur-[120px] animate-blob-2" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-80" />

      {/* Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white opacity-20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}
