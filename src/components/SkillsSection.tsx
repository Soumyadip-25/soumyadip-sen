"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Code2,
  Layers,
  Database,
  Brain,
  Cpu,
  ShieldCheck,
  ArrowRight,
  Terminal,
} from "lucide-react";
import { skillTopics } from "@/data/skills";

const iconMap = {
  Code2,
  Layers,
  Database,
  Brain,
  Cpu,
  ShieldCheck,
};

// Physical CRT monitor coordinates on the 9:16 mobile background image (skills-bg-mobile.jpg)
// 3 Rows x 2 Columns of CRT monitors
const mobileRects = [
  // Module 01: Programming Languages (Row 1 Left)
  { leftPct: 20.5, topPct: 26.8, widthPct: 28.5, heightPct: 12.3 },
  // Module 02: Full Stack Development (Row 1 Right)
  { leftPct: 58.0, topPct: 26.8, widthPct: 28.5, heightPct: 12.3 },
  // Module 03: Databases & Cloud (Row 2 Left)
  { leftPct: 20.5, topPct: 44.3, widthPct: 28.5, heightPct: 12.3 },
  // Module 04: AI / ML & Data Analytics (Row 2 Right)
  { leftPct: 58.0, topPct: 44.3, widthPct: 28.5, heightPct: 12.3 },
  // Module 05: Tools / Platforms & IoT (Row 3 Left)
  { leftPct: 20.5, topPct: 61.3, widthPct: 28.5, heightPct: 12.0 },
  // Module 06: Core Competencies (Row 3 Right)
  { leftPct: 58.0, topPct: 61.3, widthPct: 28.5, heightPct: 12.0 },
];

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [stageBounds, setStageBounds] = useState({
    width: 1024,
    height: 576,
    scale: 1,
  });
  const [hoveredTopicId, setHoveredTopicId] = useState<string | null>(null);

  // Recompute typography scale for desktop so text and icons scale smoothly
  const updateLayout = useCallback(() => {
    if (!containerRef.current) return;

    const stageW = containerRef.current.clientWidth;
    const stageH = containerRef.current.clientHeight;

    if (stageW === 0 || stageH === 0) return;

    const scale = Math.min(stageW / 1024, stageH / 576);

    setStageBounds({
      width: stageW,
      height: stageH,
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

  // Dynamic typography scale balanced so titles fit cleanly without crowding the CRT screen
  const typographyScale = Math.min(Math.max(stageBounds.scale, 0.7), 1.38);

  return (
    <section
      id="skills"
      className="relative min-h-0 md:h-screen md:max-h-screen w-full overflow-hidden bg-[#121214] vintage-charcoal-bg select-none scroll-mt-0"
    >
      {/* ========================================================= */}
      {/* 1. DESKTOP 16:9 CONTROL ROOM STAGE - Full-bleed (Zero gaps) */}
      {/* ========================================================= */}
      <div
        ref={containerRef}
        className="hidden md:block absolute inset-0 z-0 overflow-hidden md:left-52 lg:left-56"
      >
        {/* 1. Complete Background Image: Pot & Plant & Desks 100% Intact */}
        <div className="absolute inset-0">
          <Image
            src="/images/skills-bg.jpg"
            alt="Vintage CRT Wall Background"
            fill
            priority
            sizes="calc(100vw - 224px)"
            className="object-cover md:object-fill object-center pointer-events-none select-none filter brightness-[1.02] contrast-[1.08]"
          />
        </div>

        {/* Delicate Vignette Overlay for Filmic Texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-radial from-transparent via-transparent to-black/50 pointer-events-none"
        />

          {/* 2. Top-Left Heading: "Skills & Technologies" sticker - Tactile Wall Stamp */}
          <motion.div
            initial={{ opacity: 0, y: -25, rotate: -5, scale: 1.05 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2.5, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.04, rotate: 0 }}
            style={{
              left: "6.8%",
              top: "2.2%",
              width: "25.0%",
            }}
            className="absolute aspect-[1024/341] z-30 pointer-events-auto cursor-pointer -rotate-[2.5deg] origin-center drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)] transform-gpu"
            data-cursor="interactive"
            data-cursor-label="SKILLS // CONSOLE"
          >
            <Image
              src="/images/skills-title.png"
              alt="Skills & Technologies"
              fill
              priority
              sizes="360px"
              className="object-contain object-left pointer-events-none select-none filter contrast-125 brightness-105"
            />
          </motion.div>

          {/* 3. The 6 CRT Monitor Interactive Overlays: Sequential Cathode Terminal Wake-Up Sequence */}
          {skillTopics.map((topic, index) => {
            const Icon = iconMap[topic.iconName] || Terminal;
            const isHovered = hoveredTopicId === topic.id;

            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 1.25,
                  delay: 0.2 + index * 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  left: `${topic.rect.leftPct}%`,
                  top: `${topic.rect.topPct}%`,
                  width: `${topic.rect.widthPct}%`,
                  height: `${topic.rect.heightPct}%`,
                }}
                className="absolute pointer-events-auto transform-gpu"
              >
                <Link
                  href={`/skills/${topic.slug}`}
                  data-cursor="interactive"
                  data-cursor-label={`MOD ${topic.number} // ${topic.shortTitle.toUpperCase()}`}
                  onMouseEnter={() => setHoveredTopicId(topic.id)}
                  onMouseLeave={() => setHoveredTopicId(null)}
                  className={`group w-full h-full flex flex-col justify-between items-center px-1.5 py-1 rounded-[14px] overflow-hidden transition-all duration-300 cursor-pointer ${
                    isHovered
                      ? "bg-white/[0.09] border border-white/80 shadow-[0_0_18px_rgba(255,255,255,0.4),inset_0_0_20px_rgba(255,255,255,0.18)]"
                      : "bg-black/20 border border-white/[0.08] hover:border-white/40 shadow-[inset_0_0_15px_rgba(0,0,0,0.7)]"
                  }`}
                  title={`Module ${topic.number}: ${topic.title} (Click to visit)`}
                  aria-label={`View ${topic.title} details`}
                >
                  {/* CRT Scanline Texture Layer */}
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
                      isHovered ? "opacity-35" : "opacity-20"
                    }`}
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.6) 2px, rgba(0, 0, 0, 0.6) 4px)",
                    }}
                  />

                  {/* CRT Glass Curved Reflection Glare */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none opacity-30 rounded-[inherit]"
                  />

                  {/* CRT Glass Vignette (Bulging CRT Edge Falloff) */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-radial from-transparent via-transparent to-black/70 pointer-events-none rounded-[inherit]"
                  />

                  {/* Top Readout: Module Number & Live Status Dot */}
                  <div className="relative z-10 w-full flex items-center justify-between px-2 pt-1">
                    <span
                      style={{ fontSize: `${Math.round(10.5 * typographyScale)}px` }}
                      className={`font-mono font-bold tracking-tight transition-colors ${
                        isHovered ? "text-white" : "text-zinc-200"
                      }`}
                    >
                      MODULE // {topic.number}
                    </span>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        style={{ fontSize: `${Math.round(9.5 * typographyScale)}px` }}
                        className={`font-mono font-medium transition-colors ${
                          isHovered ? "text-white" : "text-zinc-400"
                        }`}
                      >
                        {isHovered ? "LIVE" : "60Hz"}
                      </span>
                      <span
                        className={`w-2 h-2 rounded-full transition-all ${
                          isHovered
                            ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] animate-pulse"
                            : "bg-zinc-500"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Center Content: Phosphor Glowing Icon & Typewriter Title */}
                  <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center px-1 w-full">
                    {/* Glowing Icon */}
                    <div
                      className={`transition-all duration-300 transform ${
                        isHovered
                          ? "text-white scale-105 drop-shadow-[0_0_12px_rgba(255,255,255,0.95)]"
                          : "text-zinc-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                      }`}
                    >
                      <Icon
                        style={{
                          width: `${Math.round(28 * typographyScale)}px`,
                          height: `${Math.round(28 * typographyScale)}px`,
                        }}
                        strokeWidth={2.2}
                      />
                    </div>

                    {/* Topic Title in Typewriter Font (Refined & Balanced) */}
                    <h3
                      style={{
                        fontSize: `${Math.round(14.2 * typographyScale)}px`,
                        lineHeight: 1.24,
                        marginTop: `${Math.round(4 * typographyScale)}px`,
                      }}
                      className={`font-typewriter font-bold tracking-tight [text-wrap:balance] transition-colors duration-200 ${
                        isHovered
                          ? "text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.95)]"
                          : "text-zinc-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
                      }`}
                    >
                      {topic.title}
                    </h3>
                  </div>

                  {/* Bottom Bar: Access / Click Prompt */}
                  <div className="relative z-10 w-full flex items-center justify-center pb-1">
                    <div
                      style={{ fontSize: `${Math.round(10 * typographyScale)}px` }}
                      className={`inline-flex items-center gap-1.5 font-mono tracking-widest font-semibold transition-all duration-200 ${
                        isHovered
                          ? "text-white opacity-100 translate-y-0"
                          : "text-zinc-500 opacity-0 translate-y-0.5"
                      }`}
                    >
                      <span>[ VISIT ]</span>
                      <ArrowRight
                        style={{
                          width: `${Math.round(10.5 * typographyScale)}px`,
                          height: `${Math.round(10.5 * typographyScale)}px`,
                        }}
                        className="group-hover:translate-x-0.5 transition-transform"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      {/* ========================================================= */}
      {/* 2. MOBILE DEDICATED VIEW (< 768px): Responsive 2-Col CRT Wall */}
      {/* Authentic Vintage CRT Monitor Sets with Screen, Knobs & Speaker */}
      {/* ========================================================= */}
      <div className="md:hidden relative z-10 w-full min-h-0 flex flex-col items-center justify-start px-3 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-6 overflow-hidden">
        {/* Top Heading: "Skills & Technologies" paper sticker */}
        <motion.div
          initial={{ opacity: 0, y: -20, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-48 sm:w-56 aspect-[1024/341] shrink-0 mb-3 sm:mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] cursor-pointer"
          data-cursor="interactive"
          data-cursor-label="SKILLS // CONSOLE"
        >
          <Image
            src="/images/skills-title.png"
            alt="Skills & Technologies"
            fill
            priority
            sizes="300px"
            className="object-contain object-center pointer-events-none select-none filter contrast-125 brightness-105"
          />
        </motion.div>

        {/* 6 Authentic CRT Monitor Units in 2-Column x 3-Row Grid */}
        <div className="w-full max-w-sm sm:max-w-md grid grid-cols-2 gap-2.5 sm:gap-3.5">
          {skillTopics.map((topic, index) => {
            const Icon = iconMap[topic.iconName] || Terminal;

            return (
              <motion.div
                key={`mobile-${topic.id}`}
                initial={{ opacity: 0, scale: 0.92, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 1.1,
                  delay: 0.15 + index * 0.14,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-full"
              >
                <Link
                  href={`/skills/${topic.slug}`}
                  data-cursor="interactive"
                  data-cursor-label={`MOD ${topic.number} // ${topic.shortTitle.toUpperCase()}`}
                  className="group relative w-full aspect-[768/1024] flex flex-col justify-between items-center rounded-xl overflow-hidden transition-all duration-200 cursor-pointer shadow-[0_6px_18px_rgba(0,0,0,0.9)] hover:scale-[1.03] active:scale-[0.98] border border-white/10 hover:border-white/40"
                  title={`Module ${topic.number}: ${topic.title} (Tap to visit)`}
                  aria-label={`View ${topic.title} details`}
                >
                  {/* Authentic Vintage CRT Television Monitor Frame (With screen, knobs & speaker grille) */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src="/images/skills-module-crt.jpg"
                      alt={`CRT Monitor for Module ${topic.number}`}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 640px) 190px, 240px"
                      className="object-fill select-none pointer-events-none filter brightness-[1.0] contrast-[1.04]"
                    />
                  </div>

                  {/* Inner CRT Screen Area (Positioned precisely over the screen tube of the monitor) */}
                  <div className="absolute inset-x-[7.5%] top-[5.5%] bottom-[19%] z-10 flex flex-col justify-between items-center p-1.5 sm:p-2 pointer-events-none select-none">
                    
                    {/* Top Screen Readout: Module Number & Live 60Hz Telemetry */}
                    <div className="relative z-10 w-full flex items-center justify-between">
                      <span className="font-mono font-bold text-[8px] sm:text-[9px] tracking-tight text-zinc-300 group-hover:text-white transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                        MOD // {topic.number}
                      </span>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="font-mono text-[7px] sm:text-[8px] text-zinc-400 group-hover:text-zinc-200 transition-colors">
                          60Hz
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 group-hover:bg-white group-hover:shadow-[0_0_6px_rgba(255,255,255,0.95)] transition-all" />
                      </div>
                    </div>

                    {/* Center Screen: Glowing Phosphor Icon & Typewriter Module Title */}
                    <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center px-1 w-full">
                      <div className="text-zinc-100 group-hover:text-white group-hover:scale-105 drop-shadow-[0_0_8px_rgba(255,255,255,0.85)] transition-all duration-200">
                        <Icon className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5" strokeWidth={2.2} />
                      </div>
                      <h3 className="font-typewriter font-bold text-[9px] sm:text-[10px] text-zinc-100 group-hover:text-white tracking-tight leading-tight mt-1 [text-wrap:balance] line-clamp-2 transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]">
                        {topic.title}
                      </h3>
                    </div>

                    {/* Bottom Screen Prompt */}
                    <div className="relative z-10 w-full flex items-center justify-center pt-0.5">
                      <span className="font-mono text-[7px] sm:text-[8px] font-semibold tracking-wider text-zinc-400 group-hover:text-white transition-colors inline-flex items-center gap-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                        [ VISIT <ArrowRight className="w-2.5 h-2.5 inline stroke-[2.5]" /> ]
                      </span>
                    </div>

                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
