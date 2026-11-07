"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Achievement {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  subBullets: string[];
  tag: string;
}

const achievements: Achievement[] = [
  {
    id: "sih-2026",
    number: "01",
    title: "Smart India Hackathon 2026 — Internal Selection",
    category: "National Competition",
    description:
      "Selected through the university's internal hackathon for Smart India Hackathon 2026, showcasing innovative problem-solving and technical skills.",
    subBullets: [
      "Selected through the university's internal hackathon for Smart India Hackathon 2026.",
      "Showcased innovative problem-solving and technical skills under rigorous competitive evaluation.",
    ],
    tag: "INTERNAL SELECTION",
  },
  {
    id: "nasscom-cert",
    number: "02",
    title: "NASSCOM Certification",
    category: "Industry Credential",
    description:
      "Earned a NASSCOM certification, strengthening my industry-relevant technical knowledge and professional skills.",
    subBullets: [
      "Earned a NASSCOM certification.",
      "Strengthened industry-relevant technical knowledge and professional skills.",
    ],
    tag: "INDUSTRY ACCREDITED",
  },
  {
    id: "hp-life-certs",
    number: "03",
    title: "HP LIFE — Professional Certifications",
    category: "Professional Certifications",
    description:
      "Completed certifications in Cybersecurity Awareness, Digital Business Skills, and Data Science & Analytics through HP LIFE.",
    subBullets: [
      "Cybersecurity Awareness — HP LIFE Certification",
      "Digital Business Skills — HP LIFE Certification",
      "Data Science & Analytics — HP LIFE Certification",
    ],
    tag: "TRIPLE CERTIFIED",
  },
  {
    id: "stem-mentorship",
    number: "04",
    title: "Student Mentorship & Academic Guidance",
    category: "Academic Coaching",
    description:
      "Mentored CBSE students in Science and Computer Science, helping them strengthen their understanding and academic performance.",
    subBullets: [
      "Mentored CBSE students in Science and Computer Science.",
      "Helped students strengthen their conceptual understanding and overall academic performance.",
    ],
    tag: "ACADEMIC GUIDANCE",
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

  // Update scroll indicators and active item on scroll
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    setCanScrollUp(scrollTop > 10);
    setCanScrollDown(scrollTop + clientHeight < scrollHeight - 10);

    // Determine which item is currently near top of the scroll viewport
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
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollByDelta = (direction: "up" | "down") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const delta = direction === "down" ? 180 : -180;
    el.scrollBy({ top: delta, behavior: "smooth" });
  };

  const typographyScale = Math.min(Math.max(stageBounds.scale, 0.72), 1.35);

  return (
    <section
      id="achievements"
      className="relative h-screen max-h-screen w-full overflow-hidden bg-[#070709] select-none md:pl-52 lg:pl-56"
    >
      {/* Subtle Atmospheric Ambient Texture behind stage */}
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

      {/* Main Responsive Viewport Container */}
      <div
        ref={containerRef}
        className="relative z-10 w-full h-full flex flex-col items-center justify-center p-2 sm:p-4 overflow-hidden"
      >
        {/* The Exact 16:9 Vintage Control Room Stage (100% Complete, Zero Cropping) */}
        <div
          style={{
            width: `${stageBounds.width}px`,
            height: `${stageBounds.height}px`,
          }}
          className="relative shrink-0 select-none shadow-[0_0_50px_rgba(0,0,0,0.95)] rounded-lg overflow-hidden border border-white/5"
        >
          {/* 1. Complete Background Image (Fully Visible, Camera & Books & Silver Trophy 100% Intact) */}
          <Image
            src="/images/achievements-bg.jpg"
            alt="Vintage Achievements Backdrop"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1400px"
            className="object-contain pointer-events-none select-none filter brightness-[1.02] contrast-[1.05]"
          />

          {/* Delicate Vignette Overlay for Filmic Texture */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-radial from-transparent via-transparent to-black/40 pointer-events-none"
          />

          {/* 2. Top-Left Heading: "Achievements" sticker + retro script lettering (shifted right & tilted) */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              left: "6.5%",
              top: "2.0%",
              width: "26.0%",
            }}
            className="absolute aspect-[1024/341] z-30 pointer-events-none -rotate-[3.5deg] origin-center drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]"
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

          {/* 3. Top-Right Archival Status Bar (x: 34.5% to 81.5%, y: 2.5% to 12.5%) */}
          <div
            style={{
              left: "34.5%",
              top: "2.5%",
              width: "47.0%",
              height: "10.0%",
            }}
            className="absolute z-20 flex items-center justify-between px-3.5 py-1 rounded-lg bg-zinc-950/70 border border-white/10 backdrop-blur-sm shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-center gap-3">
              <span
                style={{ fontSize: `${Math.round(11 * typographyScale)}px` }}
                className="font-mono text-zinc-400 font-semibold uppercase tracking-wider"
              >
                ARCHIVE // SEC-05
              </span>
              <div className="hidden sm:block h-3.5 w-[1px] bg-zinc-700" />
              <span
                style={{ fontSize: `${Math.round(10 * typographyScale)}px` }}
                className="hidden sm:inline font-mono text-zinc-300 tracking-wide"
              >
                OFFICIAL RECORD & CERTIFICATIONS
              </span>
            </div>

            <div className="flex items-center gap-2 px-2.5 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span
                style={{ fontSize: `${Math.round(9.5 * typographyScale)}px` }}
                className="font-mono font-bold text-emerald-300 tracking-wider"
              >
                VERIFIED (04)
              </span>
            </div>
          </div>

          {/* 4. Center-Right Vintage Parchment Document (x: 27.5% to 81.5%, y: 14.5% to 95.5%) */}
          {/* Leaves Camera at bottom-left and Trophy on right 100% UNTOUCHED and VISIBLE */}
          <div
            style={{
              left: "27.5%",
              top: "14.5%",
              width: "54.0%",
              height: "81.0%",
            }}
            className="absolute z-20 rounded-xl overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.85)] filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.9)]"
          >
            {/* Background Image: The authentic vintage aged paper with tape and paperclip */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/achievements-document.jpg"
                alt="Vintage Document"
                fill
                priority
                sizes="(max-width: 1200px) 700px, 900px"
                className="object-fill select-none pointer-events-none filter contrast-[1.04] brightness-[1.01]"
              />
            </div>

            {/* Content Container (Layered inside the parchment borders safe from tapes & clip) */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between pt-[5.5%] pb-[5.5%] px-[7.5%]">
              
              {/* Document Header Row: Stamped Classification + Scroll Controls */}
              <div className="flex items-center justify-between pb-2 border-b border-[#2c261e]/25 shrink-0">
                <div className="flex items-center gap-2 pl-2">
                  <span
                    style={{ fontSize: `${Math.round(10.5 * typographyScale)}px` }}
                    className="font-typewriter text-[#1c1917] font-bold tracking-wider uppercase"
                  >
                    DOSSIER // OFFICIAL ACHIEVEMENTS
                  </span>
                  <span
                    style={{ fontSize: `${Math.round(9 * typographyScale)}px` }}
                    className="font-mono px-1.5 py-0.5 rounded bg-[#1c1917]/10 text-[#292524] font-semibold"
                  >
                    AC-2026
                  </span>
                </div>

                {/* Scroll Hint & Quick Arrow Controls */}
                <div className="flex items-center gap-1.5 pr-2">
                  <span
                    style={{ fontSize: `${Math.round(9 * typographyScale)}px` }}
                    className="hidden sm:inline font-mono text-[#44403c] font-medium tracking-tight mr-1"
                  >
                    [ SCROLL (01–04) ↓ ]
                  </span>
                  <button
                    onClick={() => scrollByDelta("up")}
                    disabled={!canScrollUp}
                    title="Scroll Up"
                    className={`p-1 rounded transition-colors ${
                      canScrollUp
                        ? "bg-[#1c1917]/15 hover:bg-[#1c1917]/25 text-[#1c1917] cursor-pointer"
                        : "opacity-30 text-[#44403c] cursor-not-allowed"
                    }`}
                  >
                    <ChevronUp
                      style={{
                        width: `${Math.round(14 * typographyScale)}px`,
                        height: `${Math.round(14 * typographyScale)}px`,
                      }}
                    />
                  </button>
                  <button
                    onClick={() => scrollByDelta("down")}
                    disabled={!canScrollDown}
                    title="Scroll Down"
                    className={`p-1 rounded transition-colors ${
                      canScrollDown
                        ? "bg-[#1c1917]/15 hover:bg-[#1c1917]/25 text-[#1c1917] cursor-pointer"
                        : "opacity-30 text-[#44403c] cursor-not-allowed"
                    }`}
                  >
                    <ChevronDown
                      style={{
                        width: `${Math.round(14 * typographyScale)}px`,
                        height: `${Math.round(14 * typographyScale)}px`,
                      }}
                    />
                  </button>
                </div>
              </div>

              {/* Scrollable Viewport: Vertical list of the 4 bulleted achievements */}
              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="relative my-2 w-full flex-1 overflow-y-auto paper-scrollbar pr-2 sm:pr-3 space-y-3.5 sm:space-y-4 scroll-smooth"
              >
                {achievements.map((item, idx) => {
                  const isActive = activeIdx === idx;

                  return (
                    <div
                      key={item.id}
                      ref={(el) => {
                        itemRefs.current[idx] = el;
                      }}
                      className={`group relative p-2.5 sm:p-3 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "bg-[#1c1917]/[0.07] shadow-[inset_0_0_10px_rgba(44,38,30,0.12)] border-l-2 border-[#1c1917]"
                          : "bg-transparent hover:bg-[#1c1917]/[0.04] border-l-2 border-transparent"
                      }`}
                    >
                      {/* Top Bar: Number + Bullet + Category Badge */}
                      <div className="flex items-center justify-between gap-2 pb-1">
                        <div className="flex items-center gap-2">
                          {/* Typewriter Bullet Keycap */}
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#1c1917] text-[#ded3c5] font-mono font-bold text-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.3)] shrink-0">
                            {item.number}
                          </span>
                          <span
                            style={{ fontSize: `${Math.round(9.5 * typographyScale)}px` }}
                            className="font-mono text-[#57534e] uppercase font-bold tracking-wider"
                          >
                            {item.category}
                          </span>
                        </div>

                        <span
                          style={{ fontSize: `${Math.round(8.5 * typographyScale)}px` }}
                          className="font-mono px-2 py-0.5 rounded border border-[#1c1917]/20 bg-[#1c1917]/5 text-[#1c1917] font-semibold uppercase tracking-wider"
                        >
                          {item.tag}
                        </span>
                      </div>

                      {/* Main Title with Bullet */}
                      <h3
                        style={{
                          fontSize: `${Math.round(13.5 * typographyScale)}px`,
                          lineHeight: 1.3,
                        }}
                        className="font-typewriter font-bold text-[#1c1917] tracking-tight my-1 group-hover:text-black flex items-start gap-1.5"
                      >
                        <span className="text-[#1c1917] text-base leading-none select-none mt-0.5">•</span>
                        <span>{item.title}</span>
                      </h3>

                      {/* Description with Primary Bullet */}
                      <p
                        style={{
                          fontSize: `${Math.round(11 * typographyScale)}px`,
                          lineHeight: 1.45,
                        }}
                        className="font-mono text-[#292524] font-medium mt-1 pl-4 relative"
                      >
                        <span className="absolute left-1 top-0 text-[#1c1917] text-sm leading-none">•</span>
                        {item.description}
                      </p>

                      {/* Sub-Bullets for Granular Details */}
                      {item.subBullets && item.subBullets.length > 0 && (
                        <div className="mt-2 pl-4 space-y-1 pt-1 border-t border-[#2c261e]/15">
                          {item.subBullets.map((bullet, bIdx) => (
                            <div
                              key={bIdx}
                              style={{
                                fontSize: `${Math.round(9.8 * typographyScale)}px`,
                                lineHeight: 1.4,
                              }}
                              className="font-mono text-[#44403c] flex items-start gap-2"
                            >
                              <span className="text-[#78350f] text-xs leading-none select-none mt-1">▸</span>
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Document Footer: Interactive Pagination Dots + Authentication Seal */}
              <div className="flex items-center justify-between pt-1.5 border-t border-[#2c261e]/25 shrink-0 px-2">
                {/* 4 Interactive Achievement Number Selectors */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span
                    style={{ fontSize: `${Math.round(8.5 * typographyScale)}px` }}
                    className="font-mono text-[#57534e] mr-1 uppercase"
                  >
                    ENTRY:
                  </span>
                  {achievements.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToIndex(idx)}
                      style={{ fontSize: `${Math.round(9 * typographyScale)}px` }}
                      className={`px-2 py-0.5 rounded font-mono font-bold transition-all ${
                        activeIdx === idx
                          ? "bg-[#1c1917] text-[#ded3c5] shadow-[0_1px_4px_rgba(0,0,0,0.35)] scale-105"
                          : "bg-[#1c1917]/10 text-[#44403c] hover:bg-[#1c1917]/20"
                      }`}
                    >
                      {item.number}
                    </button>
                  ))}
                </div>

                {/* Vintage Ink Verification Stamp */}
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-[#78350f]/30 bg-[#78350f]/10">
                  <ShieldCheck
                    style={{
                      width: `${Math.round(11 * typographyScale)}px`,
                      height: `${Math.round(11 * typographyScale)}px`,
                    }}
                    className="text-[#78350f]"
                  />
                  <span
                    style={{ fontSize: `${Math.round(8.5 * typographyScale)}px` }}
                    className="font-typewriter font-bold text-[#78350f] tracking-wider uppercase"
                  >
                    AUTHENTICATED
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 5. MOBILE HELPER: Tabbed / Carousel View for Small Screens (< 768px) */}
        {isMobile && (
          <div className="mt-3 w-full max-w-sm flex flex-col items-center gap-2 px-2 z-30">
            {/* Mobile Header & Step Buttons */}
            <div className="w-full flex items-center justify-between bg-zinc-950/90 px-3 py-1.5 rounded-full border border-zinc-800">
              <span className="font-mono text-xs text-amber-400 font-bold">
                ACHIEVEMENT 0{activeIdx + 1} / 04
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    const next = (activeIdx - 1 + achievements.length) % achievements.length;
                    setActiveIdx(next);
                    scrollToIndex(next);
                  }}
                  className="p-1 text-zinc-400 hover:text-white"
                  aria-label="Previous Achievement"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    const next = (activeIdx + 1) % achievements.length;
                    setActiveIdx(next);
                    scrollToIndex(next);
                  }}
                  className="p-1 text-zinc-400 hover:text-white"
                  aria-label="Next Achievement"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mobile Card Content */}
            <div className="w-full p-3.5 rounded-xl bg-zinc-950/95 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.2)] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-zinc-400 font-semibold uppercase">
                  {achievements[activeIdx].category}
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                  {achievements[activeIdx].tag}
                </span>
              </div>
              <h4 className="font-typewriter text-sm font-bold text-white flex items-start gap-1.5">
                <span className="text-amber-400">•</span>
                <span>{achievements[activeIdx].title}</span>
              </h4>
              <p className="font-mono text-xs text-zinc-300 leading-relaxed pl-3 relative">
                <span className="absolute left-0 text-amber-400">•</span>
                {achievements[activeIdx].description}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
