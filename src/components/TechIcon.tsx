"use client";

import React from "react";

interface TechIconProps {
  name: string;
  className?: string;
}

export default function TechIcon({ name, className = "w-4 h-4" }: TechIconProps) {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, "");

  switch (normalized) {
    // 1. Programming Languages
    case "python":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M11.91 2c-4.47 0-4.19 1.94-4.19 1.94l.01 2.01h4.25v.6H6.12S2 6.07 2 10.61c0 4.53 3.6 4.36 3.6 4.36h2.15v-3.04s-.12-3.62 3.56-3.62h6.14s3.47.05 3.47-3.37c0-3.41-3.03-2.95-3.03-2.95H11.91zm-2.4 1.34c.5 0 .91.41.91.91s-.41.91-.91.91-.91-.41-.91-.91.41-.91.91-.91z"
            fill="#38bdf8"
          />
          <path
            d="M12.09 22c4.47 0 4.19-1.94 4.19-1.94l-.01-2.01h-4.25v-.6h5.86s4.12.48 4.12-4.06c0-4.53-3.6-4.36-3.6-4.36h-2.15v3.04s.12 3.62-3.56 3.62H6.55s-3.47-.05-3.47 3.37c0 3.41 3.03 2.95 3.03 2.95h5.98zm2.4-1.34c-.5 0-.91-.41-.91-.91s.41-.91.91-.91.91.41.91.91-.41.91-.91.91z"
            fill="#fbbf24"
          />
        </svg>
      );

    case "java":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M8.8 19.3c3.4.2 6.9-.2 9.5-1.5.8-.4 1.7-.9 1.7-1.4 0-.3-.4-.5-1.1-.5-1.8 0-4.6.6-7.8.8-3.1.2-5.4 0-5.8.5-.3.4.5.8 1.4 1.2.6.3 1.3.7 2.1.9z"
            fill="#f87171"
          />
          <path
            d="M8.2 16.5c3.2.2 6.6-.2 9-1.4.8-.4 1.6-.9 1.6-1.3 0-.3-.4-.5-1-.5-1.8 0-4.4.6-7.4.8-2.9.2-5.2 0-5.5.5-.3.4.4.7 1.3 1.1.7.3 1.3.6 2 .8z"
            fill="#fb923c"
          />
          <path
            d="M13.2 10.3c.6 1.4-.4 2.8-.4 2.8s2.2-1.1 1.2-3.2c-1-2.1-3.6-3.1-3.6-3.1s1.7 1.3 2.8 3.5z"
            fill="#facc15"
          />
          <path
            d="M10.8 4.2C10 5.6 11.2 7 11.2 7S9 5.8 10 3.7c1-2.1 3.6-3.2 3.6-3.2s-1.8 1.4-2.8 3.7z"
            fill="#ef4444"
          />
        </svg>
      );

    case "javascript":
    case "js":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="3.5" fill="#f7df1e" />
          <path
            d="M7.5 18.2c1.3.8 2.5 1.2 3.8 1.2 2.2 0 3.5-1.1 3.5-2.9 0-1.8-1.2-2.5-2.8-3.2-1.3-.6-1.8-1-1.8-1.8 0-.7.6-1.3 1.7-1.3.9 0 1.8.3 2.5.8l.6-1.8c-.8-.5-1.9-.8-3.1-.8-2.3 0-3.6 1.3-3.6 3 0 1.7 1.1 2.5 2.7 3.2 1.3.6 1.9 1.1 1.9 1.9 0 .8-.7 1.4-1.8 1.4-1.1 0-2.2-.4-3.1-1.1l-.5 1.5zm8.8-9.8h2.3v8.5c0 1.9-1.1 2.8-2.8 2.8-.7 0-1.5-.2-2-.5l.4-1.7c.4.2.9.4 1.4.4.9 0 1.3-.4 1.3-1.4v-8.1z"
            fill="#000000"
          />
        </svg>
      );

    case "typescript":
    case "ts":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="3.5" fill="#3178c6" />
          <path
            d="M3.5 10.2h7.8V12H8.3v7.5H6.1V12H3.5v-1.8zm11 8.2c1.3.7 2.6 1.1 3.8 1.1 2.2 0 3.4-1.1 3.4-2.8 0-1.7-1.1-2.5-2.7-3.2-1.3-.6-1.8-1-1.8-1.8 0-.7.6-1.3 1.7-1.3.9 0 1.8.3 2.5.8l.6-1.7c-.8-.5-1.9-.8-3.1-.8-2.3 0-3.6 1.3-3.6 3 0 1.7 1.1 2.5 2.7 3.2 1.3.6 1.9 1.1 1.9 1.9 0 .8-.7 1.4-1.8 1.4-1.1 0-2.2-.4-3.1-1.1l-.5 1.3z"
            fill="#ffffff"
          />
        </svg>
      );

    case "c":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z"
            fill="#1e293b"
            stroke="#60a5fa"
            strokeWidth="1.5"
          />
          <path
            d="M15.5 8.8c-.9-.6-2-.9-3.2-.9-2.8 0-4.8 1.9-4.8 4.6s2 4.6 4.8 4.6c1.2 0 2.3-.3 3.2-.9l.7 1.5c-1.1.7-2.4 1-3.9 1-3.8 0-6.8-2.6-6.8-6.2s3-6.2 6.8-6.2c1.5 0 2.8.4 3.9 1l-.7 1.5z"
            fill="#93c5fd"
          />
        </svg>
      );

    case "cpp":
    case "cplusplus":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z"
            fill="#0f172a"
            stroke="#00599c"
            strokeWidth="1.5"
          />
          <path
            d="M11 9c-.7-.5-1.5-.7-2.4-.7-2 0-3.5 1.5-3.5 3.7s1.5 3.7 3.5 3.7c.9 0 1.7-.2 2.4-.7l.5 1.2c-.8.5-1.9.8-2.9.8-2.8 0-5-2-5-5s2.2-5 5-5c1 0 2.1.3 2.9.8L11 9zm3.8 1.8h1.2v1.2H16v1.2h-1.2v1.2h-1.2v-1.2h-1.2V12h1.2v-1.2zm3.8 0h1.2v1.2h1.2v1.2h-1.2v1.2h-1.2v-1.2h-1.2V12h1.2v-1.2z"
            fill="#60a5fa"
          />
        </svg>
      );

    case "sql":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
          <ellipse cx="12" cy="5" rx="8" ry="3" stroke="#38bdf8" strokeWidth="1.8" />
          <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" stroke="#38bdf8" strokeWidth="1.8" />
          <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="#38bdf8" strokeWidth="1.8" />
          <path d="M12 8v10" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="2 2" />
        </svg>
      );

    // 2. Full Stack Frontend
    case "html5":
    case "html":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M3.5 2l1.6 18.2 6.9 1.9 6.9-1.9L20.5 2H3.5z" fill="#e34f26" />
          <path d="M12 3.7v16.7l5.4-1.5 1.3-15.2H12z" fill="#ef652a" />
          <path
            d="M6.7 6.4h10.6l-.3 2.9H9.7l.2 2.7h6.7l-.6 6.5-4 1.1-4-1.1-.3-3.1H9.9l.1 1.6 2 .5 2-.5.3-2.6H6.9l-.2-6.5z"
            fill="#ffffff"
          />
        </svg>
      );

    case "css3":
    case "css":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M3.5 2l1.6 18.2 6.9 1.9 6.9-1.9L20.5 2H3.5z" fill="#1572b6" />
          <path d="M12 3.7v16.7l5.4-1.5 1.3-15.2H12z" fill="#33a9dc" />
          <path
            d="M6.7 6.4h10.6l-.3 2.9H12v2.7h4.7l-.6 6.5-4.1 1.1V18l2-.5.3-2.6H12v-2.7h-2.1l-.2-2.7H12V6.4H6.7z"
            fill="#ffffff"
          />
        </svg>
      );

    case "react":
    case "reactjs":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="#61dafb" strokeWidth="1.4" />
          <ellipse
            cx="12"
            cy="12"
            rx="3.5"
            ry="9"
            transform="rotate(60 12 12)"
            stroke="#61dafb"
            strokeWidth="1.4"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="3.5"
            ry="9"
            transform="rotate(120 12 12)"
            stroke="#61dafb"
            strokeWidth="1.4"
          />
          <circle cx="12" cy="12" r="1.6" fill="#61dafb" />
        </svg>
      );

    case "nextjs":
    case "next":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="10.5" fill="#000000" stroke="#52525b" strokeWidth="1.2" />
          <path d="M7.8 7.5v9h2.1v-5.2l6.2 5.2h1.8V7.5h-2.1v5.2L9.6 7.5H7.8z" fill="#ffffff" />
        </svg>
      );

    case "vite":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M21.5 3.5L12.8 21.8a.9.9 0 01-1.6 0L2.5 3.5a.8.8 0 011.1-1l8.4 4.8 8.4-4.8a.8.8 0 011.1 1z"
            fill="url(#vite-grad)"
          />
          <path
            d="M13.4 3.8l-5.6 9.7h4.1l-1.5 6.5 6.7-10.4h-4l1.3-5.8z"
            fill="#ffd43b"
          />
          <defs>
            <linearGradient id="vite-grad" x1="2" y1="2" x2="22" y2="22">
              <stop stopColor="#41d1ff" />
              <stop offset="1" stopColor="#bd34fe" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "tailwindcss":
    case "tailwind":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M12 6c-3 0-4.8 1.5-5.4 4.5 1.2-1.5 2.7-2.1 4.5-1.8 1 .2 1.8 1 2.6 1.8C15 11.8 16.6 13.5 20.4 13.5c3 0 4.8-1.5 5.4-4.5-1.2 1.5-2.7 2.1-4.5 1.8-1-.2-1.8-1-2.6-1.8C17.4 7.7 15.8 6 12 6zm-8.4 7.5c-3 0-4.8 1.5-5.4 4.5 1.2-1.5 2.7-2.1 4.5-1.8 1 .2 1.8 1 2.6 1.8C6.6 19.3 8.2 21 12 21c3 0 4.8-1.5 5.4-4.5-1.2 1.5-2.7 2.1-4.5 1.8-1-.2-1.8-1-2.6-1.8-1.3-1.3-2.9-3-6.7-3z"
            fill="#38bdf8"
          />
        </svg>
      );

    // Full Stack Backend
    case "nodejs":
    case "node":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M12 2l9 5.2v10.4L12 22.8 3 17.6V7.2L12 2z"
            fill="#1e293b"
            stroke="#68a063"
            strokeWidth="1.5"
          />
          <path
            d="M12 6.5l5.5 3.2v6.4L12 19.3l-5.5-3.2V9.7L12 6.5z"
            fill="#68a063"
            opacity="0.85"
          />
        </svg>
      );

    case "expressjs":
    case "express":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="4" fill="#18181b" stroke="#52525b" strokeWidth="1.2" />
          <text
            x="12"
            y="16.5"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="12"
            fontWeight="bold"
            fontFamily="monospace"
          >
            ex
          </text>
        </svg>
      );

    case "restapis":
    case "restapi":
    case "rest":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
          <rect x="3" y="4" width="7" height="6" rx="1.5" stroke="#34d399" strokeWidth="1.6" />
          <rect x="14" y="4" width="7" height="6" rx="1.5" stroke="#34d399" strokeWidth="1.6" />
          <rect x="8.5" y="14" width="7" height="6" rx="1.5" stroke="#38bdf8" strokeWidth="1.6" />
          <path d="M6.5 10v2a2 2 0 002 2h3.5m5.5-4v2a2 2 0 01-2 2h-3.5m0 0v-2" stroke="#94a3b8" strokeWidth="1.4" />
        </svg>
      );

    case "jwt":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="10" stroke="#ec4899" strokeWidth="1.5" fill="#1e1b4b" />
          <path d="M6.5 12h11M12 6.5v11" stroke="#ec4899" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="12" r="4.5" stroke="#f43f5e" strokeWidth="1.4" fill="#312e81" />
        </svg>
      );

    case "authentication":
    case "auth":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
          <path
            d="M12 2l7 3.5v5.5c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5.5L12 2z"
            fill="#064e3b"
            stroke="#10b981"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="10" r="2.2" stroke="#ffffff" strokeWidth="1.4" />
          <path d="M12 12.2v3.3m-1.5 0h3" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );

    case "apiintegration":
    case "api":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
          <circle cx="6" cy="12" r="3" stroke="#38bdf8" strokeWidth="1.6" fill="#0c4a6e" />
          <circle cx="18" cy="6" r="3" stroke="#34d399" strokeWidth="1.6" fill="#064e3b" />
          <circle cx="18" cy="18" r="3" stroke="#a78bfa" strokeWidth="1.6" fill="#4c1d95" />
          <path d="M8.8 10.7l6.4-3.4m-6.4 6l6.4 3.4" stroke="#e2e8f0" strokeWidth="1.4" strokeDasharray="2 2" />
        </svg>
      );

    // 3. Databases & Cloud
    case "postgresql":
    case "postgres":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M12 3c-4.4 0-8 3.6-8 8 0 2.2.9 4.2 2.3 5.7-.3.8-.7 1.9-1.3 2.7 1.5.1 3-.5 3.9-1.4.9.4 2 .6 3.1.6 4.4 0 8-3.6 8-8s-3.6-7.6-8-7.6z"
            fill="#336791"
            opacity="0.85"
          />
          <path
            d="M9.5 8.5c1-1 3-1 4.5-.5 1 .3 2.5 1.5 2.5 3.5 0 2-1 3-2 3.5-.5.2-.8.8-.8 1.5v1h-2v-1.5c0-.8.4-1.5 1-1.8.8-.4 1.5-1 1.5-2 0-1.2-.8-1.8-1.5-2-.8-.2-2-.2-2.7.5L9.5 8.5z"
            fill="#ffffff"
          />
        </svg>
      );

    case "mysql":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="4" fill="#0f172a" stroke="#00758f" strokeWidth="1.2" />
          <path
            d="M6 16.5c2-4 5-8 11.5-8.5-1.5 2-2 4.5-2 7 2-1 3.5-3 4-5.5-2 0-4 .5-5.5 1.5-1.5 1-3.5 3.5-5 5.5H6z"
            fill="#f59e0b"
          />
          <circle cx="8" cy="11" r="1.2" fill="#38bdf8" />
        </svg>
      );

    case "mongodb":
    case "mongo":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M12 2C11.5 4.5 7 9.5 7 14.5c0 3.3 2.2 6.2 5 7.1 2.8-.9 5-3.8 5-7.1 0-5-4.5-10-5-12.5z"
            fill="#10b981"
          />
          <path d="M12 3v18.5c.3-.1.6-.2.8-.4 2.4-.8 4.2-3.4 4.2-6.6 0-4.6-4-9.2-5-11.5z" fill="#059669" />
          <path d="M11.6 22.5v-7.8c0-.3.2-.5.5-.5s.5.2.5.5v7.8c-.3 0-.7 0-1 0z" fill="#ecfdf5" />
        </svg>
      );

    case "supabase":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M13.2 2.5L3.8 13.9c-.4.5-.1 1.3.6 1.3h7.1L10.2 21.5c-.3.6.4 1.1.9.6l9.4-11.4c.4-.5.1-1.3-.6-1.3h-7.1l1.3-6.3c.3-.6-.4-1.1-.9-.6z"
            fill="#3ecf8e"
          />
        </svg>
      );

    case "firebase":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M4.5 17.5L7.2 4.2c.1-.4.6-.5.8-.2l3.4 6.3L4.5 17.5z"
            fill="#ffa000"
          />
          <path
            d="M4.5 17.5l9.2-9.4c.2-.2.5-.2.7 0l5.1 9.4-15 0z"
            fill="#f57c00"
          />
          <path
            d="M12.4 22c4.7 0 8.6-3.2 9.5-7.6L16.8 2.5c-.2-.4-.7-.4-.9 0l-3.5 6.7-7.9 8.3c1.7 2.8 4.6 4.5 7.9 4.5z"
            fill="#ffca28"
          />
        </svg>
      );

    case "pgvector":
    case "vector":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
          <circle cx="5" cy="12" r="2.5" stroke="#38bdf8" strokeWidth="1.5" fill="#0369a1" />
          <circle cx="12" cy="5" r="2.5" stroke="#34d399" strokeWidth="1.5" fill="#047857" />
          <circle cx="19" cy="12" r="2.5" stroke="#a855f7" strokeWidth="1.5" fill="#6b21a8" />
          <circle cx="12" cy="19" r="2.5" stroke="#f59e0b" strokeWidth="1.5" fill="#b45309" />
          <path d="M7.2 10.7l3-4m3.6 0l3 4m-3 5.6l-3-4m6 0l-3 4" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
          <circle cx="12" cy="12" r="1.5" fill="#ffffff" />
        </svg>
      );

    // 4. AI, ML & Data Analytics
    case "machinelearning":
    case "ml":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
          <circle cx="6" cy="6" r="2.5" stroke="#10b981" strokeWidth="1.5" fill="#064e3b" />
          <circle cx="6" cy="18" r="2.5" stroke="#10b981" strokeWidth="1.5" fill="#064e3b" />
          <circle cx="12" cy="12" r="2.8" stroke="#38bdf8" strokeWidth="1.5" fill="#0284c7" />
          <circle cx="18" cy="6" r="2.5" stroke="#a855f7" strokeWidth="1.5" fill="#581c87" />
          <circle cx="18" cy="18" r="2.5" stroke="#a855f7" strokeWidth="1.5" fill="#581c87" />
          <path d="M8.2 7.2l2.3 3.3m-2.3 4.8l2.3-3.3m3 0l2.3-3.3m-2.3 3.3l2.3 3.3" stroke="#94a3b8" strokeWidth="1.2" />
        </svg>
      );

    case "nlp":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
          <rect x="3" y="4" width="18" height="13" rx="3" stroke="#38bdf8" strokeWidth="1.6" fill="#0f172a" />
          <path d="M7 10h1.5m2.5 0h6m-10 3h4m2 0h4" stroke="#7dd3fc" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M8 17l-3 4v-4" stroke="#38bdf8" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case "llms":
    case "llm":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M12 2l2.5 6.5L21 11l-5.5 4.5L17 22l-5-3.8L7 22l1.5-6.5L3 11l6.5-2.5L12 2z"
            fill="#8b5cf6"
            stroke="#c084fc"
            strokeWidth="1.4"
          />
          <circle cx="12" cy="12" r="2" fill="#ffffff" />
        </svg>
      );

    case "rag":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
          <ellipse cx="9" cy="6" rx="6" ry="2.5" stroke="#34d399" strokeWidth="1.5" />
          <path d="M3 6v5c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5V6" stroke="#34d399" strokeWidth="1.5" />
          <path d="M14 14l6 6m0 0v-4m0 4h-4" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "predictiveanalytics":
    case "predictive":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
          <path d="M3 20h18" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4 16l5-5 4 4 7-8" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="20" cy="7" r="2" fill="#34d399" />
          <path d="M15 7h5v5" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "syntheticdatageneration":
    case "syntheticdata":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
          <path d="M12 3v4m0 10v4m-9-9h4m10 0h4" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3.5" stroke="#c084fc" strokeWidth="1.8" fill="#581c87" />
          <path d="M6 6l2.5 2.5m7 7l2.5 2.5m0-12l-2.5 2.5m-7 7L6 18" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case "promptengineering":
    case "prompts":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect x="2.5" y="4" width="19" height="16" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
          <path d="M6 9l3.5 3L6 15" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="12" y1="15" x2="17" y2="15" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    // 5. Tools, Platforms & IoT
    case "git":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M21.6 10.9L13.1 2.4a1.8 1.8 0 00-2.5 0L8.8 4.2l3.2 3.2a2.1 2.1 0 012.7 2.7l3.1 3.1a2.1 2.1 0 012-1.3c.7 0 1.3.4 1.8.9.7.7.7 1.8 0 2.5l-3.8 3.8a1.8 1.8 0 01-2.5 0l-8.5-8.5a1.8 1.8 0 010-2.5L8.6 6.3 5.4 3.1a2.1 2.1 0 01-2.7-2.7L.9 2.2a1.8 1.8 0 000 2.5l8.5 8.5a1.8 1.8 0 002.5 0l1.8-1.8-3.2-3.2a2.1 2.1 0 01-2.7-2.7l3.2-3.2z"
            fill="#f05032"
          />
        </svg>
      );

    case "github":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      );

    case "docker":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M22.5 10.5c-.3-.2-1.3-.3-2.1.2-.5-1.1-1.5-1.8-2.6-1.8H17V7.5h3v-2h-3V4h-2v4H3v4.5c0 4.1 3.4 7.5 7.5 7.5 5 0 8.7-3.4 9.8-7.5.9.1 1.8-.1 2.2-1.5v-.5h0zM5 11h2v2H5v-2zm3 0h2v2H8v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2z"
            fill="#2496ed"
          />
          <path d="M5 8h2v2H5V8zm3 0h2v2H8V8zm3 0h2v2h-2v-2z" fill="#2496ed" />
        </svg>
      );

    case "postman":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="10" fill="#ff6c37" />
          <path
            d="M17.5 9.5l-9.2 3.8a.5.5 0 00-.1.9l2.8 1.3 1.3 2.8a.5.5 0 00.9-.1l3.8-9.2a.5.5 0 00-.5-.5z"
            fill="#ffffff"
          />
        </svg>
      );

    case "vscode":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M17.8 2.2L6.5 11.1 2.2 7.8a.8.8 0 00-1.1.2L.3 9.2a.8.8 0 00.2 1.1l4 3.1-4 3.1a.8.8 0 00-.2 1.1l.8 1.2a.8.8 0 001.1.2l4.3-3.3 11.3 8.9a.8.8 0 001.3-.6V2.8a.8.8 0 00-1.3-.6zM17.5 18l-7.3-6 7.3-6v12z"
            fill="#007acc"
          />
        </svg>
      );

    case "figma":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M8 2h4v5H8a2.5 2.5 0 010-5z" fill="#f24e1e" />
          <path d="M12 2h4a2.5 2.5 0 010 5h-4V2z" fill="#ff7262" />
          <path d="M12 7h4a2.5 2.5 0 010 5h-4V7z" fill="#1abcfe" />
          <path d="M8 7h4v5H8a2.5 2.5 0 010-5z" fill="#a259ff" />
          <path d="M8 12h4v5a2.5 2.5 0 01-5 0 2.5 2.5 0 011-5z" fill="#0acf83" />
        </svg>
      );

    case "canva":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="10" fill="url(#canva-grad)" />
          <path
            d="M14.5 9.2c-.8-.5-1.8-.7-2.8-.5-2.2.4-3.5 2.5-3.2 4.7.3 2 2.2 3.3 4.2 3 1.1-.2 2.1-.8 2.6-1.6l-1.3-1c-.4.5-1 .8-1.7.9-1.2.2-2.3-.6-2.5-1.8-.2-1.3.6-2.5 1.9-2.7.6-.1 1.2 0 1.7.3l1.1-1.3z"
            fill="#ffffff"
          />
          <defs>
            <linearGradient id="canva-grad" x1="2" y1="2" x2="22" y2="22">
              <stop stopColor="#00c4cc" />
              <stop offset="1" stopColor="#7d2ae8" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "numpy":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M12 2l8 4.6v9.2L12 20.4l-8-4.6V6.6L12 2z" fill="#013243" stroke="#4dabcf" strokeWidth="1.5" />
          <path d="M12 2v9.2m0 0l8-4.6m-8 4.6l-8-4.6" stroke="#4dabcf" strokeWidth="1.5" />
          <text x="12" y="16.5" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontWeight="bold" fontFamily="monospace">
            NP
          </text>
        </svg>
      );

    case "pandas":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect x="3" y="3" width="18" height="18" rx="3" fill="#150458" stroke="#e70488" strokeWidth="1.2" />
          <rect x="6" y="9" width="3" height="9" rx="1" fill="#e70488" />
          <rect x="10.5" y="6" width="3" height="12" rx="1" fill="#ff8a00" />
          <rect x="15" y="11" width="3" height="7" rx="1" fill="#38bdf8" />
        </svg>
      );

    // 6. Core Competencies
    case "statistics":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
          <path d="M3 20h18" stroke="#64748b" strokeWidth="1.5" />
          <path
            d="M3 18c3.5 0 6-12 9-12s5.5 12 9 12"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line x1="12" y1="6" x2="12" y2="20" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="2 2" />
        </svg>
      );

    case "dataprocessing":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="8" cy="6" r="2" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
          <circle cx="16" cy="12" r="2" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
          <circle cx="10" cy="18" r="2" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
        </svg>
      );

    case "datavisualisation":
    case "datavisualization":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect x="3" y="12" width="4" height="8" rx="1" fill="#38bdf8" />
          <rect x="9" y="7" width="4" height="13" rx="1" fill="#34d399" />
          <rect x="15" y="3" width="4" height="17" rx="1" fill="#a855f7" />
          <path d="M4 10l5-4 5 3 6-5" stroke="#fbbf24" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case "modelevaluation":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="9" stroke="#64748b" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="5" stroke="#10b981" strokeWidth="1.5" />
          <path d="M9 12l2 2 4-4" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "differentialprivacy":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
          <path
            d="M12 2l7 3.5v5.5c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5.5L12 2z"
            fill="#1e1b4b"
            stroke="#818cf8"
            strokeWidth="1.6"
          />
          <text
            x="12"
            y="14.5"
            textAnchor="middle"
            fill="#c7d2fe"
            fontSize="10"
            fontFamily="serif"
            fontStyle="italic"
            fontWeight="bold"
          >
            ε
          </text>
        </svg>
      );

    case "responsibleai":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
          <path d="M12 3v17M6 7l12-2M6 7l-2 5a2 2 0 004 0L6 7zm12-2l-2 5a2 2 0 004 0l-2-5zM9 20h6" stroke="#34d399" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="8" stroke="#34d399" strokeWidth="1.5" />
          <path d="M12 8v8m-4-4h8" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
}

