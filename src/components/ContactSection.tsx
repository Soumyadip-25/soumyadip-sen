"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#070709] select-none md:pl-52 lg:pl-56"
    >
      {/* 1. DESKTOP 16:9 Precision Canvas - Locked to background image coordinates (Strictly Preserved) */}
      <div className="hidden md:flex relative w-full max-w-[1440px] aspect-[1024/576] max-h-[96vh] sm:max-h-[92vh] items-center justify-center my-auto">
        
        {/* Full-bleed Vintage Background Image: Dark wall, torn papers, postage stamp, and rotary telephone */}
        <Image
          src="/images/contact-bg.jpg"
          alt="Vintage Rotary Telephone and Correspondence Dossier"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1440px"
          className="object-cover object-center pointer-events-none select-none filter brightness-[0.98] contrast-[1.03]"
        />

        {/* Ambient subtle vignette overlay for depth */}
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-20" />

        {/* TOP PAPER STRIP: "Let's Connect" Stamped Title - Tactile Ink Stamp Press */}
        <motion.div
          initial={{ opacity: 0, scale: 1.18, y: -25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.95, ease: [0.19, 1, 0.22, 1] }}
          whileHover={{ scale: 1.04, rotate: 1 }}
          className="absolute cursor-pointer transform-gpu"
          data-cursor="interactive"
          data-cursor-label="CONTACT // CONNECT"
          style={{
            top: "4.0%",
            left: "17%",
            width: "36.5%",
            height: "10.5%",
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Dark Ink Stamped Title from User Provided Asset */}
            <div className="relative w-[88%] h-[84%] -translate-y-1">
              <Image
                src="/images/lets-connect-title.png"
                alt="Let's Connect"
                fill
                priority
                className="object-contain object-center pointer-events-none select-none filter contrast-[1.15]"
              />
            </div>
          </div>
        </motion.div>

        {/* MAIN TORN PARCHMENT SHEET: Correspondence Letter Placement */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
          className="absolute flex flex-col justify-between transform-gpu"
          style={{
            top: "33.0%",
            left: "20.2%",
            width: "48.5%",
            height: "51.0%",
          }}
        >
          {/* Row 1: Gmail - Staggered Line Type Reveal */}
          <motion.a
            href="mailto:soumyadip25sen@gmail.com"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.19, 1, 0.22, 1] }}
            whileHover={{ x: 8 }}
            data-cursor="interactive"
            data-cursor-label="EMAIL ↗"
            className="group/row flex items-center gap-3 sm:gap-4 md:gap-4.5 pb-2.5 sm:pb-3.5 md:pb-4 border-b border-[#24201a]/20 text-[#12100e] hover:text-black transition-colors duration-200 cursor-pointer outline-none focus:outline-none focus-visible:outline-none transform-gpu"
            title="Send an email to soumyadip25sen@gmail.com"
          >
            {/* Postal Envelope Icon */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0 flex items-center justify-center group-hover/row:scale-110 group-hover/row:-translate-y-0.5 transition-transform duration-200">
              <svg viewBox="0 0 24 24" className="w-full h-full fill-[#12100e]">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
            {/* Email Text */}
            <span className="font-typewriter text-[clamp(14px,1.9vw,24px)] font-bold tracking-wide whitespace-nowrap text-[#12100e] group-hover/row:text-black inline-flex items-center gap-1.5 sm:gap-2">
              <span>Email</span>
              <span className="inline-flex items-center font-typewriter text-[0.85em] font-bold text-[#14120f]/80 group-hover/row:text-black transition-colors">
                [<ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 stroke-[2.5] inline-block mx-0.5 group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 transition-transform" />]
              </span>
            </span>
          </motion.a>

          {/* Row 2: LinkedIn */}
          <motion.a
            href="https://www.linkedin.com/in/soumyadip-sen-0937b1311"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.19, 1, 0.22, 1] }}
            whileHover={{ x: 8 }}
            data-cursor="interactive"
            data-cursor-label="LINKEDIN ↗"
            className="group/row flex items-center gap-3 sm:gap-4 md:gap-4.5 pb-2.5 sm:pb-3.5 md:pb-4 border-b border-[#24201a]/20 text-[#12100e] hover:text-black transition-colors duration-200 cursor-pointer outline-none focus:outline-none focus-visible:outline-none transform-gpu"
            title="Open LinkedIn Profile (soumyadip-sen-0937b1311)"
          >
            {/* LinkedIn Badge Icon */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0 flex items-center justify-center group-hover/row:scale-110 group-hover/row:-translate-y-0.5 transition-transform duration-200">
              <svg viewBox="0 0 24 24" className="w-full h-full fill-[#12100e]">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </div>
            {/* LinkedIn Text */}
            <span className="font-typewriter text-[clamp(14px,1.9vw,24px)] font-bold tracking-wide whitespace-nowrap text-[#12100e] group-hover/row:text-black inline-flex items-center gap-1.5 sm:gap-2">
              <span>LinkedIn</span>
              <span className="inline-flex items-center font-typewriter text-[0.85em] font-bold text-[#14120f]/80 group-hover/row:text-black transition-colors">
                [<ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 stroke-[2.5] inline-block mx-0.5 group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 transition-transform" />]
              </span>
            </span>
          </motion.a>

          {/* Row 3: GitHub */}
          <motion.a
            href="https://github.com/Soumyadip-25"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.19, 1, 0.22, 1] }}
            whileHover={{ x: 8 }}
            data-cursor="interactive"
            data-cursor-label="GITHUB ↗"
            className="group/row flex items-center gap-3 sm:gap-4 md:gap-4.5 pb-2.5 sm:pb-3.5 md:pb-4 border-b border-[#24201a]/20 text-[#12100e] hover:text-black transition-colors duration-200 cursor-pointer outline-none focus:outline-none focus-visible:outline-none transform-gpu"
            title="Open GitHub Profile (Soumyadip-25)"
          >
            {/* GitHub Octocat Icon */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0 flex items-center justify-center group-hover/row:scale-110 group-hover/row:-translate-y-0.5 transition-transform duration-200">
              <svg viewBox="0 0 24 24" className="w-full h-full fill-[#12100e]">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </div>
            {/* GitHub Text */}
            <span className="font-typewriter text-[clamp(14px,1.9vw,24px)] font-bold tracking-wide whitespace-nowrap text-[#12100e] group-hover/row:text-black inline-flex items-center gap-1.5 sm:gap-2">
              <span>GitHub</span>
              <span className="inline-flex items-center font-typewriter text-[0.85em] font-bold text-[#14120f]/80 group-hover/row:text-black transition-colors">
                [<ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 stroke-[2.5] inline-block mx-0.5 group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 transition-transform" />]
              </span>
            </span>
          </motion.a>

          {/* Row 4: Address / Location */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.19, 1, 0.22, 1] }}
            whileHover={{ x: 8 }}
            className="flex items-center gap-3 sm:gap-4 md:gap-4.5 pb-1 text-[#12100e] group/loc cursor-pointer transform-gpu"
          >
            {/* Location Pin Icon */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0 flex items-center justify-center group-hover/loc:scale-110 group-hover/loc:-translate-y-0.5 transition-transform duration-200">
              <svg viewBox="0 0 24 24" className="w-full h-full fill-[#12100e]">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
              </svg>
            </div>
            {/* Location Address Text */}
            <span className="font-typewriter text-[clamp(13px,1.75vw,22px)] font-bold tracking-wide whitespace-nowrap text-[#12100e]">
              Kolkata, West Bengal, India
            </span>
          </motion.div>
        </motion.div>

        {/* Vintage Rotary Telephone Interactive Hotspot */}
        <motion.div
          whileHover={{ rotate: [0, -1.2, 1.2, -0.8, 0.8, 0] }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          data-cursor="interactive"
          data-cursor-label="ROTARY PHONE // CALL"
          className="absolute cursor-pointer rounded-full"
          style={{
            right: "2%",
            bottom: "3%",
            width: "35%",
            height: "50%",
          }}
          title="Vintage Rotary Telephone"
        />

      </div>

      {/* ========================================================= */}
      {/* 2. MOBILE DEDICATED VIEW (< 768px): Authentic 9:16 Canvas */}
      {/* Strictly uses contact-bg-mobile.jpg for mobile view       */}
      {/* ========================================================= */}
      <div className="md:hidden relative z-10 w-full min-h-[100dvh] flex flex-col items-center justify-center px-2 pt-16 sm:pt-20 pb-4 overflow-y-auto overflow-x-hidden">
        <div
          style={{
            width: "min(calc((100dvh - 84px) * (576 / 1024)), calc(100vw - 16px), 410px)",
            aspectRatio: "576 / 1024",
          }}
          className="relative rounded-lg overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.95)] shrink-0 my-auto"
        >
          {/* Mobile Background Image (Strictly Mobile View) */}
          <Image
            src="/images/contact-bg-mobile.jpg"
            alt="Contact Correspondence Backdrop"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 410px"
            className="object-cover pointer-events-none select-none filter brightness-[1.02] contrast-[1.05]"
          />

          {/* Subtle Vignette Overlay for Filmic Texture */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-radial from-transparent via-transparent to-black/30 pointer-events-none"
          />

          {/* TOP PAPER STRIP: "Let's Connect" Stamped Title */}
          <motion.div
            initial={{ opacity: 0, scale: 1.15, y: -15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.85, ease: [0.19, 1, 0.22, 1] }}
            style={{
              left: "9.5%",
              top: "13.2%",
              width: "59%",
            }}
            className="absolute aspect-[1024/341] z-30 pointer-events-auto origin-center drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
            data-cursor="interactive"
            data-cursor-label="CONTACT // CONNECT"
          >
            <Image
              src="/images/lets-connect-title.png"
              alt="Let's Connect"
              fill
              priority
              sizes="320px"
              className="object-contain object-center pointer-events-none select-none filter contrast-125 brightness-105"
            />
          </motion.div>

          {/* MAIN TORN PARCHMENT SHEET: Correspondence Letter Placement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.95, delay: 0.12, ease: [0.19, 1, 0.22, 1] }}
            style={{
              left: "13.5%",
              top: "31.0%",
              width: "71%",
              height: "43%",
            }}
            className="absolute z-20 flex flex-col justify-between py-1 text-[#12100e]"
          >
            {/* Email */}
            <motion.a
              href="mailto:soumyadip25sen@gmail.com"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.98 }}
              data-cursor="interactive"
              data-cursor-label="EMAIL ↗"
              className="group/mobrow flex items-center gap-2.5 pb-2 border-b border-[#24201a]/25 text-[#12100e] hover:text-black transition-colors"
              title="Send email to soumyadip25sen@gmail.com"
            >
              <div className="w-5 h-5 shrink-0 flex items-center justify-center group-hover/mobrow:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="w-full h-full fill-[#12100e]">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <span className="font-typewriter text-[13px] sm:text-sm font-bold tracking-wide flex-1 min-w-0 truncate">
                Email
              </span>
              <span className="font-typewriter font-bold text-[11px] text-[#14120f]/80 inline-flex items-center">
                [<ArrowUpRight className="w-3 h-3 stroke-[2.5] inline-block mx-0.5" />]
              </span>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/in/soumyadip-sen-0937b1311"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.98 }}
              data-cursor="interactive"
              data-cursor-label="LINKEDIN ↗"
              className="group/mobrow flex items-center gap-2.5 pb-2 border-b border-[#24201a]/25 text-[#12100e] hover:text-black transition-colors"
              title="Visit LinkedIn Profile"
            >
              <div className="w-5 h-5 shrink-0 flex items-center justify-center group-hover/mobrow:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="w-full h-full fill-[#12100e]">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </div>
              <span className="font-typewriter text-[13px] sm:text-sm font-bold tracking-wide flex-1 min-w-0 truncate">
                LinkedIn
              </span>
              <span className="font-typewriter font-bold text-[11px] text-[#14120f]/80 inline-flex items-center">
                [<ArrowUpRight className="w-3 h-3 stroke-[2.5] inline-block mx-0.5" />]
              </span>
            </motion.a>

            {/* GitHub */}
            <motion.a
              href="https://github.com/Soumyadip-25"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.98 }}
              data-cursor="interactive"
              data-cursor-label="GITHUB ↗"
              className="group/mobrow flex items-center gap-2.5 pb-2 border-b border-[#24201a]/25 text-[#12100e] hover:text-black transition-colors"
              title="Visit GitHub Profile"
            >
              <div className="w-5 h-5 shrink-0 flex items-center justify-center group-hover/mobrow:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="w-full h-full fill-[#12100e]">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </div>
              <span className="font-typewriter text-[13px] sm:text-sm font-bold tracking-wide flex-1 min-w-0 truncate">
                GitHub
              </span>
              <span className="font-typewriter font-bold text-[11px] text-[#14120f]/80 inline-flex items-center">
                [<ArrowUpRight className="w-3 h-3 stroke-[2.5] inline-block mx-0.5" />]
              </span>
            </motion.a>

            {/* Location */}
            <div className="flex items-center gap-2.5 pt-0.5 text-[#12100e]">
              <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-full h-full fill-[#12100e]">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                </svg>
              </div>
              <span className="font-typewriter text-[11.5px] sm:text-xs font-bold tracking-tight">
                Kolkata, WB, India
              </span>
            </div>
          </motion.div>

          {/* Rotary Phone Hotspot (Bottom Right) */}
          <motion.div
            whileTap={{ scale: 0.94 }}
            data-cursor="interactive"
            data-cursor-label="ROTARY PHONE // CALL"
            className="absolute cursor-pointer rounded-full z-30"
            style={{
              left: "58%",
              top: "76%",
              width: "38%",
              height: "20%",
            }}
            title="Vintage Rotary Telephone"
          />
        </div>
      </div>
        
    </section>
  );
}
