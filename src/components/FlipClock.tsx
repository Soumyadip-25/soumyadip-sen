"use client";

import React, { useEffect, useState } from "react";
import styles from "./FlipClock.module.css";

interface ClockData {
  digits: string;
  period: string;
  weekday: string;
  month: string;
  day: string;
  year: string;
}

function getLiveClock(targetDate?: Date): ClockData {
  const d = targetDate || new Date();

  // Dynamically resolve client's local timezone, fallback to Asia/Kolkata
  let tz = "Asia/Kolkata";
  try {
    if (typeof Intl !== "undefined" && Intl.DateTimeFormat) {
      tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata";
    }
  } catch {
    tz = "Asia/Kolkata";
  }

  // Format accurate 12-hour time and full date parts
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const parts = formatter.formatToParts(d);
  const partMap: Record<string, string> = {};
  for (const p of parts) {
    partMap[p.type] = p.value;
  }

  const rawHour = Number(partMap.hour || 12);
  const hourStr = String(rawHour).padStart(2, "0");
  const minuteStr = String(partMap.minute || "00").padStart(2, "0");
  const period = (partMap.dayPeriod || (d.getHours() >= 12 ? "PM" : "AM")).toUpperCase();

  return {
    digits: `${hourStr}${minuteStr}`,
    period: period.includes("P") ? "PM" : "AM",
    weekday: partMap.weekday || "Tue",
    month: partMap.month || "Nov",
    day: partMap.day || String(d.getDate()).padStart(2, "0"),
    year: partMap.year || String(d.getFullYear()),
  };
}

function FlipDigit({ value, pos }: { value: string; pos: number }) {
  return (
    <div className={styles.digit}>
      <div className={styles.digitTop}>
        <span key={`top-${pos}-${value}`}>{value}</span>
      </div>
      <div className={styles.digitBottom}>
        <span key={`bot-${pos}-${value}`} className={styles.digitValue}>
          {value}
        </span>
      </div>
      <div className={styles.splitLine} />
      <div className={styles.digitShine} />
    </div>
  );
}

export default function FlipClock() {
  const [clock, setClock] = useState<ClockData>(() => getLiveClock());

  useEffect(() => {
    // Immediate sync on client mount
    const update = () => setClock(getLiveClock());
    update();

    // 1-second accurate tick interval
    const timer = window.setInterval(update, 1000);

    // Immediate re-synchronization when tab wakes up or regains focus
    const handleSync = () => {
      if (document.visibilityState === "visible") {
        update();
      }
    };

    window.addEventListener("focus", handleSync);
    document.addEventListener("visibilitychange", handleSync);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", handleSync);
      document.removeEventListener("visibilitychange", handleSync);
    };
  }, []);

  return (
    <div
      className={styles.clockScene}
      aria-label="Vintage Flip Clock"
      data-cursor="interactive"
      data-cursor-label="VINTAGE CLOCK // LIVE"
    >
      <div className={styles.clock}>
        {/* Top metal details */}
        <div className={styles.topControls}>
          <div className={styles.topKnob} />
          <div className={styles.topSlot} />
          <div className={styles.topDial} />
        </div>

        {/* Main clock display */}
        <div className={styles.displayFrame}>
          <div className={styles.display}>
            <div className={styles.timeDigits}>
              {clock.digits.split("").map((digit, index) => (
                <FlipDigit key={index} value={digit} pos={index} />
              ))}
            </div>

            <div className={styles.period}>
              {clock.period}
            </div>
          </div>

          <div className={styles.dateDisplay}>
            <div className={styles.calendarIcon}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M7 3v4M17 3v4M3 10h18M7 14h2m3 0h2m3 0h1M7 17h2m3 0h2" />
              </svg>
            </div>

            <span className={styles.weekday}>
              {clock.weekday}
            </span>
            <span className={styles.dateDivider}>|</span>
            <span>
              {clock.month} {clock.day}, {clock.year}
            </span>
          </div>
        </div>

        {/* Metal casing details */}
        <div className={`${styles.screw} ${styles.screwTL}`} />
        <div className={`${styles.screw} ${styles.screwTR}`} />
        <div className={`${styles.screw} ${styles.screwBL}`} />
        <div className={`${styles.screw} ${styles.screwBR}`} />

        <div className={styles.leftKnob} />
        <div className={styles.rightCable} />
        <div className={styles.bottomFeet}>
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

