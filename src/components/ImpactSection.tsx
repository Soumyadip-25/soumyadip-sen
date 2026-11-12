"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  initialContributionsData,
  type ContributionsPayload,
  type ContributionDay,
} from "@/data/github-contributions";

export default function ImpactSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<ContributionsPayload>(initialContributionsData);
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    level: number;
    x: number;
    y: number;
  } | null>(null);

  // Compute uniform scale so 100% of the 1024x512 background image is fully visible with ZERO cropping
  const [stageBounds, setStageBounds] = useState({
    width: 1024,
    height: 512,
  });

  const updateLayout = useCallback(() => {
    if (!containerRef.current) return;
    const stageW = containerRef.current.clientWidth;
    const stageH = containerRef.current.clientHeight;
    if (stageW === 0 || stageH === 0) return;

    // 1024 x 512 is exact 2:1 ratio
    const scale = Math.min((stageW - 16) / 1024, (stageH - 16) / 512);
    const width = Math.max(Math.floor(1024 * scale), 320);
    const height = Math.max(Math.floor(512 * scale), 160);

    setStageBounds({ width, height });
  }, []);

  useEffect(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [updateLayout]);

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

  // Filter contributions for the selected year (e.g. 2026, 2025, 2024: Jan 1 to Dec 31)
  const filteredContributions = useMemo(() => {
    if (!data?.contributions) return [];
    return data.contributions
      .filter((d) => d.date.startsWith(selectedYear))
      .sort((a, b) => a.date.localeCompare(b.date));
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
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#070709] select-none md:pl-52 lg:pl-56"
    >
      {/* Container to measure available viewport area for uniform scale */}
      <div
        ref={containerRef}
        className="relative z-10 w-full h-full min-h-screen flex items-center justify-center p-2 sm:p-4 overflow-hidden"
      >
        {/* 2:1 Precision Stage: 100% of 1024x512 image is visible, ZERO cropping, ZERO cut off */}
        <div
          style={{
            width: `${stageBounds.width}px`,
            height: `${stageBounds.height}px`,
          }}
          className="relative shrink-0 select-none shadow-[0_0_50px_rgba(0,0,0,0.95)] rounded-lg overflow-hidden border border-white/5 my-auto"
        >
          {/* Complete 1024x512 Background Image (Leaves, Coffee Mug, Lamp, Books & Borders 100% INTACT) */}
          <Image
            src="/images/impact-bg-v2.jpg"
            alt="GitHub Activity Blackboard Stage"
            fill
            priority
            sizes="100vw"
            className="object-contain pointer-events-none select-none filter brightness-[0.98] contrast-[1.04]"
          />

          {/* Central Chalkboard Content Zone: Positioned between coffee mug on left and lamp on right */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              left: "17.0%",
              width: "57.5%",
              top: "9.0%",
              height: "76.0%",
            }}
            className="absolute z-20 flex flex-col justify-between overflow-hidden"
          >
            {/* Header Row: GITHUB ACTIVITY on Left, Year Tabs on Right */}
            <div className="w-full flex items-center justify-between pb-1 sm:pb-2 border-b border-white/10">
              <a
                href="https://github.com/Soumyadip-25"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="interactive"
                data-cursor-label="GITHUB PROFILE ↗"
                className="group/title inline-flex items-center gap-1.5 hover:opacity-85 transition-opacity"
              >
                <h2 className="font-mono text-xs sm:text-sm md:text-base lg:text-lg font-extrabold tracking-[0.22em] text-zinc-100 uppercase">
                  GITHUB ACTIVITY
                </h2>
              </a>

              {/* Year Tabs */}
              <div className="flex items-center gap-1 bg-white/5 p-0.5 sm:p-1 rounded border border-white/10">
                {(["2026", "2025", "2024"] as const).map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr)}
                    data-cursor="interactive"
                    data-cursor-label={`YEAR // ${yr}`}
                    className={`px-1.5 sm:px-2.5 py-0.5 rounded text-[10px] sm:text-xs font-mono font-bold transition-all cursor-pointer ${
                      selectedYear === yr
                        ? "bg-white text-black font-extrabold shadow-sm"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            </div>

            {/* Heatmap Matrix: Scrollable horizontally if viewport is narrow */}
            <div className="w-full overflow-x-auto py-1 sm:py-2 vintage-scrollbar">
              <div className="w-fit flex flex-col select-none mx-auto">
                {/* Month Labels Header Row (1:1 column aligned with 53 weeks, includes Nov & Dec) */}
                <div className="flex gap-[2px] sm:gap-[2.5px] md:gap-[3px] mb-1.5 h-3.5 select-none shrink-0">
                  {weeks.map((_, wIdx) => {
                    const label = monthMap.get(wIdx);
                    return (
                      <div
                        key={`month-slot-${wIdx}`}
                        className="w-[8.5px] sm:w-[10px] md:w-[11.5px] lg:w-[12.5px] shrink-0 text-[9px] sm:text-[10px] md:text-[11px] font-mono text-zinc-400 relative pointer-events-none"
                      >
                        {label && (
                          <span className="absolute left-0 top-0 whitespace-nowrap">
                            {label}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* 53 Columns of 7 Squares Matrix */}
                <div className="flex gap-[2px] sm:gap-[2.5px] md:gap-[3px] shrink-0">
                  {weeks.map((week, wIdx) => (
                    <div key={`week-${wIdx}`} className="flex flex-col gap-[2px] sm:gap-[2.5px] md:gap-[3px]">
                      {week.map((day, dIdx) => {
                        if (!day) {
                          return (
                            <div
                              key={`empty-${wIdx}-${dIdx}`}
                              className="w-[8.5px] h-[8.5px] sm:w-[10px] sm:h-[10px] md:w-[11.5px] md:h-[11.5px] lg:w-[12.5px] lg:h-[12.5px] rounded-[2px] opacity-0"
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
                            className={`w-[8.5px] h-[8.5px] sm:w-[10px] sm:h-[10px] md:w-[11.5px] md:h-[11.5px] lg:w-[12.5px] lg:h-[12.5px] rounded-[2px] sm:rounded-[2.5px] border transition-transform hover:scale-125 cursor-pointer ${getLevelColor(
                              day.level
                            )}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Footer Row: "{total} contributions in {year}" + "Less [■■■■■] More" */}
            <div className="w-full flex items-center justify-between pt-1 sm:pt-2 border-t border-white/10 text-[10px] sm:text-xs font-sans text-zinc-300">
              <span className="font-normal text-zinc-300 tracking-normal">
                {totalContributions} contributions in {selectedYear}
              </span>

              {/* Legend */}
              <div className="flex items-center gap-1 sm:gap-1.5 text-zinc-400">
                <span className="text-[10px]">Less</span>
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-[1.5px] bg-[#161b22] border border-[#21262d]" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-[1.5px] bg-[#0e4429] border border-[#166534]" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-[1.5px] bg-[#006d32] border border-[#15803d]" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-[1.5px] bg-[#26a641] border border-[#22c55e]" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-[1.5px] bg-[#39d353] border border-[#4ade80]" />
                <span className="text-[10px]">More</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Tooltip when hovering any calendar square */}
        {hoveredDay && (
          <div
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
          </div>
        )}
      </div>
    </section>
  );
}
