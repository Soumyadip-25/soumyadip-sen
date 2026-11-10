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

  // Unified, calibrated font sizing across all pages: no giant text, no tiny text
  const getNameFontClass = (len: number) => {
    if (len >= 22) return "text-[11.5px] sm:text-[12px] leading-tight";
    if (len >= 16) return "text-[12.5px] sm:text-[13px] leading-tight";
    return "text-[13px] sm:text-[14px] leading-tight";
  };

  const getCategoryFontClass = (len: number) => {
    if (len >= 18) return "text-[8.5px] sm:text-[9px] leading-tight";
    return "text-[9.5px] sm:text-[10px] leading-tight";
  };

  const nameFontClass = getNameFontClass(name.length);
  const categoryFontClass = category ? getCategoryFontClass(category.length) : "";

  return (
    <div
      className="relative aspect-[3.1/1] w-full max-w-[225px] sm:max-w-[235px] drop-shadow-[0_4px_10px_rgba(0,0,0,0.65)] hover:drop-shadow-[0_8px_18px_rgba(0,0,0,0.85)] hover:-translate-y-1 transition-all duration-200 cursor-default select-none group"
      title={`${name} • ${category || level}`}
      data-cursor="interactive"
      data-cursor-label={`${name.toUpperCase()} // ${level.toUpperCase()}`}
    >
      {/* 1. Authentic Deckled Paper Background */}
      <Image
        src="/images/skill-card-paper.png"
        alt=""
        fill
        sizes="240px"
        className="object-fill pointer-events-none select-none filter contrast-105"
      />

      {/* 2. Overlaid Card Content inside Deckled Margin */}
      <div className="absolute inset-0 flex flex-col justify-between p-1.5 sm:p-2">
        {/* 4 Crisp High-Visibility Vector Corner Brackets in Solid Ink */}
        {/* Top-Left Corner */}
        <svg
          className="absolute pointer-events-none text-zinc-950/90 select-none top-2 left-2.5 w-2.5 h-2.5"
          viewBox="0 0 10 10"
          fill="none"
        >
          <path d="M1 9V1H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Top-Right Corner */}
        <svg
          className="absolute pointer-events-none text-zinc-950/90 select-none top-2 right-2.5 w-2.5 h-2.5"
          viewBox="0 0 10 10"
          fill="none"
        >
          <path d="M1 1H9V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Bottom-Left Corner */}
        <svg
          className="absolute pointer-events-none text-zinc-950/90 select-none bottom-2 left-2.5 w-2.5 h-2.5"
          viewBox="0 0 10 10"
          fill="none"
        >
          <path d="M1 1V9H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Bottom-Right Corner */}
        <svg
          className="absolute pointer-events-none text-zinc-950/90 select-none bottom-2 right-2.5 w-2.5 h-2.5"
          viewBox="0 0 10 10"
          fill="none"
        >
          <path d="M1 9H9V1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Card Body: Tech Logo + Titles (Spacious width, zero overflow) */}
        <div className="flex-1 flex items-center gap-2 sm:gap-2.5 pl-2.5 sm:pl-3 pr-2 pt-0.5 min-w-0">
          <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <TechIcon
              name={name}
              className="w-5 h-5 sm:w-5.5 sm:h-5.5 filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]"
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
        <div className="flex items-center justify-end gap-0.5 sm:gap-1 pr-5 pb-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`-skew-x-12 rounded-xs w-2 sm:w-2.5 h-1 ${
                i < filledBars ? "bg-zinc-900" : "bg-zinc-500/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
