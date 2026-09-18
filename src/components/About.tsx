"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Terminal,
  User,
} from "lucide-react";
import Image from "next/image";
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from "./ui/ScrollReveal";

interface StatCard {
  label: string;
  value: string;
  subtext: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  tag: string;
}

const STATS: StatCard[] = [
  {
    label: "Formal Education",
    value: "Tangail Polytechnic",
    subtext: "Diploma in CST (6th Semester)",
    icon: GraduationCap,
    gradient: "from-blue-500 to-indigo-600",
    tag: "Core CS Fundamentals",
  },
  {
    label: "Active Production",
    value: "Full-Stack Intern",
    subtext: "Cyber Bit Byte (Live Platforms)",
    icon: Briefcase,
    gradient: "from-emerald-400 to-teal-600",
    tag: "Production Engineering",
  },
  {
    label: "Verified Honors",
    value: "Blackbelt Developer",
    subtext: "Programming Hero (Batch 13)",
    icon: ShieldCheck,
    gradient: "from-amber-400 to-yellow-500",
    tag: "Top Distinction Graduate",
  },
  {
    label: "Architecture Stack",
    value: "Next.js & MERN",
    subtext: "App Router, TS, Node, Mongo",
    icon: Terminal,
    gradient: "from-cyan-400 to-blue-500",
    tag: "Scalable Systems",
  },
];

function Interactive3DStatCard({ stat }: { stat: StatCard }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const Icon = stat.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;

    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className="bg-white/90 dark:bg-zinc-900/80 rounded-2xl p-5 border border-slate-200/90 dark:border-white/10 hover:border-indigo-400 dark:hover:border-cyan-400/50 shadow-md dark:shadow-xl transition-all duration-300 group relative overflow-hidden flex flex-col justify-between h-full"
    >
      {/* Top Header: Icon & Tag */}
      <div className="flex items-center justify-between gap-2 mb-3" style={{ transform: "translateZ(20px)" }}>
        <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${stat.gradient} text-white font-bold shadow-md shrink-0`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700 font-semibold tracking-tight">
          {stat.tag}
        </span>
      </div>

      {/* Body: Value & Subtext */}
      <div style={{ transform: "translateZ(15px)" }} className="space-y-1 mt-1">
        <h4 className="text-[11px] font-mono uppercase tracking-wider text-indigo-600 dark:text-cyan-300 font-bold">
          {stat.label}
        </h4>
        <div className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
          {stat.value}
        </div>
        <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono">
          {stat.subtext}
        </p>
      </div>
    </div>
  );
}

export default function About() {
  const [profileRotateX, setProfileRotateX] = useState(0);
  const [profileRotateY, setProfileRotateY] = useState(0);

  const handleProfileMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;

    setProfileRotateX(((y - centerY) / centerY) * -10);
    setProfileRotateY(((x - centerX) / centerX) * 10);
  };

  const handleProfileMouseLeave = () => {
    setProfileRotateX(0);
    setProfileRotateY(0);
  };

  return (
    <section
      id="about"
      className="relative pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-12 z-10 overflow-x-clip transition-colors duration-300"
      aria-label="About MD. SOHAN - Academic & Professional Background"
    >
      <div className="w-11/12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center space-y-3.5 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 text-xs font-mono tracking-wider shadow-xs dark:shadow-sm">
            <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>BIOGRAPHY & ACADEMIC BACKGROUND</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight">
            Academic Rigour & <span className="text-indigo-600 dark:text-indigo-400">Production Engineering</span>
          </h2>

          <p className="max-w-2xl mx-auto text-slate-600 dark:text-zinc-400 text-xs sm:text-sm md:text-base font-light leading-relaxed">
            6th-Semester Computer Science & Technology student at Tangail Polytechnic Institute, actively deploying production software as a Full-Stack Intern at Cyber Bit Byte.
          </p>
        </ScrollReveal>

        {/* Main Grid Content: Split View / Bento Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Cinematic Developer Photo Frame */}
          <ScrollReveal direction="right" className="lg:col-span-5 flex justify-center w-full">
            <div
              onMouseMove={handleProfileMouseMove}
              onMouseLeave={handleProfileMouseLeave}
              style={{
                transformStyle: "preserve-3d",
                transform: `perspective(1000px) rotateX(${profileRotateX}deg) rotateY(${profileRotateY}deg)`,
              }}
              className="relative bg-white/90 dark:bg-zinc-900/80 p-4 sm:p-5 rounded-3xl border border-slate-200/90 dark:border-zinc-800/80 max-w-md w-full transition-all duration-200 group shadow-lg dark:shadow-2xl"
            >
              {/* Profile Image Wrapper */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
                <Image
                  src="/sohanimage.png"
                  alt="MD. SOHAN Profile Photo"
                  width={600}
                  height={750}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  priority
                />

                {/* Top Status Badges on Photo */}
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
                  {/* Live Industry Intern Pulse Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 dark:bg-zinc-950/90 border border-slate-200/90 dark:border-zinc-800 backdrop-blur-md shadow-md text-xs font-mono">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-slate-800 dark:text-zinc-200 font-semibold text-[11px]">
                      Intern @ Cyber Bit Byte
                    </span>
                  </div>

                  {/* Academic CST Badge */}
                  <div className="px-2.5 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-400/30 text-indigo-700 dark:text-indigo-300 font-mono text-[10px] font-bold shadow-xs">
                    CST 6th Sem
                  </div>
                </div>

                {/* Subtle Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 dark:from-zinc-950 via-transparent to-transparent opacity-85 pointer-events-none" />

                {/* Floating Bottom Card Details */}
                <div
                  style={{ transform: "translateZ(35px)" }}
                  className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 dark:bg-zinc-950/85 border border-slate-200/90 dark:border-zinc-800/80 backdrop-blur-md shadow-xl"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                      <span>Programming Hero Blackbelt</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-500 font-medium">Batch 13</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-zinc-100 tracking-wide">
                    MD. SOHAN
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 font-mono">
                    Full-Stack Engineer & Creative Technologist
                  </p>

                  <div className="mt-2 pt-2 border-t border-slate-200/70 dark:border-zinc-800 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-zinc-400 font-mono">
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <span className="truncate">Tangail Polytechnic Institute (CST)</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Bio Narrative & 4 Telemetry Cards */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Bio Narrative Card */}
            <ScrollReveal direction="left">
              <div className="bg-white/90 dark:bg-zinc-900/80 p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-zinc-800/80 space-y-4 shadow-md dark:shadow-2xl transition-colors duration-300">
                <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider font-semibold">
                  <Terminal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Engineering Arc & Technical Foundation</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-zinc-100 leading-snug">
                  Bridging Foundational Computer Science with High-Scale Web Architecture
                </h3>

                <p className="text-slate-600 dark:text-zinc-300 text-xs sm:text-sm md:text-base leading-relaxed font-light">
                  Hello! I&apos;m <strong className="text-slate-900 dark:text-zinc-100 font-semibold">MD. SOHAN</strong>, a Full-Stack Engineer and 6th-semester Computer Science & Technology student at <strong className="text-indigo-600 dark:text-indigo-400 font-medium">Tangail Polytechnic Institute</strong>. My academic curriculum grounds me in essential computer science principles—data structures, algorithms, system architecture, and algorithmic complexity.
                </p>

                <p className="text-slate-600 dark:text-zinc-300 text-xs sm:text-sm md:text-base leading-relaxed font-light">
                  Complementing this formal rigor, I actively serve as a <strong className="text-emerald-600 dark:text-emerald-400 font-medium">Full-Stack Developer Intern at Cyber Bit Byte</strong>. In this active production role, I engineer scalable, high-availability web systems, dynamic editorial portals, and optimized RESTful services powered by Next.js 16 App Router, TypeScript, Node.js, and MongoDB.
                </p>

                <p className="text-slate-600 dark:text-zinc-300 text-xs sm:text-sm md:text-base leading-relaxed font-light">
                  Recognized as a <span className="text-amber-600 dark:text-amber-400 font-semibold">Programming Hero Blackbelt Developer (Batch 13)</span>, I combine clean architecture, JWT/OAuth security, Stripe payment workflows, and interactive 3D WebGL experiences using Three.js and Framer Motion.
                </p>

                {/* Tech & Milestone Feature Chips */}
                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className="px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 font-medium">
                    🎓 CST @ Tangail Polytechnic (6th Sem)
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-medium">
                    💼 Cyber Bit Byte Intern
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-300 font-medium">
                    ⚡ Next.js App Router & ISR
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-300 font-medium">
                    🥋 PH Blackbelt (Batch 13)
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* 3D Tilt Telemetry Cards Grid with Stagger */}
            <ScrollRevealStagger className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <ScrollRevealItem key={stat.label}>
                  <Interactive3DStatCard stat={stat} />
                </ScrollRevealItem>
              ))}
            </ScrollRevealStagger>
          </div>
        </div>
      </div>
    </section>
  );
}
