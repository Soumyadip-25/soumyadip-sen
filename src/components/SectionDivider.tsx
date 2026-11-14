"use client";

import React from "react";
import Image from "next/image";

interface SectionDividerProps {
  className?: string;
}

/**
 * Mobile/Tablet Section Divider (< md)
 * Spans seamlessly edge-to-edge from the left to right of the viewport
 * with 100% responsive proportional scaling and zero distortion.
 * Strictly hidden on desktop views (md:hidden).
 */
export default function SectionDivider({ className = "" }: SectionDividerProps) {
  return (
    <div
      className={`md:hidden relative w-full pointer-events-none select-none z-20 overflow-hidden flex items-center justify-center -my-3 sm:-my-5 ${className}`}
      aria-hidden="true"
    >
      <div className="relative w-full aspect-[1024/341]">
        <Image
          src="/images/section-divider.png"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-contain object-center filter contrast-[1.12] brightness-[1.08]"
        />
      </div>
    </div>
  );
}
