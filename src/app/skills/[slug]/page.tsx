import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  skillTopics,
  getSkillTopicBySlug,
  SkillTopic,
} from "@/data/skills";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Code2,
  Layers,
  Database,
  Brain,
  Cpu,
  ShieldCheck,
  Terminal,
  Sparkles,
  Layers2,
  Wrench,
} from "lucide-react";

export function generateStaticParams() {
  return skillTopics.map((topic) => ({ slug: topic.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

const iconMap = {
  Code2,
  Layers,
  Database,
  Brain,
  Cpu,
  ShieldCheck,
};

export default async function SkillDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = getSkillTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  // Circular navigation across the 6 topics
  const currentIndex = skillTopics.findIndex((t) => t.slug === slug);
  const prevTopic =
    skillTopics[(currentIndex - 1 + skillTopics.length) % skillTopics.length];
  const nextTopic = skillTopics[(currentIndex + 1) % skillTopics.length];

  const IconComponent = iconMap[topic.iconName] || Terminal;

  return (
    <main className="min-h-screen bg-[#070709] text-zinc-100 relative selection:bg-emerald-900/60 selection:text-emerald-100">
      {/* Vintage Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <Image
          src="/images/skills-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover filter contrast-125 brightness-90 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070709]/95 via-[#070709]/80 to-[#070709]" />
      </div>

      {/* Retro Scanline Overlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.4) 2px, rgba(0, 0, 0, 0.4) 4px)",
        }}
      />

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-black/75 border-b border-white/10 px-5 sm:px-10 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Back to Skills link */}
          <Link
            href="/#skills"
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-900/90 border border-zinc-700/80 text-zinc-200 hover:text-white hover:border-emerald-500/50 hover:bg-zinc-800 transition-all text-sm sm:text-base font-mono font-medium"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-emerald-400" />
            <span>← Back to Skills Section</span>
          </Link>

          {/* Module Readout */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded bg-emerald-950/40 border border-emerald-500/30">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
              <span className="font-mono text-sm sm:text-base font-bold text-emerald-300 tracking-widest">
                MODULE // {topic.number}
              </span>
            </div>

            {/* Quick Prev / Next Module switcher */}
            <div className="flex items-center gap-1 border-l border-zinc-800 pl-3">
              <Link
                href={`/skills/${prevTopic.slug}`}
                title={`Previous: ${prevTopic.title}`}
                className="p-2 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <Link
                href={`/skills/${nextTopic.slug}`}
                title={`Next: ${nextTopic.title}`}
                className="p-2 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-16">
        
        {/* Topic Title Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-emerald-400 uppercase bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded">
              TOPIC {topic.number} of 06
            </span>
            <div className="h-[1px] flex-1 bg-zinc-800" />
          </div>

          <div className="flex items-start gap-4 sm:gap-5 mt-4">
            <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-900/90 border border-emerald-500/30 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)] shrink-0">
              <IconComponent className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <div>
              <h1 className="font-typewriter text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-tight mb-2">
                {topic.title}
              </h1>
              <p className="font-mono text-sm sm:text-base md:text-lg text-zinc-300 font-medium">
                {topic.subtitle}
              </p>
            </div>
          </div>

          <p className="font-serif italic text-zinc-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mt-6 pl-3 border-l-2 border-emerald-500/60">
            &ldquo;{topic.description}&rdquo;
          </p>
        </div>

        {/* Minimal Starter Layout: Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          
          {/* Main Column: Core Competencies / Technologies */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <h2 className="font-typewriter text-lg sm:text-xl text-white font-bold tracking-wide">
                  Technical Stack & Proficiency
                </h2>
              </div>
              <span className="font-mono text-xs sm:text-sm font-medium text-zinc-400">
                {topic.skills.length} Items Listed
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {topic.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-zinc-900/70 hover:bg-zinc-900 border border-zinc-800 hover:border-emerald-500/40 transition-all group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-sm sm:text-base font-semibold text-zinc-100 group-hover:text-emerald-300 transition-colors">
                      {skill.name}
                    </span>
                    {skill.level && (
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 group-hover:text-emerald-300 group-hover:bg-emerald-950/60 transition-colors">
                        {skill.level}
                      </span>
                    )}
                  </div>
                  {skill.category && (
                    <span className="font-mono text-xs sm:text-sm text-zinc-400 block font-medium">
                      {skill.category}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Side Column: Tools & Toolchain */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2.5 border-b border-zinc-800">
              <Wrench className="w-4 h-4 text-emerald-400" />
              <h2 className="font-typewriter text-lg sm:text-xl text-white font-bold tracking-wide">
                Toolchain
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 space-y-3">
              <p className="font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
                Development environments, command-line toolchains, and runtime services used with this discipline:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {topic.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs sm:text-sm font-medium px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700/80 text-zinc-200 hover:text-white hover:border-emerald-500/40 transition-colors"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Custom Design Workspace Banner */}
            <div className="p-4 rounded-xl bg-emerald-950/25 border border-emerald-500/30 text-zinc-300 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs sm:text-sm font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Customization Canvas</span>
              </div>
              <p className="text-xs sm:text-sm font-mono text-zinc-300 leading-relaxed">
                This is your starter template. You can now design and extend this page from scratch with project showcases, code snippets, benchmarks, or interactive demos!
              </p>
            </div>
          </div>
        </div>

        {/* Circular Bottom Navigation to other topics */}
        <div className="pt-10 border-t border-zinc-800">
          <div className="flex items-center justify-between text-sm font-mono text-zinc-400 mb-5 uppercase tracking-wider font-semibold">
            <span>← Previous Module</span>
            <span>All Modules (01–06)</span>
            <span>Next Module →</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Prev Module Card */}
            <Link
              href={`/skills/${prevTopic.slug}`}
              data-cursor-label="VISIT"
              className="p-5 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all flex items-center gap-4 group"
            >
              <div className="p-3 rounded-lg bg-zinc-800 text-zinc-300 group-hover:text-emerald-400 group-hover:bg-emerald-950/50 transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <span className="font-mono text-xs sm:text-sm font-bold text-zinc-400 block">
                  MODULE // {prevTopic.number}
                </span>
                <span className="font-typewriter text-base sm:text-lg font-bold text-zinc-100 group-hover:text-white truncate block">
                  {prevTopic.title}
                </span>
              </div>
            </Link>

            {/* Next Module Card */}
            <Link
              href={`/skills/${nextTopic.slug}`}
              data-cursor-label="VISIT"
              className="p-5 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all flex items-center justify-between group"
            >
              <div className="min-w-0 text-left">
                <span className="font-mono text-xs sm:text-sm font-bold text-zinc-400 block">
                  MODULE // {nextTopic.number}
                </span>
                <span className="font-typewriter text-base sm:text-lg font-bold text-zinc-100 group-hover:text-white truncate block">
                  {nextTopic.title}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-zinc-800 text-zinc-300 group-hover:text-emerald-400 group-hover:bg-emerald-950/50 transition-colors">
                <ChevronRight className="w-6 h-6" />
              </div>
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}

