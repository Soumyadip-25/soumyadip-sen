"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { skillTopics, getSkillTopicBySlug } from "@/data/skills";
import SkillPaperCard from "./SkillPaperCard";

interface SkillsDetailViewProps {
  initialSlug?: string;
}

export default function SkillsDetailView({ initialSlug }: SkillsDetailViewProps) {
  const router = useRouter();

  // Find initial topic
  const initialTopic =
    (initialSlug && initialSlug !== "all" && getSkillTopicBySlug(initialSlug)) ||
    skillTopics[0];

  const [currentSlug, setCurrentSlug] = useState<string>(initialTopic.slug);
  const [direction, setDirection] = useState<number>(0);

  const currentIndex = skillTopics.findIndex((t) => t.slug === currentSlug);
  const currentTopic = skillTopics[currentIndex >= 0 ? currentIndex : 0];

  const prevIndex = (currentIndex - 1 + skillTopics.length) % skillTopics.length;
  const nextIndex = (currentIndex + 1) % skillTopics.length;
  const prevTopic = skillTopics[prevIndex];
  const nextTopic = skillTopics[nextIndex];

  // Navigate to a specific topic with direction-aware animation and URL update
  const navigateToTopic = useCallback(
    (targetSlug: string, newDirection: number = 1) => {
      setDirection(newDirection);
      setCurrentSlug(targetSlug);
      window.history.pushState(null, "", `/skills/${targetSlug}`);
    },
    []
  );

  const goToPrev = useCallback(() => {
    navigateToTopic(prevTopic.slug, -1);
  }, [prevTopic.slug, navigateToTopic]);

  const goToNext = useCallback(() => {
    navigateToTopic(nextTopic.slug, 1);
  }, [nextTopic.slug, navigateToTopic]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "Escape") {
        router.push("/#skills");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrev, goToNext, router]);

  // Sync state if user navigates back/forward
  useEffect(() => {
    const handlePopState = () => {
      const pathParts = window.location.pathname.split("/");
      const slugFromPath = pathParts[pathParts.length - 1];
      if (slugFromPath && getSkillTopicBySlug(slugFromPath)) {
        setCurrentSlug(slugFromPath);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Animation variants for smooth page transitions between expertise sections
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 350, damping: 32 },
        opacity: { duration: 0.22 },
        scale: { duration: 0.22 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.16,
        ease: "easeIn" as const,
      },
    }),
  };

  return (
    <div className="relative w-screen min-h-screen md:h-screen md:overflow-hidden overflow-y-auto bg-[#070709] text-zinc-100 select-none flex flex-col justify-between font-mono py-2 md:py-3">
      
      {/* 1. Common Background Image Across All Sections */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/skills-detail-bg.jpg"
          alt="Vintage dark desk workstation background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter contrast-125 brightness-95"
        />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* Retro Scanline Texture Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-1 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.4) 2px, rgba(0, 0, 0, 0.4) 4px)",
        }}
      />

      {/* 2. Main Workstation Stage Container */}
      <div className="relative z-10 w-full h-full max-w-[1360px] mx-auto p-2.5 sm:p-3.5 md:p-4 flex flex-col justify-between flex-1">
        
        {/* ========================================================= */}
        {/* TOP STATUS BAR: Back Button + Module Switcher + Status Pill */}
        {/* ========================================================= */}
        <header className="w-full flex flex-wrap items-center justify-between gap-2.5 shrink-0 select-none pb-1">
          
          {/* Back to Skills Console */}
          <Link
            href="/#skills"
            data-cursor-label="RETURN"
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/85 hover:bg-zinc-900 border border-zinc-700/80 hover:border-emerald-400 text-zinc-200 hover:text-white transition-all text-xs font-mono font-semibold shadow-md backdrop-blur-md"
            title="Return to CRT Monitors Console"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-emerald-400 group-hover:-translate-x-0.5 transition-transform stroke-[2.5]" />
            <span className="font-typewriter font-medium">Back to Skills Console</span>
          </Link>

          {/* Quick Module Switcher Track (01-06) */}
          <nav
            aria-label="Module Quick Switcher"
            className="flex items-center bg-black/85 backdrop-blur-md px-1.5 py-1 rounded-full border border-zinc-800 shadow-md overflow-x-auto max-w-full"
          >
            {skillTopics.map((topic, idx) => {
              const isActive = topic.slug === currentTopic.slug;
              return (
                <button
                  key={topic.id}
                  onClick={() => navigateToTopic(topic.slug, idx > currentIndex ? 1 : -1)}
                  data-cursor-label="VISIT"
                  className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? "bg-[#ede8db] text-zinc-950 font-typewriter font-bold shadow-md -rotate-[0.5deg]"
                      : "text-zinc-400 hover:text-white font-mono font-medium hover:bg-zinc-800/80"
                  }`}
                  title={`Switch to ${topic.title}`}
                >
                  <span className={isActive ? "text-zinc-900 font-bold" : "text-emerald-400"}>
                    {topic.number}
                  </span>
                  <span>{topic.shortTitle || topic.title}</span>
                </button>
              );
            })}
          </nav>

          {/* Live Status Pill */}
          <div className="hidden sm:flex items-center gap-2 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-zinc-800 text-xs font-mono shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="text-emerald-300 font-bold tracking-wider">
              MODULE // {currentTopic.number} ACTIVE
            </span>
          </div>

        </header>

        {/* ========================================================= */}
        {/* CENTER STAGE: Ripped Cardboard Banner + Expertise Cards */}
        {/* ========================================================= */}
        <main className="flex-1 flex flex-col items-center justify-center my-auto min-h-0 py-0.5 sm:py-1">
          
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentTopic.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full max-w-4xl lg:max-w-5xl flex flex-col items-center gap-1.5 sm:gap-2"
            >
              
              {/* 1. TORN PAPER HEADING BANNER (using new heading-banner-paper.png) */}
              <div className="relative w-full max-w-[380px] sm:max-w-[440px] aspect-[1024/341] z-10 drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)] -rotate-[0.5deg] select-none shrink-0">
                
                {/* Torn Paper PNG Background */}
                <Image
                  src="/images/heading-banner-paper.png"
                  alt="Torn paper heading label"
                  fill
                  priority
                  sizes="440px"
                  className="object-contain pointer-events-none select-none filter contrast-105"
                />

                {/* Overlaid Typewriter Lettering stamped onto paper */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-10 text-center pointer-events-none pt-1 sm:pt-1.5">
                  
                  {/* Small Readout */}
                  <span className="font-mono text-[8.5px] sm:text-[9.5px] font-bold tracking-widest text-zinc-800 uppercase mb-0.5">
                    MODULE // {currentTopic.number} &bull; TECHNICAL SPECIFICATION
                  </span>

                  {/* Main Title with subtle brush underline */}
                  <div className="relative inline-block">
                    <h1 className="font-typewriter font-bold text-base sm:text-xl md:text-2xl text-zinc-950 tracking-tight leading-tight [text-wrap:balance]">
                      {currentTopic.title}
                    </h1>
                    <div className="w-full h-[2px] bg-zinc-900/80 rounded-full mt-0.5 scale-x-95" />
                  </div>

                  {/* Subtitle in Vintage Typewriter Ink */}
                  <p className="font-mono text-[9.5px] sm:text-[10.5px] text-zinc-800/90 font-medium tracking-tight mt-0.5 max-w-md truncate">
                    {currentTopic.subtitle}
                  </p>

                </div>
              </div>

              {/* 2. OVERVIEW BAR (Positioned below Heading Banner) */}
              <div className="w-full max-w-2xl sm:max-w-3xl flex items-center gap-2 px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/10 shadow-md text-xs font-mono my-0.5 shrink-0 select-none">
                <span className="bg-[#ede8db] text-zinc-950 font-typewriter font-bold px-2 py-0.5 rounded-xs shrink-0 shadow-xs text-[10.5px] -rotate-[1deg]">
                  // Expertise Overview
                </span>
                <span className="text-zinc-500 font-bold">|</span>
                <span className="text-zinc-300 truncate font-medium text-[10.5px] sm:text-[11.5px]">
                  {currentTopic.description}
                </span>
              </div>

              {/* 3. DEDICATED EXPERTISE CARDS GRID (using skill-card-paper.png for EVERY card) */}
              {currentTopic.subsections && currentTopic.subsections.length > 0 ? (
                /* Subsections layout for Full Stack Development: Divided in Left & Right Rectangular Panels */
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 max-w-4xl lg:max-w-[1020px] pt-0.5 items-stretch">
                  {currentTopic.subsections.map((sub, sIdx) => (
                    <div
                      key={sIdx}
                      className="relative rounded-xl p-2.5 sm:p-3 bg-black/60 border border-zinc-800/90 shadow-[0_8px_20px_rgba(0,0,0,0.85)] flex flex-col items-center justify-between backdrop-blur-xs"
                    >
                      {/* Section Heading Badge */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-[11px] sm:text-xs font-bold text-emerald-300 uppercase tracking-wider bg-emerald-950/85 border border-emerald-500/60 px-3.5 py-0.5 rounded-full shadow-xs">
                          {sub.title}
                        </span>
                      </div>

                      {/* 2-column grid of 3 rows (6 cards total) */}
                      <div className="grid grid-cols-2 gap-2 sm:gap-2.5 w-full justify-items-center">
                        {sub.skills.map((skill, kIdx) => (
                          <SkillPaperCard
                            key={kIdx}
                            name={skill.name}
                            category={skill.category}
                            level={skill.level}
                            compact={true}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Standard layout for all other 5 topics */
                <div className="w-full flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-0.5 max-w-4xl lg:max-w-5xl">
                  {currentTopic.skills.map((skill, kIdx) => (
                    <SkillPaperCard
                      key={kIdx}
                      name={skill.name}
                      category={skill.category}
                      level={skill.level}
                      compact={false}
                    />
                  ))}
                </div>
              )}

            </motion.div>
          </AnimatePresence>

        </main>

        {/* ========================================================= */}
        {/* BOTTOM NAVIGATION BAR: Torn Paper Transition Buttons */}
        {/* ========================================================= */}
        <footer className="w-full flex items-center justify-between gap-3 shrink-0 pt-1 select-none">
          
          {/* Previous Module Button (using transition-button-paper.png) */}
          <button
            onClick={goToPrev}
            data-cursor-label="VISIT"
            className="relative w-44 sm:w-56 aspect-[3/1] drop-shadow-[0_6px_14px_rgba(0,0,0,0.7)] hover:drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer select-none group"
            title={`Visit previous module: ${prevTopic.title}`}
          >
            <Image
              src="/images/transition-button-paper.png"
              alt=""
              fill
              sizes="230px"
              className="object-contain pointer-events-none"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center pointer-events-none">
              <span className="font-mono text-[9.5px] sm:text-[11px] font-bold uppercase tracking-wider text-zinc-800 leading-none group-hover:text-zinc-950 transition-colors inline-flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-950 group-hover:-translate-x-1 transition-transform stroke-[2.5]" />
                <span>VISIT PREVIOUS</span>
              </span>
              <span className="font-typewriter text-xs sm:text-sm font-bold text-zinc-950 tracking-tight mt-1 truncate max-w-[180px]">
                {prevTopic.title}
              </span>
            </div>
          </button>

          {/* Center Track Dots */}
          <div className="flex items-center gap-2 bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-zinc-800 font-mono text-xs text-zinc-400 shadow-md">
            <span>[</span>
            <div className="flex items-center gap-1.5">
              {skillTopics.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => navigateToTopic(t.slug, idx > currentIndex ? 1 : -1)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    t.slug === currentTopic.slug
                      ? "bg-zinc-100 scale-125 shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                      : "border border-zinc-500 bg-transparent hover:border-zinc-300"
                  }`}
                  aria-label={`Jump to ${t.title}`}
                />
              ))}
            </div>
            <span>]</span>
            <span className="ml-1.5 font-bold text-zinc-200">
              {currentTopic.number} / 06
            </span>
          </div>

          {/* Next Module Button (using transition-button-paper.png) */}
          <button
            onClick={goToNext}
            data-cursor-label="VISIT"
            className="relative w-44 sm:w-56 aspect-[3/1] drop-shadow-[0_6px_14px_rgba(0,0,0,0.7)] hover:drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer select-none group text-right"
            title={`Visit next module: ${nextTopic.title}`}
          >
            <Image
              src="/images/transition-button-paper.png"
              alt=""
              fill
              sizes="230px"
              className="object-contain pointer-events-none"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center pointer-events-none">
              <span className="font-mono text-[9.5px] sm:text-[11px] font-bold uppercase tracking-wider text-zinc-800 leading-none group-hover:text-zinc-950 transition-colors inline-flex items-center gap-1.5">
                <span>VISIT NEXT</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-950 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </span>
              <span className="font-typewriter text-xs sm:text-sm font-bold text-zinc-950 tracking-tight mt-1 truncate max-w-[180px]">
                {nextTopic.title}
              </span>
            </div>
          </button>

        </footer>

      </div>

    </div>
  );
}
