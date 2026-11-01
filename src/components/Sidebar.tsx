"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

interface SidebarProps {
  activeSection: string;
  onSectionClick: (id: string) => void;
}

export default function Sidebar({ activeSection, onSectionClick }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Track window scroll progress for real-time glowing line fill
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 350);

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(Math.max(window.scrollY / totalScroll, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const activeIndex = navItems.findIndex((item) => item.id === activeSection);
  const activePercent = activeIndex >= 0 ? (activeIndex / (navItems.length - 1)) * 100 : 0;
  // Blend scroll progress and section index for smooth glowing line height
  const lineHeightPercent = Math.max(scrollProgress * 100, activePercent);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 bg-[#0a0a0c]/90 backdrop-blur-md border-b border-white/5">
        <button
          onClick={() => onSectionClick("home")}
          className="flex items-center gap-2 text-zinc-100 hover:text-white transition-colors"
        >
          <span className="font-typewriter tracking-wider text-base text-zinc-200">
            Soumyadip Sen
          </span>
        </button>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-zinc-300 hover:text-white rounded-lg bg-zinc-900/60 border border-white/10 cursor-pointer"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Slide-out Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-0 top-[61px] z-40 bg-[#0d0d10]/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl"
          >
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.id;
              const isPast = idx < activeIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionClick(item.id);
                    setMobileOpen(false);
                  }}
                  className={`flex items-center gap-3.5 text-left py-2.5 px-3 rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? "text-white bg-white/10 font-medium"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                  }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      isActive
                        ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
                        : isPast
                        ? "bg-zinc-400"
                        : "border border-zinc-500"
                    }`}
                  />
                  <span className="text-base tracking-wide">{item.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Fixed Left Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-52 lg:w-56 z-40 flex-col justify-center py-12 px-8 bg-[#070709]/80 backdrop-blur-md border-r border-white/5 select-none">
        
        {/* Navigation list with connecting glowing line */}
        <nav className="relative flex flex-col gap-7 py-2">
          
          {/* Background Connecting Line Track (linking all sections from top to bottom) */}
          <div
            aria-hidden="true"
            className="absolute left-[6px] top-[14px] bottom-[14px] w-[2px] bg-zinc-800/90 rounded-full pointer-events-none"
          />

          {/* Active Glowing Line that animates and lights up when scrolling */}
          <div
            aria-hidden="true"
            className={`absolute left-[6px] top-[14px] w-[2px] rounded-full pointer-events-none transition-[height] duration-200 ease-out ${
              isScrolling
                ? "bg-gradient-to-b from-white via-amber-200 to-white shadow-[0_0_12px_rgba(255,255,255,1),0_0_24px_rgba(255,245,210,0.8)]"
                : "bg-gradient-to-b from-white via-zinc-200 to-amber-100 shadow-[0_0_8px_rgba(255,255,255,0.7),0_0_14px_rgba(255,240,200,0.4)]"
            }`}
            style={{
              height: `${lineHeightPercent}%`,
            }}
          >
            {/* Luminous Bead that travels at the tip of the glowing line */}
            <span
              className={`absolute -bottom-1 -left-[3px] w-2 h-2 rounded-full bg-white transition-transform ${
                isScrolling
                  ? "scale-125 shadow-[0_0_10px_#ffffff,0_0_20px_#fff3cc]"
                  : "scale-100 shadow-[0_0_6px_#ffffff]"
              }`}
            />
          </div>

          {/* Nav Items */}
          {navItems.map((item, idx) => {
            const isActive = activeSection === item.id;
            const isPast = idx < activeIndex;

            return (
              <button
                key={item.id}
                onClick={() => onSectionClick(item.id)}
                className={`group relative flex items-center gap-4 text-left transition-all cursor-pointer ${
                  isActive
                    ? "text-zinc-100 font-medium"
                    : isPast
                    ? "text-zinc-300 hover:text-white font-normal"
                    : "text-zinc-500 hover:text-zinc-300 font-normal"
                }`}
              >
                {/* Status Dot with Glow */}
                <span className="relative z-10 flex items-center justify-center w-3.5 h-3.5 shrink-0 bg-[#070709] rounded-full">
                  {isActive ? (
                    <>
                      <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,1),0_0_20px_rgba(255,255,255,0.6)]" />
                      <span className="absolute w-4 h-4 rounded-full border border-white/40 animate-ping opacity-45" />
                    </>
                  ) : isPast ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 shadow-[0_0_6px_rgba(255,255,255,0.5)] group-hover:bg-white group-hover:shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all" />
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full border border-zinc-600 bg-[#070709] group-hover:border-zinc-400 transition-colors" />
                  )}
                </span>

                <span className="text-[15.5px] lg:text-[16px] tracking-wide transition-transform group-hover:translate-x-1">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
