"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = projects.length;
  const lastScrollTime = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Smooth circular navigation
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handleCardClick = (index: number) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
  };

  // Buttery-smooth wheel listener for sideways scrolling like water
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const now = Date.now();
    // Throttle slightly to create a smooth, rhythmic glide without chaotic skipping
    if (now - lastScrollTime.current < 280) return;

    if (Math.abs(e.deltaX) > 20) {
      lastScrollTime.current = now;
      if (e.deltaX > 0) handleNext();
      else handlePrev();
    } else if (e.shiftKey && Math.abs(e.deltaY) > 20) {
      lastScrollTime.current = now;
      if (e.deltaY > 0) handleNext();
      else handlePrev();
    }
  };

  // Keyboard navigation when user is on the section
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <section
      id="projects"
      onWheel={handleWheel}
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#0a0a0c] select-none py-14 sm:py-20"
    >
      {/* 1. Full-bleed Background: User's Vintage 35mm Filmstrip Background (Clearly Visible) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/projects-bg.jpg"
          alt="Vintage Projects Film Reel Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[1.0] contrast-[1.08]"
        />

        {/* Minimal delicate edge gradient only to blend with the sidebar, leaving the filmstrip corners crisp & visible */}
        <div className="absolute inset-y-0 left-0 w-48 sm:w-64 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />
      </div>

      {/* 2. Main Content Composition: Shifted comfortably towards the right with broad expansive breadth */}
      <div className="relative z-10 w-full min-h-screen md:pl-64 lg:pl-72 xl:pl-80 flex flex-col justify-between px-4 sm:px-8 md:px-12 lg:px-16 pt-10 pb-8">
        
        {/* Top Header Row: Torn Paper Scrap Header "Projects" */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-56 sm:w-64 md:w-72 lg:w-80 aspect-[1024/341] -rotate-1 origin-left shrink-0 ml-1 sm:ml-2"
        >
          <Image
            src="/images/projects-title.png"
            alt="Projects"
            fill
            priority
            className="object-contain object-left pointer-events-none select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
          />
        </motion.div>

        {/* 3. Broad Panoramic 3D Carousel Stage */}
        <div
          ref={containerRef}
          className="relative w-full max-w-7xl mx-auto my-auto py-4 sm:py-6 flex items-center justify-center"
        >
          {/* Navigation Arrow: Left (Floating white circular button with drop shadow) */}
          <button
            onClick={handlePrev}
            aria-label="Previous project"
            data-cursor="interactive"
            data-cursor-label="PREV"
            className="absolute left-1 sm:left-4 md:left-8 lg:left-12 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-zinc-950 flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.95),0_0_15px_rgba(255,255,255,0.4)] hover:scale-115 active:scale-95 transition-all duration-200 cursor-pointer group"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.4] group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Cards 3D Stage: All cards continuously mounted with smooth spring motion physics */}
          <div className="relative w-full h-[430px] sm:h-[480px] md:h-[530px] lg:h-[560px] flex items-center justify-center perspective-[1200px] overflow-visible">
            {projects.map((project, index) => {
              // Calculate relative circular offset: [-3, -2, -1, 0, 1, 2, 3]
              let offset = (index - currentIndex) % total;
              if (offset > total / 2) offset -= total;
              if (offset <= -total / 2) offset += total;

              const isCenter = offset === 0;
              const isVisible = Math.abs(offset) <= 2;

              // Fluid horizontal spread and 3D depth variables
              // On desktop: offset 1 is +380px, offset 2 is +680px, etc.
              const xPos =
                offset === 0
                  ? 0
                  : offset === 1
                  ? "70%"
                  : offset === -1
                  ? "-70%"
                  : offset === 2
                  ? "135%"
                  : offset === -2
                  ? "-135%"
                  : offset > 0
                  ? "200%"
                  : "-200%";

              const scale = isCenter ? 1 : Math.abs(offset) === 1 ? 0.82 : 0.65;
              const rotateY = offset === 0 ? 0 : offset > 0 ? -18 : 18;
              const opacity = isCenter ? 1 : Math.abs(offset) === 1 ? 0.6 : Math.abs(offset) === 2 ? 0.22 : 0;
              const zIndex = isCenter ? 35 : Math.abs(offset) === 1 ? 20 : 10;
              const brightness = isCenter ? 1.0 : Math.abs(offset) === 1 ? 0.72 : 0.45;

              return (
                <motion.div
                  key={project.id}
                  onClick={() => handleCardClick(index)}
                  drag={isCenter ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={(e, { offset: dragOffset, velocity }) => {
                    if (dragOffset.x < -35 || velocity.x < -200) handleNext();
                    else if (dragOffset.x > 35 || velocity.x > 200) handlePrev();
                  }}
                  animate={{
                    x: xPos,
                    scale,
                    rotateY,
                    opacity,
                    zIndex,
                    filter: `brightness(${brightness}) contrast(1.04)`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 240,
                    damping: 26,
                    mass: 0.85,
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  className={`absolute w-[290px] sm:w-[370px] md:w-[440px] lg:w-[480px] aspect-square rounded-2xl overflow-hidden border-2 transition-colors duration-300 ${
                    isCenter
                      ? "border-zinc-400/80 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_24px_rgba(255,255,255,0.12)] cursor-grab active:cursor-grabbing bg-zinc-950"
                      : "border-zinc-700/60 shadow-[0_10px_35px_rgba(0,0,0,0.9)] cursor-pointer bg-zinc-950/80 hover:border-zinc-500"
                  } ${!isVisible ? "pointer-events-none" : "pointer-events-auto"}`}
                >
                  {/* Card Artwork Image */}
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority={isCenter}
                    sizes="(max-width: 768px) 360px, 480px"
                    className="object-cover select-none pointer-events-none"
                  />

                  {/* Dark Vignette & Bottom Text Scrim (Smoothly shows on active card) */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent transition-opacity duration-300 pointer-events-none ${
                      isCenter ? "opacity-100" : "opacity-40"
                    }`}
                  />

                  {/* Bottom Info Bar with Live Arrow Visiting Button */}
                  <div
                    className={`absolute bottom-0 inset-x-0 p-5 sm:p-6 flex items-end justify-between gap-4 transition-all duration-300 ${
                      isCenter ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
                    }`}
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <h3 className="font-typewriter font-bold text-base sm:text-lg md:text-xl text-white tracking-wide truncate">
                        {project.title.split("–")[0].trim()}
                      </h3>
                      <p className="font-typewriter text-zinc-300 text-xs sm:text-sm mt-1 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Circular Arrow Button: Navigates to Detailed Project Page */}
                    <Link
                      href={`/projects/${project.slug}`}
                      data-cursor="project"
                      data-cursor-label="VISIT ↗"
                      title={`View details for ${project.title}`}
                      className="shrink-0 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/80 hover:bg-white text-white hover:text-black border border-white/50 hover:border-white shadow-[0_4px_16px_rgba(0,0,0,0.95),0_0_12px_rgba(255,255,255,0.3)] flex items-center justify-center transition-all duration-300 group/btn"
                    >
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Arrow: Right (Floating white circular button with drop shadow) */}
          <button
            onClick={handleNext}
            aria-label="Next project"
            data-cursor="interactive"
            data-cursor-label="NEXT"
            className="absolute right-1 sm:right-4 md:right-8 lg:right-12 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-zinc-950 flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.95),0_0_15px_rgba(255,255,255,0.4)] hover:scale-115 active:scale-95 transition-all duration-200 cursor-pointer group"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.4] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 4. Carousel Pagination Indicator Dots for All 6 Cards */}
        <div className="flex items-center justify-center gap-3 mt-2 sm:mt-4">
          {projects.map((proj, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={proj.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to project ${idx + 1}: ${proj.title}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? "w-3.5 h-3.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.95)] scale-115"
                    : "w-2.5 h-2.5 bg-transparent border border-zinc-500/80 hover:border-zinc-300 hover:scale-110"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}