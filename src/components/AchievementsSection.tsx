"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronUp,
  ChevronDown,
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

  const ITEMS_PER_MOBILE_PAGE = 3;
  const [mobilePage, setMobilePage] = useState<number>(0);

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

  const totalMobilePages = Math.ceil(achievements.length / ITEMS_PER_MOBILE_PAGE);
  const hasNextMobilePage = mobilePage < totalMobilePages - 1;
  const hasPrevMobilePage = mobilePage > 0;

  const handleMobilePillClick = (idx: number) => {
    setActiveIdx(idx);
    const targetPage = Math.floor(idx / ITEMS_PER_MOBILE_PAGE);
    setMobilePage(targetPage);
  };

  const handleMobilePageChange = (direction: "up" | "down") => {
    if (direction === "down" && hasNextMobilePage) {
      const nextPage = mobilePage + 1;
      setMobilePage(nextPage);
      setActiveIdx(nextPage * ITEMS_PER_MOBILE_PAGE);
    } else if (direction === "up" && hasPrevMobilePage) {
      const prevPage = mobilePage - 1;
      setMobilePage(prevPage);
      setActiveIdx(prevPage * ITEMS_PER_MOBILE_PAGE);
    }
  };

  const typographyScale = Math.min(Math.max(stageBounds.scale, 0.72), 1.35);

  return (
    <section
      id="achievements"
      className="relative h-screen max-h-screen w-full overflow-hidden bg-[#121214] vintage-charcoal-bg select-none md:pl-52 lg:pl-56"
    >
      {/* Ambient background texture (Desktop Only) */}
      <div className="hidden md:block absolute inset-0 z-0 pointer-events-none opacity-20 filter blur-3xl">
        <Image
          src="/images/achievements-bg.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 100vw, 1px"
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

          {/* 2. Top-Left Heading: "Achievements" sticker - with Background Paper */}
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
            className="absolute aspect-[1024/341] z-30 pointer-events-auto cursor-pointer -rotate-[3.5deg] origin-center drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] transform-gpu flex items-center justify-center"
            data-cursor="interactive"
            data-cursor-label="ACHIEVEMENTS // HONORS"
          >
            {/* Background Paper Image for High Contrast Visibility */}
            <Image
              src="/images/heading-paper-bg.png"
              alt=""
              fill
              priority
              sizes="360px"
              className="object-fill pointer-events-none select-none filter contrast-105"
            />
            {/* Achievements Graphic on Top */}
            <div className="relative z-10 w-[84%] h-[75%] flex items-center justify-center">
              <Image
                src="/images/achievements-title.png"
                alt="Achievements"
                fill
                priority
                sizes="340px"
                className="object-contain object-center pointer-events-none select-none filter contrast-125"
              />
            </div>
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
                      className={`group relative p-2.5 sm:p-3 rounded-lg transition-all duration-200 cursor-pointer transform-gpu ${isActive
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
                      className={`px-2.5 py-0.5 rounded font-mono font-bold transition-colors cursor-pointer ${activeIdx === idx
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
                    className={`p-1.5 rounded transition-colors ${canScrollUp
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
                    className={`p-1.5 rounded transition-colors ${canScrollDown
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

      {/* Mobile/Tablet Dedicated View (< md): Exact Vintage Parchment Ledger in Vertical Orientation */}
      <div className="md:hidden relative z-10 w-full h-full flex flex-col justify-between items-center px-3 sm:px-6 pt-10 sm:pt-12 pb-2.5 sm:pb-3 overflow-hidden">
        {/* Top Header: Achievements Title on Vintage Paper Background */}
        <div className="relative w-52 sm:w-64 aspect-[1024/341] shrink-0 mb-1.5 sm:mb-2 filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] -rotate-1 select-none pointer-events-none flex items-center justify-center">
          {/* Background Paper Image */}
          <Image
            src="/images/heading-paper-bg.png"
            alt=""
            fill
            priority
            sizes="(max-width: 640px) 220px, 280px"
            className="object-fill pointer-events-none select-none filter contrast-105"
          />
          {/* Achievements Graphic on Top */}
          <div className="relative z-10 w-[84%] h-[75%] flex items-center justify-center">
            <Image
              src="/images/achievements-title.png"
              alt="Achievements"
              fill
              priority
              sizes="(max-width: 640px) 200px, 260px"
              className="object-contain object-center pointer-events-none select-none filter contrast-125"
            />
          </div>
        </div>

        {/* Vertical Parchment Document Ledger */}
        <div className="relative w-full max-w-[420px] sm:max-w-[480px] flex-1 max-h-[calc(100vh-100px)] sm:max-h-[calc(100vh-115px)] rounded-xl overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.85)] filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.9)] flex flex-col justify-between my-auto">
          {/* Vertical Parchment Document Backdrop */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/achievements-document-vertical.jpg"
              alt="Achievements Document"
              fill
              priority
              sizes="(max-width: 640px) 100vw, 480px"
              className="object-fill select-none pointer-events-none filter contrast-[1.03] brightness-[1.01]"
            />
          </div>

          {/* Document Content: Showing 3 achievements first, navigate for more */}
          <div className="relative z-10 w-full h-full flex flex-col justify-between pt-6 sm:pt-8 pb-2.5 sm:pb-3 px-4 sm:px-6">
            <div className="relative w-full flex-1 overflow-hidden flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`mobile-page-${mobilePage}`}
                  initial={{ opacity: 0, y: mobilePage === 1 ? 14 : -14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: mobilePage === 1 ? -14 : 14 }}
                  transition={{ duration: 0.28, ease: [0.19, 1, 0.22, 1] }}
                  className="space-y-2 sm:space-y-2.5"
                >
                  {achievements
                    .slice(
                      mobilePage * ITEMS_PER_MOBILE_PAGE,
                      mobilePage * ITEMS_PER_MOBILE_PAGE + ITEMS_PER_MOBILE_PAGE
                    )
                    .map((item, localIdx) => {
                      const globalIdx = mobilePage * ITEMS_PER_MOBILE_PAGE + localIdx;
                      const isActive = activeIdx === globalIdx;

                      return (
                        <div
                          key={item.id}
                          onClick={() => setActiveIdx(globalIdx)}
                          className={`group relative p-2 sm:p-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
                            isActive
                              ? "bg-[#1c1917]/[0.08] border-l-2 border-[#1c1917] pl-2.5 sm:pl-3 shadow-sm"
                              : "bg-transparent hover:bg-[#1c1917]/[0.03] border-l-2 border-transparent"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-1.5">
                            <h4 className="font-typewriter font-bold text-xs sm:text-sm text-[#1c1917] flex items-start gap-1.5 leading-snug">
                              <span className="text-[#1c1917] select-none leading-none mt-0.5">•</span>
                              <span className="font-mono text-[#1c1917] select-none">{item.number}.</span>
                              <span>{item.title}</span>
                            </h4>

                            {item.tag && (
                              <span className="font-mono text-[8.5px] sm:text-[9.5px] px-1.5 py-0.5 rounded border border-[#1c1917]/25 bg-[#1c1917]/5 text-[#1c1917] font-bold uppercase tracking-wider shrink-0 mt-0.5">
                                {item.tag}
                              </span>
                            )}
                          </div>

                          <p className="font-mono text-[11px] sm:text-xs text-[#38332b] font-medium mt-1 pl-3 sm:pl-3.5 relative leading-relaxed">
                            <span className="absolute left-0.5 top-0 text-[#1c1917] text-xs leading-none">•</span>
                            {item.description}
                          </p>

                          {localIdx < ITEMS_PER_MOBILE_PAGE - 1 && localIdx < (mobilePage === 0 ? 2 : 1) && (
                            <div className="w-full h-[1px] bg-[#1c1917]/15 mt-2 sm:mt-2.5" />
                          )}
                        </div>
                      );
                    })}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Action Prompt inside Document */}
              <div className="pt-2 pb-0.5">
                {mobilePage === 0 ? (
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMobilePageChange("down")}
                    className="w-full py-1.5 px-3 rounded-lg border border-[#1c1917]/25 bg-[#1c1917]/[0.06] hover:bg-[#1c1917]/[0.12] text-[#1c1917] font-mono text-[10.5px] sm:text-[11.5px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm group"
                  >
                    <span>View More Achievements (04–05)</span>
                    <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMobilePageChange("up")}
                    className="w-full py-1.5 px-3 rounded-lg border border-[#1c1917]/25 bg-[#1c1917]/[0.06] hover:bg-[#1c1917]/[0.12] text-[#1c1917] font-mono text-[10.5px] sm:text-[11.5px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm group"
                  >
                    <ChevronUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                    <span>Back to Achievements (01–03)</span>
                  </motion.button>
                )}
              </div>
            </div>

            {/* Bottom Number Pills & Navigation Buttons */}
            <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-[#1c1917]/15 shrink-0 px-1 mt-auto">
              <div className="flex items-center gap-1 sm:gap-1.5">
                {achievements.map((item, idx) => {
                  const itemPage = Math.floor(idx / ITEMS_PER_MOBILE_PAGE);
                  const isCurrentPage = itemPage === mobilePage;
                  const isActive = activeIdx === idx;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleMobilePillClick(idx)}
                      className={`px-2 sm:px-2.5 py-0.5 rounded font-mono text-[9.5px] sm:text-[10.5px] font-bold transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#1c1917] text-[#ded3c5] shadow-sm scale-105"
                          : isCurrentPage
                          ? "bg-[#1c1917]/15 text-[#292524] hover:bg-[#1c1917]/25"
                          : "bg-[#1c1917]/5 text-[#78716c] hover:bg-[#1c1917]/15"
                      }`}
                    >
                      • {item.number}
                    </button>
                  );
                })}
              </div>

              {/* Page Indicator & Chevron Arrows */}
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[9px] sm:text-[10px] text-[#57534e] font-semibold">
                  {mobilePage + 1}/{totalMobilePages}
                </span>
                <button
                  onClick={() => handleMobilePageChange("up")}
                  disabled={!hasPrevMobilePage}
                  title="Previous Achievements"
                  className={`p-1 sm:p-1.5 rounded transition-colors ${
                    hasPrevMobilePage
                      ? "bg-[#1c1917]/15 hover:bg-[#1c1917]/25 text-[#1c1917] cursor-pointer"
                      : "opacity-25 text-[#44403c] cursor-not-allowed"
                  }`}
                >
                  <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={() => handleMobilePageChange("down")}
                  disabled={!hasNextMobilePage}
                  title="Next Achievements"
                  className={`p-1 sm:p-1.5 rounded transition-colors ${
                    hasNextMobilePage
                      ? "bg-[#1c1917]/15 hover:bg-[#1c1917]/25 text-[#1c1917] cursor-pointer"
                      : "opacity-25 text-[#44403c] cursor-not-allowed"
                  }`}
                >
                  <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
