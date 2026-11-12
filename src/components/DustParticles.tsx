"use client";

import React, { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function DustParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate realistic floating motes concentrated near the light beam
    const generated: Particle[] = Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      x: 55 + Math.random() * 40, // 55% - 95% right side
      y: 10 + Math.random() * 80, // 10% - 90% height
      size: Math.random() * 2.5 + 1,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.15,
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-white/70 blur-[0.3px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `floatParticle ${p.duration}s ease-in-out infinite alternate`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes floatParticle {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-24px) translateX(12px);
          }
          100% {
            transform: translateY(-48px) translateX(-8px);
          }
        }
      `}</style>
    </div>
  );
}

