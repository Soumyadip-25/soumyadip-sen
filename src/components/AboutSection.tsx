"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { GraduationCap, MapPin } from "lucide-react";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#070709] select-none"
    >
      {/* Full Bleed Parchment Background Image - Edge to edge from sidebar to right viewport */}
      <div className="absolute inset-0 z-0 md:left-52 lg:left-56">
        <Image
          src="/images/about-bg-flush.jpg"
          alt="Vintage Parchment Dossier"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter contrast-[1.03] brightness-[0.98]"
        />
        {/* Subtle vintage ink wash */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </div>

      {/* Content Layer directly on the full-bleed parchment */}
      <div className="relative z-10 w-full min-h-screen md:pl-52 lg:pl-56 flex flex-col justify-between px-6 sm:px-10 md:px-12 lg:px-16 pt-8 sm:pt-12 pb-24 sm:pb-32">
        
        {/* Centered Main Dossier: Typography Block shifted towards center + Polaroid Portrait */}
        <div className="w-full max-w-6xl mx-auto my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Typography Block: Shifted inwards to the right towards the center */}
            <div className="lg:col-span-7 flex flex-col items-start pl-2 sm:pl-8 md:pl-12 lg:pl-16 xl:pl-20">
              
              {/* "About Me" Typewriter Title: Tactile Mechanical Ink Stamp Settle */}
              <motion.div
                initial={{ opacity: 0, x: -35, scale: 1.06, rotate: -3 }}
                whileInView={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.95, ease: [0.19, 1, 0.22, 1] }}
                whileHover={{ scale: 1.03, rotate: 1 }}
                className="relative w-56 sm:w-64 md:w-72 lg:w-80 aspect-[1024/341] mb-3 sm:mb-4 cursor-pointer transform-gpu"
                data-cursor="interactive"
                data-cursor-label="ABOUT ME // DOSSIER"
              >
                <Image
                  src="/images/about-me-title.png"
                  alt="About Me"
                  fill
                  priority
                  sizes="(max-width: 640px) 224px, (max-width: 768px) 288px, 320px"
                  className="object-contain object-left pointer-events-none select-none"
                />
              </motion.div>

              {/* Core Bio Statement: Smooth Carriage Glide */}
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.95, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
                className="font-typewriter text-[#161412] text-base sm:text-lg md:text-xl lg:text-[20px] leading-relaxed font-bold tracking-wide max-w-xl transform-gpu"
              >
                A tech enthusiast and problem solver with a passion for building impactful solutions at the intersection of AI, full-stack development, and real-world innovation.
              </motion.p>

              {/* Structured Extra Information: College Education & Address (No CGPA, No Tech Stacks) */}
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, delay: 0.32, ease: [0.19, 1, 0.22, 1] }}
                className="mt-6 sm:mt-7 space-y-3.5 font-typewriter text-[#181614] max-w-xl transform-gpu"
              >
                {/* College & Degree */}
                <motion.div
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="flex items-start gap-3 cursor-pointer group/edu p-2 -ml-2 rounded-lg hover:bg-black/[0.04] transition-colors"
                  data-cursor="interactive"
                  data-cursor-label="ADAMAS // CSE '28"
                >
                  <GraduationCap className="w-5 h-5 text-[#181614] shrink-0 mt-0.5 stroke-[2.2] group-hover/edu:scale-115 group-hover/edu:rotate-[-6deg] transition-transform duration-200" />
                  <div className="space-y-0.5">
                    <div className="text-base sm:text-lg font-bold tracking-tight text-[#12100e]">
                      B.Tech in Computer Science &amp; Engineering
                    </div>
                    <div className="text-sm sm:text-[15px] text-[#2e2922] font-semibold">
                      Adamas University (2024 — 2028)
                    </div>
                  </div>
                </motion.div>

                {/* Address / Location */}
                <motion.div
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="flex items-center gap-3 pt-0.5 cursor-pointer group/loc p-2 -ml-2 rounded-lg hover:bg-black/[0.04] transition-colors"
                  data-cursor="interactive"
                  data-cursor-label="KOLKATA // INDIA"
                >
                  <MapPin className="w-5 h-5 text-[#181614] shrink-0 stroke-[2.2] group-hover/loc:scale-115 group-hover/loc:-translate-y-0.5 transition-transform duration-200" />
                  <span className="text-sm sm:text-[15px] font-semibold text-[#181614]">
                    Barrackpore, Kolkata, West Bengal, India
                  </span>
                </motion.div>
              </motion.div>

            </div>

            {/* Polaroid Portrait with Paperclip - Positioned harmoniously in relation to text */}
            <div className="lg:col-span-5 flex justify-center lg:justify-center pt-4 lg:pt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, rotate: -6, y: 35 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 2, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.15, delay: 0.25, ease: [0.19, 1, 0.22, 1] }}
                whileHover={{ scale: 1.035, rotate: 0 }}
                className="relative group cursor-pointer transform-gpu"
                data-cursor="image"
                data-cursor-label="ME"
              >
                {/* Soft shadow cast on parchment */}
                <div className="relative filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.55)] group-hover:drop-shadow-[0_22px_36px_rgba(0,0,0,0.7)] transition-all duration-300">
                  <div className="relative w-[260px] sm:w-[300px] md:w-[330px] lg:w-[360px] xl:w-[380px] aspect-[1024/1024]">
                    <Image
                      src="/images/about-portrait.png"
                      alt="Soumyadip Sen - Thoughtful Portrait"
                      fill
                      priority
                      sizes="(max-width: 640px) 260px, (max-width: 1024px) 330px, 380px"
                      className="object-contain pointer-events-none select-none transition-transform duration-500"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Bottom space intentionally kept open for the printed Coffee • Code • Mountain icons in the background */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="pt-6 flex justify-center items-center pointer-events-none select-none"
        >
          <span className="font-typewriter text-[11px] sm:text-xs text-[#4a4338] tracking-widest uppercase">
            Caffeine • Code • Ascent
          </span>
        </motion.div>

      </div>
    </section>
  );
}
