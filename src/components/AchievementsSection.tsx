"use client";

import React from "react";
import { Award, Trophy, CheckCircle, ShieldCheck } from "lucide-react";

interface Certification {
  name: string;
  issuer: string;
}

const certifications: Certification[] = [
  { name: "Career Essentials in Generative AI", issuer: "Microsoft & LinkedIn" },
  { name: "Build Your Generative AI Productivity Skills", issuer: "Microsoft & LinkedIn" },
  { name: "Data Science and Analytics", issuer: "HP LIFE" },
  { name: "Digital Business Skills", issuer: "HP LIFE" },
  { name: "Generative AI Tools", issuer: "NASSCOM" },
];

export default function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="relative min-h-[80vh] w-full py-24 px-6 md:pl-56 md:pr-12 max-w-7xl mx-auto flex flex-col justify-center border-t border-white/5"
    >
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
          05 // Milestones
        </span>
        <div className="h-[1px] w-12 bg-zinc-800" />
      </div>

      <h2 className="font-typewriter text-3xl md:text-4xl text-white mb-10 tracking-wide">
        Certifications & Achievements
      </h2>

      {/* Key Milestones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="p-6 rounded-xl bg-zinc-900/30 border border-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-300">
              <Trophy className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">
              End-to-End Freelance Production Delivery
            </h3>
          </div>
          <p className="text-sm text-zinc-400 font-light leading-relaxed">
            Independently delivered multiple freelance full stack web development projects from client requirement gathering to full deployment, maintenance, and performance tuning.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-zinc-900/30 border border-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg bg-emerald-400/10 border border-emerald-400/20 text-emerald-300">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">
              STEM Mentorship & Education
            </h3>
          </div>
          <p className="text-sm text-zinc-400 font-light leading-relaxed">
            Mentored 20+ students in Mathematics and Science as a freelance tutor, designing structured lesson plans and measurable assessment methodologies up to Class 10.
          </p>
        </div>
      </div>

      {/* Certifications Grid */}
      <h3 className="font-typewriter text-xl text-zinc-200 mb-6 tracking-wide">
        Official Certifications
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map((cert, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-zinc-900/20 hover:bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-all backdrop-blur-sm flex items-start gap-3.5"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-white leading-snug">
                {cert.name}
              </h4>
              <p className="font-mono text-xs text-zinc-500 mt-1">
                {cert.issuer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
