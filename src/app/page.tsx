"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import AchievementsSection from "@/components/AchievementsSection";
import ContactSection from "@/components/ContactSection";
import ResumeModal from "@/components/ResumeModal";
import CustomCursor from "@/components/CustomCursor";

const sectionIds = ["home", "about", "experience", "projects", "skills", "achievements", "contact"];

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  // Scroll spy to update active sidebar navigation indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <main className="min-h-screen bg-[#070709] text-zinc-100 relative selection:bg-zinc-800 selection:text-white">
      {/* Custom Vintage Analogue Camera Viewfinder Cursor */}
      <CustomCursor activeSection={activeSection} />

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
