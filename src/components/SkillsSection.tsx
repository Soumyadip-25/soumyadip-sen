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

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [stageBounds, setStageBounds] = useState({
    width: 1024,
    height: 576,
    scale: 1,
  });
  const [hoveredTopicId, setHoveredTopicId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(0);

  // Recompute the 16:9 stage dimensions so the ENTIRE background image is completely visible
  const updateLayout = useCallback(() => {
    if (!containerRef.current) return;

    // Available space inside the stage (accounting for desktop sidebar padding)
    const stageW = containerRef.current.clientWidth;
    const stageH = containerRef.current.clientHeight;

    if (stageW === 0 || stageH === 0) return;

    setIsMobile(stageW < 640);

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

  const activeMobileTopic = skillTopics[activeMobileIndex];
  const ActiveMobileIcon = iconMap[activeMobileTopic.iconName] || Terminal;
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

          {/* 2. Top-Left Heading: "Skills & Technologies" sticker + typewriter lettering */}
          {/* Sized and placed in the open dark wall area above the plant with organic vintage tilt and crisp shadow */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              left: "4.0%",
              top: "2.2%",
              width: "25.5%",
            }}
            className="absolute aspect-[1024/341] z-30 pointer-events-none -rotate-[2.5deg] origin-center drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]"
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

          {/* 3. The 6 CRT Monitor Interactive Overlays (Mathematically Locked to 16:9 Screen Pixels) */}
          {skillTopics.map((topic) => {
            const Icon = iconMap[topic.iconName] || Terminal;
            const isHovered = hoveredTopicId === topic.id;

            return (
              <Link
                key={topic.id}
                href={`/skills/${topic.slug}`}
                onMouseEnter={() => setHoveredTopicId(topic.id)}
                onMouseLeave={() => setHoveredTopicId(null)}
                style={{
                  left: `${topic.rect.leftPct}%`,
                  top: `${topic.rect.topPct}%`,
                  width: `${topic.rect.widthPct}%`,
                  height: `${topic.rect.heightPct}%`,
                }}
                className={`group absolute pointer-events-auto flex flex-col justify-between items-center px-1.5 py-1 rounded-[14px] overflow-hidden transition-all duration-300 cursor-pointer ${
                  isHovered
                    ? "bg-emerald-950/40 border border-emerald-400/80 shadow-[0_0_16px_rgba(16,185,129,0.4),inset_0_0_20px_rgba(16,185,129,0.25)]"
                    : "bg-black/20 border border-white/[0.08] hover:border-emerald-500/40 shadow-[inset_0_0_15px_rgba(0,0,0,0.7)]"
                }`}
                title={`Topic ${topic.number}: ${topic.title} (Click to open)`}
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

                {/* Top Readout: Channel Number & Live Status Dot */}
                <div className="relative z-10 w-full flex items-center justify-between px-2 pt-1">
                  <span
                    style={{ fontSize: `${Math.round(11.5 * typographyScale)}px` }}
                    className={`font-mono font-bold tracking-wider transition-colors ${
                      isHovered ? "text-emerald-300" : "text-emerald-400"
                    }`}
                  >
                    CH // {topic.number}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span
                      style={{ fontSize: `${Math.round(9.5 * typographyScale)}px` }}
                      className={`font-mono font-medium transition-colors ${
                        isHovered ? "text-emerald-300" : "text-zinc-400"
                      }`}
                    >
                      {isHovered ? "LIVE" : "60Hz"}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full transition-all ${
                        isHovered
                          ? "bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse"
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
                        ? "text-emerald-300 scale-105 drop-shadow-[0_0_12px_rgba(52,211,153,0.95)]"
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
                        ? "text-emerald-300 opacity-100 translate-y-0"
                        : "text-zinc-500 opacity-0 translate-y-0.5"
                    }`}
                  >
                    <span>[ OPEN ]</span>
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
            );
          })}
        </div>

        {/* 4. MOBILE HELPER BAR: Quick Channel Switcher for Screens < 640px */}
        {isMobile && (
          <div className="mt-3 w-full max-w-sm flex flex-col items-center gap-2 px-2 z-30">
            {/* Active Channel Card */}
            <Link
              href={`/skills/${activeMobileTopic.slug}`}
              className="w-full p-3 rounded-lg bg-zinc-950/90 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.25)] flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="font-mono text-sm font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded">
                  {activeMobileTopic.number}
                </span>
                <span className="font-typewriter text-sm font-bold text-white truncate">
                  {activeMobileTopic.title}
                </span>
              </div>
              <span className="font-mono text-xs font-semibold text-emerald-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 shrink-0">
                Open <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            {/* Numeric Channel Switcher Buttons */}
            <div className="flex items-center gap-1.5 bg-black/80 px-3 py-1.5 rounded-full border border-zinc-800">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setActiveMobileIndex(
                    (prev) => (prev - 1 + skillTopics.length) % skillTopics.length
                  );
                }}
                className="p-1 text-zinc-400 hover:text-white"
                aria-label="Previous channel"
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
                  className={`font-mono text-xs px-2 py-0.5 rounded-full transition-all ${
                    activeMobileIndex === idx
                      ? "bg-emerald-500 text-black font-bold shadow-[0_0_8px_#10b981]"
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
                className="p-1 text-zinc-400 hover:text-white"
                aria-label="Next channel"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
