"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <section
      id="contact"
      className="relative min-h-[80vh] w-full py-24 px-6 md:pl-56 md:pr-12 max-w-7xl mx-auto flex flex-col justify-center border-t border-white/5"
    >
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
          06 // Inquiries
        </span>
        <div className="h-[1px] w-12 bg-zinc-800" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 space-y-6">
          <h2 className="font-typewriter text-3xl md:text-4xl text-white tracking-wide">
            Let&apos;s Connect
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed font-light">
            I am currently open to freelance software engineering projects, full stack collaborations, and technology roles. Reach out directly or send a message below.
          </p>

          <div className="space-y-3.5 pt-2">
            <a
              href="mailto:sensoumyadip2006@gmail.com"
              className="flex items-center gap-3.5 p-3.5 rounded-xl bg-zinc-900/40 hover:bg-zinc-900 border border-white/5 hover:border-white/10 text-zinc-300 hover:text-white transition-all text-xs sm:text-sm font-mono"
            >
              <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
              <span>sensoumyadip2006@gmail.com</span>
            </a>

            <a
              href="tel:+917044685810"
              className="flex items-center gap-3.5 p-3.5 rounded-xl bg-zinc-900/40 hover:bg-zinc-900 border border-white/5 hover:border-white/10 text-zinc-300 hover:text-white transition-all text-xs sm:text-sm font-mono"
            >
              <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
              <span>+91 7044685810</span>
            </a>

            <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-zinc-900/40 border border-white/5 text-zinc-400 text-xs sm:text-sm font-mono">
              <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
              <span>Barrackpore, Kolkata, West Bengal, India</span>
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href="https://github.com/Soumyadip-25"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-900/40 hover:bg-zinc-900 border border-white/5 hover:border-white/10 text-zinc-300 hover:text-white transition-all text-xs font-mono"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/soumyadip-sen-0937b1311"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-900/40 hover:bg-zinc-900 border border-white/5 hover:border-white/10 text-zinc-300 hover:text-white transition-all text-xs font-mono"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-8 rounded-2xl bg-zinc-900/30 border border-white/5 backdrop-blur-sm space-y-4"
          >
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Your Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ada Lovelace"
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ada@example.com"
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Message
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share your thoughts or project vision..."
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 transition-colors text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-medium text-sm transition-all shadow-lg ${
                submitted
                  ? "bg-emerald-600 text-white"
                  : "bg-white hover:bg-zinc-200 text-zinc-950 font-semibold"
              }`}
            >
              {submitted ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Message Sent Successfully</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Dispatch Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4">
        <p>© {new Date().getFullYear()} Soumyadip Sen. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span>FILM FORMAT: 35MM NOIR</span>
          <span className="w-1 h-1 rounded-full bg-zinc-600" />
          <span>EST. 1996</span>
        </p>
      </div>
    </section>
  );
}
