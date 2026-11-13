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
  const mobileScrollContainerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [mobileActiveIdx, setMobileActiveIdx] = useState(0);
  const [stageBounds, setStageBounds] = useState({
    width: 1024,
    height: 576,
    scale: 1,
  });
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);
  const [mobileCanScrollUp, setMobileCanScrollUp] = useState(false);
  const [mobileCanScrollDown, setMobileCanScrollDown] = useState(true);

  // Desktop 16:9 stage bounds computation (Strictly Preserved)
  const updateLayout = useCallback(() => {
    if (!containerRef.current) return;

    const stageW = containerRef.current.clientWidth;
    const stageH = containerRef.current.clientHeight;

    if (stageW === 0 || stageH === 0) return;

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

  // Desktop scroll handler
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

  // Mobile scroll handler
  const handleMobileScroll = useCallback(() => {
    const el = mobileScrollContainerRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    setMobileCanScrollUp(scrollTop > 10);
    setMobileCanScrollDown(scrollTop + clientHeight < scrollHeight - 10);

    const containerTop = el.getBoundingClientRect().top;
    let closestIdx = 0;
    let minDistance = Infinity;

    mobileItemRefs.current.forEach((item, idx) => {
      if (!item) return;
      const rect = item.getBoundingClientRect();
      const distance = Math.abs(rect.top - containerTop);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    setMobileActiveIdx(closestIdx);
  }, []);

  const scrollMobileToIndex = (idx: number) => {
    const target = mobileItemRefs.current[idx];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const scrollMobileByDelta = (direction: "up" | "down") => {
    const el = mobileScrollContainerRef.current;
    if (!el) return;
    const delta = direction === "down" ? 120 : -120;
    el.scrollBy({ top: delta, behavior: "smooth" });
  };

  const typographyScale = Math.min(Math.max(stageBounds.scale, 0.72), 1.35);

  return (
    <section
      id="achievements"
      className="relative h-screen max-h-screen w-full overflow-hidden bg-[#070709] select-none md:pl-52 lg:pl-56"
    >
      {/* Ambient background texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 filter blur-3xl">
        <Image
          src="/images/achievements-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* ========================================================= */}
      {/* 1. DESKTOP 16:9 CONTROL ROOM STAGE (Strictly Preserved)    */}
      {/* ========================================================= */}
      <div
        ref={containerRef}
        className="hidden md:flex relative z-10 w-full h-full flex-col items-center justify-center p-4 pt-4 overflow-hidden"
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

      {/* ========================================================= */}
      {/* 2. MOBILE DEDICATED VIEW (< 768px): Authentic 9:16 Canvas */}
      {/* Strictly uses achievements-bg-mobile.jpg for mobile view   */}
      {/* ========================================================= */}
      <div className="md:hidden relative z-10 w-full min-h-[100dvh] flex flex-col items-center justify-center px-2 pt-16 sm:pt-20 pb-4 overflow-y-auto overflow-x-hidden">
        <div
          style={{
            width: "min(calc((100dvh - 84px) * (576 / 1024)), calc(100vw - 16px), 410px)",
            aspectRatio: "576 / 1024",
          }}
          className="relative rounded-lg overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.95)] shrink-0 my-auto"
        >
          {/* Mobile Background Image (Strictly Mobile View) */}
          <Image
            src="/images/achievements-bg-mobile.jpg"
            alt="Achievements Mobile Backdrop"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 410px"
            className="object-cover pointer-events-none select-none filter brightness-[1.02] contrast-[1.05]"
          />

          {/* Delicate Vignette Overlay for Filmic Texture */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-radial from-transparent via-transparent to-black/35 pointer-events-none"
          />

          {/* Top Heading: "Achievements" paper sticker positioned on dark wall */}
          <motion.div
            initial={{ opacity: 0, y: -20, rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.85, ease: [0.19, 1, 0.22, 1] }}
            style={{
              left: "10%",
              top: "5.5%",
              width: "80%",
            }}
            className="absolute aspect-[1024/341] z-30 pointer-events-auto -rotate-[2deg] origin-center drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
            data-cursor="interactive"
            data-cursor-label="ACHIEVEMENTS // HONORS"
          >
            <Image
              src="/images/achievements-title.png"
              alt="Achievements"
              fill
              priority
              sizes="360px"
              className="object-contain object-center pointer-events-none select-none filter contrast-125 brightness-105"
            />
          </motion.div>

          {/* Mobile Parchment Document (Framed between camera books & trophy) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.95, delay: 0.12, ease: [0.19, 1, 0.22, 1] }}
            style={{
              left: "6.5%",
              top: "19.5%",
              width: "82%",
              height: "58%",
            }}
            className="absolute z-20 rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.85)] filter drop-shadow-[0_6px_20px_rgba(0,0,0,0.9)]"
          >
            {/* The Vintage Parchment Paper Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/achievements-document.jpg"
                alt="Achievements Document"
                fill
                priority
                sizes="(max-width: 768px) 360px, 400px"
                className="object-cover select-none pointer-events-none filter contrast-[1.03] brightness-[1.01]"
              />
            </div>

            {/* Inner Content Area: Top-to-Bottom Scrollable List */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between pt-3 pb-2 px-3">
              {/* Scrollable Viewport */}
              <div
                ref={mobileScrollContainerRef}
                onScroll={handleMobileScroll}
                className="relative w-full flex-1 overflow-y-auto paper-scrollbar pr-1.5 space-y-2 scroll-smooth"
              >
                {achievements.map((item, idx) => {
                  const isActive = mobileActiveIdx === idx;

                  return (
                    <div
                      key={`mobile-${item.id}`}
                      ref={(el) => {
                        mobileItemRefs.current[idx] = el;
                      }}
                      className={`group relative p-2 rounded-lg transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-[#1c1917]/[0.08] border-l-2 border-[#1c1917] pl-2.5 shadow-sm"
                          : "bg-transparent hover:bg-[#1c1917]/[0.04] pl-2 border-l-2 border-transparent"
                      }`}
                    >
                      {/* Title & Tag */}
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between gap-1.5">
                          <span className="font-mono text-[8px] font-bold px-1.5 py-0.5 rounded border border-[#1c1917]/25 bg-[#1c1917]/5 text-[#1c1917] uppercase tracking-wider shrink-0">
                            {item.tag}
                          </span>
                          <span className="font-mono text-[9px] font-bold text-[#1c1917]/70">
                            {item.number} / 05
                          </span>
                        </div>

                        <h3 className="font-typewriter font-bold text-[11px] sm:text-xs text-[#1c1917] tracking-tight leading-snug flex items-start gap-1 mt-0.5">
                          <span className="text-[#1c1917] select-none leading-none mt-0.5">•</span>
                          <span>{item.title}</span>
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="font-mono text-[9.5px] sm:text-[10.5px] text-[#38332b] font-medium mt-1 pl-2 leading-relaxed">
                        {item.description}
                      </p>

                      {idx < achievements.length - 1 && (
                        <div className="w-full h-[1px] bg-[#1c1917]/15 mt-2" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Footer: Numeric Jump Buttons + Scroll Arrows */}
              <div className="flex items-center justify-between pt-1.5 border-t border-[#1c1917]/20 shrink-0 px-1 mt-auto">
                <div className="flex items-center gap-1">
                  {achievements.map((item, idx) => (
                    <button
                      key={`m-btn-${item.id}`}
                      onClick={() => scrollMobileToIndex(idx)}
                      className={`px-1.5 py-0.5 rounded font-mono text-[9px] font-bold transition-colors cursor-pointer ${
                        mobileActiveIdx === idx
                          ? "bg-[#1c1917] text-[#ded3c5] shadow-xs"
                          : "bg-[#1c1917]/10 text-[#44403c] hover:bg-[#1c1917]/20"
                      }`}
                    >
                      {item.number}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => scrollMobileByDelta("up")}
                    disabled={!mobileCanScrollUp}
                    title="Scroll Up"
                    className={`p-1 rounded transition-colors ${
                      mobileCanScrollUp
                        ? "bg-[#1c1917]/15 text-[#1c1917] hover:bg-[#1c1917]/25 cursor-pointer"
                        : "opacity-25 text-[#44403c] cursor-not-allowed"
                    }`}
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => scrollMobileByDelta("down")}
                    disabled={!mobileCanScrollDown}
                    title="Scroll Down"
                    className={`p-1 rounded transition-colors ${
                      mobileCanScrollDown
                        ? "bg-[#1c1917]/15 text-[#1c1917] hover:bg-[#1c1917]/25 cursor-pointer"
                        : "opacity-25 text-[#44403c] cursor-not-allowed"
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
