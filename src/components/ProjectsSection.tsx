"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = projects.length;
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastScrollTime = useRef<number>(0);

  // Auto-scroll & Hover state refs
  const [isSectionInView, setIsSectionInView] = useState(false);
  const isHovered = useRef<boolean>(false); // Completely stops automatic scrolling when hovering over any card
  const isUserInteracting = useRef<boolean>(false);
  const isDragging = useRef<boolean>(false);

  // Press-and-hold refs for arrow buttons
  const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

  // 1. Detect when user scrolls down to the Project Section
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 2. Slow Ambient Auto-Scroll (3.8s cadence):
  // Completely stops whenever someone hovers over ANY of the cards
  useEffect(() => {
    if (!isSectionInView) return;

    let timerId: NodeJS.Timeout;

    const runLoop = () => {
      // Only advance if:
      // 1. Not manually holding a button or dragging
      // 2. NOT hovering over any of the cards
      if (!isUserInteracting.current && !isDragging.current && !isHovered.current) {
        handleNext();
      }
      timerId = setTimeout(runLoop, 3800);
    };

    timerId = setTimeout(runLoop, 3800);

    return () => clearTimeout(timerId);
  }, [isSectionInView, handleNext]);

  // 4. Arrow buttons: Click or Press-and-Hold
  const stopHolding = useCallback(() => {
    isUserInteracting.current = false;
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
  }, []);

  const startHolding = useCallback(
    (action: "prev" | "next") => {
      stopHolding();
      isUserInteracting.current = true;

      // Immediate action on click
      if (action === "next") handleNext();
      else handlePrev();

      // If held down past 260ms, keep moving continuously
      holdTimeoutRef.current = setTimeout(() => {
        holdIntervalRef.current = setInterval(() => {
          if (action === "next") handleNext();
          else handlePrev();
        }, 280);
      }, 260);
    },
    [handleNext, handlePrev, stopHolding]
  );

  // Global release listener
  useEffect(() => {
    const handleGlobalRelease = () => stopHolding();
    window.addEventListener("mouseup", handleGlobalRelease);
    window.addEventListener("touchend", handleGlobalRelease);
    return () => {
      stopHolding();
      window.removeEventListener("mouseup", handleGlobalRelease);
      window.removeEventListener("touchend", handleGlobalRelease);
    };
  }, [stopHolding]);

  // Buttery-smooth wheel listener for sideways scrolling like water
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 250) return;

    if (Math.abs(e.deltaX) > 18) {
      lastScrollTime.current = now;
      if (e.deltaX > 0) handleNext();
      else handlePrev();
    } else if (e.shiftKey && Math.abs(e.deltaY) > 18) {
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
      ref={sectionRef}
      onWheel={handleWheel}
      className="relative h-screen max-h-screen w-full flex items-center justify-center overflow-hidden bg-[#070709] select-none md:pl-52 lg:pl-56 scroll-mt-0"
    >
      {/* 1. Full-bleed Background: User's Vintage 35mm Chalkboard Desk Artwork (Fit to Screen) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden md:left-52 lg:left-56">
        <Image
          src="/images/projects-bg.jpg"
          alt="Vintage Projects Chalkboard Desk Background"
          fill
          priority
          sizes="(max-width: 768px) 100vw, calc(100vw - 224px)"
          className="object-cover md:object-fill object-center filter brightness-[1.0] contrast-[1.05]"
        />
      </div>

      {/* 2. Single-Screen Container: Guaranteed to fit Heading, Cards, and Dots in 100vh with 0 overflow */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between px-3 sm:px-6 md:px-8 lg:px-12 py-2 sm:py-3 md:py-4 max-w-[1480px] mx-auto">
        
        {/* Top Header Row: Torn Paper Scrap Header "Projects" (Enlarged & Prominent) */}
        <div className="flex flex-col items-start shrink-0">
          {/* CSE Terminal Prompt Header */}
          <motion.div
            initial={{ opacity: 0, x: -25, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 mb-1 ml-2 sm:ml-4 md:ml-6 px-3 py-1 rounded bg-white/[0.06] border border-white/10 backdrop-blur-md select-none shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs text-zinc-300 font-bold tracking-widest uppercase">
              &gt; REPO::BUILDS // PRODUCTION_SYSTEMS
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -30, filter: "blur(8px)", rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", rotate: -1 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.025, rotate: 0 }}
            className="relative w-56 sm:w-64 md:w-76 lg:w-88 xl:w-[380px] aspect-[1024/341] -rotate-1 origin-left shrink-0 ml-2 sm:ml-4 md:ml-6 mt-0.5 sm:mt-1 cursor-pointer"
            data-cursor="interactive"
            data-cursor-label="PROJECTS // GALLERY"
          >
            <Image
              src="/images/projects-title.png"
              alt="Projects"
              fill
              priority
              className="object-contain object-left pointer-events-none select-none drop-shadow-[0_6px_18px_rgba(0,0,0,0.9)]"
            />
          </motion.div>
        </div>

        {/* 3. Broad Panoramic 3D Carousel Stage: Automatically pauses when hovering over any card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 35 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          ref={containerRef}
          onMouseEnter={() => {
            isHovered.current = true;
          }}
          onMouseLeave={() => {
            isHovered.current = false;
          }}
          className="relative w-full max-w-full xl:max-w-[1400px] mx-auto my-auto flex items-center justify-center py-1 sm:py-2 -translate-y-4 sm:-translate-y-6 md:-translate-y-8 lg:-translate-y-9"
        >
          {/* Navigation Arrow: Left (Click or Press-and-Hold) */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 420, damping: 25 }}
            onPointerDown={(e) => {
              e.stopPropagation();
              startHolding("prev");
            }}
            onPointerUp={stopHolding}
            onPointerLeave={stopHolding}
            aria-label="Previous project (Click or Hold)"
            data-cursor="interactive"
            data-cursor-label="HOLD ◄"
            className="absolute left-1 sm:left-2 md:left-4 lg:left-6 z-40 w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full bg-white text-zinc-950 flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.95),0_0_15px_rgba(255,255,255,0.4)] cursor-pointer group select-none"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 stroke-[2.4] group-hover:-translate-x-0.5 transition-transform" />
          </motion.button>

          {/* Cards 3D Stage: All cards continuously mounted with smooth spring motion physics */}
          <div className="relative w-full h-[290px] sm:h-[335px] md:h-[375px] lg:h-[415px] xl:h-[445px] flex items-center justify-center perspective-[1200px] overflow-visible">
            {projects.map((project, index) => {
              // Calculate relative circular offset: [-3, -2, -1, 0, 1, 2, 3]
              let offset = (index - currentIndex) % total;
              if (offset > total / 2) offset -= total;
              if (offset <= -total / 2) offset += total;

              const isCenter = offset === 0;
              const isVisible = Math.abs(offset) <= 2;

              // Proportional horizontal spread
              const xPos =
                offset === 0
                  ? 0
                  : offset === 1
                  ? "82%"
                  : offset === -1
                  ? "-82%"
                  : offset === 2
                  ? "160%"
                  : offset === -2
                  ? "-160%"
                  : offset > 0
                  ? "230%"
                  : "-230%";

              const scale = isCenter ? 1 : Math.abs(offset) === 1 ? 0.82 : 0.65;
              const rotateY = offset === 0 ? 0 : offset > 0 ? -15 : 15;
              const opacity = isCenter ? 1 : Math.abs(offset) === 1 ? 0.65 : Math.abs(offset) === 2 ? 0.2 : 0;
              const zIndex = isCenter ? 35 : Math.abs(offset) === 1 ? 20 : 10;
              const brightness = isCenter ? 1.0 : Math.abs(offset) === 1 ? 0.72 : 0.45;

              return (
                <motion.div
                  key={project.id}
                  onClick={() => handleCardClick(index)}
                  onMouseEnter={() => {
                    isHovered.current = true;
                  }}
                  onMouseLeave={() => {
                    isHovered.current = false;
                  }}
                  drag={isCenter ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragStart={() => {
                    isDragging.current = true;
                  }}
                  onDragEnd={(e, { offset: dragOffset, velocity }) => {
                    isDragging.current = false;
                    if (dragOffset.x < -30 || velocity.x < -180) handleNext();
                    else if (dragOffset.x > 30 || velocity.x > 180) handlePrev();
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
                    stiffness: 260,
                    damping: 28,
                    mass: 0.8,
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  data-cursor="project"
                  data-cursor-label={`${project.title.split("–")[0].trim().toUpperCase()} // EXPLORE`}
                  className={`absolute w-[270px] sm:w-[315px] md:w-[355px] lg:w-[395px] xl:w-[425px] aspect-square rounded-2xl overflow-hidden border-2 transition-colors duration-300 ${
                    isCenter
                      ? "border-zinc-400/80 shadow-[0_18px_45px_rgba(0,0,0,0.95),0_0_24px_rgba(255,255,255,0.12)] cursor-grab active:cursor-grabbing bg-zinc-950"
                      : "border-zinc-700/60 shadow-[0_10px_35px_rgba(0,0,0,0.9)] cursor-pointer bg-zinc-950/80 hover:border-zinc-500"
                  } ${!isVisible ? "pointer-events-none" : "pointer-events-auto"}`}
                >
                  {/* Card Artwork Image */}
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority={isCenter}
                    sizes="(max-width: 768px) 340px, 460px"
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
                    className={`absolute bottom-0 inset-x-0 p-3.5 sm:p-4.5 md:p-5 flex items-center justify-between gap-3.5 transition-all duration-300 ${
                      isCenter ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
                    }`}
                  >
                    <div className="flex-1 min-w-0 pr-1">
                      <h3 className="font-typewriter font-bold text-sm sm:text-base md:text-lg lg:text-xl text-white tracking-wide leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                        {project.title}
                      </h3>
                    </div>

                    {/* Circular Arrow Button: Navigates to Detailed Project Page */}
                    <Link
                      href={`/projects/${project.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      data-cursor="interactive"
                      data-cursor-label="PROJECT // VIEW"
                      title={`View details for ${project.title}`}
                      className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-black/85 hover:bg-white text-white hover:text-black border border-white/60 hover:border-white shadow-[0_4px_16px_rgba(0,0,0,0.95),0_0_12px_rgba(255,255,255,0.3)] flex items-center justify-center transition-all duration-300 group/btn pointer-events-auto hover:scale-105 active:scale-95"
                    >
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-5.5 md:h-5.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Arrow: Right (Click or Press-and-Hold) */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 420, damping: 25 }}
            onPointerDown={(e) => {
              e.stopPropagation();
              startHolding("next");
            }}
            onPointerUp={stopHolding}
            onPointerLeave={stopHolding}
            aria-label="Next project (Click or Hold)"
            data-cursor="interactive"
            data-cursor-label="HOLD ►"
            className="absolute right-1 sm:right-2 md:right-4 lg:right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full bg-white text-zinc-950 flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.95),0_0_15px_rgba(255,255,255,0.4)] cursor-pointer group select-none"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 stroke-[2.4] group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        </motion.div>

        {/* 4. Carousel Pagination Indicator Dots */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 py-1 shrink-0 -translate-y-3 sm:-translate-y-5 md:-translate-y-7 lg:-translate-y-8">
          {projects.map((proj, idx) => {
            const isActive = idx === currentIndex;
            return (
              <motion.button
                key={proj.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to project ${idx + 1}: ${proj.title}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? "w-3 h-3 bg-white shadow-[0_0_10px_rgba(255,255,255,0.95)] scale-110"
                    : "w-2 h-2 bg-transparent border border-zinc-500/80 hover:border-zinc-300"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}