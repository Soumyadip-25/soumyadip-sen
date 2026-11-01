"use client";

import React from "react";
import { GraduationCap, Terminal, Code2, Cpu } from "lucide-react";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-[80vh] w-full py-24 px-6 md:pl-56 md:pr-12 max-w-7xl mx-auto flex flex-col justify-center border-t border-white/5"
    >
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
          01 // Background
        </span>
        <div className="h-[1px] w-12 bg-zinc-800" />
      </div>

      <h2 className="font-typewriter text-3xl md:text-4xl text-white mb-6 tracking-wide">
        Behind The Lens & Code
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-4 text-zinc-300 leading-relaxed text-base font-light">
          <p>
            Hello! I&apos;m <span className="text-white font-medium">Soumyadip Sen</span>, a Full Stack Developer based in Barrackpore, Kolkata, India.
          </p>
          <p>
            I have hands-on freelance experience architecting responsive, data-driven web applications with React.js, Node.js, Express.js, and SQL/NoSQL databases. I handle end-to-end project delivery — from client requirements gathering to deployment and maintenance.
          </p>
          <p>
            Currently pursuing my <span className="text-white font-medium">B.Tech in Computer Science & Engineering</span> at Adamas University (CGPA: 8.23 / 10), my technical interests span web engineering, AI/ML, IoT hardware integration, and cloud-connected telemetry systems.
          </p>
        </div>

        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm">
            <Code2 className="w-5 h-5 text-zinc-400 mb-3" />
            <h4 className="text-sm font-semibold text-white">Full Stack Dev</h4>
            <p className="text-xs text-zinc-400 mt-1 font-mono">React, Node, Express, SQL</p>
          </div>
          <div className="p-5 rounded-xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm">
            <Cpu className="w-5 h-5 text-zinc-400 mb-3" />
            <h4 className="text-sm font-semibold text-white">IoT & Hardware</h4>
            <p className="text-xs text-zinc-400 mt-1 font-mono">ESP32, ECG, Sensors</p>
          </div>
          <div className="p-5 rounded-xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm">
            <Terminal className="w-5 h-5 text-zinc-400 mb-3" />
            <h4 className="text-sm font-semibold text-white">Data Science & AI</h4>
            <p className="text-xs text-zinc-400 mt-1 font-mono">Python, GenAI, ML, LLMs</p>
          </div>
          <div className="p-5 rounded-xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm">
            <GraduationCap className="w-5 h-5 text-zinc-400 mb-3" />
            <h4 className="text-sm font-semibold text-white">Education</h4>
            <p className="text-xs text-zinc-400 mt-1 font-mono">B.Tech CSE (8.23 CGPA)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
