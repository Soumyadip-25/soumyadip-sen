"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  FolderGit2,
  Layers,
  Sparkles,
  Users,
  User,
  Cpu,
  Activity,
  Heart,
  Cloud,
  Database,
  BarChart3,
  PhoneCall,
  Video,
  Radio,
  Code2,
  Server,
} from "lucide-react";
import { projects, getProjectBySlug, ProjectData } from "@/data/projects";

interface ProjectDetailViewProps {
  initialSlug?: string;
}

function TechIcon({ name, iconKey }: { name: string; iconKey?: string }) {
  const key = (iconKey || name).toLowerCase();

  if (key.includes("react")) {
    return (
      <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="-11.5 -10.23174 23 20.46348" fill="none">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  if (key.includes("node")) {
    return (
      <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 2L3 9.5v15L16 32l13-7.5v-15L16 2z"
          stroke="#68A063"
          strokeWidth="2"
          fill="#1e321e"
        />
        <text
          x="16"
          y="20"
          fill="#84ba64"
          fontSize="11"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="monospace"
        >
          JS
        </text>
      </svg>
    );
  }

  if (key.includes("postgres")) {
    return (
      <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 4C10 4 6 8 6 14c0 5 3 9 7 11v3h6v-3c4-2 7-6 7-11 0-6-4-10-10-10z"
          stroke="#5a9bd4"
          strokeWidth="2"
          fill="#152638"
        />
        <circle cx="12" cy="13" r="1.5" fill="#5a9bd4" />
        <circle cx="20" cy="13" r="1.5" fill="#5a9bd4" />
        <path d="M14 18c1 1 3 1 4 0" stroke="#5a9bd4" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (key.includes("groq") || key.includes("llm") || key.includes("ai")) {
    return (
      <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8">
        <path d="M12 2a10 10 0 0 1 10 10c0 4.418-2.865 8.166-6.839 9.49" strokeLinecap="round" />
        <path d="M12 6a6 6 0 0 1 6 6c0 2.651-1.719 4.9-4.103 5.694" strokeLinecap="round" />
        <circle cx="12" cy="12" r="2" fill="#f59e0b" />
        <path d="M4 12a8 8 0 0 1 8-8" strokeLinecap="round" strokeDasharray="2 2" />
        <path d="M2 12a10 10 0 0 0 10 10" strokeLinecap="round" />
      </svg>
    );
  }

  if (key.includes("docker")) {
    return (
      <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none">
        <path
          d="M2 13.5c1 .5 3 .5 5 0 2-1 4-1 6 0 2 1 4 1 6 0 1-.5 2-.5 3 0-1 4-4 6.5-10 6.5S3 17.5 2 13.5z"
          fill="#1d4ed8"
          stroke="#60a5fa"
          strokeWidth="1.2"
        />
        <rect x="5" y="10" width="2" height="2" fill="#60a5fa" rx="0.3" />
        <rect x="8" y="10" width="2" height="2" fill="#60a5fa" rx="0.3" />
        <rect x="11" y="10" width="2" height="2" fill="#60a5fa" rx="0.3" />
        <rect x="8" y="7" width="2" height="2" fill="#60a5fa" rx="0.3" />
        <rect x="11" y="7" width="2" height="2" fill="#60a5fa" rx="0.3" />
        <rect x="14" y="10" width="2" height="2" fill="#60a5fa" rx="0.3" />
        <circle cx="18.5" cy="12" r="0.8" fill="white" />
      </svg>
    );
  }

  if (key.includes("next")) {
    return (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.663 17.15L9.8 6.5h2.2l5.7 8.2v-8.2h1.9v10.65h-1.937zM6.5 6.5h2v11h-2v-11z" />
      </svg>
    );
  }

  if (key.includes("typescript")) {
    return (
      <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <text x="12" y="16.5" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
          TS
        </text>
      </svg>
    );
  }

  if (key.includes("mongo")) {
    return (
      <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C12 2 7 7 7 13c0 3.5 2.5 6.5 5 7.5 2.5-1 5-4 5-7.5 0-6-5-11-5-11z"
          fill="#13aa52"
          stroke="#40c463"
          strokeWidth="1.2"
        />
        <path d="M12 2v19" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
      </svg>
    );
  }

  if (key.includes("esp") || key.includes("cpu")) {
    return <Cpu className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400" />;
  }
  if (key.includes("ecg") || key.includes("activity")) {
    return <Activity className="w-7 h-7 sm:w-8 sm:h-8 text-rose-400" />;
  }
  if (key.includes("heart")) {
    return <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-red-400" />;
  }
  if (key.includes("cloud") || key.includes("thingspeak")) {
    return <Cloud className="w-7 h-7 sm:w-8 sm:h-8 text-sky-400" />;
  }
  if (key.includes("firebase") || key.includes("database")) {
    return <Database className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400" />;
  }
  if (key.includes("recharts") || key.includes("bar-chart")) {
    return <BarChart3 className="w-7 h-7 sm:w-8 sm:h-8 text-teal-400" />;
  }
  if (key.includes("twilio") || key.includes("phone")) {
    return <PhoneCall className="w-7 h-7 sm:w-8 sm:h-8 text-red-400" />;
  }
  if (key.includes("video") || key.includes("webrtc")) {
    return <Video className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-400" />;
  }
  if (key.includes("radio") || key.includes("socket")) {
    return <Radio className="w-7 h-7 sm:w-8 sm:h-8 text-purple-400" />;
  }
  if (key.includes("server") || key.includes("express")) {
    return <Server className="w-7 h-7 sm:w-8 sm:h-8 text-zinc-300" />;
  }

  return <Code2 className="w-7 h-7 sm:w-8 sm:h-8 text-zinc-300" />;
}

export default function ProjectDetailView({ initialSlug }: ProjectDetailViewProps) {
  const router = useRouter();

  // Find initial project
  const initialProject =
    (initialSlug && getProjectBySlug(initialSlug)) || projects[0];

  const [currentSlug, setCurrentSlug] = useState<string>(initialProject.slug);
  const [direction, setDirection] = useState<number>(0);

  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  const currentProject: ProjectData = projects[currentIndex >= 0 ? currentIndex : 0];

  const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
  const nextIndex = (currentIndex + 1) % projects.length;
  const prevProject = projects[prevIndex];
  const nextProject = projects[nextIndex];

  // Navigate to a specific project with direction-aware animation and URL update
  const navigateToProject = useCallback(
    (targetSlug: string, newDirection: number = 1) => {
      setDirection(newDirection);
      setCurrentSlug(targetSlug);
      window.history.pushState(null, "", `/projects/${targetSlug}`);
    },
    []
  );

  const goToPrev = useCallback(() => {
    navigateToProject(prevProject.slug, -1);
  }, [prevProject.slug, navigateToProject]);

  const goToNext = useCallback(() => {
    navigateToProject(nextProject.slug, 1);
  }, [nextProject.slug, navigateToProject]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "Escape") {
        router.push("/#projects");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrev, goToNext, router]);

  // Sync state if user navigates back/forward via browser history
  useEffect(() => {
    const handlePopState = () => {
      const pathParts = window.location.pathname.split("/");
      const slugFromPath = pathParts[pathParts.length - 1];
      if (slugFromPath && getProjectBySlug(slugFromPath)) {
        setCurrentSlug(slugFromPath);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Animation variants for smooth page transitions between project dossiers
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 35 : -35,
      opacity: 0,
      scale: 0.985,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 350, damping: 32 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -35 : 35,
      opacity: 0,
      scale: 0.985,
      transition: {
        duration: 0.16,
        ease: "easeIn" as const,
      },
    }),
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#070709] text-zinc-100 select-none flex flex-col justify-between font-mono">
      
      {/* ========================================================= */}
      {/* FULL-SCREEN FULL-BLEED BACKGROUND IMAGE                    */}
      {/* 100% fits screen with ZERO spaces on left, right, or edges */}
      {/* ========================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none w-full h-full">
        <Image
          src="/images/project-detail-bg.jpg"
          alt="Project blackboard blueprint background"
          fill
          priority
          sizes="100vw"
          className="object-fill select-none pointer-events-none filter contrast-105 brightness-95"
        />
      </div>

      {/* Retro Scanline Texture Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-1 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.25) 2px, rgba(0, 0, 0, 0.25) 4px)",
        }}
      />

      {/* ========================================================= */}
      {/* 1. TOP STATUS BAR: Back Button + Switcher + Live Status   */}
      {/* Inset from corners to preserve compass & tape accents     */}
      {/* ========================================================= */}
      <header className="w-full flex items-center justify-between gap-3 shrink-0 select-none pt-2 sm:pt-2.5 pb-1 px-4 sm:px-8 md:px-12 lg:px-16 relative z-30">
        
        {/* Back to Projects Gallery: Authentic Taped Torn-Paper Memo */}
        <Link
          href="/#projects"
          data-cursor="interactive"
          data-cursor-label="RETURN // PROJECTS"
          className="group relative w-40 sm:w-46 md:w-52 aspect-[1007/212] drop-shadow-[0_4px_12px_rgba(0,0,0,0.75)] hover:drop-shadow-[0_8px_18px_rgba(0,0,0,0.95)] hover:-translate-y-0.5 hover:rotate-0 transition-all duration-200 cursor-pointer select-none -rotate-[0.5deg] shrink-0"
          title="Return to Projects Gallery"
        >
          {/* Authentic Ripped Paper Strip with Scotch Tape */}
          <Image
            src="/images/back-to-console-paper.png"
            alt="Return to Projects memo"
            fill
            priority
            sizes="230px"
            className="object-fill pointer-events-none select-none filter contrast-105"
          />

          {/* Overlaid Stamped Typewriter Memo Lettering */}
          <div className="absolute inset-0 flex items-center pl-6 sm:pl-7 md:pl-8 pr-2.5 pointer-events-none gap-2">
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#14120f] group-hover:-translate-x-1 transition-transform stroke-[2.5] shrink-0" />
            <div className="flex flex-col text-left justify-center min-w-0">
              <span className="font-mono text-[7px] sm:text-[7.5px] md:text-[8px] font-bold tracking-widest text-zinc-800/80 uppercase leading-none">
                [ ESC ] // GALLERY
              </span>
              <span className="font-typewriter font-bold text-[10.5px] sm:text-[11.5px] md:text-[12px] text-[#14120f] tracking-tight leading-tight mt-0.5 whitespace-nowrap group-hover:text-black transition-colors">
                Back to Projects
              </span>
            </div>
          </div>
        </Link>

        {/* Quick Project Switcher Track */}
        <nav
          aria-label="Project Quick Switcher"
          className="flex items-center bg-black/85 backdrop-blur-md px-1.5 py-1 rounded-full border border-zinc-800 shadow-md overflow-x-auto max-w-full"
        >
          {projects.map((p, idx) => {
            const isActive = p.slug === currentProject.slug;
            return (
              <button
                key={p.id}
                onClick={() => navigateToProject(p.slug, idx > currentIndex ? 1 : -1)}
                data-cursor="interactive"
                data-cursor-label={`PROJECT // ${p.title.split("–")[0].trim().toUpperCase()}`}
                className={`px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? "bg-[#ede8db] text-zinc-950 font-typewriter font-bold shadow-md -rotate-[0.5deg]"
                    : "text-zinc-400 hover:text-white font-mono font-medium hover:bg-zinc-800/80"
                }`}
                title={`Switch to ${p.title}`}
              >
                <span className={isActive ? "text-zinc-900 font-bold" : "text-emerald-400"}>
                  0{idx + 1}
                </span>
                <span>{p.title.split("–")[0].trim()}</span>
              </button>
            );
          })}
        </nav>

        {/* Live Dossier Status Indicator (Inset from top-right to preserve compass rose) */}
        <div className="hidden lg:flex items-center gap-2 bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-zinc-800 text-xs font-mono shadow-md mr-14 xl:mr-20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span className="text-emerald-300 font-bold tracking-wider">
            DOSSIER // 0{currentIndex + 1} OF 0{projects.length}
          </span>
        </div>

      </header>

      {/* ========================================================= */}
      {/* 2. CENTER STAGE: 2-Column Responsive Single-Screen Dossier */}
      {/* ========================================================= */}
      <main className="flex-1 flex items-center justify-center min-h-0 py-1 sm:py-2 px-4 sm:px-8 md:px-12 lg:px-16 relative z-10 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentProject.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full max-h-[calc(100vh-125px)] flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-[1680px] mx-auto"
          >
            
            {/* ----------------------------------------------------- */}
            {/* LEFT COLUMN: Authentic Binder-Clipped Dossier Frame    */}
            {/* ----------------------------------------------------- */}
            <div className="w-full md:w-auto h-full max-h-[580px] sm:max-h-[610px] md:max-h-[640px] lg:max-h-[680px] xl:max-h-[720px] aspect-[682/1024] relative flex items-center justify-center shrink-0 mx-auto md:mx-0 filter drop-shadow-[0_18px_42px_rgba(0,0,0,0.95)]">
              
              {/* 1. Project Card Positioned Beneath Cutout Window */}
              <div
                className="absolute z-10 overflow-hidden cursor-pointer group rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.85)] border border-black/40"
                style={{
                  left: "11.8%",
                  top: "10.8%",
                  width: "76.4%",
                  height: "45.8%",
                }}
                data-cursor="image"
                data-cursor-label={`${currentProject.title.split("–")[0].trim().toUpperCase()} // CARD`}
              >
                <Image
                  src={currentProject.image}
                  alt={currentProject.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 520px"
                  className="object-fill select-none pointer-events-none group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>

              {/* 2. Exact Vintage Cardboard Dossier Frame (With Built-in Metal Clip & Transparent Cutout) */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                <Image
                  src="/images/project-frame-v4.png"
                  alt="Vintage binder clip cardboard dossier frame"
                  fill
                  priority
                  sizes="520px"
                  className="object-fill select-none pointer-events-none"
                />
              </div>

              {/* 4. Overview Dossier Notepad: Fully Formatted Specification Details */}
              <div
                className="absolute z-25 flex flex-col justify-between"
                style={{
                  left: "10.5%",
                  right: "10.5%",
                  top: "59.5%",
                  bottom: "4.8%",
                }}
              >
                {/* Header: Overview Title Stamped on Authentic Torn Paper Strip */}
                <div className="flex items-center justify-start pb-0.5">
                  <div className="relative w-36 sm:w-40 md:w-44 aspect-[950/210] flex items-center justify-center filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] -rotate-[0.5deg]">
                    <Image
                      src="/images/overview-paper-strip.png"
                      alt="Overview banner"
                      fill
                      priority
                      sizes="180px"
                      className="object-fill select-none pointer-events-none"
                    />
                    <span className="relative z-10 font-typewriter font-bold text-xs sm:text-sm text-[#14120f] uppercase tracking-widest pl-1">
                      Overview
                    </span>
                  </div>
                </div>

                {/* Information Rows: Exclusively Project Type, Development Type, and Role */}
                <div className="space-y-1.5 font-mono text-[11px] sm:text-[12px] text-[#1e1b18] py-0.5">
                  
                  {/* Project Type */}
                  <div className="flex items-center justify-between pb-1 border-b border-[#1e1b18]/20">
                    <span className="text-[#3c362f] flex items-center gap-1.5 font-bold">
                      <Layers className="w-3.5 h-3.5 text-[#3c362f]" /> Project Type:
                    </span>
                    <span className="font-typewriter font-bold text-[#14120f] text-right">
                      {currentProject.projectType || "Web Application"}
                    </span>
                  </div>

                  {/* Development Type */}
                  <div className="flex items-center justify-between pb-1 border-b border-[#1e1b18]/20">
                    <span className="text-[#3c362f] flex items-center gap-1.5 font-bold">
                      <Users className="w-3.5 h-3.5 text-[#3c362f]" /> Development Type:
                    </span>
                    <span className="font-typewriter font-bold text-[#14120f] text-right">
                      {currentProject.developmentType || "Individual Project"}
                    </span>
                  </div>

                  {/* Role */}
                  <div className="flex items-center justify-between pb-1 border-b border-[#1e1b18]/20">
                    <span className="text-[#3c362f] flex items-center gap-1.5 font-bold">
                      <User className="w-3.5 h-3.5 text-[#3c362f]" /> Role:
                    </span>
                    <span className="font-typewriter font-bold text-[#14120f] truncate max-w-[190px] text-right">
                      {currentProject.role}
                    </span>
                  </div>

                </div>

                {/* Direct Action Links: Live Demo & GitHub Repository */}
                <div className="space-y-1.5 pt-0.5">
                  {/* Live Demo: Direct access to the deployed application */}
                  <a
                    href={currentProject.demo || currentProject.github || "#"}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="interactive"
                    data-cursor-label="LIVE DEMO ↗"
                    className="w-full inline-flex items-center justify-between py-1.5 sm:py-2 px-3 rounded-lg bg-[#27231f] hover:bg-black text-[#f4efe6] font-typewriter font-bold shadow-sm hover:shadow-md transition-all cursor-pointer text-[10.5px] sm:text-[11.5px] group/demo"
                    title="Direct access to the deployed application"
                  >
                    <span className="flex items-center gap-1.5 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                      <span>Live Demo:</span>
                    </span>
                    <span className="text-[9.5px] sm:text-[10px] md:text-[10.5px] text-zinc-300 flex items-center gap-1 font-mono text-right truncate pl-2">
                      <span className="truncate">Direct access to the deployed application</span>
                      <ExternalLink className="w-3 h-3 group-hover/demo:translate-x-0.5 transition-transform shrink-0" />
                    </span>
                  </a>

                  {/* GitHub Repository: Source code and project documentation */}
                  <a
                    href={currentProject.github || "https://github.com/Soumyadip-25"}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="interactive"
                    data-cursor-label="GITHUB REPO ↗"
                    className="w-full inline-flex items-center justify-between py-1.5 sm:py-2 px-3 rounded-lg bg-[#14120f] hover:bg-black text-[#ede8db] font-typewriter font-bold shadow-sm hover:shadow-md transition-all cursor-pointer text-[10.5px] sm:text-[11.5px] group/git"
                    title="Source code and project documentation"
                  >
                    <span className="flex items-center gap-1.5 shrink-0">
                      <FolderGit2 className="w-3.5 h-3.5" />
                      <span>GitHub Repository:</span>
                    </span>
                    <span className="text-[9.5px] sm:text-[10px] md:text-[10.5px] text-zinc-300 flex items-center gap-1 font-mono text-right truncate pl-2">
                      <span className="truncate">Source code and project documentation</span>
                      <ExternalLink className="w-3 h-3 group-hover/git:translate-x-0.5 transition-transform shrink-0" />
                    </span>
                  </a>
                </div>
              </div>

            </div>

            {/* ----------------------------------------------------- */}
            {/* RIGHT COLUMN: Inspired by Reference Mockup             */}
            {/* ----------------------------------------------------- */}
            <div className="flex-1 flex flex-col justify-center space-y-3 sm:space-y-4 md:space-y-4.5 min-w-0 max-w-2xl">
              
              {/* 1. Project Title on Pinned Torn Paper Strip */}
              <div className="relative inline-block w-fit max-w-full">
                <div
                  className="relative px-5 sm:px-7 py-2 sm:py-2.5 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] -rotate-[0.5deg]"
                  data-cursor="interactive"
                  data-cursor-label={`${currentProject.title.split("–")[0].split("-")[0].trim().toUpperCase()} // ARCHIVE`}
                >
                  <Image
                    src="/images/heading-paper-bg.png"
                    alt=""
                    fill
                    priority
                    sizes="540px"
                    className="object-fill pointer-events-none select-none"
                  />
                  <h1 className="relative z-10 font-typewriter font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-[#14120f] tracking-wide select-none">
                    {currentProject.title}
                  </h1>
                </div>

                {/* Realistic Metallic Pushpin Clamped on Top-Right Corner */}
                <div
                  aria-hidden="true"
                  className="absolute -top-1.5 -right-1.5 z-20 w-4.5 h-4.5 rounded-full bg-gradient-to-br from-zinc-100 via-zinc-400 to-zinc-700 shadow-[2px_3px_6px_rgba(0,0,0,0.9)] border border-zinc-400 flex items-center justify-center pointer-events-none"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-200 shadow-inner" />
                </div>
              </div>

              {/* 2. Indented Description Quote Block with Left Vertical Line */}
              <div className="border-l-2 border-zinc-500/80 pl-4 py-0.5">
                <p className="font-typewriter text-zinc-200 text-xs sm:text-[13px] md:text-sm leading-relaxed">
                  {currentProject.description}
                </p>
              </div>

              {/* 3. Technologies Used Section */}
              <div className="space-y-2">
                {/* Torn Paper Header Badge */}
                <div className="relative inline-block w-fit">
                  <div className="relative px-3.5 py-1 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] -rotate-[0.5deg]">
                    <Image
                      src="/images/overview-paper-strip.png"
                      alt="Technologies Used"
                      fill
                      priority
                      sizes="180px"
                      className="object-fill select-none pointer-events-none"
                    />
                    <span className="relative z-10 font-typewriter font-bold text-xs sm:text-[13px] text-[#14120f] uppercase tracking-wider">
                      Technologies Used
                    </span>
                  </div>
                </div>

                {/* Horizontal Row of Dark Rounded Square Icon Cards */}
                <div className="flex items-center gap-2.5 sm:gap-3.5 flex-wrap">
                  {(currentProject.technologies || currentProject.tags.slice(0, 5).map(t => ({ name: t, icon: t.toLowerCase() }))).map((tech, idx) => (
                    <div
                      key={idx}
                      data-cursor="interactive"
                      data-cursor-label={tech.name.toUpperCase()}
                      className="w-16 h-16 sm:w-19 sm:h-19 md:w-21 md:h-21 rounded-xl bg-[#14120f]/90 hover:bg-[#201c18] border border-zinc-700/80 hover:border-zinc-500 shadow-[0_4px_12px_rgba(0,0,0,0.7)] flex flex-col items-center justify-center p-2 transition-all duration-200 group/tile cursor-default"
                      title={tech.name}
                    >
                      <TechIcon name={tech.name} iconKey={tech.icon} />
                      <span className="font-typewriter font-bold text-[9px] sm:text-[10px] md:text-[10.5px] text-zinc-300 group-hover/tile:text-white mt-1.5 text-center leading-tight truncate max-w-full px-0.5">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Key Features Section */}
              <div className="space-y-2">
                {/* Torn Paper Header Badge */}
                <div className="relative inline-block w-fit">
                  <div className="relative px-3.5 py-1 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] -rotate-[0.5deg]">
                    <Image
                      src="/images/overview-paper-strip.png"
                      alt="Key Features"
                      fill
                      priority
                      sizes="180px"
                      className="object-fill select-none pointer-events-none"
                    />
                    <span className="relative z-10 font-typewriter font-bold text-xs sm:text-[13px] text-[#14120f] uppercase tracking-wider">
                      Key Features
                    </span>
                  </div>
                </div>

                {/* Vertical Checklist with Retro Checkboxes */}
                <ul className="space-y-1.5 sm:space-y-2 font-typewriter text-xs sm:text-[13px] text-zinc-200">
                  {currentProject.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-[3px] border border-zinc-400 bg-zinc-900/90 text-white text-[10px] font-bold shrink-0 mt-0.5 shadow-sm">
                        ✓
                      </span>
                      <span className="leading-snug text-zinc-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>
      </main>

      {/* ========================================================= */}
      {/* 3. BOTTOM CONTROLS & NAVIGATION BAR                       */}
      {/* Inset from corners to preserve mountains & rock accents   */}
      {/* ========================================================= */}
      <footer className="w-full flex items-center justify-between px-6 sm:px-12 md:px-16 lg:px-20 py-2 sm:py-2.5 relative z-30 select-none">
        
        {/* Previous Project Button */}
        <button
          onClick={goToPrev}
          data-cursor="interactive"
          data-cursor-label={`PREV // ${prevProject.title.split("–")[0].trim().toUpperCase()}`}
          className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-400 text-zinc-300 hover:text-white transition-all text-xs font-typewriter cursor-pointer shadow-md"
          title={`Previous: ${prevProject.title}`}
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">Prev:</span>
          <span className="font-bold">{prevProject.title.split("–")[0].trim()}</span>
        </button>

        {/* Pagination Indicator Dots */}
        <div className="flex items-center gap-2 bg-black/80 px-3 py-1 rounded-full border border-zinc-800">
          {projects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => navigateToProject(p.slug, idx > currentIndex ? 1 : -1)}
              data-cursor="interactive"
              data-cursor-label={`GOTO // ${p.title.split("–")[0].trim().toUpperCase()}`}
              className={`transition-all rounded-full cursor-pointer ${
                idx === currentIndex
                  ? "w-6 h-2 bg-emerald-400 shadow-[0_0_8px_#34d399]"
                  : "w-2 h-2 bg-zinc-600 hover:bg-zinc-400"
              }`}
              aria-label={`Jump to project ${p.title}`}
            />
          ))}
        </div>

        {/* Next Project Button */}
        <button
          onClick={goToNext}
          data-cursor="interactive"
          data-cursor-label={`NEXT // ${nextProject.title.split("–")[0].trim().toUpperCase()}`}
          className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-400 text-zinc-300 hover:text-white transition-all text-xs font-typewriter cursor-pointer shadow-md"
          title={`Next: ${nextProject.title}`}
        >
          <span className="hidden sm:inline">Next:</span>
          <span className="font-bold">{nextProject.title.split("–")[0].trim()}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>

      </footer>

    </div>
  );
}
