"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const lastScrollTime = useRef<number>(0);

  const total = projects.length;

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setTimeout(() => setIsAnimating(false), 380);
  }, [isAnimating, total]);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % total);
    setTimeout(() => setIsAnimating(false), 380);
  }, [isAnimating, total]);

  const handleDotClick = useCallback(
    (index: number) => {
      if (index === currentIndex || isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 380);
    },
    [currentIndex, isAnimating]
  );

  // Wheel listener for sideways trackpad / mouse scrolling
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 450) return;

    if (Math.abs(e.deltaX) > 28) {
      lastScrollTime.current = now;
      if (e.deltaX > 0) handleNext();
      else handlePrev();
    } else if (e.shiftKey && Math.abs(e.deltaY) > 28) {
      lastScrollTime.current = now;
      if (e.deltaY > 0) handleNext();
      else handlePrev();
    }
  };

  // Keyboard navigation when section is in view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Compute 3 visible slots: [prev, current, next]
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  const activeProject = projects[currentIndex];
  const prevProject = projects[prevIndex];
  const nextProject = projects[nextIndex];

  return (
    <section
      id="projects"
      onWheel={handleWheel}
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#070709] select-none py-16 sm:py-20"
    >
      {/* 1. Full-bleed Background: Vintage Filmstrip Reel Backdrop (Image 1) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/projects-bg.jpg"
          alt="Vintage Projects Film Reel Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.92] contrast-[1.05]"
        />

        {/* Ambient Darkening Gradients for readability and seamless sidebar blend */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/50 pointer-events-none" />
      </div>

      {/* 2. Main Content Composition: Shifted comfortably towards the right */}
      <div className="relative z-10 w-full min-h-screen md:pl-64 lg:pl-72 xl:pl-80 flex flex-col justify-between px-6 sm:px-10 md:px-12 lg:px-14 pt-12 pb-10">
        
        {/* Top Header Row: Torn Paper Scrap Header "Projects" (Image 2) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-52 sm:w-60 md:w-68 lg:w-76 aspect-[1024/341] -rotate-1 origin-left shrink-0 ml-1 sm:ml-2"
        >
          <Image
            src="/images/projects-title.png"
            alt="Projects"
            fill
            priority
            className="object-contain object-left pointer-events-none select-none drop-shadow-[0_4px_14px_rgba(0,0,0,0.7)]"
          />
        </motion.div>

        {/* 3. 3D Circular Carousel Stage */}
        <div className="relative w-full my-auto py-6 sm:py-8 flex items-center justify-center">
          
          {/* Navigation Arrow: Left (White circular button) */}
          <button
            onClick={handlePrev}
            aria-label="Previous project"
            data-cursor="interactive"
            data-cursor-label="PREV"
            className="absolute left-0 sm:left-4 md:left-8 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white text-zinc-950 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.9),0_0_12px_rgba(255,255,255,0.4)] hover:scale-115 active:scale-95 transition-all duration-200 cursor-pointer group"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.4] group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Cards Display Stage */}
          <div className="relative w-full max-w-4xl h-[400px] sm:h-[460px] md:h-[500px] flex items-center justify-center overflow-visible">
            
            {/* Flanking Left Card (Previous) */}
            <motion.div
              key={`prev-${prevProject.id}-${prevIndex}`}
              onClick={handlePrev}
              initial={false}
              animate={{
                x: "-58%",
                scale: 0.82,
                opacity: 0.52,
                zIndex: 10,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="absolute w-[270px] sm:w-[330px] md:w-[380px] aspect-square rounded-2xl overflow-hidden border-2 border-zinc-700/60 shadow-[0_10px_30px_rgba(0,0,0,0.9)] cursor-pointer group hover:opacity-75 transition-opacity pointer-events-auto"
            >
              <Image
                src={prevProject.image}
                alt={prevProject.title}
                fill
                sizes="(max-width: 768px) 300px, 400px"
                className="object-cover filter brightness-[0.75] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            </motion.div>

            {/* Active Center Card (Prominent, with overlay & working arrow button) */}
            <motion.div
              key={`active-${activeProject.id}-${currentIndex}`}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.x < -40 || velocity.x < -300) handleNext();
                else if (offset.x > 40 || velocity.x > 300) handlePrev();
              }}
              animate={{
                x: "0%",
                scale: 1,
                opacity: 1,
                zIndex: 30,
              }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="relative w-[300px] sm:w-[380px] md:w-[430px] aspect-square rounded-2xl overflow-hidden border-2 border-zinc-500/80 shadow-[0_16px_45px_rgba(0,0,0,0.95),0_0_24px_rgba(255,255,255,0.12)] cursor-grab active:cursor-grabbing bg-zinc-950 group"
            >
              {/* Project Card Image */}
              <Image
                src={activeProject.image}
                alt={activeProject.title}
                fill
                priority
                sizes="(max-width: 768px) 380px, 450px"
                className="object-cover filter brightness-[0.98] contrast-[1.04]"
              />

              {/* Weathered vignette & lower gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none" />

              {/* Bottom Card Info Overlay with Live Arrow Visiting Button */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex items-end justify-between gap-4">
                <div className="flex-1 min-w-0 pr-2">
                  <h3 className="font-typewriter font-bold text-base sm:text-lg md:text-xl text-white tracking-wide truncate">
                    {activeProject.title.split("–")[0].trim()}
                  </h3>
                  <p className="font-typewriter text-zinc-300 text-xs sm:text-sm mt-1 leading-relaxed line-clamp-2">
                    {activeProject.description}
                  </p>
                </div>

                {/* Arrow Button: Opens Dynamic Sample Visiting Page */}
                <Link
                  href={`/projects/${activeProject.slug}`}
                  data-cursor="project"
                  data-cursor-label="VISIT ↗"
                  title={`View details for ${activeProject.title}`}
                  className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/75 hover:bg-white text-white hover:text-black border border-white/50 hover:border-white shadow-[0_4px_16px_rgba(0,0,0,0.9),0_0_12px_rgba(255,255,255,0.25)] flex items-center justify-center transition-all duration-300 group/btn"
                >
                  <ArrowRight className="w-5 h-5 sm:w-5.5 sm:h-5.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Flanking Right Card (Next) */}
            <motion.div
              key={`next-${nextProject.id}-${nextIndex}`}
              onClick={handleNext}
              initial={false}
              animate={{
                x: "58%",
                scale: 0.82,
                opacity: 0.52,
                zIndex: 10,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="absolute w-[270px] sm:w-[330px] md:w-[380px] aspect-square rounded-2xl overflow-hidden border-2 border-zinc-700/60 shadow-[0_10px_30px_rgba(0,0,0,0.9)] cursor-pointer group hover:opacity-75 transition-opacity pointer-events-auto"
            >
              <Image
                src={nextProject.image}
                alt={nextProject.title}
                fill
                sizes="(max-width: 768px) 300px, 400px"
                className="object-cover filter brightness-[0.75] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            </motion.div>
          </div>

          {/* Navigation Arrow: Right (White circular button) */}
          <button
            onClick={handleNext}
            aria-label="Next project"
            data-cursor="interactive"
            data-cursor-label="NEXT"
            className="absolute right-0 sm:right-4 md:right-8 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white text-zinc-950 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.9),0_0_12px_rgba(255,255,255,0.4)] hover:scale-115 active:scale-95 transition-all duration-200 cursor-pointer group"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.4] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 4. Carousel Pagination Indicator Dots */}
        <div className="flex items-center justify-center gap-3 mt-4">
          {projects.map((proj, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={proj.id}
                onClick={() => handleDotClick(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? "w-3 h-3 bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] scale-110"
                    : "w-2.5 h-2.5 bg-transparent border border-zinc-500/80 hover:border-zinc-300 hover:scale-105"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}