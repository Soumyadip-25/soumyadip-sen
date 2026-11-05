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
  ChevronLeft,
  ChevronRight,
  Terminal,
} from "lucide-react";
import { skillTopics, SkillTopic } from "@/data/skills";

const iconMap = {
  Code2,
  Layers,
  Database,
  Brain,
  Cpu,
  ShieldCheck,
};

interface RenderedScreenBox {
  topic: SkillTopic;
  left: number;
  top: number;
  width: number;
  height: number;
  scale: number;
}

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [screenBoxes, setScreenBoxes] = useState<RenderedScreenBox[]>([]);
  const [hoveredTopicId, setHoveredTopicId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(0);

  // Exact aspect ratio of skills-bg.jpg (1024 x 576 = 16:9)
  const IMG_RATIO = 1024 / 576;

  // Recompute CRT screen positions to lock onto the background image pixels
  const updateLayout = useCallback(() => {
    if (!containerRef.current) return;

    const stageW = containerRef.current.clientWidth;
    const stageH = containerRef.current.clientHeight;

    if (stageW === 0 || stageH === 0) return;

    const mobileCheck = stageW < 768;
    setIsMobile(mobileCheck);

    const stageRatio = stageW / stageH;
    let renderedW: number;
    let renderedH: number;
    let offsetX: number;
    let offsetY: number;

    if (stageRatio > IMG_RATIO) {
      // Stage is wider than 16:9 -> image width matches container, height scaled & cropped
      renderedW = stageW;
      renderedH = stageW / IMG_RATIO;
      offsetX = 0;
      offsetY = (stageH - renderedH) / 2;
    } else {
      // Stage is taller than 16:9 -> image height matches container, width scaled & cropped
      renderedH = stageH;
      renderedW = stageH * IMG_RATIO;
      offsetX = (stageW - renderedW) / 2;
      offsetY = 0;
    }

    const boxes: RenderedScreenBox[] = skillTopics.map((topic) => {
      const left = offsetX + (topic.rect.leftPct / 100) * renderedW;
      const top = offsetY + (topic.rect.topPct / 100) * renderedH;
      const width = (topic.rect.widthPct / 100) * renderedW;
      const height = (topic.rect.heightPct / 100) * renderedH;
      // Proportional scale factor for typography & icon sizing
      const scale = Math.min(Math.max(width / 240, 0.65), 1.25);

      return {
        topic,
        left,
        top,
        width,
        height,
        scale,
      };
    });

    setScreenBoxes(boxes);
  }, [IMG_RATIO]);

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

  const activeMobileTopic = skillTopics[activeMobileIndex];
  const ActiveMobileIcon = iconMap[activeMobileTopic.iconName] || Terminal;

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative h-screen max-h-screen w-full overflow-hidden bg-[#070709] select-none"
    >
      {/* 1. Full-Bleed Vintage CRT Control Room Background (No Gaps, No Letterbox) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/skills-bg.jpg"
          alt="Vintage Analog CRT Monitors Wall Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[1.02] contrast-[1.08]"
        />

        {/* Delicate Vignette Overlay for Filmic Texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60 pointer-events-none"
        />

        {/* Subtle Edge gradient on left to blend smoothly with the sidebar on desktop */}
        <div className="hidden md:block absolute inset-y-0 left-0 w-48 lg:w-56 bg-gradient-to-r from-black/70 to-transparent pointer-events-none" />
      </div>

      {/* 2. Top-Left Stamped Heading: "Skills & Technologies" */}
      <div className="absolute top-5 sm:top-6 md:top-8 left-4 sm:left-8 md:left-56 lg:left-60 z-30 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-52 sm:w-60 md:w-68 lg:w-80 xl:w-88 aspect-[1024/341] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
        >
          <Image
            src="/images/skills-title.png"
            alt="Skills & Technologies"
            fill
            priority
            sizes="(max-width: 768px) 240px, 340px"
            className="object-contain object-left pointer-events-none select-none filter contrast-125"
          />
        </motion.div>
      </div>

      {/* 3. DESKTOP CRT OVERLAY: 6 Mathematically Aligned Interactive Monitor Screens */}
      {!isMobile && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          {screenBoxes.map((box) => {
            const { topic, left, top, width, height, scale } = box;
            const Icon = iconMap[topic.iconName] || Terminal;
            const isHovered = hoveredTopicId === topic.id;

            return (
              <Link
                key={topic.id}
                href={`/skills/${topic.slug}`}
                onMouseEnter={() => setHoveredTopicId(topic.id)}
                onMouseLeave={() => setHoveredTopicId(null)}
                style={{
                  left: `${left}px`,
                  top: `${top}px`,
                  width: `${width}px`,
                  height: `${height}px`,
                }}
                className={`group absolute pointer-events-auto flex flex-col justify-between items-center p-2.5 sm:p-3.5 rounded-[12px] md:rounded-[14px] lg:rounded-[16px] overflow-hidden transition-all duration-300 cursor-pointer ${
                  isHovered
                    ? "bg-emerald-950/40 border border-emerald-400/80 shadow-[0_0_28px_rgba(16,185,129,0.45),inset_0_0_20px_rgba(16,185,129,0.3)] scale-[1.02]"
                    : "bg-black/35 border border-white/10 hover:border-emerald-500/40 shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]"
                }`}
                title={`Topic ${topic.number}: ${topic.title} (Click to open)`}
                aria-label={`View ${topic.title} details`}
              >
                {/* CRT Scanline Texture Layer */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
                    isHovered ? "opacity-35" : "opacity-25"
                  }`}
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.6) 2px, rgba(0, 0, 0, 0.6) 4px)",
                  }}
                />

                {/* CRT Glass Curved Reflection Glare */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none opacity-40 rounded-[inherit]"
                />

                {/* CRT Glass Vignette (Bulging CRT Edge Falloff) */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-radial from-transparent via-transparent to-black/75 pointer-events-none rounded-[inherit]"
                />

                {/* Top Readout: Channel Number & Live Status Dot */}
                <div className="relative z-10 w-full flex items-center justify-between px-1">
                  <span
                    style={{ fontSize: `${Math.round(10 * scale)}px` }}
                    className={`font-mono font-bold tracking-wider px-1.5 py-0.5 rounded transition-all ${
                      isHovered
                        ? "bg-emerald-900/90 text-emerald-300 border border-emerald-400/50 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                        : "bg-zinc-900/80 text-zinc-400 border border-white/5"
                    }`}
                  >
                    CH // {topic.number}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span
                      style={{ fontSize: `${Math.round(9 * scale)}px` }}
                      className={`font-mono transition-colors ${
                        isHovered ? "text-emerald-300" : "text-zinc-500"
                      }`}
                    >
                      {isHovered ? "SIGNAL ON" : "60Hz"}
                    </span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        isHovered
                          ? "bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse"
                          : "bg-zinc-600"
                      }`}
                    />
                  </div>
                </div>

                {/* Center Content: Phosphor Glowing Icon & Typewriter Title */}
                <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center px-1">
                  {/* Glowing Icon */}
                  <div
                    className={`transition-all duration-300 transform ${
                      isHovered
                        ? "text-emerald-300 scale-110 drop-shadow-[0_0_12px_rgba(52,211,153,0.9)]"
                        : "text-zinc-200 drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
                    }`}
                  >
                    <Icon
                      style={{
                        width: `${Math.round(28 * scale)}px`,
                        height: `${Math.round(28 * scale)}px`,
                      }}
                      strokeWidth={2}
                    />
                  </div>

                  {/* Topic Title in Typewriter Font */}
                  <h3
                    style={{
                      fontSize: `${Math.round(13 * scale)}px`,
                      lineHeight: 1.25,
                      marginTop: `${Math.round(6 * scale)}px`,
                    }}
                    className={`font-typewriter font-bold tracking-tight transition-colors duration-200 ${
                      isHovered
                        ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                        : "text-zinc-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                    }`}
                  >
                    {topic.title}
                  </h3>
                </div>

                {/* Bottom Bar: Access / Click Prompt */}
                <div className="relative z-10 w-full flex items-center justify-center pt-0.5">
                  <div
                    style={{ fontSize: `${Math.round(9 * scale)}px` }}
                    className={`inline-flex items-center gap-1 font-mono tracking-wider transition-all duration-200 px-2 py-0.5 rounded-full ${
                      isHovered
                        ? "text-emerald-300 bg-emerald-950/80 border border-emerald-500/40"
                        : "text-zinc-400/80 opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <span>ACCESS</span>
                    <ArrowRight
                      style={{
                        width: `${Math.round(10 * scale)}px`,
                        height: `${Math.round(10 * scale)}px`,
                      }}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* 4. MOBILE-OPTIMIZED CRT INTERACTION (Visible only on screens < 768px) */}
      {isMobile && (
        <div className="absolute inset-x-0 bottom-4 sm:bottom-6 z-30 px-4 flex flex-col items-center">
          {/* Active Mobile CRT Monitor Card */}
          <Link
            href={`/skills/${activeMobileTopic.slug}`}
            className="w-full max-w-sm p-4 rounded-xl bg-zinc-950/90 border border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.25)] backdrop-blur-md relative overflow-hidden group cursor-pointer"
          >
            {/* Scanline overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.7) 2px, rgba(0, 0, 0, 0.7) 4px)",
              }}
            />

            <div className="relative z-10 flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded">
                CH // {activeMobileTopic.number}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                <span className="font-mono text-[11px] text-emerald-300">
                  TAP TO OPEN
                </span>
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-3.5 mb-2">
              <div className="p-2.5 rounded-lg bg-zinc-900 border border-emerald-500/30 text-emerald-400 shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                <ActiveMobileIcon className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <h3 className="font-typewriter text-base font-bold text-white tracking-wide truncate">
                  {activeMobileTopic.title}
                </h3>
                <p className="font-mono text-xs text-zinc-400 truncate">
                  {activeMobileTopic.subtitle}
                </p>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-2 border-t border-zinc-800 text-xs font-mono text-zinc-400">
              <span>{activeMobileTopic.skills.length} competencies</span>
              <span className="text-emerald-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                Explore Topic →
              </span>
            </div>
          </Link>

          {/* Channel Selector Buttons (01 - 06) */}
          <div className="flex items-center gap-1.5 mt-3 bg-black/80 p-1.5 rounded-full border border-zinc-800 backdrop-blur-md">
            <button
              onClick={(e) => {
                e.preventDefault();
                setActiveMobileIndex(
                  (prev) => (prev - 1 + skillTopics.length) % skillTopics.length
                );
              }}
              className="p-1 rounded-full text-zinc-400 hover:text-white cursor-pointer"
              aria-label="Previous topic"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {skillTopics.map((topic, idx) => (
              <button
                key={topic.id}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveMobileIndex(idx);
                }}
                className={`font-mono text-xs px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  activeMobileIndex === idx
                    ? "bg-emerald-500 text-black font-bold shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {topic.number}
              </button>
            ))}

            <button
              onClick={(e) => {
                e.preventDefault();
                setActiveMobileIndex(
                  (prev) => (prev + 1) % skillTopics.length
                );
              }}
              className="p-1 rounded-full text-zinc-400 hover:text-white cursor-pointer"
              aria-label="Next topic"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
