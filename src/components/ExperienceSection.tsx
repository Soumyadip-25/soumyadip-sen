"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { GraduationCap, Code2, ChevronDown } from "lucide-react";

export interface ExperienceItem {
  id: string;
  role: string;
  period: string;
  description: string;
  iconType: "tutor" | "developer";
}

const experiences: ExperienceItem[] = [
  {
    id: "academic-tutor",
    role: "Academic Tutor",
    period: "2022– Present",
    description:
      "Providing personalized tutoring to CBSE students, focusing on simplifying concepts and building strong academic foundations through interactive learning.",
    iconType: "tutor",
  },
  {
    id: "software-developer",
    role: "Software Developer",
    period: "Ongoing",
    description:
      "Designing and developing software applications while exploring modern technologies, building practical solutions, and continuously expanding my expertise in full-stack development and artificial intelligence.",
    iconType: "developer",
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollMore, setCanScrollMore] = useState(false);

  // Monitor internal scroll position to update scroll hint
  const checkScrollStatus = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const hasMore = el.scrollHeight - el.scrollTop - el.clientHeight > 15;
    setCanScrollMore(hasMore);
  }, []);

  useEffect(() => {
    checkScrollStatus();
    const el = scrollContainerRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScrollStatus, { passive: true });
    window.addEventListener("resize", checkScrollStatus);

    return () => {
      el.removeEventListener("scroll", checkScrollStatus);
      window.removeEventListener("resize", checkScrollStatus);
    };
  }, [checkScrollStatus]);

  // Intelligent wheel listener: scrolls internal experiences first;
  // once the bottom/top is reached, naturally lets page scroll continue to next/previous section.
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const maxScroll = el.scrollHeight - el.clientHeight;
    // If all experiences fit on screen without overflow, allow natural page scroll
    if (maxScroll <= 6) return;

    const isAtBottom = el.scrollTop >= maxScroll - 3;
    const isAtTop = el.scrollTop <= 3;

    if (e.deltaY > 0 && !isAtBottom) {
      // User is scrolling down and more experiences remain: scroll internally
      el.scrollTop += e.deltaY;
      e.preventDefault();
      checkScrollStatus();
    } else if (e.deltaY < 0 && !isAtTop) {
      // User is scrolling up and not yet at top: scroll internally
      el.scrollTop += e.deltaY;
      e.preventDefault();
      checkScrollStatus();
    }
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      onWheel={handleWheel}
      className="relative min-h-0 md:h-screen md:max-h-screen w-full flex items-start md:items-center overflow-hidden bg-[#121214] vintage-charcoal-bg select-none"
    >
      {/* 1. Full-bleed Background: Vintage Slate Wall with Typewriter on the Right (Desktop Only) */}
      <div className="hidden md:block absolute inset-0 z-0 pointer-events-none overflow-hidden md:left-52 lg:left-56">
        <Image
          src="/images/experience-typewriter.jpg"
          alt="Vintage Typewriter Desk"
          fill
          priority
          sizes="(max-width: 768px) 100vw, calc(100vw - 224px)"
          className="object-cover md:object-fill object-center pointer-events-none select-none filter brightness-[1.0] contrast-[1.02]"
        />
      </div>

      {/* 2. Main Content Composition: Shifted comfortably onto the left chalkboard area */}
      <div className="relative z-10 w-full min-h-0 md:min-h-0 md:h-full md:pl-52 lg:pl-56 flex flex-col justify-start px-4 sm:px-8 py-10 sm:py-14 md:pt-8 lg:pt-10 md:pb-10">
        <div className="w-full flex flex-col md:pl-14 lg:pl-24 xl:pl-28">
        
        {/* Torn Paper Scrap Header: "Experience" - Tactile Pin-to-Board Entrance */}
        <motion.div
          initial={{ opacity: 0, x: -35, rotate: -5, scale: 1.05 }}
          whileInView={{ opacity: 1, x: 0, rotate: -1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.95, ease: [0.19, 1, 0.22, 1] }}
          whileHover={{ scale: 1.03, rotate: 0 }}
          className="relative w-48 sm:w-64 md:w-72 lg:w-80 aspect-[1024/341] mb-4 sm:mb-6 md:mb-10 -rotate-1 origin-left shrink-0 ml-1 sm:ml-2 cursor-pointer transform-gpu"
          data-cursor="interactive"
          data-cursor-label="EXPERIENCE // TIMELINE"
        >
          <Image
            src="/images/experience-title.png"
            alt="Experience"
            fill
            priority
            className="object-contain object-left pointer-events-none select-none drop-shadow-[0_4px_14px_rgba(0,0,0,0.65)]"
          />
        </motion.div>

        {/* 3. Scrollable Timeline Container (Spread wider to the right to fill empty space) */}
        <div
          ref={scrollContainerRef}
          className="relative w-full max-w-xl lg:max-w-2xl xl:max-w-2xl max-h-none md:max-h-[calc(100vh-180px)] md:overflow-y-auto pr-2 sm:pr-8 vintage-scrollbar"
        >
          {/* Vertical Luminous Timeline Wire: Conducts current downwards as user scrolls */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.25, ease: [0.19, 1, 0.22, 1] }}
            style={{ originY: 0 }}
            className="absolute left-[20px] top-[18px] bottom-[22px] w-[2px] bg-gradient-to-b from-white via-zinc-400 to-zinc-700 shadow-[0_0_8px_rgba(255,255,255,0.7)] rounded-full pointer-events-none transform-gpu"
          />

          {/* Timeline Experience Entries: Staggered Chronology Reveal */}
          <div className="relative space-y-7 sm:space-y-9 md:space-y-12 pb-2 sm:pb-4 md:pb-6">
            {experiences.map((exp, index) => {
              const isTutor = exp.iconType === "tutor";

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -30, y: 15 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.85, delay: 0.25 + index * 0.18, ease: [0.19, 1, 0.22, 1] }}
                  className="relative group pl-14 sm:pl-16 transform-gpu"
                >
                  {/* Vintage Mechanical Typewriter Keycap Bullet */}
                  <div
                    aria-hidden="true"
                    className="absolute left-[21px] -translate-x-1/2 top-[4px] w-[36px] h-[36px] rounded-full p-[2px] bg-gradient-to-b from-zinc-200 via-zinc-400 to-zinc-800 shadow-[0_4px_12px_rgba(0,0,0,0.95),0_0_12px_rgba(255,255,255,0.2)] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-[-3deg] group-hover:shadow-[0_4px_16px_rgba(255,255,255,0.4)] transition-all duration-300 pointer-events-none"
                  >
                    {/* Recessed Mechanical Black Key Well with Glass Curved Reflection */}
                    <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#27272a] via-[#141416] to-[#09090b] border border-[#161619] flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.95),inset_0_-1px_2px_rgba(255,255,255,0.15)] overflow-hidden">
                      <div className="absolute top-1 left-1.5 right-1.5 h-[8px] rounded-full bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
                      {isTutor ? (
                        <GraduationCap className="w-[17px] h-[17px] text-zinc-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]" />
                      ) : (
                        <Code2 className="w-[17px] h-[17px] text-zinc-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]" />
                      )}
                    </div>
                  </div>

                  {/* Header Row: Heading with Second Image Paper Scrap Behind + Timeline Date Moved to the Right */}
                  <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                    {/* Role Heading on Torn Kraft Paper Scrap Banner (Image 2) */}
                    <motion.div
                      whileHover={{ scale: 1.025, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="relative inline-flex items-center justify-center px-5 sm:px-6 py-2 sm:py-2.5 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.65)] shrink-0 cursor-pointer"
                      data-cursor="interactive"
                      data-cursor-label={`${exp.role.toUpperCase()} // ${exp.period}`}
                    >
                      <Image
                        src="/images/heading-paper-bg.png"
                        alt=""
                        fill
                        priority
                        sizes="260px"
                        className="object-fill pointer-events-none select-none"
                      />
                      <span className="relative z-10 font-typewriter font-bold text-[17px] sm:text-[19px] md:text-[20px] text-[#181613] tracking-wide select-none whitespace-nowrap -translate-y-[1px]">
                        {exp.role}
                      </span>
                    </motion.div>

                    {/* Timeline Date Moved to the Right of the Heading */}
                    <div className="font-typewriter text-[14.5px] sm:text-[15.5px] md:text-[16.5px] text-zinc-300 tracking-wider pl-3 border-l-2 border-zinc-600 bg-white/[0.03] py-1 pr-3 rounded-r group-hover:border-zinc-400 group-hover:text-white transition-colors duration-200">
                      {exp.period}
                    </div>
                  </div>

                  {/* Expanded Description Paragraph: Spread Out to the Right to Fill Space */}
                  <p className="mt-3.5 text-zinc-200 font-typewriter text-[15px] sm:text-[16px] md:text-[16.5px] leading-[1.75] tracking-[0.2px] max-w-xl lg:max-w-2xl text-shadow-sm">
                    {exp.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Scroll Indicator Hint (Displays automatically if there are more experiences below) */}
        {canScrollMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 mt-4 ml-12 text-zinc-400 font-typewriter text-xs tracking-wider animate-bounce"
          >
            <span>Scroll for more experiences</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </motion.div>
        )}
        </div>
      </div>
    </section>
  );
}
