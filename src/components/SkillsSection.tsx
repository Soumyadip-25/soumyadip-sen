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

  // Recompute the 16:9 stage dimensions for desktop so the ENTIRE background image is completely visible
  const updateLayout = useCallback(() => {
    if (!containerRef.current) return;

    // Available space inside the stage (accounting for desktop sidebar padding)
    const stageW = containerRef.current.clientWidth;
    const stageH = containerRef.current.clientHeight;

    if (stageW === 0 || stageH === 0) return;

    // Compute uniform scale so 100% of the 1024x576 image fits with ZERO cropping
    // and no parts of the left, right, top, or bottom are cut off
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

  // Dynamic typography scale balanced so titles fit cleanly without crowding the CRT screen
  const typographyScale = Math.min(Math.max(stageBounds.scale, 0.7), 1.38);

  return (
    <section
      id="skills"
      className="relative h-screen max-h-screen w-full overflow-hidden bg-[#070709] select-none md:pl-52 lg:pl-56"
    >
      {/* Subtle Atmospheric Ambient Texture behind stage */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 filter blur-3xl">
        <Image
          src="/images/skills-bg.jpg"
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
          className="relative shrink-0 select-none shadow-[0_0_50px_rgba(0,0,0,0.9)] rounded-lg overflow-hidden"
        >
          {/* 1. Complete Background Image (Fully Visible, Pot & Plant & Desks 100% Intact) */}
          <Image
            src="/images/skills-bg.jpg"
            alt="Vintage CRT Wall Background"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1400px"
            className="object-contain pointer-events-none select-none filter brightness-[1.02] contrast-[1.08]"
          />

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
            transition={{ duration: 0.95, ease: [0.19, 1, 0.22, 1] }}
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
                  duration: 0.85,
                  delay: 0.15 + index * 0.12,
                  ease: [0.19, 1, 0.22, 1],
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
      </div>

      {/* ========================================================= */}
      {/* 2. MOBILE DEDICATED VIEW (< 768px): Authentic 9:16 CRT Stage */}
      {/* Strictly uses skills-bg-mobile.jpg for mobile view          */}
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
            src="/images/skills-bg-mobile.jpg"
            alt="Skills & Technologies Mobile CRT Wall"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 410px"
            className="object-cover pointer-events-none select-none filter brightness-[1.02] contrast-[1.06]"
          />

          {/* Delicate Vignette Overlay for Filmic Texture */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-radial from-transparent via-transparent to-black/40 pointer-events-none"
          />

          {/* Top Heading: "Skills & Technologies" paper sticker on dark chalkboard wall */}
          <motion.div
            initial={{ opacity: 0, y: -20, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.85, ease: [0.19, 1, 0.22, 1] }}
            style={{
              left: "10%",
              top: "7.5%",
              width: "80%",
            }}
            className="absolute aspect-[1024/341] z-30 pointer-events-auto -rotate-[1.5deg] origin-center drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
            data-cursor="interactive"
            data-cursor-label="SKILLS // CONSOLE"
          >
            <Image
              src="/images/skills-title.png"
              alt="Skills & Technologies"
              fill
              priority
              sizes="360px"
              className="object-contain object-center pointer-events-none select-none filter contrast-125 brightness-105"
            />
          </motion.div>

          {/* The 6 CRT Monitors in 2-Column x 3-Row Grid */}
          {skillTopics.map((topic, index) => {
            const Icon = iconMap[topic.iconName] || Terminal;
            const rect = mobileRects[index] || topic.rect;

            return (
              <motion.div
                key={`mobile-${topic.id}`}
                initial={{ opacity: 0, scale: 0.92, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.75,
                  delay: 0.1 + index * 0.08,
                  ease: [0.19, 1, 0.22, 1],
                }}
                style={{
                  left: `${rect.leftPct}%`,
                  top: `${rect.topPct}%`,
                  width: `${rect.widthPct}%`,
                  height: `${rect.heightPct}%`,
                }}
                className="absolute pointer-events-auto"
              >
                <Link
                  href={`/skills/${topic.slug}`}
                  data-cursor="interactive"
                  data-cursor-label={`MOD ${topic.number} // ${topic.shortTitle.toUpperCase()}`}
                  className="group w-full h-full flex flex-col justify-between items-center px-1.5 py-1 rounded-[10px] sm:rounded-[12px] overflow-hidden transition-all duration-200 cursor-pointer bg-black/20 hover:bg-white/[0.08] active:bg-white/[0.12] active:scale-[0.97] border border-white/[0.08] hover:border-white/50 shadow-[inset_0_0_12px_rgba(0,0,0,0.8)]"
                  title={`Module ${topic.number}: ${topic.title} (Tap to visit)`}
                  aria-label={`View ${topic.title} details`}
                >
                  {/* CRT Scanline Layer */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none opacity-25"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.6) 2px, rgba(0, 0, 0, 0.6) 4px)",
                    }}
                  />

                  {/* CRT Glass Curved Glare */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none opacity-30 rounded-[inherit]"
                  />

                  {/* Top Readout: Module Number & Status Dot */}
                  <div className="relative z-10 w-full flex items-center justify-between px-1 pt-0.5">
                    <span className="font-mono font-bold text-[7.5px] sm:text-[9px] tracking-tight text-zinc-300 group-hover:text-white transition-colors">
                      MOD // {topic.number}
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="font-mono text-[7px] sm:text-[8px] text-zinc-400 group-hover:text-zinc-200 transition-colors">
                        60Hz
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 group-hover:bg-white group-hover:shadow-[0_0_6px_rgba(255,255,255,0.9)] transition-all" />
                    </div>
                  </div>

                  {/* Center Content: Icon & Title */}
                  <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center px-0.5 w-full">
                    <div className="text-zinc-100 group-hover:text-white group-hover:scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] transition-all duration-200">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.2} />
                    </div>
                    <h3 className="font-typewriter font-bold text-[8.5px] sm:text-[10px] text-zinc-100 group-hover:text-white tracking-tight leading-tight mt-0.5 [text-wrap:balance] line-clamp-2 transition-colors">
                      {topic.title}
                    </h3>
                  </div>

                  {/* Bottom Prompt */}
                  <div className="relative z-10 w-full flex items-center justify-center pb-0.5">
                    <span className="font-mono text-[7px] sm:text-[8px] font-semibold tracking-wider text-zinc-400 group-hover:text-white transition-colors inline-flex items-center gap-0.5">
                      [ VISIT <ArrowRight className="w-2.5 h-2.5 inline stroke-[2.5]" /> ]
                    </span>
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
