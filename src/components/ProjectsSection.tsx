"use client";

import React from "react";
import { ExternalLink } from "lucide-react";

interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    title: "Heartery – IoT Smart Heart Health Monitor",
    category: "IoT / Embedded & Cloud",
    description: "Portable cardiac monitoring system using ESP32, AD8232 ECG, and MAX30102 pulse-oximetry to track real-time ECG, heart rate, and SpO2. Features digital filtering, PQRST waveform display, and cloud telemetry with 97.5% heart-rate accuracy.",
    tags: ["ESP32", "AD8232 ECG", "MAX30102", "ThingSpeak", "Firebase"],
    github: "https://github.com/Soumyadip-25",
  },
  {
    title: "Fall Detection System for Elderly",
    category: "IoT & Healthcare Dashboard",
    description: "Real-time fall detection system for elderly safety. Designed sensor-based detection logic with instantaneous caregiver alerts, accompanied by an interactive web dashboard logging activity and movement telemetry.",
    tags: ["IoT Sensors", "Real-Time Alerts", "Web Dashboard", "Data Pipelines"],
    github: "https://github.com/Soumyadip-25",
  },
  {
    title: "DHRUVA – Polar Science Outreach Portal",
    category: "Full Stack & AI Dissemination",
    description: "Centralized digital repository organizing polar research expeditions, publications, and datasets. Incorporates AI-assisted content translation and structured search/discovery with role-based access.",
    tags: ["Full Stack", "AI Content", "Knowledge Base", "Scalable Arch"],
    github: "https://github.com/Soumyadip-25",
  },
  {
    title: "PathVistā – AI Career & Education Navigator",
    category: "AI/ML & EdTech Platform",
    description: "Personalized career guidance engine mapping student aptitude to courses and government institutions with cutoff analysis, scholarship matching, multi-language support, and offline-first accessibility.",
    tags: ["React.js", "Node.js", "Express", "PostgreSQL", "AI/ML", "Maps API"],
    github: "https://github.com/Soumyadip-25",
  },
  {
    title: "WhereIs – Digital Bus Tracking Platform",
    category: "Transit Telemetry & Mapping",
    description: "Real-time public transit tracking application enabling commuters to locate buses, check route options, monitor estimated arrival times, and optimize daily transit planning.",
    tags: ["Real-time Tracking", "Route Discovery", "Transit UI", "Location API"],
    github: "https://github.com/Soumyadip-25",
  },
  {
    title: "AI Logic Theorem Solver",
    category: "AI Inference & Algorithms",
    description: "Automated propositional theorem parser and solver using AI-assisted inference techniques to validate formal logical expressions and generate step-by-step mathematical proofs.",
    tags: ["Python", "Theorem Proving", "Algorithms", "Formal Logic"],
    github: "https://github.com/Soumyadip-25",
  },
];

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative min-h-[80vh] w-full py-24 px-6 md:pl-56 md:pr-12 max-w-7xl mx-auto flex flex-col justify-center border-t border-white/5"
    >
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
          03 // Selected Works
        </span>
        <div className="h-[1px] w-12 bg-zinc-800" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="font-typewriter text-3xl md:text-4xl text-white tracking-wide">
            Featured Projects
          </h2>
          <p className="text-zinc-400 text-sm mt-1 font-light">
            Engineered across full stack architectures, IoT telemetry, and AI systems.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj, idx) => (
          <div
            key={idx}
            data-cursor="project"
            data-cursor-label="INSPECT"
            className="group relative flex flex-col justify-between p-6 rounded-xl bg-zinc-900/30 hover:bg-zinc-900/60 border border-white/5 hover:border-white/15 transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-500 px-2 py-0.5 rounded bg-zinc-800/60 border border-white/5">
                  {proj.category}
                </span>
                <div className="flex items-center gap-2">
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor-label="CODE ↗"
                      className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                      title="GitHub"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </a>
                  )}
                  {proj.demo && (
                    <a
                      href={proj.demo}
                      data-cursor-label="LIVE ↗"
                      className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white group-hover:text-zinc-100 mb-2">
                {proj.title}
              </h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6">
                {proj.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
              {proj.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-black/40 border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
