"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Trophy,
  Award,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Certification {
  name: string;
  issuer: string;
  category: string;
}

const certifications: Certification[] = [
  {
    name: "Career Essentials in Generative AI",
    issuer: "Microsoft & LinkedIn",
    category: "Artificial Intelligence",
  },
  {
    name: "Build Your Generative AI Productivity Skills",
    issuer: "Microsoft & LinkedIn",
    category: "Productivity & AI",
  },
  {
    name: "Data Science and Analytics",
    issuer: "HP LIFE",
    category: "Data Science",
  },
  {
    name: "Digital Business Skills",
    issuer: "HP LIFE",
    category: "Business Strategy",
  },
  {
    name: "Generative AI Tools",
    issuer: "NASSCOM",
    category: "Emerging Tech",
  },
];

const milestones = [
  {
    id: "freelance",
    title: "End-to-End Freelance Production Delivery",
    tagline: "Client Project Architecture & Lifecycle",
    description:
      "Independently delivered multiple freelance full-stack web applications from client requirements discovery through full deployment, cloud setup, and performance tuning.",
    icon: Trophy,
    theme: "amber",
  },
  {
    id: "mentorship",
    title: "STEM Mentorship & Education",
    tagline: "Academic Coaching & Pedagogy",
    description:
      "Mentored 20+ students in Mathematics and Science as a freelance tutor, engineering structured curriculum roadmaps and measurable assessment frameworks.",
    icon: Award,
    theme: "emerald",
  },
];

export default function AchievementsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [stageBounds, setStageBounds] = useState({
    width: 1024,
    height: 576,
    scale: 1,
  });
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activeMobileTab, setActiveMobileTab] = useState<"milestones" | "certs">("milestones");
  const [activeMobileIdx, setActiveMobileIdx] = useState<number>(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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

          {/* 3. Top-Right Archival Status Bar (x: 34.5% to 81.5%, y: 3.5% to 18%) */}
          <div
            style={{
              left: "34.5%",
              top: "3.5%",
              width: "47.0%",
              height: "14%",
            }}
            className="absolute z-20 flex items-center justify-between px-3.5 py-1 rounded-lg bg-zinc-950/60 border border-white/10 backdrop-blur-sm shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]"
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
                style={{ fontSize: `${Math.round(10.5 * typographyScale)}px` }}
                className="hidden sm:inline font-mono text-zinc-300 tracking-wide"
              >
                OFFICIAL MILESTONES & ACCREDITATIONS
              </span>
            </div>

            <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-950/40 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span
                style={{ fontSize: `${Math.round(9.5 * typographyScale)}px` }}
                className="font-mono font-bold text-emerald-300 tracking-wider"
              >
                RECORD VERIFIED
              </span>
            </div>
          </div>

          {/* 4. Upper-Mid Zone: Two Featured Milestones (x: 4.0% to 81.5%, y: 20% to 51%) */}
          <div
            style={{
              left: "4.0%",
              top: "20.0%",
              width: "77.5%",
              height: "30.5%",
            }}
            className="absolute z-20 grid grid-cols-2 gap-3"
          >
            {milestones.map((m) => {
              const Icon = m.icon;
              const isAmber = m.theme === "amber";
              const isHovered = hoveredCard === m.id;

              return (
                <div
                  key={m.id}
                  onMouseEnter={() => setHoveredCard(m.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group relative flex flex-col justify-between p-3 sm:p-3.5 rounded-xl transition-all duration-300 overflow-hidden ${
                    isHovered
                      ? isAmber
                        ? "bg-zinc-950/85 border border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2),inset_0_0_20px_rgba(245,158,11,0.1)]"
                        : "bg-zinc-950/85 border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2),inset_0_0_20px_rgba(16,185,129,0.1)]"
                      : "bg-zinc-950/65 border border-white/10 shadow-[inset_0_0_15px_rgba(0,0,0,0.85)]"
                  }`}
                >
                  {/* Subtle top indicator bar */}
                  <div className="flex items-center justify-between pb-1">
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isAmber
                            ? "bg-amber-500/10 border-amber-500/30 text-amber-300 group-hover:bg-amber-500/20"
                            : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 group-hover:bg-emerald-500/20"
                        }`}
                      >
                        <Icon
                          style={{
                            width: `${Math.round(18 * typographyScale)}px`,
                            height: `${Math.round(18 * typographyScale)}px`,
                          }}
                        />
                      </div>
                      <span
                        style={{ fontSize: `${Math.round(9.5 * typographyScale)}px` }}
                        className="font-mono text-zinc-400 uppercase tracking-widest"
                      >
                        {m.tagline}
                      </span>
                    </div>

                    <span
                      style={{ fontSize: `${Math.round(9 * typographyScale)}px` }}
                      className={`font-mono px-1.5 py-0.5 rounded border transition-colors ${
                        isAmber
                          ? "bg-amber-950/40 border-amber-500/30 text-amber-400"
                          : "bg-emerald-950/40 border-emerald-500/30 text-emerald-400"
                      }`}
                    >
                      ★ FEATURED
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: `${Math.round(13.5 * typographyScale)}px`,
                      lineHeight: 1.25,
                    }}
                    className="font-typewriter font-bold text-white tracking-tight my-1 group-hover:text-amber-200 transition-colors"
                  >
                    {m.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: `${Math.round(10.2 * typographyScale)}px`,
                      lineHeight: 1.35,
                    }}
                    className="font-mono text-zinc-300 font-light line-clamp-3"
                  >
                    {m.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* 5. Lower Zone: Official Certifications Plaque (x: 29.5% to 81.5%, y: 53.0% to 95.0%) */}
          {/* Leaves the Camera at x: 0..28% and Trophy at x: 82..100% 100% UNTOUCHED & VISIBLE */}
          <div
            style={{
              left: "29.5%",
              top: "53.0%",
              width: "52.0%",
              height: "42.0%",
            }}
            className="absolute z-20 flex flex-col justify-between p-3 rounded-xl bg-zinc-950/70 border border-white/10 backdrop-blur-md shadow-[inset_0_0_20px_rgba(0,0,0,0.9)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-1.5 border-b border-zinc-800/80">
              <div className="flex items-center gap-2">
                <ShieldCheck
                  style={{
                    width: `${Math.round(14 * typographyScale)}px`,
                    height: `${Math.round(14 * typographyScale)}px`,
                  }}
                  className="text-emerald-400"
                />
                <h4
                  style={{ fontSize: `${Math.round(11 * typographyScale)}px` }}
                  className="font-typewriter text-zinc-200 font-bold uppercase tracking-wider"
                >
                  Official Certifications & Licenses
                </h4>
              </div>
              <span
                style={{ fontSize: `${Math.round(9 * typographyScale)}px` }}
                className="font-mono text-zinc-400"
              >
                [ 05 VERIFIED ]
              </span>
            </div>

            {/* 2-Column Grid for the 5 Certifications + 1 Accreditation Stamp */}
            <div className="grid grid-cols-2 gap-2 my-auto">
              {/* Card 1 */}
              <div className="p-2 rounded-lg bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-emerald-500/40 transition-all group flex items-start gap-2">
                <CheckCircle2
                  style={{
                    width: `${Math.round(13 * typographyScale)}px`,
                    height: `${Math.round(13 * typographyScale)}px`,
                  }}
                  className="text-emerald-400 shrink-0 mt-0.5"
                />
                <div className="min-w-0">
                  <h5
                    style={{ fontSize: `${Math.round(10.5 * typographyScale)}px`, lineHeight: 1.25 }}
                    className="font-mono font-semibold text-zinc-100 group-hover:text-emerald-300 transition-colors truncate"
                  >
                    Career Essentials in Gen AI
                  </h5>
                  <span
                    style={{ fontSize: `${Math.round(8.5 * typographyScale)}px` }}
                    className="font-mono text-zinc-400 block"
                  >
                    Microsoft & LinkedIn
                  </span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-2 rounded-lg bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-emerald-500/40 transition-all group flex items-start gap-2">
                <CheckCircle2
                  style={{
                    width: `${Math.round(13 * typographyScale)}px`,
                    height: `${Math.round(13 * typographyScale)}px`,
                  }}
                  className="text-emerald-400 shrink-0 mt-0.5"
                />
                <div className="min-w-0">
                  <h5
                    style={{ fontSize: `${Math.round(10.5 * typographyScale)}px`, lineHeight: 1.25 }}
                    className="font-mono font-semibold text-zinc-100 group-hover:text-emerald-300 transition-colors truncate"
                  >
                    Gen AI Productivity Skills
                  </h5>
                  <span
                    style={{ fontSize: `${Math.round(8.5 * typographyScale)}px` }}
                    className="font-mono text-zinc-400 block"
                  >
                    Microsoft & LinkedIn
                  </span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-2 rounded-lg bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-emerald-500/40 transition-all group flex items-start gap-2">
                <CheckCircle2
                  style={{
                    width: `${Math.round(13 * typographyScale)}px`,
                    height: `${Math.round(13 * typographyScale)}px`,
                  }}
                  className="text-emerald-400 shrink-0 mt-0.5"
                />
                <div className="min-w-0">
                  <h5
                    style={{ fontSize: `${Math.round(10.5 * typographyScale)}px`, lineHeight: 1.25 }}
                    className="font-mono font-semibold text-zinc-100 group-hover:text-emerald-300 transition-colors truncate"
                  >
                    Data Science & Analytics
                  </h5>
                  <span
                    style={{ fontSize: `${Math.round(8.5 * typographyScale)}px` }}
                    className="font-mono text-zinc-400 block"
                  >
                    HP LIFE
                  </span>
                </div>
              </div>

              {/* Card 4 */}
              <div className="p-2 rounded-lg bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-emerald-500/40 transition-all group flex items-start gap-2">
                <CheckCircle2
                  style={{
                    width: `${Math.round(13 * typographyScale)}px`,
                    height: `${Math.round(13 * typographyScale)}px`,
                  }}
                  className="text-emerald-400 shrink-0 mt-0.5"
                />
                <div className="min-w-0">
                  <h5
                    style={{ fontSize: `${Math.round(10.5 * typographyScale)}px`, lineHeight: 1.25 }}
                    className="font-mono font-semibold text-zinc-100 group-hover:text-emerald-300 transition-colors truncate"
                  >
                    Digital Business Skills
                  </h5>
                  <span
                    style={{ fontSize: `${Math.round(8.5 * typographyScale)}px` }}
                    className="font-mono text-zinc-400 block"
                  >
                    HP LIFE
                  </span>
                </div>
              </div>

              {/* Card 5 */}
              <div className="p-2 rounded-lg bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-emerald-500/40 transition-all group flex items-start gap-2">
                <CheckCircle2
                  style={{
                    width: `${Math.round(13 * typographyScale)}px`,
                    height: `${Math.round(13 * typographyScale)}px`,
                  }}
                  className="text-emerald-400 shrink-0 mt-0.5"
                />
                <div className="min-w-0">
                  <h5
                    style={{ fontSize: `${Math.round(10.5 * typographyScale)}px`, lineHeight: 1.25 }}
                    className="font-mono font-semibold text-zinc-100 group-hover:text-emerald-300 transition-colors truncate"
                  >
                    Generative AI Tools
                  </h5>
                  <span
                    style={{ fontSize: `${Math.round(8.5 * typographyScale)}px` }}
                    className="font-mono text-zinc-400 block"
                  >
                    NASSCOM
                  </span>
                </div>
              </div>

              {/* Card 6: Authentication Seal Pill */}
              <div className="p-2 rounded-lg bg-amber-950/25 border border-amber-500/30 flex items-center justify-between px-2.5">
                <div className="flex items-center gap-1.5">
                  <Sparkles
                    style={{
                      width: `${Math.round(12 * typographyScale)}px`,
                      height: `${Math.round(12 * typographyScale)}px`,
                    }}
                    className="text-amber-400 shrink-0"
                  />
                  <span
                    style={{ fontSize: `${Math.round(9.5 * typographyScale)}px` }}
                    className="font-mono font-semibold text-amber-200"
                  >
                    Verified Credentials
                  </span>
                </div>
                <span
                  style={{ fontSize: `${Math.round(8.5 * typographyScale)}px` }}
                  className="font-mono text-amber-400/90"
                >
                  AUTHENTICATED
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 6. MOBILE HELPER: Tabbed switcher for small mobile devices (< 768px) */}
        {isMobile && (
          <div className="mt-3 w-full max-w-sm flex flex-col items-center gap-2 px-2 z-30">
            {/* Tab Selector */}
            <div className="flex items-center gap-2 bg-black/85 p-1 rounded-full border border-zinc-800">
              <button
                onClick={() => {
                  setActiveMobileTab("milestones");
                  setActiveMobileIdx(0);
                }}
                className={`px-3 py-1 rounded-full font-mono text-xs transition-all ${
                  activeMobileTab === "milestones"
                    ? "bg-amber-500 text-black font-bold shadow-[0_0_10px_#f59e0b]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Milestones (02)
              </button>
              <button
                onClick={() => {
                  setActiveMobileTab("certs");
                  setActiveMobileIdx(0);
                }}
                className={`px-3 py-1 rounded-full font-mono text-xs transition-all ${
                  activeMobileTab === "certs"
                    ? "bg-emerald-500 text-black font-bold shadow-[0_0_10px_#10b981]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Certifications (05)
              </button>
            </div>

            {/* Mobile Card Content */}
            {activeMobileTab === "milestones" ? (
              <div className="w-full p-3 rounded-xl bg-zinc-950/90 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.2)] flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-amber-400 font-bold">
                    MILESTONE 0{activeMobileIdx + 1} / 02
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        setActiveMobileIdx(
                          (prev) => (prev - 1 + milestones.length) % milestones.length
                        )
                      }
                      className="p-1 text-zinc-400 hover:text-white"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveMobileIdx((prev) => (prev + 1) % milestones.length)
                      }
                      className="p-1 text-zinc-400 hover:text-white"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h4 className="font-typewriter text-sm font-bold text-white">
                  {milestones[activeMobileIdx].title}
                </h4>
                <p className="font-mono text-xs text-zinc-400 leading-relaxed mt-1">
                  {milestones[activeMobileIdx].description}
                </p>
              </div>
            ) : (
              <div className="w-full p-3 rounded-xl bg-zinc-950/90 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.2)] flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-emerald-400 font-bold">
                    CERTIFICATION 0{activeMobileIdx + 1} / 05
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        setActiveMobileIdx(
                          (prev) => (prev - 1 + certifications.length) % certifications.length
                        )
                      }
                      className="p-1 text-zinc-400 hover:text-white"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveMobileIdx((prev) => (prev + 1) % certifications.length)
                      }
                      className="p-1 text-zinc-400 hover:text-white"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h4 className="font-typewriter text-sm font-bold text-white">
                  {certifications[activeMobileIdx].name}
                </h4>
                <span className="font-mono text-xs text-emerald-300">
                  {certifications[activeMobileIdx].issuer}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
