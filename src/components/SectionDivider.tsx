"use client";

import React from "react";
import Image from "next/image";

interface SectionDividerProps {
  className?: string;
}

/**
 * Mobile/Tablet Section Divider (< md)
 * Displays the vintage mountain ascent and horizontal divider illustration
 * to gracefully separate sections on all non-desktop devices.
 * Strictly hidden on desktop (md:hidden).
 */
export default function SectionDivider({ className = "" }: SectionDividerProps) {
  return (
    <div
      className={`md:hidden relative w-full flex items-center justify-center pointer-events-none select-none z-20 overflow-hidden py-1 sm:py-2 ${className}`}
      aria-hidden="true"
    >
      <div className="relative w-full max-w-[380px] sm:max-w-[460px] h-14 sm:h-16 px-4 flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src="/images/section-divider.png"
            alt=""
            fill
            sizes="(max-width: 640px) 380px, 460px"
            className="object-cover object-center filter contrast-[1.12] brightness-[1.08]"
          />
        </div>
      </div>
    </div>
  );
}
