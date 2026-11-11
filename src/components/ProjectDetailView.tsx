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
  Zap,
  Boxes,
  Compass,
  Sliders,
  Binary,
} from "lucide-react";
import { projects, getProjectBySlug, ProjectData } from "@/data/projects";

interface ProjectDetailViewProps {
  initialSlug?: string;
}

function TechIcon({ name, iconKey }: { name: string; iconKey?: string }) {
  const key = (iconKey || name).toLowerCase();

  // 1. React 19
  if (key.includes("react")) {
    return (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="-11.5 -10.23174 23 20.46348" fill="none">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  // 2. TypeScript
  if (key.includes("typescript") || key.includes("ts")) {
    return (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <text x="12" y="16.5" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
          TS
        </text>
      </svg>
    );
  }

  // 3. Node.js
  if (key.includes("node")) {
    return (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 32 32" fill="none">
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

  // 4. PostgreSQL
  if (key.includes("postgres")) {
    return (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 32 32" fill="none">
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

  // 5. pgvector
  if (key.includes("pgvector") || key.includes("vector")) {
    return (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="5" rx="8" ry="3" stroke="#06b6d4" strokeWidth="1.8" />
        <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" stroke="#06b6d4" strokeWidth="1.8" />
        <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="#06b6d4" strokeWidth="1.8" />
        <path d="M10 11l4 2.5-4 2.5" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // 6. LangChain
  if (key.includes("langchain")) {
    return (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    );
  }

  // 7. Groq API
  if (key.includes("groq")) {
    return (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="#f97316" strokeWidth="2" fill="#431407" />
        <path d="M7 12h10M12 7v10" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" fill="#f97316" />
      </svg>
    );
  }

  // 8. ESP32
  if (key.includes("esp") || key.includes("cpu")) {
    return <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />;
  }

  // 9. Embedded C/C++
  if (key.includes("c++") || key.includes("cpp") || key.includes("embedded c") || key.includes("c/c++")) {
    return (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l8.5 4.9v9.8L12 21.6 3.5 16.7V6.9L12 2z" fill="#00599C" stroke="#659AD2" strokeWidth="1.2" />
        <text x="12" y="15" fill="white" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">C++</text>
      </svg>
    );
  }

  // 10. AD8232 (ECG)
  if (key.includes("ad8232") || key.includes("ecg") || key.includes("activity")) {
    return <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-rose-400" />;
  }

  // 11. MAX30102 (Pulse & SpO2)
  if (key.includes("max30102") || key.includes("heart") || key.includes("spo2")) {
    return <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 fill-red-500/20" />;
  }

  // 12. I2C Bus
  if (key.includes("i2c")) {
    return (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round">
        <path d="M4 7h16M4 17h16" />
        <circle cx="8" cy="7" r="2" fill="#fbbf24" />
        <circle cx="16" cy="17" r="2" fill="#fbbf24" />
        <path d="M8 9v6M16 9v6" strokeDasharray="2 2" />
      </svg>
    );
  }

  // 13. Firebase
  if (key.includes("firebase")) {
    return (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
        <path d="M4.5 17.5L7 3.5l4 7.5L4.5 17.5z" fill="#FFA000" />
        <path d="M12.5 7L10 11.5l3.5 6L16 2.5 12.5 7z" fill="#F57C00" />
        <path d="M4.5 17.5l7 4 8-4-3-15-4 15-8-15z" fill="#FFCA28" />
      </svg>
    );
  }

  // 14. MQTT
  if (key.includes("mqtt")) {
    return (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <circle cx="12" cy="20" r="1.5" fill="#ef4444" />
      </svg>
    );
  }

  // 15. Python
  if (key.includes("python")) {
    return (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
        <path d="M11.9 2c-3.1 0-5 .7-5 2.5V7h5v1H5.4C3.5 8 2 9.7 2 12s1.7 4 3.7 4h1.7v-2.3c0-2.3 2-4.2 4.3-4.2h5V7c0-2.8-2.6-5-4.8-5zm-2.4 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="#38BDF8" />
        <path d="M12.1 22c3.1 0 5-.7 5-2.5V17h-5v-1h6.6c1.9 0 3.4-1.7 3.4-4s-1.7-4-3.7-4h-1.7v2.3c0 2.3-2 4.2-4.3 4.2h-5V17c0 2.8 2.6 5 4.8 5zm2.4-2a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" fill="#FACC15" />
      </svg>
    );
  }

  // 16. FastAPI
  if (key.includes("fastapi")) {
    return <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-teal-400 fill-teal-400/30" />;
  }

  // 17. Scikit-learn
  if (key.includes("scikit")) {
    return <Boxes className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />;
  }

  // 18. Sentence Transformers
  if (key.includes("transformer")) {
    return <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400" />;
  }

  // 19. Hugging Face
  if (key.includes("hugging")) {
    return (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#FBBF24" />
        <circle cx="8.5" cy="10" r="1.5" fill="#78350F" />
        <circle cx="15.5" cy="10" r="1.5" fill="#78350F" />
        <path d="M8 14.5c1.2 1.8 2.8 2.5 4 2.5s2.8-.7 4-2.5" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  // 20. LLM API / AI
  if (key.includes("llm") || key.includes("ai")) {
    return <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />;
  }

  // 21. Next.js
  if (key.includes("next")) {
    return (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.663 17.15L9.8 6.5h2.2l5.7 8.2v-8.2h1.9v10.65h-1.937zM6.5 6.5h2v11h-2v-11z" />
      </svg>
    );
  }

  // 22. Prisma ORM
  if (key.includes("prisma")) {
    return (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
        <path d="M4 19.5L12 2.5l8 17H4z" stroke="#22d3ee" strokeWidth="1.8" fill="#083344" />
        <path d="M12 2.5L14.5 19.5" stroke="#22d3ee" strokeWidth="1.2" />
      </svg>
    );
  }

  // 23. WebRTC
  if (key.includes("webrtc") || key.includes("video")) {
    return <Video className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />;
  }

  // 24. Socket.IO
  if (key.includes("socket")) {
    return (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9.5" stroke="#e4e4e7" strokeWidth="1.5" fill="#18181b" />
        <path d="M12 6.5v11M6.5 12h11" stroke="#a1a1aa" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="2.8" fill="#22c55e" />
      </svg>
    );
  }

  // 25. MPU6050
  if (key.includes("mpu6050")) {
    return <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-teal-400" />;
  }

  // 26. Sensor Fusion
  if (key.includes("sensorfusion") || key.includes("fusion")) {
    return <Sliders className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />;
  }

  // 27. Kalman Filter
  if (key.includes("kalman") || key.includes("filter")) {
    return <Binary className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" />;
  }

  // 28. Bluetooth Low Energy (BLE)
  if (key.includes("ble") || key.includes("bluetooth")) {
    return (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 7.5l11 9-5.5 5V2.5l5.5 5-11 9" />
      </svg>
    );
  }

  // 29. Recharts
  if (key.includes("recharts") || key.includes("bar-chart")) {
    return <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-teal-400" />;
  }

  // 30. Supabase
  if (key.includes("supabase")) {
    return (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
        <path d="M13 2.5L3.5 13.5h7L9.5 21.5 19.5 10.5h-7L13 2.5z" fill="#3ECF8E" />
      </svg>
    );
  }

  // Fallbacks
  if (key.includes("cloud")) {
    return <Cloud className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" />;
  }
  if (key.includes("database")) {
    return <Database className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />;
  }
  if (key.includes("phone")) {
    return <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />;
  }
  if (key.includes("radio")) {
    return <Radio className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />;
  }
  if (key.includes("server") || key.includes("express")) {
    return <Server className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-300" />;
  }

  return <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-300" />;
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
          className="flex items-center bg-black/85 backdrop-blur-md px-1.5 py-1 rounded-full border border-zinc-800 shadow-md overflow-x-auto max-w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {projects.map((p, idx) => {
            const isActive = p.slug === currentProject.slug;
            const shortName = p.title.split(/[-–—]/)[0].trim();
            return (
              <button
                key={p.id}
                onClick={() => navigateToProject(p.slug, idx > currentIndex ? 1 : -1)}
                data-cursor="interactive"
                data-cursor-label={`PROJECT // ${shortName.toUpperCase()}`}
                className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? "bg-[#ede8db] text-zinc-950 font-typewriter font-bold shadow-md -rotate-[0.5deg]"
                    : "text-zinc-400 hover:text-white font-mono font-medium hover:bg-zinc-800/80"
                }`}
                title={`Switch to ${shortName}`}
              >
                <span className={isActive ? "text-zinc-900 font-bold" : "text-emerald-400"}>
                  0{idx + 1}
                </span>
                <span>{shortName}</span>
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
            className="w-full h-full max-h-[calc(100vh-115px)] flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 xl:gap-16 max-w-[1360px] mx-auto px-2"
          >
            
            {/* ----------------------------------------------------- */}
            {/* LEFT COLUMN: Authentic Binder-Clipped Dossier Frame    */}
            {/* ----------------------------------------------------- */}
            <div className="w-full md:w-auto h-full max-h-[560px] sm:max-h-[590px] md:max-h-[620px] lg:max-h-[660px] xl:max-h-[700px] aspect-[682/1024] relative flex items-center justify-center shrink-0 filter drop-shadow-[0_18px_42px_rgba(0,0,0,0.95)]">
              
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
                    <span className="text-[#3c362f] flex items-center gap-1.5 font-bold shrink-0">
                      <Layers className="w-3.5 h-3.5 text-[#3c362f]" /> Project Type:
                    </span>
                    <span className="font-typewriter font-bold text-[#14120f] text-right pl-2 leading-tight">
                      {currentProject.projectType || "Web Application"}
                    </span>
                  </div>

                  {/* Development Type */}
                  <div className="flex items-center justify-between pb-1 border-b border-[#1e1b18]/20">
                    <span className="text-[#3c362f] flex items-center gap-1.5 font-bold shrink-0">
                      <Users className="w-3.5 h-3.5 text-[#3c362f]" /> Development Type:
                    </span>
                    <span className="font-typewriter font-bold text-[#14120f] text-right pl-2 leading-tight">
                      {currentProject.developmentType || "Individual Project"}
                    </span>
                  </div>

                  {/* Role (Full Role name with ZERO truncation or ellipsis) */}
                  <div className="flex items-center justify-between pb-1 border-b border-[#1e1b18]/20">
                    <span className="text-[#3c362f] flex items-center gap-1.5 font-bold shrink-0">
                      <User className="w-3.5 h-3.5 text-[#3c362f]" /> Role:
                    </span>
                    <span className="font-typewriter font-bold text-[#14120f] text-right text-[10px] sm:text-[11px] leading-tight pl-2">
                      {currentProject.role}
                    </span>
                  </div>

                </div>

                {/* Dossier Access: Live Demo Action Slip (Just Live Demo heading and the option to visit, vibe-matching) */}
                <div className="pt-2 sm:pt-2.5">
                  <a
                    href={currentProject.demo || currentProject.github || "#"}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="interactive"
                    data-cursor-label="VISIT // DEMO ↗"
                    className="group/link block px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-[4px] border border-[#2b241c]/35 hover:border-[#14120f] bg-[#ede6d8]/85 hover:bg-[#f5efe3] shadow-[0_2px_6px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.45)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer select-none filter contrast-105"
                    title="Visit Live Demo"
                  >
                    <div className="flex items-center justify-between text-[#14120f]">
                      {/* Stamped Typewriter Heading */}
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#14120f]/70 group-hover/link:bg-[#14120f] transition-colors" />
                        <span className="font-typewriter font-bold text-xs sm:text-[13px] tracking-wider text-[#14120f] uppercase">
                          Live Demo
                        </span>
                      </div>

                      {/* Vintage Inked Visit Option Stamp */}
                      <div className="flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-[3px] border border-[#14120f]/60 bg-[#14120f]/[0.06] group-hover/link:bg-[#14120f] group-hover/link:border-[#14120f] transition-all duration-200 shadow-sm">
                        <span className="font-typewriter font-bold text-[10.5px] sm:text-[11px] tracking-widest text-[#14120f] group-hover/link:text-[#ede6d8] transition-colors">
                          VISIT
                        </span>
                        <ExternalLink className="w-3 h-3 text-[#14120f] group-hover/link:text-[#ede6d8] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform stroke-[2.5]" />
                      </div>
                    </div>
                  </a>
                </div>
              </div>

            </div>

            {/* ----------------------------------------------------- */}
            {/* RIGHT COLUMN: Inspired by Reference Mockup             */}
            {/* ----------------------------------------------------- */}
            <div className="w-full md:w-[480px] lg:w-[540px] xl:w-[600px] flex flex-col justify-center space-y-2.5 sm:space-y-3 md:space-y-3.5 lg:space-y-4 shrink-0 min-w-0">
              
              {/* 1. Project Title on Authentic Pinned Torn Paper Strip */}
              <div className="relative inline-block w-full max-w-full">
                <div
                  className="relative w-full max-w-[480px] sm:max-w-[530px] md:max-w-[570px] lg:max-w-[600px] aspect-[1000/175] flex items-center justify-center filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] -rotate-[0.5deg]"
                  data-cursor="interactive"
                  data-cursor-label={`${currentProject.title.split(/[-–—]/)[0].trim().toUpperCase()} // ARCHIVE`}
                >
                  {/* Exact Pinned Paper Strip Image Adjusted to Natural Length and Breadth */}
                  <Image
                    src="/images/project-title-pinned-v2.png"
                    alt="Pinned Project Title banner"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 650px"
                    className="object-fill pointer-events-none select-none"
                  />
                  {/* Stamped Typewriter Title Text (Zero ellipsis, fully displayed) */}
                  <div className="relative z-10 w-full pl-4 sm:pl-5 md:pl-6 pr-10 sm:pr-12 md:pr-14 flex items-center">
                    <h1
                      className={`font-typewriter font-bold text-[#14120f] tracking-tight sm:tracking-normal select-none whitespace-nowrap ${
                        currentProject.title.length > 44
                          ? "text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[13.5px]"
                          : currentProject.title.length > 36
                          ? "text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[14.5px]"
                          : "text-[12px] sm:text-[13px] md:text-[14.5px] lg:text-[15.5px] xl:text-[16px]"
                      }`}
                    >
                      {currentProject.title}
                    </h1>
                  </div>
                </div>
              </div>

              {/* 2. Indented Description Quote Block with Left Vertical Line */}
              <div className="border-l-2 border-zinc-500/80 pl-3.5 py-0.5">
                <p className="font-typewriter text-zinc-200 text-xs sm:text-[12.5px] md:text-[13px] lg:text-[13.5px] leading-relaxed">
                  {currentProject.description}
                </p>
              </div>

              {/* 3. Technologies Used Section */}
              <div className="space-y-1.5 sm:space-y-2">
                {/* Torn Paper Header Badge */}
                <div className="relative inline-block w-fit">
                  <div className="relative px-3 py-0.5 sm:px-3.5 sm:py-1 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] -rotate-[0.5deg]">
                    <Image
                      src="/images/overview-paper-strip.png"
                      alt="Technologies Used"
                      fill
                      priority
                      sizes="180px"
                      className="object-fill select-none pointer-events-none"
                    />
                    <span className="relative z-10 font-typewriter font-bold text-xs sm:text-[12.5px] text-[#14120f] uppercase tracking-wider">
                      Technologies Used
                    </span>
                  </div>
                </div>

                {/* Horizontal Row of Vintage Worn Slate Tech Cards (Only technology logo and name) */}
                <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 flex-wrap">
                  {(currentProject.technologies || currentProject.tags.map(t => ({ name: t, icon: t.toLowerCase() }))).map((tech, idx) => (
                    <div
                      key={idx}
                      data-cursor="interactive"
                      data-cursor-label={tech.name.toUpperCase()}
                      className="relative w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] md:w-[64px] md:h-[64px] lg:w-[70px] lg:h-[70px] aspect-square flex flex-col items-center justify-center p-1 group/tile cursor-default filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)] hover:scale-105 transition-transform duration-200"
                      title={tech.name}
                    >
                      {/* Authentic Distressed Worn Slate Card Image */}
                      <Image
                        src="/images/project-tech-tile.png"
                        alt=""
                        fill
                        sizes="75px"
                        className="object-contain pointer-events-none select-none"
                      />

                      {/* Icon & Label Centered Inside Card (Only logo and name) */}
                      <div className="relative z-10 flex flex-col items-center justify-center w-full px-0.5 -mt-0.5">
                        <TechIcon name={tech.name} iconKey={tech.icon} />
                        <span className="font-typewriter font-bold text-[7px] sm:text-[7.5px] md:text-[8px] lg:text-[8.5px] text-zinc-200 group-hover/tile:text-white mt-0.5 text-center leading-[1.05] line-clamp-2 w-full break-words">
                          {tech.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Key Features Section */}
              <div className="space-y-1.5 sm:space-y-2">
                {/* Torn Paper Header Badge */}
                <div className="relative inline-block w-fit">
                  <div className="relative px-3 py-0.5 sm:px-3.5 sm:py-1 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] -rotate-[0.5deg]">
                    <Image
                      src="/images/overview-paper-strip.png"
                      alt="Key Features"
                      fill
                      priority
                      sizes="180px"
                      className="object-fill select-none pointer-events-none"
                    />
                    <span className="relative z-10 font-typewriter font-bold text-xs sm:text-[12.5px] text-[#14120f] uppercase tracking-wider">
                      Key Features
                    </span>
                  </div>
                </div>

                {/* Vertical Checklist with Retro Checkboxes */}
                <ul className="space-y-1 sm:space-y-1.5 md:space-y-2 font-typewriter text-[11px] sm:text-xs md:text-[12.5px] text-zinc-200">
                  {currentProject.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 sm:gap-2.5">
                      <span className="inline-flex items-center justify-center w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[3px] border border-zinc-400 bg-zinc-900/90 text-white text-[9px] sm:text-[10px] font-bold shrink-0 mt-0.5 shadow-sm">
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
      {/* Both transition buttons grouped together on bottom right   */}
      {/* ========================================================= */}
      <footer className="w-full flex items-center justify-between px-6 sm:px-10 md:px-14 lg:px-16 py-2 sm:py-2.5 relative z-30 select-none">
        
        {/* Pagination Indicator Dots */}
        <div className="flex items-center gap-2 bg-black/80 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-zinc-800/80 shadow-md">
          {projects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => navigateToProject(p.slug, idx > currentIndex ? 1 : -1)}
              data-cursor="interactive"
              data-cursor-label={`GOTO // ${p.title.split(/[-–—]/)[0].trim().toUpperCase()}`}
              className={`transition-all rounded-full cursor-pointer ${
                idx === currentIndex
                  ? "w-6 h-2 bg-emerald-400 shadow-[0_0_8px_#34d399]"
                  : "w-2 h-2 bg-zinc-600 hover:bg-zinc-400"
              }`}
              aria-label={`Jump to project ${p.title}`}
            />
          ))}
        </div>

        {/* Transition Buttons: Both Grouped on Bottom-Right on Torn Paper Strips */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Previous Project Button */}
          <button
            onClick={goToPrev}
            data-cursor="interactive"
            data-cursor-label={`PREV // ${prevProject.title.split(/[-–—]/)[0].trim().toUpperCase()}`}
            className="group relative w-36 sm:w-44 md:w-48 lg:w-52 aspect-[1024/341] flex items-center justify-center filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.75)] hover:drop-shadow-[0_8px_18px_rgba(0,0,0,0.95)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer select-none -rotate-[0.5deg]"
            title={`Previous: ${prevProject.title}`}
          >
            <Image
              src="/images/transition-button-paper.png"
              alt="Previous project"
              fill
              priority
              sizes="220px"
              className="object-fill pointer-events-none select-none group-hover:brightness-105 transition-all"
            />
            <div className="relative z-10 flex items-center gap-2 px-3.5 sm:px-4">
              <ArrowLeft className="w-4 h-4 text-[#14120f] group-hover:-translate-x-1 transition-transform stroke-[2.5]" />
              <span className="font-typewriter font-bold text-[11px] sm:text-[12px] md:text-[12.5px] lg:text-[13px] text-[#14120f] tracking-tight whitespace-nowrap">
                Prev: {prevProject.title.split(/[-–—]/)[0].trim()}
              </span>
            </div>
          </button>

          {/* Next Project Button */}
          <button
            onClick={goToNext}
            data-cursor="interactive"
            data-cursor-label={`NEXT // ${nextProject.title.split(/[-–—]/)[0].trim().toUpperCase()}`}
            className="group relative w-36 sm:w-44 md:w-48 lg:w-52 aspect-[1024/341] flex items-center justify-center filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.75)] hover:drop-shadow-[0_8px_18px_rgba(0,0,0,0.95)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer select-none rotate-[0.5deg]"
            title={`Next: ${nextProject.title}`}
          >
            <Image
              src="/images/transition-button-paper.png"
              alt="Next project"
              fill
              priority
              sizes="220px"
              className="object-fill pointer-events-none select-none group-hover:brightness-105 transition-all"
            />
            <div className="relative z-10 flex items-center gap-2 px-3.5 sm:px-4">
              <span className="font-typewriter font-bold text-[11px] sm:text-[12px] md:text-[12.5px] lg:text-[13px] text-[#14120f] tracking-tight whitespace-nowrap">
                Next: {nextProject.title.split(/[-–—]/)[0].trim()}
              </span>
              <ArrowRight className="w-4 h-4 text-[#14120f] group-hover:translate-x-1 transition-transform stroke-[2.5]" />
            </div>
          </button>
        </div>

      </footer>

    </div>
  );
}
