import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/data/projects";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  User,
  Layers,
  ChevronRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Find next and previous projects for circular navigation
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject =
    projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="min-h-screen bg-[#070709] text-zinc-100 relative selection:bg-zinc-800 selection:text-white">
      {/* Vintage Background Texture with Filmstrip Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-45">
        <Image
          src="/images/projects-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070709]/85 via-[#070709]/70 to-[#070709]/95" />
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-black/60 border-b border-white/10 px-6 sm:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-700/80 text-zinc-300 hover:text-white hover:border-zinc-400 hover:bg-zinc-800 transition-all text-sm font-typewriter"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Projects</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="font-typewriter text-xs uppercase tracking-widest text-zinc-400 hidden sm:inline-block">
              Project Archive // {project.slug}
            </span>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          </div>
        </div>
      </header>

      {/* Main Content Showcase */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 py-10 sm:py-16">
        
        {/* Project Header Banner with Torn Paper Scrap */}
        <div className="mb-10 sm:mb-14">
          <div className="inline-block relative px-6 py-2.5 mb-4 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]">
            <Image
              src="/images/heading-paper-bg.png"
              alt=""
              fill
              priority
              className="object-fill pointer-events-none select-none"
            />
            <span className="relative z-10 font-typewriter font-bold text-xl sm:text-2xl md:text-3xl text-[#181613] tracking-wide select-none">
              {project.title}
            </span>
          </div>

          <p className="text-zinc-300 font-typewriter text-base sm:text-lg max-w-3xl leading-relaxed mt-2">
            {project.subtitle}
          </p>
        </div>

        {/* Grid Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Authentic Vintage Card Poster (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border-2 border-zinc-700/80 shadow-[0_12px_40px_rgba(0,0,0,0.95),0_0_24px_rgba(255,255,255,0.08)] bg-zinc-950 group">
              <div className="relative aspect-square w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Film overlay tint */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Tag overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-typewriter text-zinc-300">
                <span className="px-3 py-1 rounded bg-black/75 border border-white/20 backdrop-blur-sm">
                  {project.category}
                </span>
                <span className="px-3 py-1 rounded bg-black/75 border border-white/20 backdrop-blur-sm">
                  {project.timeline}
                </span>
              </div>
            </div>

            {/* Quick Metadata Box */}
            <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm space-y-4 font-typewriter text-sm">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="text-zinc-400 flex items-center gap-2">
                  <User className="w-4 h-4 text-zinc-400" /> Role
                </span>
                <span className="text-zinc-100 font-medium text-right">{project.role}</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="text-zinc-400 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-zinc-400" /> Timeline
                </span>
                <span className="text-zinc-100 font-medium">{project.timeline}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-zinc-400" /> Domain
                </span>
                <span className="text-zinc-100 font-medium">{project.category}</span>
              </div>

              {project.github && (
                <div className="pt-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-100 text-zinc-950 font-bold hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all"
                  >
                    <span>View Repository on GitHub</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Deep Architectural Specs & Highlights (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Overview Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800 backdrop-blur-sm">
              <h3 className="font-typewriter text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-zinc-400" />
                <span>Executive Overview</span>
              </h3>
              <p className="font-typewriter text-zinc-200 text-sm sm:text-base leading-relaxed">
                {project.longDescription}
              </p>

              {/* Metrics Highlights if available */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-zinc-800">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="text-center sm:text-left">
                      <div className="font-typewriter text-xs text-zinc-400 uppercase tracking-wider">
                        {m.label}
                      </div>
                      <div className="font-typewriter text-xl sm:text-2xl font-bold text-white mt-1">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Key Technical Highlights */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800 backdrop-blur-sm">
              <h3 className="font-typewriter text-lg sm:text-xl font-bold text-white mb-4">
                Key Technical Highlights
              </h3>
              <ul className="space-y-3 font-typewriter text-sm sm:text-base text-zinc-200">
                {project.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Pills */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800 backdrop-blur-sm">
              <h3 className="font-typewriter text-lg font-bold text-white mb-4">
                Core Technologies & Tools
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="font-typewriter text-xs sm:text-sm px-3.5 py-1.5 rounded-full bg-zinc-800/80 border border-zinc-700 text-zinc-200 shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Note placeholder for future expansion */}
            <div className="p-4 rounded-xl border border-dashed border-zinc-700/80 bg-zinc-950/40 font-typewriter text-xs text-zinc-400">
              ℹ️ <span className="font-semibold text-zinc-300">Design Note:</span> This is a live sample project page generated for {project.title}. Additional project documentation, live interactive demos, architecture diagrams, and hardware schematics will be customized here.
            </div>
          </div>
        </div>

        {/* Circular Project-to-Project Navigation Footer */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-typewriter">
          <Link
            href={`/projects/${prevProject.slug}`}
            className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-zinc-900/80 border border-zinc-700/80 text-zinc-200 hover:text-white hover:border-zinc-500 hover:bg-zinc-800 transition-all text-sm w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <div className="text-[10px] uppercase text-zinc-400">Previous Project</div>
              <div className="font-semibold text-xs sm:text-sm truncate max-w-[200px]">
                {prevProject.title.split("–")[0].trim()}
              </div>
            </div>
          </Link>

          <Link
            href="/#projects"
            className="text-xs text-zinc-400 hover:text-white underline underline-offset-4 transition-colors"
          >
            Return to Main Gallery
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="group flex items-center justify-end gap-3 px-5 py-3 rounded-xl bg-zinc-900/80 border border-zinc-700/80 text-zinc-200 hover:text-white hover:border-zinc-500 hover:bg-zinc-800 transition-all text-sm w-full sm:w-auto text-right"
          >
            <div>
              <div className="text-[10px] uppercase text-zinc-400">Next Project</div>
              <div className="font-semibold text-xs sm:text-sm truncate max-w-[200px]">
                {nextProject.title.split("–")[0].trim()}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </main>
  );
}
