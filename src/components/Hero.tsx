"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Filmstrip from "./Filmstrip";
import DustParticles from "./DustParticles";
import DownloadResumeButton from "./DownloadResumeButton";

interface HeroProps {
  onResumeClick: () => void;
}

export default function Hero({ onResumeClick }: HeroProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Parallax 3D tilt effect on the polaroid card
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    damping: 24,
    stiffness: 160,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    damping: 24,
    stiffness: 160,
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
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#121214] vintage-charcoal-bg select-none"
    >
      {/* Background Image: The noir desk & lamp scene (Desktop Only) */}
      <div className="hidden md:block absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Vintage Noir Studio Workspace"
          fill
          priority
          sizes="(min-width: 768px) 100vw, 1px"
          className="object-cover object-[15%_center] md:object-[10%_center] filter brightness-[0.98] contrast-[1.05]"
        />

        {/* Ambient subtle darkening gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />

        {/* Ambient calm desk lighting & subtle dust particles (No pulsating or glowy VFX) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="lamp-glow-cone absolute inset-0 opacity-40" />
          <DustParticles />
        </div>
      </div>

      {/* Main Content Composition Container: Joined close to sidebar with no black dead space */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-0 md:pl-56 lg:pl-64 md:pr-4 sm:pr-8 lg:pr-14 min-h-screen flex flex-col justify-center pt-14 sm:pt-16 md:pt-0 pb-8 md:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* LEFT: Filmstrip + Polaroid Frame */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-start gap-3 sm:gap-5">
            
            {/* 35mm Filmstrip: Smooth downward mechanical slide into projector gate */}
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
              transition={{ duration: 1.0, delay: 0.08, ease: [0.19, 1, 0.22, 1] }}
              className="shrink-0 transform-gpu cursor-pointer"
            >
              <Filmstrip />
            </motion.div>

            {/* Polaroid Container: Physical photograph placement with organic rotational settle */}
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              initial={{ opacity: 0, y: -50, scale: 1.05, rotate: -6 }}
              animate={
                isMounted
                  ? { opacity: 1, y: 0, scale: 1, rotate: -3.5 }
                  : { opacity: 0, y: -50, scale: 1.05, rotate: -6 }
              }
              transition={{ duration: 1.15, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
              className="relative group cursor-pointer transform-gpu"
              data-cursor="image"
              data-cursor-label="ME"
            >
              {/* Outer clean physical shadow onto the vintage desk */}
              <div className="relative rounded-sm filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]">
                
                {/* Polaroid Image */}
                <div className="relative w-[275px] sm:w-[340px] md:w-[410px] lg:w-[440px] xl:w-[465px] aspect-[807/1024]">
                  <Image
                    src="/images/soumyadip-polaroid.png"
                    alt="Soumyadip Sen - Vintage Portrait"
                    fill
                    sizes="(max-width: 640px) 275px, (max-width: 768px) 340px, (max-width: 1024px) 410px, 465px"
                    priority
                    className="object-contain pointer-events-none select-none transition-transform duration-500 group-hover:scale-[1.01]"
                  />

                  {/* '06 Vintage Typewriter Stamp - Mechanical Ink Strike */}
                  <motion.div
                    initial={{ opacity: 0, scale: 1.5, rotate: -15 }}
                    animate={
                      isMounted
                        ? { opacity: 0.95, scale: 1, rotate: -2.5 }
                        : { opacity: 0, scale: 1.5, rotate: -15 }
                    }
                    transition={{
                      duration: 0.55,
                      delay: 0.75,
                      type: "spring",
                      stiffness: 350,
                      damping: 22,
                    }}
                    className="absolute right-9 bottom-7 sm:right-11 sm:bottom-9 md:right-12 md:bottom-10 lg:right-14 lg:bottom-11 font-typewriter text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-black text-[#11100e] tracking-widest select-none drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] pointer-events-none"
                  >
                    &apos;06
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Lifted Up Area Just Below The Lamp with Signature & Download Resume */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left -mt-4 sm:-mt-8 lg:-mt-24 xl:-mt-28">
            
            {/* The Handwritten Signature - Clean Matte Ink Sweep across the Desk */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.95, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
              whileHover={{ scale: 1.015, transition: { duration: 0.25 } }}
              className="relative w-full max-w-[320px] sm:max-w-[440px] md:max-w-[560px] lg:max-w-[700px] xl:max-w-[740px] aspect-[1024/341] cursor-pointer transform-gpu"
              data-cursor="interactive"
              data-cursor-label="SOUMYADIP // SIGNATURE"
            >
              {/* Progressive Left-to-Right Ink Stroke Sweep (Crisp Matte, Zero Glow, Gracefully Paced) */}
              <motion.div
                initial={{ clipPath: "inset(0% 100% 0% 0%)", opacity: 0 }}
                animate={
                  isMounted
                    ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
                    : { clipPath: "inset(0% 100% 0% 0%)", opacity: 0 }
                }
                transition={{
                  clipPath: { duration: 2.35, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] },
                  opacity: { duration: 0.2, delay: 0.35 },
                }}
                className="relative w-full h-full overflow-hidden"
              >
                <Image
                  src="/images/signature.png"
                  alt="Soumyadip Sen Signature"
                  fill
                  priority
                  sizes="(max-width: 640px) 320px, (max-width: 768px) 440px, (max-width: 1024px) 640px, 740px"
                  className="object-contain"
                />
              </motion.div>
            </motion.div>

            {/* Vintage Typewriter Download Resume Button - Tactile Stamp Reveal after Signature */}
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.92 }}
              animate={
                isMounted
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 18, scale: 0.92 }
              }
              transition={{ duration: 0.75, delay: 2.15, ease: [0.19, 1, 0.22, 1] }}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              className="mt-5 sm:mt-7 lg:mt-9 self-center lg:self-start lg:ml-28 xl:ml-36 transform-gpu"
            >
              <DownloadResumeButton />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Subtle bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isMounted ? { opacity: 0.45, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.8, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 md:pl-28 z-20 flex flex-col items-center gap-1 hover:opacity-85 transition-opacity"
      >
        <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
          Scroll
        </span>
        <div className="w-1 h-3 rounded-full bg-zinc-500 animate-bounce" />
      </motion.div>
    </section>
  );
}
