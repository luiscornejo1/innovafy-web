"use client";

import { motion } from "motion/react";

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#f8f9fa] pointer-events-none">
      {/* Magenta Blob */}
      <motion.div
        animate={{
          x: [0, 150, -100, 0],
          y: [0, -150, 100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full opacity-60 mix-blend-multiply"
        style={{
          background: "radial-gradient(circle, rgba(255,0,255,0.7) 0%, rgba(255,0,255,0) 70%)",
        }}
      />
      
      {/* Cyan Blob */}
      <motion.div
        animate={{
          x: [0, -180, 120, 0],
          y: [0, 120, -150, 0],
          scale: [1, 1.1, 1.3, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full opacity-60 mix-blend-multiply"
        style={{
          background: "radial-gradient(circle, rgba(0,255,255,0.7) 0%, rgba(0,255,255,0) 70%)",
        }}
      />
      
      {/* Blue Blob */}
      <motion.div
        animate={{
          x: [0, 120, -150, 0],
          y: [0, 150, -120, 0],
          scale: [1, 1.3, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[-10%] left-[20%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full opacity-50 mix-blend-multiply"
        style={{
          background: "radial-gradient(circle, rgba(0,0,255,0.6) 0%, rgba(0,0,255,0) 70%)",
        }}
      />
      
      {/* White Overlay Blob to blend colors better */}
      <motion.div
        animate={{
          x: [0, -50, 50, 0],
          y: [0, 50, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full mix-blend-overlay"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
        }}
      />
    </div>
  );
}
