"use client";

import React, { useState, useEffect } from "react";
import { Download, Mail, MessageCircle, ArrowRight, ShieldCheck, Terminal } from "lucide-react";
import confetti from "canvas-confetti";
import AntigravityCanvasWrapper from "./canvas/AntigravityCanvasWrapper";
import Image from "next/image";
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from "./ui/ScrollReveal";

const RESUME_DOWNLOAD_URL = "https://drive.google.com/uc?export=download&id=1gg2hVewdNubgbXD7JEXdMLieLW3hXG0s";

const ROLES = [
  "Full-Stack Web Developer",
  "Next.js App Router Architect",
  "Programming Hero BLACKBELT",
  "Node.js & MongoDB Specialist",
  "Enterprise System Developer",
];

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const [cardRotateX, setCardRotateX] = useState(0);
  const [cardRotateY, setCardRotateY] = useState(0);

  useEffect(() => {
    const targetRole = ROLES[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(targetRole.substring(0, displayText.length + 1));
        if (displayText === targetRole) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(targetRole.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex]);

  const handleDownloadResume = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.3 },
      colors: ["#6366f1", "#38bdf8", "#10b981"],
    });

    const link = document.createElement("a");
    link.href = RESUME_DOWNLOAD_URL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;

    setCardRotateX(((y - centerY) / centerY) * -12);
    setCardRotateY(((x - centerX) / centerX) * 12);
  };

  const handleCardMouseLeave = () => {
    setCardRotateX(0);
    setCardRotateY(0);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-12 overflow-x-clip transition-colors duration-300"
    >
      {/* 3D Antigravity Canvas Background */}
      <AntigravityCanvasWrapper />

      <div className="relative z-10 w-11/12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Column: Text & CTAs */}
        <ScrollRevealStagger className="flex-1 text-center lg:text-left space-y-6 w-full">
          {/* Status Badge */}
          <ScrollRevealItem>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 text-xs font-mono tracking-wide shadow-xs dark:shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 -ml-4" />
              <span className="text-slate-800 dark:text-zinc-300 font-medium">AVAILABLE FOR HIRE & CONTRACTS</span>
            </div>
          </ScrollRevealItem>

          {/* Headline */}
          <ScrollRevealItem>
            <div className="space-y-2">
              <h2 className="text-lg sm:text-xl md:text-2xl font-mono text-slate-500 dark:text-zinc-400 font-light">
                Hello, World! 👋 I&apos;m
              </h2>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100 leading-tight sm:leading-none">
                MD. SOHAN
              </h1>
            </div>
          </ScrollRevealItem>

          {/* Typing Role Animation */}
          <ScrollRevealItem>
            <div className="h-12 flex items-center justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-sm sm:text-lg md:text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
                <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>{displayText}</span>
                <span className="w-1 h-5 sm:h-6 bg-indigo-600 dark:bg-indigo-400 animate-pulse inline-block" />
              </div>
            </div>
          </ScrollRevealItem>

          {/* Value proposition paragraph */}
          <ScrollRevealItem>
            <p className="max-w-2xl text-sm sm:text-base md:text-lg text-slate-600 dark:text-zinc-400 font-light leading-relaxed mx-auto lg:mx-0">
              Creative Technologist & Full-Stack Engineer crafting high-performance interactive web experiences, robust Next.js App Router architectures, and scalable cloud systems. Recognized as a <span className="text-slate-900 dark:text-zinc-200 font-medium">Programming Hero Blackbelt Developer</span>.
            </p>
          </ScrollRevealItem>

          {/* CTA Buttons */}
          <ScrollRevealItem>
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              {/* Download Resume Button — Accent CTA */}
              <button
                onClick={handleDownloadResume}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm px-6 sm:px-7 py-3 rounded-xl transition-colors duration-200 flex items-center gap-2 cursor-pointer shadow-xs min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span>Download CV / Resume</span>
              </button>

              {/* Contact Me — Primary CTA */}
              <a
                href="#contact"
                className="border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-800 dark:text-zinc-100 text-xs sm:text-sm font-medium px-6 sm:px-7 py-3 rounded-xl shadow-xs dark:shadow-sm transition-all duration-300 flex items-center gap-2 group min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 dark:text-zinc-400 group-hover:text-slate-800 dark:group-hover:text-zinc-200 transition-colors" />
                <span>Contact Me</span>
                <ArrowRight className="w-4 h-4 text-slate-400 dark:text-zinc-400 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* WhatsApp Direct */}
              <a
                href="https://wa.me/8801849468455"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-slate-300 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/60 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white text-xs sm:text-sm font-medium px-5 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 min-h-[44px] shadow-xs"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 dark:text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </ScrollRevealItem>

          {/* Quick Metrics Bar */}
          <ScrollRevealItem>
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-white/[0.08] max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-xl sm:text-3xl font-extrabold font-mono text-cyan-600 dark:text-cyan-400">100%</div>
                <div className="text-[10px] sm:text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-xl sm:text-3xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">Batch 13</div>
                <div className="text-[10px] sm:text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Blackbelt Rank</div>
              </div>
              <div>
                <div className="text-xl sm:text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">10+</div>
                <div className="text-[10px] sm:text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Live Projects</div>
              </div>
            </div>
          </ScrollRevealItem>
        </ScrollRevealStagger>

        {/* Right Column: 3D Profile Avatar Card featuring /sohanimage.png */}
        <ScrollReveal direction="left" delay={0.2} className="flex-1 flex items-center justify-center relative w-full">
          {/* Ring Backdrop Glow */}
          <div className="absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-cyan-500/20 to-indigo-600/20 blur-3xl animate-pulse-ring pointer-events-none" />

          {/* 3D Tilt Card */}
          <div
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{
              transformStyle: "preserve-3d",
              transform: `perspective(1000px) rotateX(${cardRotateX}deg) rotateY(${cardRotateY}deg)`,
            }}
            className="relative bg-white/90 dark:bg-white/[0.03] backdrop-blur-xl p-4 rounded-3xl border border-slate-200/90 dark:border-white/[0.08] hover:border-cyan-500/40 max-w-sm sm:max-w-md w-full transition-all duration-300 cursor-pointer shadow-xl dark:shadow-2xl"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-square bg-slate-100 dark:bg-[#0d1117] flex items-center justify-center group border border-slate-200 dark:border-white/[0.05]">
              {/* Sci-Fi Grid Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

              {/* Styled Profile Avatar Representation */}
              <div
                style={{ transform: "translateZ(25px)" }}
                className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-50/90 via-slate-100/90 to-slate-50/90 dark:from-[#0d1117]/80 dark:via-[#08090a] dark:to-[#0d1117] text-center transition-colors duration-300"
              >
                {/* 3D Glowing Orb & Photo Border */}
                <div
                  style={{ transform: "translateZ(35px)" }}
                  className="w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 p-[3px] shadow-[0_0_30px_rgba(56,189,248,0.4)] mb-4 transition-transform group-hover:scale-105 duration-500"
                >
                  <div className="w-full h-full rounded-full bg-white dark:bg-[#08090a] flex items-center justify-center overflow-hidden">
                    <Image
                      src="/sohanimage.png"
                      alt="MD. SOHAN"
                      width={250}
                      height={250}
                      className="w-full h-full object-cover object-center rounded-full"
                    />
                  </div>
                </div>

                <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight">MD. SOHAN</h3>
                <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400 mt-1">Creative Technologist</p>

                {/* Verified Tag */}
                <div
                  style={{ transform: "translateZ(30px)" }}
                  className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  <span>Programming Hero Blackbelt</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
