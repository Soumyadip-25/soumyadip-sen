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

function TechIcon({ name, iconKey, className }: { name: string; iconKey?: string; className?: string }) {
  const iconClass = className || "w-[22px] h-[22px] sm:w-[25px] sm:h-[25px] md:w-[27px] md:h-[27px]";
  const key = (iconKey || name).toLowerCase();

  // 1. React 19 (Official React Atom)
  if (key.includes("react")) {
  return (
      <svg className={iconClass} viewBox="-11.5 -10.23174 23 20.46348" fill="none">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  // 2. TypeScript (Official TS Blue Square)
  if (key.includes("typescript") || key === "ts") {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M4.5 8.5h6M7.5 8.5v9.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M13 16.2c.8.9 2 1.3 3.3.9 1.2-.4 1.4-1.6.4-2.3l-1.8-.7c-1.6-.7-1.7-2.4-.2-3.3 1.3-.8 2.8-.5 3.5.3" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  // 3. Node.js (Official Node Green Hexagon)
  if (key.includes("node")) {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none">
        <path d="M12 2.5l8.5 4.9v9.8L12 22.1 3.5 17.2V7.4L12 2.5z" fill="#339933" />
        <path d="M12 5.5l6 3.5v7l-6 3.5-6-3.5v-7l6-3.5z" fill="#026E00" />
        <text x="12" y="14" fill="#ffffff" fontSize="6" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">NODE</text>
      </svg>
    );
  }

  // 4. PostgreSQL (Official PostgreSQL Elephant Slonik Silhouette)
  if (key.includes("postgres")) {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none">
        <path d="M12 2.5C7.5 2.5 4.5 5 4.5 9.5c0 2.8.8 5.2 2.5 7V21l3.5-1.5v-2.2c.5.2 1 .3 1.5.3s1-.1 1.5-.3V19.5L17 21v-4.5c1.7-1.8 2.5-4.2 2.5-7 0-4.5-3-7-7.5-7z" fill="#336791" />
        <circle cx="9.5" cy="9.5" r="1.3" fill="#ffffff" />
        <circle cx="14.5" cy="9.5" r="1.3" fill="#ffffff" />
        <path d="M10.5 13.5c.8.6 2.2.6 3 0" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  }

  // 5. pgvector (Official pgvector Vector Database Embedding)
  if (key.includes("pgvector") || key.includes("vector")) {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
        <path d="M6 12l3-3M6 12l3 3M18 12l-3-3M18 12l3 3" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="2.5" fill="#38bdf8" />
        <circle cx="12" cy="7" r="1.2" fill="#0ea5e9" />
        <circle cx="12" cy="17" r="1.2" fill="#0ea5e9" />
      </svg>
    );
  }

  // 6. LangChain (Official LangChain Parrot / Emblem)
  if (key.includes("langchain")) {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none">
        <path d="M5 19c2-4 5-6 10-6v-2c-3 0-5.5-1.5-7-4 3-1 6-1 8 1 1 1 1.5 2.5 1.5 4.5 0 3-1.5 5.5-4 7-2 1.2-4.5 1.5-8.5-.5z" fill="#10B981" />
        <circle cx="15.5" cy="6.5" r="1.3" fill="#1E293B" />
        <path d="M17 7l3.2 1.5-3.2 1.5" fill="#F59E0B" />
        <path d="M8 17c1.5 2.5 4 4 7 4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // 7. Groq API (Official Groq Red-Orange LPU 'g' Logo)
  if (key.includes("groq")) {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#F05A28" />
        <text x="12" y="16.5" fill="white" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">g</text>
      </svg>
    );
  }

  // 8. ESP32 (Microcontroller Chip matching exact reference)
  if (key.includes("esp32") || key.includes("esp")) {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="#00dc82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="5" width="14" height="14" rx="2" />
        <rect x="8.5" y="8.5" width="7" height="7" rx="1" />
        <path d="M8 2v3M12 2v3M16 2v3M8 19v3M12 19v3M16 19v3M2 8h3M2 12h3M2 16h3M19 8h3M19 12h3M19 16h3" />
      </svg>
    );
  }

  // 9. Embedded C/C++ (Official C++ Hexagonal Blue Emblem)
  if (key.includes("c++") || key.includes("cpp") || key.includes("embedded c") || key.includes("c/c++")) {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none">
        <path d="M12 2l8.5 4.9v9.8L12 21.6 3.5 16.7V6.9L12 2z" fill="#00599C" stroke="#659AD2" strokeWidth="1.2" />
        <text x="12" y="15" fill="white" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">C++</text>
      </svg>
    );
  }

  // 10. AD8232 (AD8232 Single-Lead Heart Rate Monitor ECG Waveform)
  if (key.includes("ad8232") || key.includes("ecg")) {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h4l2-4 3 9 3-13 3 11 2-3h3" />
      </svg>
    );
  }

  // 11. MAX30102 (MAX30102 Optical Pulse Oximeter & SpO2 Biometric Sensor)
  if (key.includes("max30102") || key.includes("spo2")) {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#ef4444" fillOpacity="0.25" stroke="#ef4444" strokeWidth="1.8" />
        <path d="M7 12h2.5l1.5-3 2 6 1.5-3H17" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // 12. I2C (Inter-Integrated Circuit Serial Bus SDA/SCL Protocol)
  if (key.includes("i2c")) {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round">
        <path d="M3 7h18M3 17h18" />
        <circle cx="7" cy="7" r="2.5" fill="#fbbf24" />
        <circle cx="17" cy="17" r="2.5" fill="#fbbf24" />
        <path d="M7 9.5v5M17 9.5v5" strokeDasharray="2 2" stroke="#fbbf24" strokeWidth="1.5" />
      </svg>
    );
  }

  // 13. Firebase (Official Google Firebase Tri-Color Flame)
  if (key.includes("firebase")) {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none">
        <path d="M4.5 17.5L7 3.5l4 7.5L4.5 17.5z" fill="#FFA000" />
        <path d="M12.5 7L10 11.5l3.5 6L16 2.5 12.5 7z" fill="#F57C00" />
        <path d="M4.5 17.5l7 4 8-4-3-15-4 15-8-15z" fill="#FFCA28" />
      </svg>
    );
  }

  // 14. MQTT (Official MQTT Telemetry Radio Transmission Broadcast)
  if (key.includes("mqtt")) {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round">
        <path d="M4 11a12 12 0 0 1 16 0" />
        <path d="M7 14a8 8 0 0 1 10 0" />
        <path d="M10 17a4 4 0 0 1 4 0" />
        <circle cx="12" cy="19" r="1.5" fill="#dc2626" />
      </svg>
    );
  }

  // 15. Python (Official Python Blue & Yellow Interlocking Serpents)
  if (key.includes("python")) {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none">
        <path d="M11.9 2c-3.1 0-5 .7-5 2.5V7h5v1H5.4C3.5 8 2 9.7 2 12s1.7 4 3.7 4h1.7v-2.3c0-2.3 2-4.2 4.3-4.2h5V7c0-2.8-2.6-5-4.8-5zm-2.4 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="#38BDF8" />
        <path d="M12.1 22c3.1 0 5-.7 5-2.5V17h-5v-1h6.6c1.9 0 3.4-1.7 3.4-4s-1.7-4-3.7-4h-1.7v2.3c0 2.3-2 4.2-4.3 4.2h-5V17c0 2.8 2.6 5 4.8 5zm2.4-2a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" fill="#FACC15" />
      </svg>
    );
  }

  // 16. FastAPI (Official FastAPI Teal Circle with White Bolt)
  if (key.includes("fastapi")) {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#009688" />
        <path d="M13 3L6 14h5l-2 7 8-11h-5l1-7z" fill="white" />
      </svg>
    );
  }

  // 17. Scikit-learn (Official Scikit-learn Dual Circular Distribution Nodes)
  if (key.includes("scikit")) {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none">
        <path d="M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9-4-9-9-9z" fill="#1e293b" stroke="#3499cd" strokeWidth="1.5" />
        <circle cx="8" cy="12" r="3.5" fill="#f89939" />
        <circle cx="16" cy="12" r="3.5" fill="#3499cd" />
        <path d="M8 12c2-3 6-3 8 0" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  // 18. Sentence Transformers (Official Transformer Multi-Layer Bi-Directional Attention)
  if (key.includes("transformer")) {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="5" rx="1.5" fill="#4f46e5" fillOpacity="0.4" stroke="#6366f1" strokeWidth="1.5" />
        <rect x="3" y="15" width="18" height="5" rx="1.5" fill="#4f46e5" fillOpacity="0.4" stroke="#6366f1" strokeWidth="1.5" />
        <path d="M7 9v6M12 9v6M17 9v6M7 9l5 6M12 9l5 6M12 9l-5 6M17 9l-5 6" stroke="#818cf8" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  }

  // 19. Hugging Face (Official Hugging Face Emoji Mascot 🤗)
  if (key.includes("hugging")) {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9.5" fill="#FFD21E" />
        <ellipse cx="8.5" cy="10" rx="1.2" ry="1.6" fill="#3D1C00" />
        <ellipse cx="15.5" cy="10" rx="1.2" ry="1.6" fill="#3D1C00" />
        <path d="M8 13.5c1.2 2.2 2.8 2.8 4 2.8s2.8-.6 4-2.8" stroke="#3D1C00" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M3.5 13.5c1-1 2.5-1 3.5 0l1 1-1.5 1.5c-.8.8-2 .8-2.8 0l-.2-.2z" fill="#FFA500" stroke="#3D1C00" strokeWidth="0.8" />
        <path d="M20.5 13.5c-1-1-2.5-1-3.5 0l-1 1 1.5 1.5c.8.8 2 .8 2.8 0l.2-.2z" fill="#FFA500" stroke="#3D1C00" strokeWidth="0.8" />
      </svg>
    );
  }

  // 20. LLM API (Official Generative Intelligence Neural Bloom)
  if (key.includes("llm") || key.includes("ai")) {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="3" fill="#a855f7" />
      </svg>
    );
  }

  // 21. Next.js (Official Next.js Stylized 'N' Emblem)
  if (key.includes("next")) {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="11" fill="black" stroke="#52525b" strokeWidth="1" />
        <path d="M16.5 17.5L8.5 7h-1v10h1.8v-7.2l7.2 9.4c.3-.5.7-1.1 1-1.7z" fill="white" />
        <path d="M15.5 7h1.8v10h-1.8z" fill="white" />
      </svg>
    );
  }

  // 22. Prisma ORM (Official Prisma Isometric Cyan Prism Pyramid)
  if (key.includes("prisma")) {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none">
        <path d="M3.5 19.5L12 2l8.5 17.5-8.5 2.5-8.5-2.5z" fill="#163C53" stroke="#22D3EE" strokeWidth="1.5" />
        <path d="M12 2v20M12 22l8.5-2.5L12 2" fill="#0EA5E9" fillOpacity="0.4" stroke="#22D3EE" strokeWidth="1.2" />
      </svg>
    );
  }

  // 23. WebRTC (Official WebRTC Intersecting Dual Nodes)
  if (key.includes("webrtc")) {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none">
        <path d="M6 12a6 6 0 0 1 6-6c2.5 0 4.6 1.5 5.5 3.7L15 11a3.5 3.5 0 0 0-3-2 3.5 3.5 0 0 0-3.5 3.5 3.5 3.5 0 0 0 3.5 3.5c1.3 0 2.4-.7 3-1.8l2.5 1.3C16.5 18 14.4 19.5 12 19.5a7.5 7.5 0 0 1-6-7.5z" fill="#3B82F6" />
        <circle cx="17.5" cy="12" r="3.5" fill="#F97316" />
      </svg>
    );
  }

  // 24. Socket.IO (Official Socket.IO Electric Green Plug Crest)
  if (key.includes("socket")) {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#010101" stroke="#27272a" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="6" stroke="#ffffff" strokeWidth="1.5" fill="#18181b" />
        <circle cx="12" cy="12" r="2.8" fill="#00E599" />
      </svg>
    );
  }

  // 25. MPU6050 (Exact Motion Waveform from Reference)
  if (key.includes("mpu6050")) {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="#fb7185" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 13c3 0 3-8 6-8s3 14 6 14 3-6 6-6" />
      </svg>
    );
  }

  // 26. Sensor Fusion (Gimbal Coordinates & Integrated Filter)
  if (key.includes("sensorfusion") || key.includes("fusion")) {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M12 4v16M4 12h16" />
        <circle cx="12" cy="12" r="3" fill="#f59e0b" />
      </svg>
    );
  }

  // 27. Kalman Filter (Gaussian Distribution Optimal Estimator Curve)
  if (key.includes("kalman") || key.includes("filter")) {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none">
        <path d="M2 18c4 0 6-1 8-7 1.5-4.5 2.5-4.5 4 0 2 6 4 7 8 7" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="12" y1="5" x2="12" y2="19" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="2 2" />
        <circle cx="12" cy="6.5" r="2" fill="#38bdf8" />
      </svg>
    );
  }

  // 28. Bluetooth Low Energy (Official Nordic Bindrune Emblem)
  if (key.includes("ble") || key.includes("bluetooth")) {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#0082FC" fillOpacity="0.2" stroke="#0082FC" strokeWidth="1.5" />
        <path d="M7 7.5l10 9-5 4.5V3l5 4.5-10 9" stroke="#0082FC" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // 29. Recharts (Official Recharts Multi-Bar & Metric Trendline)
  if (key.includes("recharts") || key.includes("bar-chart")) {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="12" width="4" height="8" rx="1" fill="#22c55e" />
        <rect x="10" y="7" width="4" height="13" rx="1" fill="#3b82f6" />
        <rect x="17" y="3" width="4" height="17" rx="1" fill="#ef4444" />
        <path d="M5 11l6-4 6-3" stroke="#facc15" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  // 30. Supabase (Official Supabase Emerald Lightning Bolt)
  if (key.includes("supabase")) {
  return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none">
        <path d="M12.9 2.1c-.5-.7-1.6-.4-1.7.5L9.6 12H3.8c-.8 0-1.3.8-.9 1.5l8.2 11.2c.5.7 1.6.4 1.7-.5L14.4 15h5.8c.8 0 1.3-.8.9-1.5L12.9 2.1z" fill="#3ECF8E" />
      </svg>
    );
  }

  // Fallbacks
  if (key.includes("cloud")) {
    return <Cloud className={`${iconClass} text-sky-400`} />;
  }
  if (key.includes("database")) {
    return <Database className={`${iconClass} text-amber-400`} />;
  }
  if (key.includes("phone")) {
    return <PhoneCall className={`${iconClass} text-red-400`} />;
  }

  return <Code2 className={`${iconClass} text-zinc-300`} />;
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

  // Uniform typography constants shared across all 6 project pages as requested
  const titleFontClass = "text-[14px] sm:text-[15.5px] md:text-[17px] lg:text-[19px] xl:text-[20.5px] 2xl:text-[21.5px]";
  const sectionBadgeFontClass = "font-typewriter font-bold text-[12px] sm:text-[13px] md:text-[13.5px] lg:text-[14px] text-[#14120f] uppercase tracking-wider select-none";
  const descriptionFontClass = "font-typewriter text-zinc-200 text-[13px] sm:text-[13.5px] md:text-[14px] lg:text-[14.5px] xl:text-[15.5px] leading-relaxed tracking-[0.015em]";
  const highlightFontClass = "font-typewriter text-zinc-200 text-[13px] sm:text-[13.5px] md:text-[14px] lg:text-[14.5px] xl:text-[15.5px] leading-none whitespace-nowrap tracking-tight";

  // Check if current project has live online demo or github repo (Hardware projects have no online demo/repo)
  const hasOnlineLinks =
    Boolean(currentProject.demo || currentProject.github) &&
    currentProject.slug !== "heartery" &&
    currentProject.slug !== "fallguard";

  // Dynamic banner width tailored to title length with slightly larger uniform font size, so bg image wraps the centered heading
  const titleLen = currentProject.title.length;
  let bannerWidthClass = "w-full max-w-[495px] sm:max-w-[565px] md:max-w-[630px] lg:max-w-[685px] xl:max-w-[725px]";

  if (titleLen <= 34) {
    // e.g. "Dhruva - Polar Knowledge System" (31 chars)
    bannerWidthClass = "w-full max-w-[360px] sm:max-w-[405px] md:max-w-[450px] lg:max-w-[485px] xl:max-w-[515px]";
  } else if (titleLen <= 40) {
    // e.g. "FallGuard - Smart Fall Detection System" (39 chars)
    bannerWidthClass = "w-full max-w-[415px] sm:max-w-[470px] md:max-w-[525px] lg:max-w-[570px] xl:max-w-[605px]";
  } else if (titleLen <= 44) {
    // e.g. "Anvit - Online Doctor Consultation Platform" (43 chars)
    bannerWidthClass = "w-full max-w-[445px] sm:max-w-[505px] md:max-w-[565px] lg:max-w-[615px] xl:max-w-[650px]";
  } else if (titleLen <= 47) {
    // e.g. "Samridd..." (46 chars), "Heartery..." (47 chars)
    bannerWidthClass = "w-full max-w-[475px] sm:max-w-[540px] md:max-w-[600px] lg:max-w-[655px] xl:max-w-[695px]";
  } else {
    // e.g. "PathVista - AI-Powered Career & Education Advisor" (49 chars)
    bannerWidthClass = "w-full max-w-[495px] sm:max-w-[565px] md:max-w-[630px] lg:max-w-[685px] xl:max-w-[725px]";
  }

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
        
        {/* Back to Projects Gallery: Authentic Taped Torn-Paper Memo (Slightly enlarged & nudged downward) */}
        <Link
          href="/#projects"
          data-cursor="interactive"
          data-cursor-label="RETURN // PROJECTS"
          className="group relative w-[172px] sm:w-[196px] md:w-[220px] lg:w-[236px] aspect-[1007/212] drop-shadow-[0_4px_12px_rgba(0,0,0,0.75)] hover:drop-shadow-[0_8px_18px_rgba(0,0,0,0.95)] hover:translate-y-0.5 hover:rotate-0 transition-all duration-200 cursor-pointer select-none -rotate-[0.5deg] shrink-0 translate-y-1 sm:translate-y-1.5"
          title="Return to Projects Gallery"
        >
          {/* Authentic Ripped Paper Strip with Scotch Tape */}
          <Image
            src="/images/back-to-console-paper.png"
            alt="Return to Projects memo"
            fill
            priority
            sizes="250px"
            className="object-fill pointer-events-none select-none filter contrast-105"
          />

          {/* Overlaid Stamped Typewriter Memo Lettering */}
          <div className="absolute inset-0 flex items-center pl-6.5 sm:pl-7.5 md:pl-8.5 pr-2.5 pointer-events-none gap-2">
            <ArrowLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#14120f] group-hover:-translate-x-1 transition-transform stroke-[2.5] shrink-0" />
            <div className="flex flex-col text-left justify-center min-w-0">
              <span className="font-mono text-[7.5px] sm:text-[8px] md:text-[8.5px] font-bold tracking-widest text-zinc-800/80 uppercase leading-none">
                [ ESC ] // GALLERY
              </span>
              <span className="font-typewriter font-bold text-[11.5px] sm:text-[12.5px] md:text-[13px] lg:text-[13.5px] text-[#14120f] tracking-tight leading-tight mt-0.5 whitespace-nowrap group-hover:text-black transition-colors">
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
      <main className="flex-1 flex items-center justify-center min-h-0 py-1 sm:py-2 px-3 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative z-10 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentProject.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full max-h-[calc(100vh-115px)] flex flex-col md:flex-row items-center justify-center md:justify-between xl:justify-center gap-6 md:gap-8 lg:gap-10 xl:gap-14 max-w-[1660px] 2xl:max-w-[1840px] mx-auto px-2"
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
                className={`absolute z-25 flex flex-col ${hasOnlineLinks ? "justify-between" : "justify-start gap-2.5 sm:gap-3.5"}`}
                style={{
                  left: "10.5%",
                  right: "10.5%",
                  top: "59.5%",
                  bottom: "4.8%",
                }}
              >
                {/* Header: Overview Title Stamped on Authentic Torn Paper Strip (Slightly larger, nudged down & shifted slightly left) */}
                <div className="flex items-center justify-start pb-0.5 pt-1 sm:pt-1.5">
                  <div className="relative w-[150px] sm:w-[168px] md:w-[184px] aspect-[950/210] flex items-center justify-center filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] -rotate-[0.5deg] -translate-x-1.5 sm:-translate-x-2">
                    <Image
                      src="/images/overview-paper-strip.png"
                      alt="Overview banner"
                      fill
                      priority
                      sizes="200px"
                      className="object-fill select-none pointer-events-none"
                    />
                    <span className="relative z-10 font-typewriter font-bold text-[13px] sm:text-[14.5px] md:text-[15px] text-[#14120f] uppercase tracking-widest translate-y-[1px]">
                      Overview
                    </span>
                  </div>
                </div>

                {/* Information Rows: Project Type, Development Type, Role, Live Demo, Repository */}
                <div className={`${hasOnlineLinks ? "space-y-1.5 sm:space-y-2" : "space-y-2.5 sm:space-y-3"} font-mono text-[11px] sm:text-[12px] text-[#1e1b18] py-0.5`}>
                  
                  {/* 1. Project Type */}
                  <div className="flex items-center justify-between pb-1 border-b border-[#1e1b18]/20">
                    <span className="text-[#3c362f] flex items-center gap-1.5 font-bold shrink-0">
                      <Layers className="w-3.5 h-3.5 text-[#3c362f]" /> Project Type:
                    </span>
                    <span className="font-typewriter font-bold text-[#14120f] text-right pl-2 leading-tight">
                      {currentProject.projectType || "Web Application"}
                    </span>
                  </div>

                  {/* 2. Development Type */}
                  <div className="flex items-center justify-between pb-1 border-b border-[#1e1b18]/20">
                    <span className="text-[#3c362f] flex items-center gap-1.5 font-bold shrink-0">
                      <Users className="w-3.5 h-3.5 text-[#3c362f]" /> Development Type:
                    </span>
                    <span className="font-typewriter font-bold text-[#14120f] text-right pl-2 leading-tight">
                      {currentProject.developmentType || "Individual Project"}
                    </span>
                  </div>

                  {/* 3. Role */}
                  <div className="flex items-center justify-between pb-1 border-b border-[#1e1b18]/20">
                    <span className="text-[#3c362f] flex items-center gap-1.5 font-bold shrink-0">
                      <User className="w-3.5 h-3.5 text-[#3c362f]" /> Role:
                    </span>
                    <span className="font-typewriter font-bold text-[#14120f] text-right text-[10px] sm:text-[11px] leading-tight pl-2">
                      {currentProject.role}
                    </span>
                  </div>

                  {/* 4. Live Demo (Only shown when project has demo link and is not hardware) */}
                  {hasOnlineLinks && currentProject.demo && (
                    <a
                      href={currentProject.demo}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="interactive"
                      data-cursor-label="LIVE DEMO ↗"
                      className="flex items-center justify-between pb-1 border-b border-[#1e1b18]/20 group/row cursor-pointer transition-colors hover:border-[#1e1b18]/70"
                      title="Open Live Demo"
                    >
                      <span className="text-[#3c362f] group-hover/row:text-[#14120f] flex items-center gap-1.5 font-bold shrink-0 transition-colors">
                        <ExternalLink className="w-3.5 h-3.5 text-[#3c362f] group-hover/row:text-[#14120f] transition-colors" /> Live Demo:
                      </span>
                      <span className="font-typewriter font-bold text-[#14120f] text-right pl-2 leading-tight flex items-center gap-1 group-hover/row:underline underline-offset-2">
                        <span>[ VISIT ↗ ]</span>
                      </span>
                    </a>
                  )}

                  {/* 5. Repository (Only shown when project has repo link and is not hardware) */}
                  {hasOnlineLinks && currentProject.github && (
                    <a
                      href={currentProject.github}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="interactive"
                      data-cursor-label="GITHUB REPO ↗"
                      className="flex items-center justify-between pb-1 border-b border-[#1e1b18]/20 group/row cursor-pointer transition-colors hover:border-[#1e1b18]/70"
                      title="Open GitHub Repository"
                    >
                      <span className="text-[#3c362f] group-hover/row:text-[#14120f] flex items-center gap-1.5 font-bold shrink-0 transition-colors">
                        <FolderGit2 className="w-3.5 h-3.5 text-[#3c362f] group-hover/row:text-[#14120f] transition-colors" /> Repository:
                      </span>
                      <span className="font-typewriter font-bold text-[#14120f] text-right pl-2 leading-tight flex items-center gap-1 group-hover/row:underline underline-offset-2">
                        <span>[ REPO ↗ ]</span>
                      </span>
                    </a>
                  )}

                </div>
              </div>

            </div>

            {/* ----------------------------------------------------- */}
            {/* RIGHT COLUMN: Inspired by Reference Mockup             */}
            {/* ----------------------------------------------------- */}
            <div className="w-full md:w-auto md:min-w-[620px] lg:min-w-[760px] xl:min-w-[880px] 2xl:min-w-[960px] flex flex-col justify-center space-y-2.5 sm:space-y-3 md:space-y-3.5 lg:space-y-4 shrink-0">
              
              {/* 1. Project Title on Authentic Pinned Torn Paper Strip (Tailored to title length) */}
              <div className="relative inline-block w-full max-w-full">
                <div
                  className={`relative ${bannerWidthClass} aspect-[1000/175] flex items-center justify-center filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] -rotate-[0.5deg]`}
                  data-cursor="interactive"
                  data-cursor-label={`${currentProject.title.split(/[-–—]/)[0].trim().toUpperCase()} // ARCHIVE`}
                >
                  {/* Exact Pinned Paper Strip Image Adjusted to Natural Length and Breadth */}
                  <Image
                    src="/images/project-title-pinned-v2.png"
                    alt="Pinned Project Title banner"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 750px"
                    className="object-fill pointer-events-none select-none"
                  />
                  {/* Stamped Typewriter Title Text (Centered in the exact middle of the paper banner) */}
                  <div className="relative z-10 w-full h-full px-5 sm:px-6 md:px-8 flex items-center justify-center">
                    <h1
                      className={`font-typewriter font-bold text-[#14120f] tracking-tight select-none whitespace-nowrap text-center ${titleFontClass}`}
                    >
                      {currentProject.title}
                    </h1>
                  </div>
                </div>
              </div>

              {/* 2. Indented Description Quote Block with Left Vertical Line (Extended rightward) */}
              <div className="border-l-2 border-zinc-500/80 pl-3.5 sm:pl-4 py-0.5 w-full max-w-[640px] lg:max-w-[760px] xl:max-w-[880px] 2xl:max-w-[950px]">
                <p className={descriptionFontClass}>
                  {currentProject.description}
                </p>
              </div>

              {/* 3. Technologies Used Section */}
              <div className="space-y-1.5 sm:space-y-2">
                {/* Torn Paper Header Badge */}
                <div className="relative inline-block w-fit">
                  <div className="relative px-3.5 py-0.5 sm:px-4 sm:py-1 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] -rotate-[0.5deg]">
                    <Image
                      src="/images/overview-paper-strip.png"
                      alt="Technologies Used"
                      fill
                      priority
                      sizes="180px"
                      className="object-fill select-none pointer-events-none"
                    />
                    <span className={`relative z-10 ${sectionBadgeFontClass}`}>
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
                      className="relative w-[54px] h-[54px] sm:w-[60px] sm:h-[60px] md:w-[66px] md:h-[66px] lg:w-[72px] lg:h-[72px] aspect-square flex flex-col items-center justify-center p-1 group/tile cursor-default filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)] hover:scale-105 transition-transform duration-200"
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
                        <span className="font-typewriter font-bold text-[7.5px] sm:text-[8px] md:text-[8.5px] lg:text-[9.2px] text-zinc-200 group-hover/tile:text-white mt-0.5 text-center leading-[1.05] line-clamp-2 w-full break-words">
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
                  <div className="relative px-3.5 py-0.5 sm:px-4 sm:py-1 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] -rotate-[0.5deg]">
                    <Image
                      src="/images/overview-paper-strip.png"
                      alt="Key Features"
                      fill
                      priority
                      sizes="180px"
                      className="object-fill select-none pointer-events-none"
                    />
                    <span className={`relative z-10 ${sectionBadgeFontClass}`}>
                      Key Features
                    </span>
                  </div>
                </div>

                {/* Vertical Checklist with Retro Checkboxes (Each point strictly on a single line, extending rightward) */}
                <ul className="space-y-1 sm:space-y-1.5 md:space-y-2 w-full">
                  {currentProject.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 sm:gap-2.5 whitespace-nowrap">
                      <span className="inline-flex items-center justify-center w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-[3px] border border-zinc-400 bg-zinc-900/90 text-white text-[10px] sm:text-[11px] font-bold shrink-0 shadow-sm">
                        ✓
                      </span>
                      <span className={highlightFontClass}>{item}</span>
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
      {/* Pagination centered in bottom middle, transition buttons on bottom right */}
      {/* ========================================================= */}
      <footer className="w-full flex items-center justify-end px-4 sm:px-10 md:px-14 lg:px-16 py-2 sm:py-2.5 relative z-30 select-none">
        
        {/* Pagination Indicator Dots: Centered in the bottom middle of the page */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/85 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-zinc-800/80 shadow-[0_4px_16px_rgba(0,0,0,0.8)] z-10">
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
        <div className="flex items-center gap-2.5 sm:gap-3.5 ml-auto">
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
