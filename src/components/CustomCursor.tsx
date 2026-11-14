"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

type CursorMode = "default" | "project" | "image" | "interactive" | "hidden";

interface CustomCursorProps {
  /** Optional active section id to trigger mechanical focus-pull effect */
  activeSection?: string;
}

// 24 Radial calibration ticks around outer lens ring (radius 20px)
const CALIBRATION_TICKS = Array.from({ length: 24 }).map((_, i) => {
  const deg = i * 15;
  const isCardinal = deg % 90 === 0;
  const isMajor = deg % 45 === 0;
  return {
    deg,
    rInner: isCardinal ? 18.0 : isMajor ? 18.8 : 19.5,
    rOuter: isCardinal ? 23.0 : isMajor ? 22.0 : 21.4,
    strokeWidth: isCardinal ? 1.25 : isMajor ? 0.95 : 0.75,
    opacity: isCardinal ? 0.95 : isMajor ? 0.65 : 0.4,
  };
});

// 6 Iris diaphragm mechanical aperture blades
const APERTURE_BLADES = [0, 1, 2, 3, 4, 5];

export default function CustomCursor({ activeSection }: CustomCursorProps) {
  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState<string>("");
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFocusPulling, setIsFocusPulling] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Exact pinpoint coordinates (0ms latency for mouse center)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth, high-precision mechanical tracking for the outer optical assembly
  const springConfig = { damping: 40, stiffness: 680, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const pathname = usePathname();
  const prevPathnameRef = useRef<string | null>(pathname);
  const prevSectionRef = useRef<string | undefined>(activeSection);

  // Short focus-pull effect when scrolling between sections or changing routes
  const triggerFocusPull = useCallback(() => {
    requestAnimationFrame(() => {
      setIsFocusPulling(true);
      setTimeout(() => setIsFocusPulling(false), 360);
    });
  }, []);

  // Trigger focus pull on route transitions
  useEffect(() => {
    if (prevPathnameRef.current !== null && prevPathnameRef.current !== pathname) {
      triggerFocusPull();
      setMode("default");
      setLabel("");
    }
    prevPathnameRef.current = pathname;
  }, [pathname, triggerFocusPull]);

  // Listen to custom sectionchange event across pages
  useEffect(() => {
    const handleSectionChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ section: string }>;
      if (customEvent.detail?.section) {
        triggerFocusPull();
      }
    };
    window.addEventListener("sectionchange", handleSectionChange);
    return () => window.removeEventListener("sectionchange", handleSectionChange);
  }, [triggerFocusPull]);

  useEffect(() => {
    if (prevSectionRef.current && activeSection && prevSectionRef.current !== activeSection) {
      triggerFocusPull();
    }
    prevSectionRef.current = activeSection;
  }, [activeSection, triggerFocusPull]);

  useEffect(() => {
    // Check if device has fine pointer (mouse/trackpad) and not a touch device
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointerQuery.matches) {
      setIsTouchDevice(true);
      return;
    }

    setIsTouchDevice(false);
    setPrefersReducedMotion(reducedMotionQuery.matches);
    document.body.classList.add("has-custom-cursor");

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Preserve native cursor for text editing & typing
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        setMode("hidden");
        return;
      }

      // 0. EXPLICIT CUSTOM CURSOR LABEL (highest priority: profile, signature, headings, cards, badges)
      const labeledTarget = target.closest("[data-cursor-label]") as HTMLElement | null;
      if (labeledTarget) {
        const customLabel = labeledTarget.getAttribute("data-cursor-label");
        if (customLabel) {
          const customMode = (labeledTarget.getAttribute("data-cursor") as CursorMode) || "interactive";
          setMode(customMode);
          setLabel(customLabel);
          return;
        }
      }

      // 1. PROJECT HOVER: triggers wide aperture expansion and displays "INSPECT"
      const projectTarget = target.closest(
        "[data-cursor='project'], #projects .group"
      ) as HTMLElement | null;
      if (projectTarget) {
        const insideLink = target.closest("a, button") as HTMLElement | null;
        if (insideLink && insideLink !== projectTarget) {
          const customLabel = insideLink.getAttribute("data-cursor-label");
          setMode("interactive");
          setLabel(customLabel || "VISIT ↗");
          return;
        }

        setMode("project");
        setLabel("INSPECT");
        return;
      }

      // 2. IMAGE / POLAROID HOVER: brackets frame the image and display custom label or "FOCUS"
      const imageTarget = target.closest(
        "img, [data-cursor='image'], .polaroid-container"
      ) as HTMLElement | null;
      if (imageTarget) {
        const imgLabel = imageTarget.getAttribute("data-cursor-label");
        setMode("image");
        setLabel(imgLabel || "FOCUS");
        return;
      }

      // 3. HEADING HOVER: contextual information about the section/title
      const headingTarget = target.closest("h1, h2, h3, [role='heading']") as HTMLElement | null;
      if (headingTarget) {
        const text = headingTarget.textContent?.trim().replace(/\s+/g, " ");
        if (text && text.length > 0 && text.length <= 40) {
          setMode("interactive");
          setLabel(text.toUpperCase());
          return;
        }
      }

      // 4. INTERACTIVE BUTTONS / LINKS: subtle contextual interaction state
      const interactiveTarget = target.closest(
        "a, button, [role='button'], .resume-button, [data-cursor='interactive']"
      ) as HTMLElement | null;
      if (interactiveTarget) {
        setMode("interactive");
        const customLabel = interactiveTarget.getAttribute("data-cursor-label");
        if (customLabel) {
          setLabel(customLabel);
        } else {
          const href = interactiveTarget.getAttribute("href");
          const download = interactiveTarget.getAttribute("download");
          const text = interactiveTarget.textContent?.trim().toLowerCase() || "";

          if (download || href?.endsWith(".pdf") || text.includes("download") || text.includes("resume")) {
            setLabel("DOWNLOAD");
          } else if (href?.startsWith("mailto:") || text.includes("contact") || text.includes("email")) {
            setLabel("CONTACT");
          } else if (href?.startsWith("http") && !href.includes(window.location.host)) {
            setLabel("VISIT ↗");
          } else if (text.includes("view") || text.includes("preview")) {
            setLabel("VIEW");
          } else {
            setLabel("VISIT");
          }
        }
        return;
      }

      // 5. DEFAULT: compact viewfinder with subtle calibration-ring rotation
      setMode("default");
      setLabel("");
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  // Animation values based on current interaction state
  const isImageMode = mode === "image";
  const isProjectMode = mode === "project";
  const isInteractionMode = mode === "interactive";

  // Aperture iris opening scale (contract on click, expand on project inspect)
  const apertureScale = isClicked ? 0.35 : isProjectMode ? 1.45 : isImageMode ? 1.15 : 1.0;
  
  // Corner brackets scale (frame tightly on image, expand slightly on interactive)
  const bracketsScale = isClicked ? 0.82 : isImageMode ? 0.88 : isInteractionMode ? 1.18 : 1.0;

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden select-none">
      
      {/* Precision Mechanical Optical Assembly - Spring Follower */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute top-0 left-0 pointer-events-none transform-gpu will-change-transform"
      >
        <motion.div
          animate={
            mode === "hidden"
              ? { opacity: 0, scale: 0.6 }
              : isClicked
              ? { scale: 0.82 }
              : isFocusPulling
              ? { scale: [1, 1.12, 1] }
              : { opacity: 1, scale: 1 }
          }
          transition={{
            duration: isClicked ? 0.08 : 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative flex items-center justify-center"
        >
          {/* Main SVG Geometry: Dual-layer lens rings, corner brackets, aperture blades */}
          <svg
            width="42"
            height="42"
            viewBox="-29 -29 58 58"
            className="overflow-visible"
            style={{
              filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 1px rgba(0, 0, 0, 0.85))",
            }}
          >
            {/* LAYER 1: OUTER CALIBRATION RING ASSEMBLY (Rotates subtly in default state) */}
            <motion.g
              animate={
                prefersReducedMotion
                  ? undefined
                  : isFocusPulling
                  ? { rotate: [0, 45, 0] }
                  : isImageMode
                  ? { rotate: 30 }
                  : { rotate: 360 }
              }
              transition={
                mode === "default" && !isFocusPulling && !prefersReducedMotion
                  ? { repeat: Infinity, duration: 45, ease: "linear" }
                  : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
              }
            >
              {/* Outer circular lens ring */}
              <circle
                cx="0"
                cy="0"
                r="20.5"
                fill="none"
                stroke="#eee8dd"
                strokeWidth="0.9"
                strokeOpacity={isInteractionMode || isProjectMode ? 0.75 : 0.45}
              />

              {/* 24 Radial Precision Calibration Ticks */}
              {CALIBRATION_TICKS.map(({ deg, rInner, rOuter, strokeWidth, opacity }) => {
                const rad = (deg * Math.PI) / 180;
                const cos = Math.cos(rad);
                const sin = Math.sin(rad);
                return (
                  <line
                    key={deg}
                    x1={rInner * cos}
                    y1={rInner * sin}
                    x2={rOuter * cos}
                    y2={rOuter * sin}
                    stroke="#eee8dd"
                    strokeWidth={strokeWidth}
                    strokeOpacity={opacity}
                    strokeLinecap="round"
                  />
                );
              })}

              {/* Subtle 35MM & F/1.4 Engravings around the barrel */}
              <text
                x="0"
                y="-23"
                textAnchor="middle"
                fontSize="4.2"
                fontFamily="var(--font-mono)"
                fill="#eee8dd"
                fillOpacity="0.75"
                letterSpacing="0.8"
                className="select-none font-bold"
              >
                35MM
              </text>
              <text
                x="0"
                y="26"
                textAnchor="middle"
                fontSize="3.6"
                fontFamily="var(--font-mono)"
                fill="#eee8dd"
                fillOpacity="0.55"
                letterSpacing="0.6"
                className="select-none font-medium"
              >
                F/1.4
              </text>
            </motion.g>

            {/* LAYER 2: INNER OPTICAL LENS RING */}
            <circle
              cx="0"
              cy="0"
              r="14"
              fill="none"
              stroke="#eee8dd"
              strokeWidth="0.85"
              strokeOpacity={isProjectMode ? 0.8 : 0.55}
              strokeDasharray={isProjectMode ? "none" : "2.5 2"}
              className="transition-all duration-300"
            />

            {/* LAYER 3: FOUR PRECISELY DESIGNED IVORY CORNER BRACKETS */}
            <motion.g
              animate={{ scale: bracketsScale }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              stroke="#f0ece1"
              strokeWidth="1.4"
              strokeLinecap="square"
              fill="none"
            >
              {/* Top-Left Bracket */}
              <path d="M -21, -15 L -21, -21 L -15, -21" />
              {/* Top-Right Bracket */}
              <path d="M 15, -21 L 21, -21 L 21, -15" />
              {/* Bottom-Right Bracket */}
              <path d="M 21, 15 L 21, 21 L 15, 21" />
              {/* Bottom-Left Bracket */}
              <path d="M -15, 21 L -21, 21 L -21, 15" />
            </motion.g>

            {/* LAYER 4: GEOMETRIC APERTURE SHUTTER BLADES (Center Iris Mechanism) */}
            <motion.g
              animate={{
                scale: apertureScale,
                rotate: isClicked ? -20 : isProjectMode ? 25 : 0,
              }}
              transition={{
                duration: isClicked ? 0.08 : 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Hexagonal Aperture Iris Opening */}
              <polygon
                points="-3.5,-2 0,-4 3.5,-2 3.5,2 0,4 -3.5,2"
                fill="none"
                stroke="#eee8dd"
                strokeWidth="0.85"
                strokeOpacity={isClicked ? 0.95 : 0.75}
              />

              {/* 6 Overlapping Diaphragm Blade Edges extending to inner ring */}
              {APERTURE_BLADES.map((i) => {
                const rad = (i * 60 * Math.PI) / 180;
                const cos = Math.cos(rad);
                const sin = Math.sin(rad);
                const endRad = rad + 0.75;
                return (
                  <line
                    key={i}
                    x1={3.5 * cos}
                    y1={3.5 * sin}
                    x2={14 * Math.cos(endRad)}
                    y2={14 * Math.sin(endRad)}
                    stroke="#eee8dd"
                    strokeWidth="0.75"
                    strokeOpacity={isClicked ? 0.9 : 0.5}
                  />
                );
              })}
            </motion.g>

            {/* LAYER 5: FINE CENTRAL FOCUSING RETICLE */}
            <g stroke="#f0ece1" strokeWidth="0.9" strokeLinecap="round">
              {/* Rangefinder Split-Image Horizontal Alignment Line */}
              <line
                x1="-4"
                y1="0"
                x2="4"
                y2="0"
                strokeOpacity={isImageMode ? 0.95 : 0.65}
              />
              {/* Micro Vertical Cardinal Crosshair Ticks */}
              <line x1="0" y1="-4" x2="0" y2="-2" strokeOpacity="0.7" />
              <line x1="0" y1="2" x2="0" y2="4" strokeOpacity="0.7" />
            </g>
          </svg>

          {/* Contextual Analogue Badge (INSPECT, FOCUS, VISIT, DOWNLOAD) */}
          <AnimatePresence>
            {label && mode !== "default" && mode !== "hidden" && (
              <motion.div
                initial={{ opacity: 0, x: -5, y: -2, scale: 0.88 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -3, scale: 0.85 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="absolute left-[26px] top-[-14px] whitespace-nowrap pointer-events-none"
              >
                <div className="flex items-center gap-2 px-2.5 py-1 bg-[#141416]/95 text-[#f4efe4] border border-white/20 rounded-[3px] shadow-[0_4px_14px_rgba(0,0,0,0.9)] backdrop-blur-md max-w-[340px]">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse inline-block shrink-0 shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                  <span className="font-mono text-[10px] font-bold tracking-widest uppercase truncate leading-none">
                    {label}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Pinpoint Micro Focus Point (0ms Instantaneous Cursor Tip) */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute top-0 left-0 pointer-events-none flex items-center justify-center"
      >
        <div
          className="w-1.5 h-1.5 rounded-full bg-[#f0ece1] transition-transform duration-100"
          style={{
            boxShadow: "0 0 2px 1px rgba(0, 0, 0, 0.95)",
            transform: isClicked ? "scale(1.5)" : isProjectMode ? "scale(1.3)" : "scale(1)",
          }}
        />
      </motion.div>

    </div>
  );
}
