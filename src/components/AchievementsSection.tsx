"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Achievement {
  id: string;
  number: string;
  title: string;
  description: string;
  tag: string;
}

const achievements: Achievement[] = [
  {
    id: "sih-2026",
    number: "01",
    title: "Smart India Hackathon 2026 — Internal Selection",
    description:
      "Selected through the university's internal hackathon for Smart India Hackathon 2026, showcasing innovative problem-solving and technical skills.",
    tag: "NATIONAL COMPETITION",
  },
  {
    id: "nptel-python",
    number: "02",
    title: "NPTEL Certification — The Joy of Computing Using Python",
    description:
      "Successfully earned an NPTEL certification with 85%, demonstrating proficiency in Python programming fundamentals, computational concepts, algorithmic thinking, and practical coding applications.",
    tag: "ELITE SCORE // 85%",
  },
  {
    id: "nasscom-cert",
    number: "03",
    title: "NASSCOM Certification",
    description:
      "Earned a NASSCOM certification, strengthening my industry-relevant technical knowledge and professional skills.",
    tag: "INDUSTRY ACCREDITED",
  },
  {
    id: "hp-life-certs",
    number: "04",
    title: "HP LIFE — Professional Certifications",
    description:
      "Completed certifications in Cybersecurity Awareness, Digital Business Skills, and Data Science & Analytics through HP LIFE.",
    tag: "TRIPLE SPECIALIZATION",
  },
  {
    id: "stem-mentorship",
    number: "05",
    title: "Student Mentorship & Academic Guidance",
    description:
      "Mentored CBSE students in Science and Computer Science, helping them strengthen their understanding and academic performance.",
    tag: "ACADEMIC LEADERSHIP",
  },
];

export default function AchievementsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [stageBounds, setStageBounds] = useState({
    width: 1024,
    height: 576,
    scale: 1,
  });
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [canScrollUp, setCanScrollUp] = useState<boolean>(false);
  const [canScrollDown, setCanScrollDown] = useState<boolean>(true);

  // Compute uniform scale so 100% of the 1024x576 background image is fully visible with ZERO cropping
  const updateLayout = useCallback(() => {
    if (!containerRef.current) return;

    const stageW = containerRef.current.clientWidth;
    const stageH = containerRef.current.clientHeight;

    if (stageW === 0 || stageH === 0) return;

    setIsMobile(stageW < 768);

    const scale = Math.min((stageW - 16) / 1024, (stageH - 16) / 576);
    const width = Math.max(Math.floor(1024 * scale), 320);
    const height = Math.max(Math.floor(576 * scale), 180);

    setStageBounds({
      width,
      height,
      scale,
    });
  }, []);

  useEffect(() => {
    updateLayout();

    const resizeObserver = new ResizeObserver(() => {
      updateLayout();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", updateLayout);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateLayout);
    };
  }, [updateLayout]);

  // Update scroll indicators and active item on scroll (top-to-bottom)
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    setCanScrollUp(scrollTop > 10);
    setCanScrollDown(scrollTop + clientHeight < scrollHeight - 10);

    const containerTop = el.getBoundingClientRect().top;
    let closestIdx = 0;
    let minDistance = Infinity;

    itemRefs.current.forEach((item, idx) => {
      if (!item) return;
      const rect = item.getBoundingClientRect();
      const distance = Math.abs(rect.top - containerTop);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    setActiveIdx(closestIdx);
  }, []);

  const scrollToIndex = (idx: number) => {
    const target = itemRefs.current[idx];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const scrollByDelta = (direction: "up" | "down") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const delta = direction === "down" ? 140 : -140;
    el.scrollBy({ top: delta, behavior: "smooth" });
  };

  const typographyScale = Math.min(Math.max(stageBounds.scale, 0.72), 1.35);

  return (
    <section
      id="achievements"
      className="relative h-screen max-h-screen w-full overflow-hidden bg-[#070709] vintage-charcoal-bg select-none md:pl-52 lg:pl-56"
    >
      {/* Ambient background texture (Desktop Only) */}
      <div className="hidden md:block absolute inset-0 z-0 pointer-events-none opacity-20 filter blur-3xl">
        <Image
          src="/images/achievements-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Main Responsive Viewport Container (Desktop 16:9 Precision Stage) */}
      <div
        ref={containerRef}
        className="hidden md:flex relative z-10 w-full h-full flex-col items-center justify-center p-2 sm:p-4 pt-16 sm:pt-20 md:pt-4 overflow-hidden"
      >
        {/* The Exact 16:9 Vintage Control Room Stage (100% Complete, Zero Cropping) */}
        <div
          style={{
            width: `${stageBounds.width}px`,
            height: `${stageBounds.height}px`,
          }}
          className="relative shrink-0 select-none shadow-[0_0_50px_rgba(0,0,0,0.95)] rounded-lg overflow-hidden border border-white/5"
        >
          {/* 1. Complete Background Image (Camera & Books at bottom-left and Silver Trophy on right 100% INTACT) */}
          <Image
            src="/images/achievements-bg.jpg"
            alt="Vintage Achievements Backdrop"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1400px"
            className="object-contain pointer-events-none select-none filter brightness-[1.02] contrast-[1.05]"
          />

          {/* Vignette Overlay for Filmic Texture */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-radial from-transparent via-transparent to-black/40 pointer-events-none"
          />

          {/* 2. Top-Left Heading: "Achievements" sticker - Tactile Angle Settle */}
          <motion.div
            initial={{ opacity: 0, y: -25, rotate: -6, scale: 1.05 }}
            whileInView={{ opacity: 1, y: 0, rotate: -3.5, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.95, ease: [0.19, 1, 0.22, 1] }}
            whileHover={{ scale: 1.04, rotate: -1 }}
            style={{
              left: "5.5%",
              top: "2.0%",
              width: "25.0%",
            }}
            className="absolute aspect-[1024/341] z-30 pointer-events-auto cursor-pointer -rotate-[3.5deg] origin-center drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] transform-gpu"
            data-cursor="interactive"
            data-cursor-label="ACHIEVEMENTS // HONORS"
          >
            <Image
              src="/images/achievements-title.png"
              alt="Achievements"
              fill
              priority
              sizes="360px"
              className="object-contain object-left pointer-events-none select-none filter contrast-125 brightness-105"
            />
          </motion.div>

          {/* 3. WIDE HORIZONTAL RECTANGLE DOCUMENT: Archival Ledger Unfurl */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
            style={{
              left: "18.5%",
              top: "13.0%",
              width: "63.0%",
              height: "63.0%",
            }}
            className="absolute z-20 rounded-xl overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.85)] filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.9)] transform-gpu"
          >
            {/* The 16:9 Vintage Parchment Paper Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/achievements-document.jpg"
                alt="Achievements Document"
                fill
                priority
                sizes="(max-width: 1200px) 700px, 900px"
                className="object-fill select-none pointer-events-none filter contrast-[1.03] brightness-[1.01]"
              />
            </div>

            {/* Inner Content Area: Top-to-Bottom Scrollable List inside the Wide Rectangle */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between pt-[7.0%] pb-[6.5%] px-[8.0%]">
              
              {/* TOP TO BOTTOM Scrollable Viewport */}
              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="relative w-full flex-1 overflow-y-auto paper-scrollbar pr-2 sm:pr-3 space-y-2.5 sm:space-y-3 scroll-smooth"
              >
                {achievements.map((item, idx) => {
                  const isActive = activeIdx === idx;

                  return (
                    <motion.div
                      key={item.id}
                      ref={(el) => {
                        itemRefs.current[idx] = el;
                      }}
                      initial={{ opacity: 0, x: -18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.75, delay: 0.25 + idx * 0.1, ease: [0.19, 1, 0.22, 1] }}
                      data-cursor="interactive"
                      data-cursor-label={`HONOR // ${item.tag || "ACHIEVEMENT"}`}
                      className={`group relative p-2.5 sm:p-3 rounded-lg transition-all duration-200 cursor-pointer transform-gpu ${
                        isActive
                          ? "bg-[#1c1917]/[0.06] border-l-2 border-[#1c1917] pl-3.5 shadow-sm"
                          : "bg-transparent hover:bg-[#1c1917]/[0.03] hover:pl-3 border-l-2 border-transparent"
                      }`}
                    >
                      {/* Title row with increased font size spreading horizontally from left to right */}
                      <div className="flex items-center justify-between gap-3">
                        <h3
                          style={{
                            fontSize: `${Math.round(15 * typographyScale)}px`,
                            lineHeight: 1.35,
                          }}
                          className="font-typewriter font-bold text-[#1c1917] tracking-tight flex items-start gap-2"
                        >
                          <span className="text-[#1c1917] select-none leading-none mt-0.5">•</span>
                          <span className="font-mono text-[#1c1917] select-none">{item.number}.</span>
                          <span>{item.title}</span>
                        </h3>

                        {item.tag && (
                          <span
                            style={{ fontSize: `${Math.round(9.5 * typographyScale)}px` }}
                            className="hidden sm:inline-block font-mono px-2.5 py-0.5 rounded border border-[#1c1917]/20 bg-[#1c1917]/5 text-[#1c1917] font-bold uppercase tracking-wider shrink-0"
                          >
                            {item.tag}
                          </span>
                        )}
                      </div>

                      {/* Description line with increased font size spreading horizontally from left to right */}
                      <p
                        style={{
                          fontSize: `${Math.round(12 * typographyScale)}px`,
                          lineHeight: 1.55,
                        }}
                        className="font-mono text-[#38332b] font-medium mt-1.5 pl-4 relative"
                      >
                        <span className="absolute left-1 top-0 text-[#1c1917] text-sm leading-none">•</span>
                        {item.description}
                      </p>

                      {/* Subtle ruled ink line divider between items */}
                      {idx < achievements.length - 1 && (
                        <div className="w-full h-[1px] bg-[#1c1917]/15 mt-2.5" />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Footer: Quick Number Pills + Top-to-Bottom Scroll Arrows (NO "SCROLL TOP TO BOTTOM" TEXT) */}
              <div className="flex items-center justify-between pt-1.5 border-t border-[#1c1917]/15 shrink-0 px-2 mt-auto">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  {achievements.map((item, idx) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToIndex(idx)}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.94 }}
                      transition={{ type: "spring", stiffness: 450, damping: 25 }}
                      style={{ fontSize: `${Math.round(9.5 * typographyScale)}px` }}
                      className={`px-2.5 py-0.5 rounded font-mono font-bold transition-colors cursor-pointer ${
                        activeIdx === idx
                          ? "bg-[#1c1917] text-[#ded3c5] shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
                          : "bg-[#1c1917]/10 text-[#44403c] hover:bg-[#1c1917]/20"
                      }`}
                    >
                      • {item.number}
                    </motion.button>
                  ))}
                </div>

                <div className="flex items-center gap-1">
                  <motion.button
                    whileHover={{ scale: canScrollUp ? 1.12 : 1 }}
                    whileTap={{ scale: canScrollUp ? 0.9 : 1 }}
                    onClick={() => scrollByDelta("up")}
                    disabled={!canScrollUp}
                    title="Scroll Up"
                    className={`p-1.5 rounded transition-colors ${
                      canScrollUp
                        ? "bg-[#1c1917]/15 hover:bg-[#1c1917]/25 text-[#1c1917] cursor-pointer"
                        : "opacity-25 text-[#44403c] cursor-not-allowed"
                    }`}
                  >
                    <ChevronUp
                      style={{
                        width: `${Math.round(14 * typographyScale)}px`,
                        height: `${Math.round(14 * typographyScale)}px`,
                      }}
                    />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: canScrollDown ? 1.12 : 1 }}
                    whileTap={{ scale: canScrollDown ? 0.9 : 1 }}
                    onClick={() => scrollByDelta("down")}
                    disabled={!canScrollDown}
                    title="Scroll Down"
                    className={`p-1.5 rounded transition-colors ${
                      canScrollDown
                        ? "bg-[#1c1917]/15 hover:bg-[#1c1917]/25 text-[#1c1917] cursor-pointer"
                        : "opacity-25 text-[#44403c] cursor-not-allowed"
                    }`}
                  >
                    <ChevronDown
                      style={{
                        width: `${Math.round(14 * typographyScale)}px`,
                        height: `${Math.round(14 * typographyScale)}px`,
                      }}
                    />
                  </motion.button>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile/Tablet Dedicated View (< md, pure CSS vintage-charcoal-bg, zero image decode lag) */}
      <div className="md:hidden relative z-10 w-full h-full flex flex-col justify-between items-center px-4 pt-16 pb-8 overflow-y-auto">
        {/* Top Header: Achievements Title */}
        <div className="relative w-60 sm:w-72 aspect-[1024/341] shrink-0 mb-4 filter invert brightness-125 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          <Image
            src="/images/achievements-title.png"
            alt="Achievements"
            fill
            priority
            sizes="288px"
            className="object-contain object-center pointer-events-none select-none"
          />
        </div>

        {/* Vintage Ledger Document Card */}
        <div className="w-full max-w-sm flex-1 flex flex-col justify-center gap-3">
          {/* Step Navigation Pill */}
          <div className="w-full flex items-center justify-between bg-zinc-950/90 px-3.5 py-2 rounded-full border border-zinc-800 shadow-md">
            <span className="font-mono text-xs text-zinc-300 font-bold tracking-wider">
              ACHIEVEMENT 0{activeIdx + 1} / 05
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  const next = (activeIdx - 1 + achievements.length) % achievements.length;
                  setActiveIdx(next);
                }}
                className="p-1 rounded bg-zinc-800/60 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                aria-label="Previous Achievement"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  const next = (activeIdx + 1) % achievements.length;
                  setActiveIdx(next);
                }}
                className="p-1 rounded bg-zinc-800/60 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                aria-label="Next Achievement"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Card Content */}
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full p-5 rounded-2xl bg-[#0f0e11]/90 border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.8)] flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-white/10 text-zinc-200 border border-white/20 font-bold uppercase tracking-wider">
                {achievements[activeIdx].tag}
              </span>
              <span className="font-mono text-xs text-zinc-500 font-bold">
                REF #{achievements[activeIdx].number}
              </span>
            </div>

            <h4 className="font-typewriter text-base font-bold text-white leading-snug flex items-start gap-2">
              <span className="text-zinc-400">•</span>
              <span>{achievements[activeIdx].title}</span>
            </h4>

            <p className="font-mono text-xs text-zinc-300 leading-relaxed pl-3 relative border-l-2 border-white/10 my-1">
              {achievements[activeIdx].description}
            </p>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-1.5 pt-2 mt-1 border-t border-white/10">
              {achievements.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIdx ? "w-6 bg-white" : "w-1.5 bg-zinc-600 hover:bg-zinc-400"
                  }`}
                  aria-label={`Go to achievement ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom subtle brand stamp */}
        <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase mt-3">
          VERIFIED ARCHIVES // DECLASSIFIED
        </div>
      </div>
    </section>
  );
}
