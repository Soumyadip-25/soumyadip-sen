"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import FlipClock from "./FlipClock";
import { useAudio } from "@/context/AudioContext";

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
  { id: "impact", label: "Impact" },
  { id: "contact", label: "Contact" },
];

interface SidebarProps {
  activeSection: string;
  onSectionClick: (id: string) => void;
}

export default function Sidebar({ activeSection, onSectionClick }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isPlaying, togglePlay } = useAudio();
  const activeIndex = Math.max(
    0,
    navItems.findIndex((item) => item.id === activeSection)
  );

  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Pixel-accurate coordinates for track and active filled line
  const [lineCoords, setLineCoords] = useState<{
    trackTop: number;
    trackHeight: number;
    activeHeight: number;
  }>({
    trackTop: 20,
    trackHeight: 288,
    activeHeight: 0,
  });

  const updateLinePositions = useCallback(() => {
    if (!navRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    const firstEl = itemRefs.current[0];
    const lastEl = itemRefs.current[navItems.length - 1];
    if (!firstEl || !lastEl) return;

    const firstRect = firstEl.getBoundingClientRect();
    const lastRect = lastEl.getBoundingClientRect();

    // Center Y of first dot relative to nav
    const startY = firstRect.top + firstRect.height / 2 - navRect.top;
    // Center Y of last dot relative to nav
    const endY = lastRect.top + lastRect.height / 2 - navRect.top;
    const trackHeight = Math.max(endY - startY, 0);

    // Center Y of active dot relative to nav
    const activeEl = itemRefs.current[activeIndex];
    let activeHeight = 0;
    if (activeEl) {
      const activeRect = activeEl.getBoundingClientRect();
      const activeY = activeRect.top + activeRect.height / 2 - navRect.top;
      activeHeight = Math.max(Math.min(activeY - startY, trackHeight), 0);
    }

    setLineCoords({
      trackTop: startY,
      trackHeight,
      activeHeight,
    });
  }, [activeIndex]);

  useEffect(() => {
    updateLinePositions();
    window.addEventListener("resize", updateLinePositions);
    return () => window.removeEventListener("resize", updateLinePositions);
  }, [updateLinePositions]);

  // Recalculate after mount and when activeIndex changes
  useEffect(() => {
    const timer = setTimeout(updateLinePositions, 50);
    return () => clearTimeout(timer);
  }, [updateLinePositions, activeIndex]);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 bg-[#121214]/90 backdrop-blur-md border-b border-white/5">
        <button
          onClick={() => onSectionClick("home")}
          className="flex items-center gap-2 text-zinc-100 hover:text-white transition-colors"
        >
          <span className="font-typewriter tracking-wider text-base text-zinc-200">
            Soumyadip Sen
          </span>
        </button>

        <div className="flex items-center gap-2.5">
          {/* Mobile Audio Toggle Button (Muted/off by default per user specification) */}
          <motion.button
            onClick={togglePlay}
            whileTap={{ scale: 0.92 }}
            data-cursor="interactive"
            data-cursor-label={isPlaying ? "PAUSE AUDIO" : "PLAY AUDIO"}
            aria-label={isPlaying ? "Pause Background Music" : "Play Background Music"}
            className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-center ${
              isPlaying
                ? "bg-zinc-900 border-white/30 text-white shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                : "bg-zinc-900/60 border-white/10 text-zinc-400 hover:text-white"
            }`}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            )}
          </motion.button>

          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.92 }}
            className="p-2 text-zinc-300 hover:text-white rounded-lg bg-zinc-900/60 border border-white/10 cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Slide-out Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-0 top-[61px] z-40 bg-[#141417]/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl max-h-[calc(100vh-61px)] overflow-y-auto"
          >
            <div className="w-full flex justify-center pb-2">
              <FlipClock />
            </div>

            {/* Mobile Menu Audio Player Button */}
            <div className="w-full pt-1 pb-1 flex justify-center">
              <motion.button
                onClick={togglePlay}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center justify-center gap-3 px-5 py-2.5 rounded-full border transition-all cursor-pointer ${
                  isPlaying
                    ? "bg-zinc-900/90 border-white/30 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                    : "bg-zinc-950/70 border-white/10 text-zinc-400 hover:text-white"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isPlaying ? "text-white" : "text-zinc-400"
                  }`}
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  )}
                </div>
                <div className="flex items-end gap-[2px] h-3.5 shrink-0 py-0.5">
                  <span
                    className={`w-[2px] rounded-full transition-all duration-300 ${
                      isPlaying ? "bg-white animate-music-bar-1" : "bg-zinc-600 h-1"
                    }`}
                  />
                  <span
                    className={`w-[2px] rounded-full transition-all duration-300 ${
                      isPlaying ? "bg-white animate-music-bar-2" : "bg-zinc-600 h-1"
                    }`}
                  />
                  <span
                    className={`w-[2px] rounded-full transition-all duration-300 ${
                      isPlaying ? "bg-white animate-music-bar-3" : "bg-zinc-600 h-1"
                    }`}
                  />
                  <span
                    className={`w-[2px] rounded-full transition-all duration-300 ${
                      isPlaying ? "bg-white animate-music-bar-4" : "bg-zinc-600 h-1"
                    }`}
                  />
                </div>
              </motion.button>
            </div>
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
                  <span className="relative flex flex-col items-start text-base tracking-wide">
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    )}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Fixed Left Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-52 lg:w-56 z-40 flex-col justify-between pt-5 pb-8 px-2 bg-[#070709]/85 backdrop-blur-md border-r border-white/5 select-none">
        
        {/* Top: Vintage Flip Clock mounted at top-left of portfolio */}
        <div className="w-full flex justify-center pt-1 pb-1">
          <FlipClock />
        </div>

        {/* Navigation list with connecting glowing line */}
        <nav ref={navRef} className="relative flex flex-col gap-6 py-2 px-6 my-auto">
          
          {/* Background Connecting Line Track (stops exactly at the first and last dots) */}
          <div
            aria-hidden="true"
            className="absolute left-[30px] w-[2px] bg-zinc-800/90 rounded-full pointer-events-none"
            style={{
              top: `${lineCoords.trackTop}px`,
              height: `${lineCoords.trackHeight}px`,
            }}
          />

          {/* Active Highlighted Line: fills from the first dot directly to the active dot with 0 overshoot */}
          <div
            aria-hidden="true"
            className="absolute left-[30px] w-[2px] rounded-full pointer-events-none bg-gradient-to-b from-white via-zinc-200 to-zinc-300 shadow-[0_0_8px_rgba(255,255,255,0.8),0_0_14px_rgba(255,255,255,0.5)] transition-[height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              top: `${lineCoords.trackTop}px`,
              height: `${lineCoords.activeHeight}px`,
            }}
          />

          {/* Nav Items */}
          {navItems.map((item, idx) => {
            const isActive = activeSection === item.id;
            const isPast = idx < activeIndex;

            return (
              <button
                key={item.id}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                onClick={() => onSectionClick(item.id)}
                data-cursor="interactive"
                data-cursor-label={`NAV // ${item.label.toUpperCase()}`}
                className={`group relative flex items-center gap-4 text-left transition-all cursor-pointer ${
                  isActive
                    ? "text-zinc-100 font-medium"
                    : isPast
                    ? "text-zinc-300 hover:text-white font-normal"
                    : "text-zinc-500 hover:text-zinc-300 font-normal"
                }`}
              >
                {/* Status Dot with Glow (Exact position on the line) */}
                <span className="relative z-10 flex items-center justify-center w-3.5 h-3.5 shrink-0 bg-[#070709] rounded-full">
                  {isActive ? (
                    <>
                      <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,1),0_0_20px_rgba(255,255,255,0.7)]" />
                      <span className="absolute w-4 h-4 rounded-full border border-white/50 animate-ping opacity-40 pointer-events-none" />
                    </>
                  ) : isPast ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 shadow-[0_0_5px_rgba(255,255,255,0.4)] group-hover:bg-white group-hover:shadow-[0_0_8px_rgba(255,255,255,0.7)] transition-all" />
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full border border-zinc-600 bg-[#070709] group-hover:border-zinc-400 transition-colors" />
                  )}
                </span>

                {/* Section Label + Active Glowing Underline */}
                <span className="relative flex flex-col items-start min-w-0">
                  <span
                    className={`text-[15.5px] lg:text-[16px] tracking-wide transition-colors group-hover:translate-x-1 duration-200 ${
                      isActive
                        ? "text-white font-bold"
                        : isPast
                        ? "text-zinc-300 hover:text-white"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Highlight Underline for Active Section */}
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-white via-zinc-200 to-zinc-100 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.9),0_0_14px_rgba(255,255,255,0.6)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Bottom: Small Floating Play/Pause Button (Minimalist Monochrome White) */}
        <div className="w-full px-3 pt-2 pb-1 flex items-center justify-center shrink-0">
          <motion.button
            onClick={togglePlay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 450, damping: 25 }}
            data-cursor="interactive"
            data-cursor-label={isPlaying ? "PAUSE AUDIO" : "PLAY AUDIO"}
            aria-label={isPlaying ? "Pause Background Music" : "Play Background Music"}
            className={`group/bgm relative flex items-center justify-center gap-3 px-4 py-2.5 rounded-full border transition-all duration-300 cursor-pointer select-none ${
              isPlaying
                ? "bg-zinc-900/90 border-white/30 text-white shadow-[0_4px_16px_rgba(0,0,0,0.9),0_0_12px_rgba(255,255,255,0.18)] hover:border-white/50"
                : "bg-zinc-950/60 border-white/10 text-zinc-400 hover:text-white hover:border-white/25 hover:bg-zinc-900/80 shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
            }`}
          >
            {/* Play/Pause Icon */}
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                isPlaying
                  ? "text-white"
                  : "text-zinc-400 group-hover/bgm:text-white"
              }`}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              )}
            </div>

            {/* 4 Dancing Equalizer Bars (Pure White) */}
            <div className="flex items-end gap-[2px] h-3.5 shrink-0 py-0.5">
              <span
                className={`w-[2px] rounded-full transition-all duration-300 ${
                  isPlaying
                    ? "bg-white animate-music-bar-1 shadow-[0_0_4px_rgba(255,255,255,0.6)]"
                    : "bg-zinc-700 h-1"
                }`}
              />
              <span
                className={`w-[2px] rounded-full transition-all duration-300 ${
                  isPlaying
                    ? "bg-white animate-music-bar-2 shadow-[0_0_4px_rgba(255,255,255,0.6)]"
                    : "bg-zinc-700 h-1"
                }`}
              />
              <span
                className={`w-[2px] rounded-full transition-all duration-300 ${
                  isPlaying
                    ? "bg-white animate-music-bar-3 shadow-[0_0_4px_rgba(255,255,255,0.6)]"
                    : "bg-zinc-700 h-1"
                }`}
              />
              <span
                className={`w-[2px] rounded-full transition-all duration-300 ${
                  isPlaying
                    ? "bg-white animate-music-bar-4 shadow-[0_0_4px_rgba(255,255,255,0.6)]"
                    : "bg-zinc-700 h-1"
                }`}
              />
            </div>
          </motion.button>
        </div>
      </aside>
    </>
  );
}
