"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Mail, MessageCircle, ArrowRight, ShieldCheck, Terminal } from "lucide-react";
import confetti from "canvas-confetti";
import AntigravityCanvasWrapper from "./canvas/AntigravityCanvasWrapper";
import Image from "next/image";

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
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* 3D Antigravity Canvas Background */}
      <AntigravityCanvasWrapper />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 w-full">
        {/* Left Column: Text & CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left space-y-6"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wide shadow-[0_0_15px_rgba(56,189,248,0.15)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-4" />
            <span>AVAILABLE FOR HIRE & CONTRACTS</span>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-mono text-zinc-400 font-light">
              Hello, World! 👋 I&apos;m
            </h2>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">
                MD. SOHAN ISLAM
              </span>
            </h1>
          </div>

          {/* Typing Role Animation */}
          <div className="h-12 flex items-center justify-center lg:justify-start">
            <div className="flex items-center gap-2 text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-cyan-400">
              <Terminal className="w-7 h-7 text-indigo-400" />
              <span>{displayText}</span>
              <span className="w-1 h-7 bg-cyan-400 animate-pulse" />
            </div>
          </div>

          {/* Value proposition paragraph */}
          <p className="max-w-2xl text-base sm:text-lg text-zinc-400 font-light leading-relaxed">
            Passionate Full-Stack Web Developer crafting high-performance 3D interactive web applications, robust Next.js architectures, and scalable REST APIs. Recognized as a <span className="text-cyan-400 font-medium">Programming Hero Blackbelt Developer</span>.
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            {/* Download Resume Button */}
            <button
              onClick={handleDownloadResume}
              className="px-7 py-3.5 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-cyan-400 via-indigo-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 shadow-[0_0_25px_rgba(56,189,248,0.3)] hover:shadow-[0_0_35px_rgba(99,102,241,0.5)] transition-all duration-300 flex items-center gap-2 group cursor-pointer"
            >
              <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform text-black" />
              <span>Download CV / Resume</span>
            </button>

            {/* Contact Me */}
            <a
              href="#contact"
              className="px-7 py-3.5 rounded-xl font-semibold text-sm text-zinc-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-cyan-400/40 transition-all duration-300 flex items-center gap-2 group"
            >
              <Mail className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>Contact Me</span>
              <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* WhatsApp Direct */}
            <a
              href="https://wa.me/8801849468455"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-xl font-semibold text-sm text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all duration-300 flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-8 grid grid-cols-3 gap-4 border-t border-white/[0.08] max-w-lg mx-auto lg:mx-0">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400">100%</div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-400">Batch 13</div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider">Blackbelt Rank</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">20+</div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider">Live Projects</div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: 3D Profile Avatar Card featuring /sohanimage.png */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex-1 flex items-center justify-center relative"
        >
          {/* Ring Backdrop Glow */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-cyan-500/20 to-indigo-600/20 blur-3xl animate-pulse-ring pointer-events-none" />

          {/* 3D Tilt Card */}
          <div
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{
              transformStyle: "preserve-3d",
              transform: `perspective(1000px) rotateX(${cardRotateX}deg) rotateY(${cardRotateY}deg)`,
            }}
            className="relative bg-white/[0.03] backdrop-blur-xl p-4 rounded-3xl border border-white/[0.08] hover:border-cyan-500/40 max-w-sm sm:max-w-md w-full transition-all duration-200 cursor-pointer shadow-2xl"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-square bg-[#0d1117] flex items-center justify-center group border border-white/[0.05]">
              {/* Sci-Fi Grid Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

              {/* Styled Profile Avatar Representation */}
              <div
                style={{ transform: "translateZ(25px)" }}
                className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#0d1117]/80 via-[#08090a] to-[#0d1117] text-center"
              >
                {/* 3D Glowing Orb & Photo Border */}
                <div
                  style={{ transform: "translateZ(35px)" }}
                  className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 p-[3px] shadow-[0_0_30px_rgba(56,189,248,0.4)] mb-4 transition-transform group-hover:scale-105 duration-500"
                >
                  <div className="w-full h-full rounded-full bg-[#08090a] flex items-center justify-center overflow-hidden">
                    <Image
                      src="/sohanimage.png"
                      alt="MD. SOHAN ISLAM"
                      width={250}
                      height={250}
                      className="w-full h-full object-cover object-center rounded-full"
                    />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">MD. SOHAN ISLAM</h3>
                <p className="text-xs font-mono text-cyan-400 mt-1">Full-Stack Web Developer</p>

                {/* Verified Tag */}
                <div
                  style={{ transform: "translateZ(30px)" }}
                  className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Programming Hero Blackbelt</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
