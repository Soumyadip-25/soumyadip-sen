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
    <div className="relative w-screen min-h-screen md:h-screen md:overflow-hidden overflow-y-auto bg-[#070709] text-zinc-100 select-none flex flex-col justify-between font-mono">
      
      {/* ========================================================= */}
      {/* FULL-SCREEN FULL-BLEED BACKGROUND IMAGE                    */}
      {/* 100% fits screen with ZERO spaces on left, right, or edges */}
      {/* ========================================================= */}
      {/* Desktop Background: 16:9 Workstation Canvas (Strictly Preserved) */}
      <div className="hidden md:block absolute inset-0 z-0 pointer-events-none w-full h-full">
        <Image
          src="/images/skills-detail-bg.jpg"
          alt="Vintage dark desk workstation background"
          fill
          priority
          sizes="100vw"
          className="object-cover md:object-fill object-center select-none pointer-events-none filter contrast-105 brightness-95"
        />
      </div>

      {/* Mobile Background: User Provided 9:16 Compass Slate Backdrop */}
      <div className="md:hidden fixed inset-0 z-0 pointer-events-none w-full h-full">
        <Image
          src="/images/skills-detail-bg-mobile.jpg"
          alt="Skills Technical Specification Mobile Backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top select-none pointer-events-none filter contrast-105 brightness-95"
        />
      </div>

      {/* Retro Scanline Texture Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-1 pointer-events-none opacity-15"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.3) 2px, rgba(0, 0, 0, 0.3) 4px)",
        }}
      />

      {/* Main Workstation Stage UI Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between flex-1 min-h-0 p-2 sm:p-3 md:p-3.5 lg:p-4.5 max-w-[1720px] mx-auto">
          
          {/* ========================================================= */}
          {/* TOP STATUS BAR: Back Button + Module Switcher + Status Pill */}
          {/* Locked at top with z-30 & dedicated margin: NEVER OVERLAPPED*/}
          {/* ========================================================= */}
          <header className="w-full flex flex-wrap items-center justify-between gap-2 shrink-0 select-none pt-1 sm:pt-1.5 pb-1 sm:pb-2 px-3 sm:px-6 md:px-8 relative z-30">
          
          {/* Back to Skills Console: Authentic Taped Torn-Paper Memo */}
          <Link
            href="/#skills"
            data-cursor="interactive"
            data-cursor-label="RETURN // CRT CONSOLE"
            className="group relative w-[180px] sm:w-[204px] md:w-[226px] lg:w-[242px] aspect-[1007/212] drop-shadow-[0_4px_12px_rgba(0,0,0,0.75)] hover:drop-shadow-[0_8px_18px_rgba(0,0,0,0.95)] hover:-translate-y-0.5 hover:rotate-0 transition-all duration-200 cursor-pointer select-none -rotate-[0.5deg] shrink-0"
            title="Return to CRT Monitors Console"
          >
            {/* Authentic Ripped Paper Strip with Scotch Tape */}
            <Image
              src="/images/back-to-console-paper.png"
              alt="Return to Skills Console memo"
              fill
              priority
              sizes="250px"
              className="object-fill pointer-events-none select-none filter contrast-105"
            />

            {/* Overlaid Stamped Typewriter Memo Lettering */}
            <div className="absolute inset-0 flex items-center pl-7 sm:pl-8 md:pl-8.5 pr-2.5 pointer-events-none gap-2">
              <ArrowLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#14120f] group-hover:-translate-x-1 transition-transform stroke-[2.5] shrink-0" />
              <div className="flex flex-col text-left justify-center min-w-0">
                <span className="font-mono text-[7.5px] sm:text-[8px] md:text-[8.5px] font-bold tracking-widest text-zinc-800/80 uppercase leading-none">
                  [ ESC ] // CONSOLE
                </span>
                <span className="font-typewriter font-bold text-[11.5px] sm:text-[12.5px] md:text-[13px] lg:text-[13.5px] text-[#14120f] tracking-tight leading-tight mt-0.5 whitespace-nowrap group-hover:text-black transition-colors">
                  Back to Skills Console
                </span>
              </div>
            </div>
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
                  data-cursor="interactive"
                  data-cursor-label={`SWITCH // MOD ${topic.number}`}
                  className={`px-3 sm:px-3.5 py-1 rounded-full text-xs sm:text-[13px] transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? "bg-[#ede8db] text-zinc-950 font-typewriter font-bold shadow-md -rotate-[0.5deg]"
                      : "text-zinc-400 hover:text-white font-mono font-medium hover:bg-zinc-800/80"
                  }`}
                  title={`Switch to ${topic.title}`}
                >
                  <span className={isActive ? "text-zinc-900 font-bold" : "text-zinc-100 font-bold"}>
                    {topic.number}
                  </span>
                  <span>{topic.shortTitle || topic.title}</span>
                </button>
              );
            })}
          </nav>

          {/* Live Status Pill */}
          <div className="hidden sm:flex items-center gap-2 bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-zinc-800 text-xs sm:text-[12.5px] font-mono shadow-md">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
            <span className="text-zinc-100 font-bold tracking-wider">
              MODULE // {currentTopic.number} ACTIVE
            </span>
          </div>

        </header>

        {/* ========================================================= */}
        {/* CENTER STAGE: Ripped Cardboard Banner + Expertise Cards */}
        {/* ========================================================= */}
        <main className="flex-1 flex flex-col items-center justify-center min-h-0 py-0.5 overflow-visible">
          
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentTopic.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full max-w-4xl lg:max-w-[950px] xl:max-w-[970px] flex flex-col items-center gap-1 sm:gap-1.5"
            >
              
              {/* 1. TORN PAPER HEADING BANNER (Harmonious middle ground typography) */}
              <div
                className="relative w-full max-w-[420px] sm:max-w-[460px] md:max-w-[500px] aspect-[1024/290] z-10 drop-shadow-[0_6px_16px_rgba(0,0,0,0.85)] -rotate-[0.5deg] select-none shrink-0 cursor-pointer"
                data-cursor="interactive"
                data-cursor-label={`MODULE ${currentTopic.number} // ${currentTopic.title.toUpperCase()}`}
              >
                
                {/* Torn Paper PNG Background */}
                <Image
                  src="/images/heading-banner-paper.png"
                  alt="Torn paper heading label"
                  fill
                  priority
                  sizes="500px"
                  className="object-contain pointer-events-none select-none filter contrast-105"
                />

                {/* Overlaid Typewriter Lettering stamped onto paper */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-10 md:px-12 text-center pointer-events-none pt-1">
                  
                  {/* Small Readout */}
                  <span className="font-mono text-[8.5px] sm:text-[9.5px] font-bold tracking-widest text-zinc-800 uppercase mb-0.5 sm:mb-1">
                    MODULE // {currentTopic.number} &bull; TECHNICAL SPECIFICATION
                  </span>

                  {/* Main Title - with padding-bottom to keep letter descenders clear */}
                  <h1 className="font-typewriter font-bold text-lg sm:text-xl md:text-[22px] text-zinc-950 tracking-tight leading-none [text-wrap:balance] pb-1">
                    {currentTopic.title}
                  </h1>

                  {/* Vintage Separator Line */}
                  <div className="w-36 sm:w-46 md:w-54 h-[1.5px] bg-zinc-900/75 rounded-full my-0.5 sm:my-1" />

                  {/* Subtitle in Vintage Typewriter Ink */}
                  <p className="font-mono text-[9px] sm:text-[10px] text-zinc-800/90 font-medium tracking-tight max-w-sm sm:max-w-md md:max-w-lg [text-wrap:balance] leading-tight">
                    {currentTopic.subtitle}
                  </p>

                </div>
              </div>

              {/* 2. OVERVIEW BAR (Positioned below Heading Banner) */}
              <div className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/10 shadow-md text-xs font-mono my-0.5 shrink-0 select-none">
                <span className="bg-[#ede8db] text-zinc-950 font-typewriter font-bold px-2.5 py-0.5 rounded-xs shrink-0 shadow-xs text-[10px] sm:text-[11px] -rotate-[1deg]">
                  // Expertise Overview
                </span>
                <span className="text-zinc-500 font-bold">|</span>
                <span className="text-zinc-300 truncate font-medium text-[10.5px] sm:text-[11.5px]">
                  {currentTopic.description}
                </span>
              </div>

              {/* 3. DEDICATED EXPERTISE CARDS GRID (Harmonious middle ground: ZERO text overflow) */}
              {currentTopic.subsections && currentTopic.subsections.length > 0 ? (
                /* Subsections layout for Full Stack Development: Left & Right rectangular panels (2 cols x 3 rows each, zero text overflow) */
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3.5 max-w-4xl lg:max-w-[950px] xl:max-w-[970px] pt-0.5 items-stretch">
                  {currentTopic.subsections.map((sub, sIdx) => (
                    <div
                      key={sIdx}
                      className="relative rounded-xl p-2 sm:p-2.5 bg-black/60 border border-zinc-800/90 shadow-[0_6px_16px_rgba(0,0,0,0.85)] flex flex-col items-center justify-between backdrop-blur-xs"
                    >
                      {/* Section Heading Badge */}
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-mono text-[10.5px] sm:text-[11.5px] font-bold text-zinc-100 uppercase tracking-wider bg-zinc-900/90 border border-zinc-700/80 px-3.5 py-0.5 rounded-full shadow-xs">
                          {sub.title}
                        </span>
                      </div>

                      {/* 2-column grid of 3 rows (6 spacious cards: ZERO text overflow) */}
                      <div className="grid grid-cols-2 gap-1.5 sm:gap-2 w-full justify-items-center">
                        {sub.skills.map((skill, kIdx) => (
                          <SkillPaperCard
                            key={kIdx}
                            name={skill.name}
                            category={skill.category}
                            level={skill.level}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : currentTopic.slug === "databases-cloud" ||
                currentTopic.slug === "core-competencies" ? (
                /* Databases & Cloud / Core Competencies: Exactly 3 columns and 2 rows (6 skills) */
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3 pt-0.5 max-w-3xl lg:max-w-[760px] mx-auto justify-items-center">
                  {currentTopic.skills.map((skill, kIdx) => (
                    <SkillPaperCard
                      key={kIdx}
                      name={skill.name}
                      category={skill.category}
                      level={skill.level}
                    />
                  ))}
                </div>
              ) : currentTopic.slug === "programming-languages" ||
                currentTopic.slug === "ai-ml-data-analytics" ||
                currentTopic.slug === "ai-ml-data-analysis" ? (
                /* 3 columns layout (7 skills: 3 in row 1, 3 in row 2, 1 centered in row 3) */
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3 pt-0.5 max-w-3xl lg:max-w-[760px] mx-auto justify-items-center">
                  {currentTopic.skills.map((skill, kIdx) => (
                    <div
                      key={kIdx}
                      className={`w-full flex justify-center ${kIdx === 6 ? "sm:col-span-2 md:col-span-1 md:col-start-2" : ""}`}
                    >
                      <SkillPaperCard
                        name={skill.name}
                        category={skill.category}
                        level={skill.level}
                      />
                    </div>
                  ))}
                </div>
              ) : currentTopic.slug === "tools-platforms-iot" ? (
                /* Tools / Platforms & IoT page: Exactly 3 columns (3 rows x 3 columns = 9 skills) */
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5 pt-0.5 max-w-3xl lg:max-w-[760px] mx-auto justify-items-center">
                  {currentTopic.skills.map((skill, kIdx) => (
                    <div
                      key={kIdx}
                      className={`w-full flex justify-center ${kIdx === 8 ? "sm:col-span-2 md:col-span-1" : ""}`}
                    >
                      <SkillPaperCard
                        name={skill.name}
                        category={skill.category}
                        level={skill.level}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                /* Standard layout for all other topics */
                <div className="w-full flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pt-0.5 max-w-4xl lg:max-w-[950px] xl:max-w-[970px]">
                  {currentTopic.skills.map((skill, kIdx) => (
                    <SkillPaperCard
                      key={kIdx}
                      name={skill.name}
                      category={skill.category}
                      level={skill.level}
                    />
                  ))}
                </div>
              )}

            </motion.div>
          </AnimatePresence>

        </main>

        {/* ========================================================= */}
        {/* BOTTOM NAVIGATION BAR: Centered Dots + Right Transition Buttons */}
        {/* Leaves bottom-left camera area completely clear and open  */}
        {/* ========================================================= */}
        <footer className="w-full relative flex items-center shrink-0 pb-1 sm:pb-1.5 px-3 sm:px-6 md:px-8 lg:px-12 select-none z-30">
          
          {/* Center Track Dots: Centered in the bottom middle of the page */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-zinc-800 font-mono text-xs sm:text-[13px] text-zinc-400 shadow-md z-10">
            <span>[</span>
            <div className="flex items-center gap-1.5">
              {skillTopics.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => navigateToTopic(t.slug, idx > currentIndex ? 1 : -1)}
                  data-cursor-label={`MOD ${t.number}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    t.slug === currentTopic.slug
                      ? "bg-white scale-125 shadow-[0_0_8px_rgba(255,255,255,0.95)]"
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

          {/* Transition Buttons: Both Grouped on the Right Side */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 ml-auto z-20">
            
            {/* Previous Module Button */}
            <button
              onClick={goToPrev}
              data-cursor-label="VISIT"
              className="group relative w-38 sm:w-44 md:w-48 lg:w-52 aspect-[1024/341] flex items-center justify-center filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.75)] hover:drop-shadow-[0_8px_18px_rgba(0,0,0,0.95)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer select-none -rotate-[0.5deg]"
              title={`Visit previous module: ${prevTopic.title}`}
            >
              <Image
                src="/images/transition-button-paper.png"
                alt=""
                fill
                sizes="220px"
                className="object-fill pointer-events-none select-none group-hover:brightness-105 transition-all"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center px-3.5 text-center pointer-events-none">
                <span className="font-mono text-[9px] sm:text-[9.5px] md:text-[10px] lg:text-[10.5px] font-bold uppercase tracking-wider text-zinc-800 leading-none group-hover:text-zinc-950 transition-colors inline-flex items-center gap-1.5">
                  <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#14120f] group-hover:-translate-x-1 transition-transform stroke-[2.5]" />
                  <span>VISIT PREVIOUS</span>
                </span>
                <span className="font-typewriter font-bold text-[11.5px] sm:text-[12px] md:text-[12.5px] lg:text-[13px] text-[#14120f] tracking-tight mt-0.5 truncate max-w-[140px] sm:max-w-[165px]">
                  {prevTopic.shortTitle || prevTopic.title}
                </span>
              </div>
            </button>

            {/* Next Module Button */}
            <button
              onClick={goToNext}
              data-cursor-label="VISIT"
              className="group relative w-38 sm:w-44 md:w-48 lg:w-52 aspect-[1024/341] flex items-center justify-center filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.75)] hover:drop-shadow-[0_8px_18px_rgba(0,0,0,0.95)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer select-none rotate-[0.5deg]"
              title={`Visit next module: ${nextTopic.title}`}
            >
              <Image
                src="/images/transition-button-paper.png"
                alt=""
                fill
                sizes="220px"
                className="object-fill pointer-events-none select-none group-hover:brightness-105 transition-all"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center px-3.5 text-center pointer-events-none">
                <span className="font-mono text-[9px] sm:text-[9.5px] md:text-[10px] lg:text-[10.5px] font-bold uppercase tracking-wider text-zinc-800 leading-none group-hover:text-zinc-950 transition-colors inline-flex items-center gap-1.5">
                  <span>VISIT NEXT</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#14120f] group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                </span>
                <span className="font-typewriter font-bold text-[11.5px] sm:text-[12px] md:text-[12.5px] lg:text-[13px] text-[#14120f] tracking-tight mt-0.5 truncate max-w-[140px] sm:max-w-[165px]">
                  {nextTopic.shortTitle || nextTopic.title}
                </span>
              </div>
            </button>

          </div>

        </footer>

      </div>

    </div>
  );
}
