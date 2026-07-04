import React from 'react';
import { motion } from 'motion/react';

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-50 bg-[#050505] overflow-hidden">
      {/* Subtle Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Floating Cyan Halo */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-600/10 blur-[100px]"
        animate={{
          x: [-50, 100, -50],
          y: [-100, 50, -100],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          top: '10%',
          left: '10%',
        }}
      />

      {/* Floating Deep Blue Halo */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-600/10 to-violet-600/10 blur-[120px]"
        animate={{
          x: [150, -50, 150],
          y: [100, -100, 100],
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          bottom: '10%',
          right: '5%',
        }}
      />

      {/* Center Subtle Flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[80px]" />
    </div>
  );
}
