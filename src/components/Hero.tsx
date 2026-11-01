"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Filmstrip from "./Filmstrip";
import DustParticles from "./DustParticles";
import DownloadResumeButton from "./DownloadResumeButton";

interface HeroProps {
  onResumeClick: () => void;
}

export default function Hero({ onResumeClick }: HeroProps) {
  // Parallax 3D tilt effect on the polaroid card
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    damping: 20,
    stiffness: 150,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    damping: 20,
    stiffness: 150,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#070709] select-none"
    >
      {/* Background Image: The noir desk & lamp scene, shifted left to join seamlessly with the sidebar */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Vintage Noir Studio Workspace"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[15%_center] md:object-[10%_center] filter brightness-[0.98] contrast-[1.05]"
        />

        {/* Ambient subtle darkening gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />

        {/* Automatic Breathing Lamp Light Beam (dims and brightens every 2 seconds) */}
        <div className="absolute inset-0 pointer-events-none animate-lamp-breath">
          <div className="lamp-glow-cone absolute inset-0" />
          <DustParticles />
        </div>
      </div>

      {/* Main Content Composition Container: Joined close to sidebar with no black dead space */}
      <div className="relative z-10 w-full md:pl-56 lg:pl-64 pr-4 sm:pr-8 lg:pr-14 min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* LEFT: Filmstrip + Polaroid Frame (Increased Size) */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-start gap-3 sm:gap-5">
            
            {/* 35mm Filmstrip */}
            <Filmstrip />

            {/* Polaroid Container with 3D Parallax */}
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              initial={{ opacity: 0, y: 30, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: -3.5 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative group cursor-pointer"
            >
              {/* Outer soft shadow onto the vintage desk */}
              <div className="relative rounded-sm transition-all duration-300 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] group-hover:drop-shadow-[0_28px_45px_rgba(0,0,0,0.95)]">
                
                {/* Polaroid Image - Sized Up */}
                <div className="relative w-[310px] sm:w-[370px] md:w-[410px] lg:w-[440px] xl:w-[465px] aspect-[807/1024]">
                  <Image
                    src="/images/soumyadip-polaroid.png"
                    alt="Soumyadip Sen - Vintage Portrait"
                    fill
                    sizes="(max-width: 640px) 310px, (max-width: 768px) 370px, (max-width: 1024px) 410px, 465px"
                    priority
                    className="object-contain pointer-events-none select-none transition-transform duration-500 group-hover:scale-[1.01]"
                  />

                  {/* '06 Vintage Typewriter Stamp in bottom right corner */}
                  <div
                    className="absolute right-7 bottom-6 sm:right-8 sm:bottom-7 font-typewriter text-zinc-800 text-sm sm:text-base font-bold tracking-widest select-none opacity-90 drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)] pointer-events-none"
                    style={{
                      transform: "rotate(-2deg)",
                    }}
                  >
                    &apos;06
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Lifted Up Area Just Below The Lamp with Signature & Download Resume */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left -mt-4 sm:-mt-8 lg:-mt-24 xl:-mt-28">
            
            {/* The Handwritten Signature - Lifted Up & Sized Up with Automatic Pulse */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[480px] sm:max-w-[560px] md:max-w-[640px] lg:max-w-[700px] xl:max-w-[740px] aspect-[1024/341] animate-signature-pulse"
            >
              <Image
                src="/images/signature.png"
                alt="Soumyadip Sen Signature"
                fill
                priority
                sizes="(max-width: 640px) 480px, (max-width: 768px) 560px, (max-width: 1024px) 640px, 740px"
                className="object-contain"
              />
            </motion.div>

            {/* Vintage Typewriter Download Resume Button - Adjusted Alignment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 sm:mt-8 lg:mt-9"
            >
              <DownloadResumeButton />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Subtle bottom scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:pl-28 z-20 flex flex-col items-center gap-1 opacity-40 hover:opacity-80 transition-opacity">
        <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
          Scroll
        </span>
        <div className="w-1 h-3 rounded-full bg-zinc-500 animate-bounce" />
      </div>
    </section>
  );
}
