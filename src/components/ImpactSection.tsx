"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  initialContributionsData,
  type ContributionsPayload,
  type ContributionDay,
} from "@/data/github-contributions";

export default function ImpactSection() {
  const [data, setData] = useState<ContributionsPayload>(initialContributionsData);
  const selectedYear = "2026";
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    level: number;
    x: number;
    y: number;
  } | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.25, once: true });
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (inView) {
      setHasTriggered(true);
    }
  }, [inView]);

  // Also immediately trigger if navigated via sidebar click
  useEffect(() => {
    const handleSectionChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ section: string }>;
      if (customEvent.detail?.section === "impact") {
        setHasTriggered(true);
      }
    };
    window.addEventListener("sectionchange", handleSectionChange);
    return () => window.removeEventListener("sectionchange", handleSectionChange);
  }, []);

  const isVisible = inView || hasTriggered;

  // Real-time synchronization with latest GitHub pushes and commits
  const fetchLiveActivity = useCallback(async () => {
    try {
      const res = await fetch(`/api/github-activity?t=${Date.now()}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const liveData = await res.json();
        if (liveData && liveData.contributions) {
          setData(liveData as ContributionsPayload);
          return;
        }
      }
      throw new Error("Local API fallback");
    } catch {
      try {
        const extRes = await fetch(
          `https://github-contributions-api.jogruber.de/v4/Soumyadip-25?t=${Date.now()}`,
          { cache: "no-store" }
        );
        if (extRes.ok) {
          const extData = await extRes.json();
          if (extData && extData.contributions) {
            setData(extData as ContributionsPayload);
          }
        }
      } catch {
        // Fallback data remains seamlessly active
      }
    }
  }, []);

  useEffect(() => {
    fetchLiveActivity();
    const interval = setInterval(fetchLiveActivity, 60000);

    const handleFocus = () => fetchLiveActivity();
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") fetchLiveActivity();
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchLiveActivity]);

  // Filter contributions for the selected year (e.g. 2026: Jan 1 to Dec 31)
  const filteredContributions = useMemo(() => {
    const listMap = new Map<string, ContributionDay>();
    if (data?.contributions) {
      data.contributions.forEach((d) => {
        if (d.date.startsWith(selectedYear)) {
          listMap.set(d.date, d);
        }
      });
    }

    // Build full 365-day calendar from Jan 1 to Dec 31 for the selected year
    const yr = parseInt(selectedYear, 10) || 2026;
    const startDate = new Date(yr, 0, 1);
    const endDate = new Date(yr, 11, 31);
    const fullYearList: ContributionDay[] = [];
    const cur = new Date(startDate);

    while (cur <= endDate) {
      const y = cur.getFullYear();
      const m = String(cur.getMonth() + 1).padStart(2, "0");
      const d = String(cur.getDate()).padStart(2, "0");
      const dateStr = `${y}-${m}-${d}`;
      fullYearList.push(
        listMap.get(dateStr) || { date: dateStr, count: 0, level: 0 }
      );
      cur.setDate(cur.getDate() + 1);
    }

    return fullYearList;
  }, [data, selectedYear]);

  // Build full calendar year matrix: 53 columns (weeks) x 7 rows (days)
  // Guarantees all 12 calendar months (Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec)
  const { weeks, monthMap, totalContributions } = useMemo(() => {
    const list = filteredContributions;

    let total = 0;
    list.forEach((d) => {
      total += d.count;
    });

    if (list.length === 0) {
      return { weeks: [], monthMap: new Map<number, string>(), totalContributions: 0 };
    }

    const firstDate = new Date(list[0].date + "T00:00:00");
    const firstDayOfWeek = firstDate.getDay(); // 0 is Sunday

    const columns: (ContributionDay | null)[][] = [];
    let currentColumn: (ContributionDay | null)[] = [];

    // Pad beginning of first week so day alignment is exact
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentColumn.push(null);
    }

    const map = new Map<number, string>();
    let prevMonth = -1;

    list.forEach((day) => {
      const d = new Date(day.date + "T00:00:00");
      const m = d.getMonth();

      if (m !== prevMonth) {
        map.set(columns.length, d.toLocaleString("en-US", { month: "short" }));
        prevMonth = m;
      }

      currentColumn.push(day);

      if (currentColumn.length === 7) {
        columns.push(currentColumn);
        currentColumn = [];
      }
    });

    if (currentColumn.length > 0) {
      while (currentColumn.length < 7) {
        currentColumn.push(null);
      }
      columns.push(currentColumn);
    }

    return {
      weeks: columns,
      monthMap: map,
      totalContributions: total,
    };
  }, [filteredContributions]);

  // Exact color matching from the reference image:
  // Level 0: dark charcoal #161b22
  // Level 1: deep forest green #0e4429
  // Level 2: emerald green #006d32
  // Level 3: vibrant green #26a641
  // Level 4: bright neon green #39d353
  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-[#0e4429] border-[#166534]";
      case 2:
        return "bg-[#006d32] border-[#15803d]";
      case 3:
        return "bg-[#26a641] border-[#22c55e]";
      case 4:
        return "bg-[#39d353] border-[#4ade80]";
      case 0:
      default:
        return "bg-[#161b22] border-[#21262d]";
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr + "T00:00:00");
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="relative h-screen max-h-screen w-full flex items-center justify-center overflow-hidden bg-[#121214] vintage-charcoal-bg select-none scroll-mt-0"
    >
      {/* 1. Blackboard Desk Canvas Stage: Full-bleed, edge-to-edge with sidebar offset on desktop */}
      <div className="absolute inset-0 z-0 overflow-hidden md:left-52 lg:left-56">
        {/* Vintage 35mm Chalkboard Background Image (Desktop Only) */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src="/images/impact-bg-v3.jpg"
            alt="GitHub Activity Blackboard Background"
            fill
            priority
            sizes="(max-width: 768px) 100vw, calc(100vw - 224px)"
            className="object-cover md:object-fill object-center filter brightness-[1.0] contrast-[1.04] pointer-events-none select-none"
          />
        </div>

        {/* 2. Chalkboard Content Zone: Strictly locked to desktop blackboard coordinates, responsively fitted on mobile */}
        <div
          className="absolute z-10 flex flex-col justify-center items-center pointer-events-none inset-x-3 sm:inset-x-6 top-[12%] h-[78%] md:inset-x-auto md:left-[17.0%] md:w-[54.5%] md:top-[11.0%] md:h-[76.0%]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.985 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.95, ease: [0.19, 1, 0.22, 1] }}
            className="w-full flex flex-col gap-2.5 sm:gap-3.5 md:gap-4 select-none pointer-events-auto transform-gpu"
          >
            {/* Header Row: GITHUB ACTIVITY + Vintage Chalkboard Live Telemetry Badge */}
            <div className="w-full flex items-center justify-between pb-1.5 sm:pb-2.5 border-b border-white/10 gap-2">
              <motion.a
                href="https://github.com/Soumyadip-25"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="interactive"
                data-cursor-label="GITHUB PROFILE ↗"
                initial={{ opacity: 0, x: -32 }}
                animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -32 }}
                transition={{ duration: 0.95, delay: 0.05, ease: [0.19, 1, 0.22, 1] }}
                className="group/title inline-flex items-center gap-2 hover:opacity-90 transition-opacity min-w-0"
              >
                <h2 className="font-mono text-base sm:text-xl md:text-2xl lg:text-[27px] font-black tracking-[0.16em] sm:tracking-[0.26em] text-zinc-100 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] group-hover/title:text-white transition-colors truncate">
                  GITHUB ACTIVITY
                </h2>
              </motion.a>

              {/* Vintage Matte Chalkboard Live Telemetry Stamp (Zero Glow, Pure Chalkboard Vibe) */}
              <motion.div
                data-cursor="interactive"
                data-cursor-label="STATUS // LIVE 2026"
                initial={{ opacity: 0, x: 30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.95, delay: 0.12, ease: [0.19, 1, 0.22, 1] }}
                className="flex items-center shrink-0"
              >
                <div className="font-mono text-[9px] sm:text-[11px] px-2.5 sm:px-3 py-1 rounded border border-white/25 hover:border-white/45 bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white font-bold tracking-[0.18em] flex items-center gap-1.5 sm:gap-2 transition-all duration-200 select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 shrink-0" />
                  <span className="uppercase whitespace-nowrap">
                    LIVE // 2026
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Heatmap Matrix: Expanded 53-Column CSS Grid that properly fills the chalkboard space without touching the lamp */}
            <div className="w-full py-0.5 select-none overflow-x-auto vintage-scrollbar pb-1 md:overflow-x-visible md:pb-0">
              <div className="min-w-[560px] md:min-w-0 w-full">
                {/* Month Labels Header Row (1:1 column aligned with 53 weeks) */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.75, delay: 0.18, ease: [0.19, 1, 0.22, 1] }}
                  className="grid grid-cols-[repeat(53,minmax(0,1fr))] gap-[1.2px] sm:gap-[1.8px] md:gap-[2px] w-full mb-1 sm:mb-1.5 h-4.5 sm:h-5"
                >
                  {weeks.map((_, wIdx) => {
                    const label = monthMap.get(wIdx);
                    return (
                      <div
                        key={`month-slot-${wIdx}`}
                        className="relative text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] font-mono font-bold text-zinc-300 pointer-events-none"
                      >
                        {label && (
                          <span className="absolute left-0.5 sm:left-1 top-0 whitespace-nowrap">
                            {label}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </motion.div>

                {/* 53 Columns of 7 Squares Matrix - Telematic Harmonic Sweep */}
                <div className="grid grid-cols-[repeat(53,minmax(0,1fr))] gap-[1.2px] sm:gap-[1.8px] md:gap-[2px] w-full">
                  {weeks.map((week, wIdx) => (
                    <motion.div
                      key={`week-${wIdx}`}
                      initial={{ opacity: 0, scaleY: 0.35, y: 8 }}
                      animate={
                        isVisible
                          ? { opacity: 1, scaleY: 1, y: 0 }
                          : { opacity: 0, scaleY: 0.35, y: 8 }
                      }
                      transition={{
                        duration: 0.5,
                        delay: 0.22 + (wIdx / 53) * 0.58,
                        ease: [0.19, 1, 0.22, 1],
                      }}
                      style={{ transformOrigin: "bottom" }}
                      className="flex flex-col gap-[1.2px] sm:gap-[1.8px] md:gap-[2px]"
                    >
                      {week.map((day, dIdx) => {
                        if (!day) {
                          return (
                            <div
                              key={`empty-${wIdx}-${dIdx}`}
                              className="w-full aspect-[1/1.06] rounded-[2px] sm:rounded-[2.5px] opacity-0"
                            />
                          );
                        }

                        return (
                          <div
                            key={day.date}
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              setHoveredDay({
                                date: day.date,
                                count: day.count,
                                level: day.level,
                                x: rect.left + rect.width / 2,
                                y: rect.top,
                              });
                            }}
                            onMouseLeave={() => setHoveredDay(null)}
                            className={`w-full aspect-[1/1.06] rounded-[2px] sm:rounded-[2.5px] border transition-all duration-150 hover:scale-135 hover:z-20 cursor-pointer ${
                              day.level > 0
                                ? "hover:shadow-[0_0_8px_rgba(57,211,83,0.7)]"
                                : "hover:shadow-[0_0_6px_rgba(255,255,255,0.4)]"
                            } ${getLevelColor(day.level)}`}
                          />
                        );
                      })}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Footer Row: "{total} contributions in {year}" + "Less [■■■■■] More" */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.85, delay: 0.82, ease: [0.19, 1, 0.22, 1] }}
              className="w-full flex items-center justify-between pt-2 sm:pt-2.5 md:pt-3 border-t border-white/10 text-xs sm:text-sm md:text-base font-sans text-zinc-200 flex-wrap gap-2"
            >
              <span className="font-medium text-zinc-200 tracking-normal text-[11px] sm:text-sm md:text-base">
                {totalContributions} contributions in {selectedYear}
              </span>

              {/* Legend */}
              <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 text-zinc-300">
                <span className="text-[9px] sm:text-xs md:text-[13px]">Less</span>
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3.5 md:h-3.5 rounded-[1.5px] bg-[#161b22] border border-[#21262d]" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3.5 md:h-3.5 rounded-[1.5px] bg-[#0e4429] border border-[#166534]" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3.5 md:h-3.5 rounded-[1.5px] bg-[#006d32] border border-[#15803d]" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3.5 md:h-3.5 rounded-[1.5px] bg-[#26a641] border border-[#22c55e]" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3.5 md:h-3.5 rounded-[1.5px] bg-[#39d353] border border-[#4ade80]" />
                <span className="text-[9px] sm:text-xs md:text-[13px]">More</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Tooltip when hovering any calendar square */}
      <AnimatePresence>
        {hoveredDay && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 2 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
            className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-full mb-2 px-3 py-1.5 rounded bg-black/95 text-white border border-white/20 shadow-xl font-mono text-xs whitespace-nowrap"
            style={{
              left: `${hoveredDay.x}px`,
              top: `${hoveredDay.y - 6}px`,
            }}
          >
            <div className="font-bold text-white">
              {hoveredDay.count === 0
                ? "No contributions"
                : `${hoveredDay.count} contribution${
                    hoveredDay.count === 1 ? "" : "s"
                  }`}
            </div>
            <div className="text-[10px] text-zinc-400">
              {formatDate(hoveredDay.date)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
