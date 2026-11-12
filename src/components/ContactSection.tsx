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
      {/* 16:9 Precision Canvas - Locked to background image coordinates so elements never drift */}
      <div className="relative w-full max-w-[1440px] aspect-[1024/576] max-h-[96vh] sm:max-h-[92vh] flex items-center justify-center my-auto">
        
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

        {/* TOP PAPER STRIP: "Let's Connect" Stamped Title - Shifted UP to center on paper strip */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="absolute cursor-pointer"
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

        {/* MAIN TORN PARCHMENT SHEET: Contact Info & Active Profile Links - Centralized on the parchment */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="absolute flex flex-col justify-between"
          style={{
            top: "33.0%",
            left: "20.2%",
            width: "48.5%",
            height: "51.0%",
          }}
        >
          {/* Row 1: Gmail */}
          <a
            href="mailto:soumyadip25sen@gmail.com"
            data-cursor="interactive"
            data-cursor-label="EMAIL ↗"
            className="group/row flex items-center gap-3 sm:gap-4 md:gap-4.5 pb-2.5 sm:pb-3.5 md:pb-4 border-b border-[#24201a]/20 text-[#12100e] hover:text-black transition-all duration-200 cursor-pointer outline-none focus:outline-none focus-visible:outline-none"
            title="Send an email to soumyadip25sen@gmail.com"
          >
            {/* Postal Envelope Icon */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0 flex items-center justify-center group-hover/row:scale-110 transition-transform">
              <svg viewBox="0 0 24 24" className="w-full h-full fill-[#12100e]">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
            {/* Email Text */}
            <span className="font-typewriter text-[clamp(14px,1.9vw,24px)] font-bold tracking-wide whitespace-nowrap group-hover/row:translate-x-1.5 transition-transform text-[#12100e] hover:text-black inline-flex items-center gap-1.5 sm:gap-2">
              <span>Email</span>
              <span className="inline-flex items-center font-typewriter text-[0.85em] font-bold text-[#14120f]/80 group-hover/row:text-black transition-colors">
                [<ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 stroke-[2.5] inline-block mx-0.5 group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 transition-transform" />]
              </span>
            </span>
          </a>

          {/* Row 2: LinkedIn */}
          <a
            href="https://www.linkedin.com/in/soumyadip-sen-0937b1311"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="interactive"
            data-cursor-label="LINKEDIN ↗"
            className="group/row flex items-center gap-3 sm:gap-4 md:gap-4.5 pb-2.5 sm:pb-3.5 md:pb-4 border-b border-[#24201a]/20 text-[#12100e] hover:text-black transition-all duration-200 cursor-pointer outline-none focus:outline-none focus-visible:outline-none"
            title="Open LinkedIn Profile (soumyadip-sen-0937b1311)"
          >
            {/* LinkedIn Badge Icon */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0 flex items-center justify-center group-hover/row:scale-110 transition-transform">
              <svg viewBox="0 0 24 24" className="w-full h-full fill-[#12100e]">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </div>
            {/* LinkedIn Text */}
            <span className="font-typewriter text-[clamp(14px,1.9vw,24px)] font-bold tracking-wide whitespace-nowrap group-hover/row:translate-x-1.5 transition-transform text-[#12100e] hover:text-black inline-flex items-center gap-1.5 sm:gap-2">
              <span>LinkedIn</span>
              <span className="inline-flex items-center font-typewriter text-[0.85em] font-bold text-[#14120f]/80 group-hover/row:text-black transition-colors">
                [<ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 stroke-[2.5] inline-block mx-0.5 group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 transition-transform" />]
              </span>
            </span>
          </a>

          {/* Row 3: GitHub */}
          <a
            href="https://github.com/Soumyadip-25"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="interactive"
            data-cursor-label="GITHUB ↗"
            className="group/row flex items-center gap-3 sm:gap-4 md:gap-4.5 pb-2.5 sm:pb-3.5 md:pb-4 border-b border-[#24201a]/20 text-[#12100e] hover:text-black transition-all duration-200 cursor-pointer outline-none focus:outline-none focus-visible:outline-none"
            title="Open GitHub Profile (Soumyadip-25)"
          >
            {/* GitHub Octocat Icon */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0 flex items-center justify-center group-hover/row:scale-110 transition-transform">
              <svg viewBox="0 0 24 24" className="w-full h-full fill-[#12100e]">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </div>
            {/* GitHub Text */}
            <span className="font-typewriter text-[clamp(14px,1.9vw,24px)] font-bold tracking-wide whitespace-nowrap group-hover/row:translate-x-1.5 transition-transform text-[#12100e] hover:text-black inline-flex items-center gap-1.5 sm:gap-2">
              <span>GitHub</span>
              <span className="inline-flex items-center font-typewriter text-[0.85em] font-bold text-[#14120f]/80 group-hover/row:text-black transition-colors">
                [<ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 stroke-[2.5] inline-block mx-0.5 group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 transition-transform" />]
              </span>
            </span>
          </a>

          {/* Row 4: Address / Location */}
          <div
            className="flex items-center gap-3 sm:gap-4 md:gap-4.5 pb-1 text-[#12100e]"
          >
            {/* Location Pin Icon */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-full h-full fill-[#12100e]">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
              </svg>
            </div>
            {/* Location Address Text */}
            <span className="font-typewriter text-[clamp(13px,1.75vw,22px)] font-bold tracking-wide whitespace-nowrap text-[#12100e]">
              Kolkata, West Bengal, India
            </span>
          </div>
        </motion.div>

        {/* Vintage Rotary Telephone Interactive Hotspot */}
        <div
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
    </section>
  );
}
