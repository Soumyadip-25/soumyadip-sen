"use client";

import React from "react";
import { Layers, Cpu, Database, Wrench, ShieldCheck } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  skills: string[];
}

const categories: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: Cpu,
    skills: ["Python", "JavaScript", "Java", "C", "C++", "SQL"],
  },
  {
    title: "Full Stack Web Development",
    icon: Layers,
    skills: ["React.js", "Next.js", "Node.js", "Express.js", "HTML5", "CSS3", "MySQL", "MongoDB", "PostgreSQL", "REST APIs", "Firebase"],
  },
  {
    title: "Data Science & AI",
    icon: Database,
    skills: ["Machine Learning", "Data Analysis", "Predictive Analytics", "Generative AI", "LLMs", "Synthetic Data Generation", "Prompt Engineering"],
  },
  {
    title: "Tools & Frameworks",
    icon: Wrench,
    skills: ["Pandas", "NumPy", "DuckDB", "ChromaDB", "FastAPI", "Git", "GitHub", "Tailwind CSS"],
  },
  {
    title: "Core Competencies",
    icon: ShieldCheck,
    skills: ["Statistics", "Data Preprocessing", "Data Visualization", "Model Evaluation", "Differential Privacy", "Responsible AI"],
  },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative min-h-[80vh] w-full py-24 px-6 md:pl-56 md:pr-12 max-w-7xl mx-auto flex flex-col justify-center border-t border-white/5"
    >
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
          04 // Expertise
        </span>
        <div className="h-[1px] w-12 bg-zinc-800" />
      </div>

      <h2 className="font-typewriter text-3xl md:text-4xl text-white mb-10 tracking-wide">
        Skills & Technologies
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-xl bg-zinc-900/30 border border-white/5 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-white tracking-tight">
                  {cat.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-800/50 hover:bg-zinc-800 border border-white/5 hover:border-white/15 text-zinc-300 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
