"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import AchievementsSection from "@/components/AchievementsSection";
import ImpactSection from "@/components/ImpactSection";
import ContactSection from "@/components/ContactSection";
import ResumeModal from "@/components/ResumeModal";

const sectionIds = ["home", "about", "experience", "projects", "skills", "achievements", "impact", "contact"];

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  // Scroll spy to update active sidebar navigation indicator (rAF Throttled for 60/120fps fluid scrolling)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      // 1. If at or near bottom of document, activate the last section ("contact")
      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollBottom >= docHeight - 80) {
        const lastId = sectionIds[sectionIds.length - 1];
        setActiveSection((prev) => {
          if (prev !== lastId) {
            window.dispatchEvent(
              new CustomEvent("sectionchange", { detail: { section: lastId } })
            );
            return lastId;
          }
          return prev;
        });
        return;
      }

      // 2. Otherwise determine active section based on viewport focal line
      const focalLine = window.innerHeight * 0.4;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= focalLine && rect.bottom > focalLine) {
            setActiveSection((prev) => {
              if (prev !== id) {
                window.dispatchEvent(
                  new CustomEvent("sectionchange", { detail: { section: id } })
                );
                return id;
              }
              return prev;
            });
            break;
          }
        }
      }
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSectionClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      window.dispatchEvent(
        new CustomEvent("sectionchange", { detail: { section: id } })
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#121214] vintage-charcoal-bg text-zinc-100 relative selection:bg-zinc-800 selection:text-white">
      {/* Left Sidebar Navigation */}
      <Sidebar activeSection={activeSection} onSectionClick={handleSectionClick} />

      {/* Main Content Area */}
      <div className="w-full">
        <Hero onResumeClick={() => setResumeModalOpen(true)} />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <AchievementsSection />
        <ImpactSection />
        <ContactSection />
      </div>

      {/* Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </main>
  );
}
