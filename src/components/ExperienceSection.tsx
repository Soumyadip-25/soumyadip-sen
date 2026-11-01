"use client";

import React from "react";
import { Calendar } from "lucide-react";

interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  description: string[];
  tech: string[];
}

const experiences: ExperienceItem[] = [
  {
    period: "Feb 2026 — Present",
    role: "Freelance Full Stack Developer",
    company: "Self-employed",
    description: [
      "Designed and developed responsive, client-facing web applications using HTML, CSS, JavaScript, and React.js.",
      "Built and integrated back-end functionality with Node.js, Express.js, and MySQL/MongoDB to support dynamic, data-driven websites.",
      "Collaborated directly with clients to gather requirements, scope projects, and deliver features on schedule.",
      "Deployed and maintained production websites, resolving bugs and implementing performance improvements.",
      "Managed end-to-end project delivery independently, using Git and GitHub for version control.",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MySQL", "MongoDB", "JavaScript", "Git"],
  },
  {
    period: "2022 — Present",
    role: "Freelance Tutor",
    company: "Self-employed",
    description: [
      "Taught 20+ students Mathematics, Science, and other subjects up to Class 10, improving academic performance.",
      "Developed structured lesson plans and assessments in PowerPoint and Word to support student learning outcomes.",
      "Designed and delivered presentations and reports for training and marketing purposes.",
      "Maintained academic records and parent communication through organized Excel tracking sheets.",
      "Created and proofread educational content on technology and career guidance topics.",
    ],
    tech: ["Mentorship", "Curriculum Design", "STEM Education", "Communication"],
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative min-h-[80vh] w-full py-24 px-6 md:pl-56 md:pr-12 max-w-7xl mx-auto flex flex-col justify-center border-t border-white/5"
    >
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
          02 // Journey
        </span>
        <div className="h-[1px] w-12 bg-zinc-800" />
      </div>

      <h2 className="font-typewriter text-3xl md:text-4xl text-white mb-10 tracking-wide">
        Work Experience
      </h2>

      <div className="relative border-l border-zinc-800 ml-3 md:ml-4 space-y-10 pl-6 md:pl-8">
        {experiences.map((exp, index) => (
          <div key={index} className="relative group">
            <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-3 h-3 rounded-full bg-zinc-900 border-2 border-zinc-600 group-hover:border-white group-hover:bg-white transition-all shadow-[0_0_8px_rgba(255,255,255,0.4)]" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
              <h3 className="text-lg font-semibold text-white tracking-tight">
                {exp.role}{" "}
                <span className="text-zinc-500 font-normal">@ {exp.company}</span>
              </h3>
              <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                <span>{exp.period}</span>
              </div>
            </div>

            <ul className="space-y-1.5 text-sm text-zinc-300 font-light mb-4">
              {exp.description.map((desc, dIdx) => (
                <li key={dIdx} className="flex items-start gap-2">
                  <span className="text-zinc-600 select-none mt-1">▸</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {exp.tech.map((t, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-zinc-900 border border-white/5 text-zinc-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
