"use client";

import React, { useEffect, useState } from "react";
import styles from "./FlipClock.module.css";

function getKolkataDate() {
  const now = new Date();

  const timeParts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) =>
    timeParts.find((part) => part.type === type)?.value ?? "00";

  const hour24 = Number(get("hour"));
  const hour12 = hour24 % 12 || 12;

  const dateParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).formatToParts(now);

  const dateGet = (type: string) =>
    dateParts.find((part) => part.type === type)?.value ?? "";

  return {
    digits: `${String(hour12).padStart(2, "0")}${get("minute")}`,
    period: hour24 >= 12 ? "PM" : "AM",
    weekday: dateGet("weekday"),
    month: dateGet("month"),
    day: dateGet("day"),
    year: dateGet("year"),
  };
}

function FlipDigit({ value }: { value: string }) {
  return (
    <div className={styles.digit}>
      <div className={styles.digitTop}>
        <span suppressHydrationWarning>{value}</span>
      </div>
      <div className={styles.digitBottom}>
        <span key={value} className={styles.digitValue} suppressHydrationWarning>
          {value}
        </span>
      </div>
      <div className={styles.splitLine} />
      <div className={styles.digitShine} />
    </div>
  );
}

export default function FlipClock() {
  const [clock, setClock] = useState(getKolkataDate);

  useEffect(() => {
    const update = () => setClock(getKolkataDate());

    update();
    const timer = window.setInterval(update, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className={styles.clockScene}
      aria-label="Kolkata Analog Flip Clock"
      data-cursor="interactive"
      data-cursor-label="VINTAGE CLOCK // 24H"
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
                <FlipDigit key={index} value={digit} />
              ))}
            </div>

            <div className={styles.period} suppressHydrationWarning>
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

            <span className={styles.weekday} suppressHydrationWarning>
              {clock.weekday}
            </span>
            <span className={styles.dateDivider}>|</span>
            <span suppressHydrationWarning>
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
      {/* Note: .clockCaption omitted per user specification */}
    </div>
  );
}

