"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Reveal after user scrolls past 400px (past hero area)
          setIsVisible(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Notify sidebar scrollspy to update active indicator to home
    window.dispatchEvent(
      new CustomEvent("sectionchange", { detail: { section: "home" } })
    );
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          data-cursor="interactive"
          data-cursor-label="TOP // ASCENT"
          className="group fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#141416]/90 hover:bg-[#1c1c20] text-zinc-300 hover:text-white border border-white/15 hover:border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.85),0_0_12px_rgba(255,255,255,0.08)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.95),0_0_16px_rgba(255,255,255,0.22)] backdrop-blur-md cursor-pointer transition-colors duration-200 select-none"
        >
          {/* Subtle outer vintage viewfinder tick marks */}
          <span className="absolute inset-1 rounded-full border border-white/5 pointer-events-none" />

          {/* Icon with subtle upward micro-nudge on hover */}
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-300 group-hover:text-white transition-transform duration-200 group-hover:-translate-y-0.5 stroke-[2.2]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
