"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * PlatformGlow: Full-screen interactive white spotlight glow.
 * Casts a smooth, atmospheric luminous white glow across the entire platform
 * following the user's cursor as they hover over any section, card, or element.
 */
export default function PlatformGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse / trackpad) and hover capability
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointerQuery.matches || reducedMotionQuery.matches) {
      return;
    }

    setIsFinePointer(true);

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId: number | null = null;
    let isMoving = false;

    // Smooth lerp update loop for silky 120fps fluid spotlight motion
    const updateGlow = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      // Lerp with 0.18 damping for organic, butter-smooth following
      currentX += dx * 0.18;
      currentY += dy * 0.18;

      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(650px circle at ${currentX.toFixed(1)}px ${currentY.toFixed(1)}px, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 22%, rgba(255, 255, 255, 0.025) 45%, rgba(255, 255, 255, 0.005) 65%, transparent 80%)`;
      }

      // Keep updating while moving or settling
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        rafId = requestAnimationFrame(updateGlow);
      } else {
        isMoving = false;
        rafId = null;
      }
    };

    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
      }

      if (!isMoving) {
        isMoving = true;
        rafId = requestAnimationFrame(updateGlow);
      }
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
    };

    const handlePointerEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);
    document.addEventListener("mouseenter", handlePointerEnter);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      document.removeEventListener("mouseenter", handlePointerEnter);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isVisible]);

  if (!isFinePointer) {
    return null;
  }

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-[35] overflow-hidden select-none mix-blend-screen transition-opacity duration-500 transform-gpu will-change-[background] ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
