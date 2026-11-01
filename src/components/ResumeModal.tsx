"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Download, FileText, CheckCircle2, ExternalLink } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const handleDownload = () => {
    // Direct download trigger
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Soumyadip_Sen_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl bg-[#101014] border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 z-10 overflow-hidden"
          >
            {/* Top vintage stamp ribbon */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400/40 via-zinc-400/60 to-amber-400/40" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-200">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white tracking-tight">
                  Curriculum Vitae
                </h3>
                <p className="text-sm font-mono text-zinc-400 mt-0.5">
                  Soumyadip Sen • Software Engineer & Full-Stack Developer
                </p>
              </div>
            </div>

            {/* Summary Highlights */}
            <div className="space-y-4 py-3 border-y border-white/5 my-5 text-sm text-zinc-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Specialized in Modern Web Architecture, Next.js, React & TypeScript</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Full-Stack & Cloud Engineering with Google Cloud Platform, Python, Node.js</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Creative UI/UX, High-performance interactive animations & design systems</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 transition-all shadow-lg shadow-white/5"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button
                onClick={onClose}
                className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-sm font-medium transition-all border border-white/10"
              >
                Close Preview
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

