"use client";

import React from "react";

export default function Filmstrip() {
  // Generate sprocket holes
  const holes = Array.from({ length: 16 });

  return (
    <div
      aria-hidden="true"
      className="hidden lg:flex flex-col items-center justify-between w-8 h-[520px] bg-[#0c0c0e]/90 border-y border-zinc-800 rounded-sm shadow-2xl py-3 px-1 select-none opacity-85 hover:opacity-100 transition-opacity"
    >
      {holes.map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div className="filmstrip-sprocket" />
          {i % 4 === 1 && (
            <span className="text-[7px] font-mono text-zinc-600 rotate-90 my-1 tracking-tighter">
              {i * 2 + 10}A
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

