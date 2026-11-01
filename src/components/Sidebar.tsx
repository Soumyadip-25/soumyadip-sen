"use client";

import React, { useState } from "react";
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
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
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
                        ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
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
        {/* Navigation list */}
        <nav className="flex flex-col gap-7">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSectionClick(item.id)}
                className={`group flex items-center gap-4 text-left transition-all cursor-pointer ${
                  isActive
                    ? "text-zinc-100 font-medium"
                    : "text-zinc-400 hover:text-zinc-200 font-normal"
                }`}
              >
                {/* Status Dot */}
                <span className="relative flex items-center justify-center w-3.5 h-3.5 shrink-0">
                  {isActive ? (
                    <>
                      <span className="absolute w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)]" />
                      <span className="absolute w-4 h-4 rounded-full border border-white/35 animate-ping opacity-40" />
                    </>
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full border border-zinc-600 group-hover:border-zinc-300 transition-colors" />
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
