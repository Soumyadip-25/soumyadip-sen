"use client";

import React from "react";
import Image from "next/image";
import TechIcon from "./TechIcon";

interface SkillPaperCardProps {
  name: string;
  category?: string;
  level?: string;
  compact?: boolean;
}

export default function SkillPaperCard({
  name,
  category,
  level = "Advanced",
  compact = false,
}: SkillPaperCardProps) {
  // Determine signal bar fill (1 to 5)
  const filledBars =
    level === "Advanced" ? 5 : level === "Proficient" ? 4 : 3;

  // Dynamic font sizing based on character length so text NEVER truncates and fits seamlessly
  const getNameFontClass = (len: number, isCompact: boolean) => {
    if (isCompact) {
      if (len >= 20) return "text-[11px] sm:text-[12px] leading-[1.15]";
      if (len >= 14) return "text-[12px] sm:text-[13px] leading-tight";
      return "text-[13px] sm:text-[14.5px] leading-tight";
    } else {
      if (len >= 22) return "text-[11.5px] sm:text-[13px] leading-[1.15]";
      if (len >= 16) return "text-[13px] sm:text-[14.5px] leading-tight";
      return "text-[14px] sm:text-[16px] leading-tight";
    }
  };

  const getCategoryFontClass = (len: number, isCompact: boolean) => {
    if (isCompact) {
      if (len >= 20) return "text-[8.5px] sm:text-[9.5px] leading-tight";
      return "text-[9.5px] sm:text-[10.5px] leading-tight";
    } else {
      if (len >= 20) return "text-[9.5px] sm:text-[10.5px] leading-tight";
      return "text-[10.5px] sm:text-[11.5px] leading-tight";
    }
  };

  const nameFontClass = getNameFontClass(name.length, compact);
  const categoryFontClass = category ? getCategoryFontClass(category.length, compact) : "";

  return (
    <div
      className={`relative aspect-[3/1] drop-shadow-[0_4px_10px_rgba(0,0,0,0.65)] hover:drop-shadow-[0_8px_18px_rgba(0,0,0,0.85)] hover:-translate-y-1 transition-all duration-200 cursor-default select-none group ${
        compact
          ? "w-full max-w-[245px] sm:max-w-[275px]"
          : "w-[215px] sm:w-[250px] md:w-[280px] shrink-0"
      }`}
      title={`${name} • ${category || level}`}
    >
      {/* 1. Authentic Deckled Paper Background (Image 1 - Increased Length, Slim Breadth) */}
      <Image
        src="/images/skill-card-paper.png"
        alt=""
        fill
        sizes={compact ? "280px" : "300px"}
        className="object-fill pointer-events-none select-none filter contrast-105"
      />

      {/* 2. Overlaid Card Content inside Deckled Margin */}
      <div
        className={`absolute inset-0 flex flex-col justify-between ${
          compact ? "p-1.5 sm:p-2" : "p-2 sm:p-2.5"
        }`}
      >
        {/* 4 Crisp High-Visibility Vector Corner Brackets in Solid Ink */}
        {/* Top-Left Corner */}
        <svg
          className={`absolute pointer-events-none text-zinc-950/90 select-none ${
            compact ? "top-2 left-2.5 w-2.5 h-2.5" : "top-2.5 left-3 w-3 h-3"
          }`}
          viewBox="0 0 10 10"
          fill="none"
        >
          <path d="M1 9V1H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Top-Right Corner */}
        <svg
          className={`absolute pointer-events-none text-zinc-950/90 select-none ${
            compact ? "top-2 right-2.5 w-2.5 h-2.5" : "top-2.5 right-3 w-3 h-3"
          }`}
          viewBox="0 0 10 10"
          fill="none"
        >
          <path d="M1 1H9V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Bottom-Left Corner */}
        <svg
          className={`absolute pointer-events-none text-zinc-950/90 select-none ${
            compact ? "bottom-2 left-2.5 w-2.5 h-2.5" : "bottom-2.5 left-3 w-3 h-3"
          }`}
          viewBox="0 0 10 10"
          fill="none"
        >
          <path d="M1 1V9H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Bottom-Right Corner */}
        <svg
          className={`absolute pointer-events-none text-zinc-950/90 select-none ${
            compact ? "bottom-2 right-2.5 w-2.5 h-2.5" : "bottom-2.5 right-3 w-3 h-3"
          }`}
          viewBox="0 0 10 10"
          fill="none"
        >
          <path d="M1 9H9V1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Card Body: Tech Logo + Titles (Vertically centered and filling horizontal length) */}
        <div className="flex-1 flex items-center gap-2 sm:gap-2.5 pl-2.5 sm:pl-3 pr-2 pt-0.5 min-w-0">
          <div
            className={`rounded flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform ${
              compact ? "w-6 h-6 sm:w-6.5 sm:h-6.5" : "w-6.5 h-6.5 sm:w-7 sm:h-7"
            }`}
          >
            <TechIcon
              name={name}
              className={`filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)] ${
                compact ? "w-5 h-5 sm:w-5.5 sm:h-5.5" : "w-5.5 h-5.5 sm:w-6 sm:h-6"
              }`}
            />
          </div>

          <div className="min-w-0 pr-1 flex-1">
            <h3
              className={`font-typewriter font-bold text-zinc-950 tracking-tight leading-tight [text-wrap:balance] break-normal ${nameFontClass}`}
            >
              {name}
            </h3>
            {category && (
              <span
                className={`font-mono text-zinc-800 font-semibold tracking-normal [text-wrap:balance] block mt-0.5 leading-tight ${categoryFontClass}`}
              >
                {category}
              </span>
            )}
          </div>
        </div>

        {/* Bottom Signal Meter (Offset from bottom-right bracket to prevent overlap) */}
        <div
          className={`flex items-center justify-end gap-0.5 sm:gap-1 ${
            compact ? "pr-6 pb-1" : "pr-7 pb-1.5"
          }`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`-skew-x-12 rounded-xs ${
                compact ? "w-2 sm:w-2.5 h-1" : "w-2.5 sm:w-3 h-1"
              } ${i < filledBars ? "bg-zinc-900" : "bg-zinc-500/30"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
