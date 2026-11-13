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
          className="absolute rounded-full bg-white/70"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            willChange: "transform",
            animation: `floatParticle ${p.duration}s ease-in-out infinite alternate`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes floatParticle {
          0% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(12px, -24px, 0);
          }
          100% {
            transform: translate3d(-8px, -48px, 0);
          }
        }
      `}</style>
    </div>
  );
}

