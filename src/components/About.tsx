"use client";

import React from "react";
import dynamic from "next/dynamic";
import {
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Terminal,
  User,
} from "lucide-react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from "./ui/ScrollReveal";

// ── Dynamic imports: no SSR to prevent hydration mismatch ─────────────────────
const AboutBackground3D = dynamic(
  () => import("./canvas/AboutBackground3D"),
  { ssr: false, loading: () => null }
);

const AvatarPedestal3D = dynamic(
  () => import("./canvas/AvatarPedestal3D"),
  { ssr: false, loading: () => null }
);

// ── Types ──────────────────────────────────────────────────────────────────────
interface StatCard {
  label: string;
  value: string;
  subtext: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  tag: string;
  accentColor: string;
}

// ── Data ───────────────────────────────────────────────────────────────────────
const STATS: StatCard[] = [
  {
    label: "Formal Education",
    value: "Tangail Polytechnic",
    subtext: "Diploma in CST (6th Semester)",
    icon: GraduationCap,
    gradient: "from-blue-500 to-indigo-600",
    tag: "Core CS Fundamentals",
    accentColor: "#6366f1",
  },
  {
    label: "Active Production",
    value: "Full-Stack Intern",
    subtext: "Cyber Bit Byte (Live Platforms)",
    icon: Briefcase,
    gradient: "from-emerald-400 to-teal-600",
    tag: "Production Engineering",
    accentColor: "#10b981",
  },
  {
    label: "Verified Honors",
    value: "Blackbelt Developer",
    subtext: "Programming Hero (Batch 13)",
    icon: ShieldCheck,
    gradient: "from-amber-400 to-yellow-500",
    tag: "Top Distinction Graduate",
    accentColor: "#f59e0b",
  },
  {
    label: "Architecture Stack",
    value: "Next.js & MERN",
    subtext: "App Router, TS, Node, Mongo",
    icon: Terminal,
    gradient: "from-cyan-400 to-blue-500",
    tag: "Scalable Systems",
    accentColor: "#00f2fe",
  },
];

// ── Framer-Motion-powered 3D tilt stat card ────────────────────────────────────
function Interactive3DStatCard({ stat }: { stat: StatCard }) {
  const Icon = stat.icon;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springCfg = { damping: 22, stiffness: 260, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springCfg);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springCfg);

  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width  - 0.5);
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5);
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative bg-white/90 dark:bg-zinc-900/80 rounded-2xl p-5 border border-slate-200/90 dark:border-white/10 hover:border-indigo-400 dark:hover:border-cyan-400/50 shadow-md dark:shadow-xl transition-colors duration-300 group overflow-hidden flex flex-col justify-between h-full"
      >
        {/* Dynamic spotlight glow */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [spotX, spotY],
              ([x, y]) =>
                `radial-gradient(380px circle at ${x}px ${y}px, ${stat.accentColor}18, transparent 70%)`
            ),
          }}
        />

        {/* Hairline accent border */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: `inset 0 0 0 1px ${stat.accentColor}35` }}
        />

        {/* Top header: Icon & tag */}
        <div className="flex items-center justify-between gap-2 mb-3" style={{ transform: "translateZ(20px)" }}>
          <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${stat.gradient} text-white font-bold shadow-md shrink-0`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700 font-semibold tracking-tight">
            {stat.tag}
          </span>
        </div>

        {/* Body: value & subtext */}
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

        {/* Corner ambient glow */}
        <div
          className="pointer-events-none absolute -bottom-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-25 transition-opacity duration-500"
          style={{ backgroundColor: stat.accentColor }}
        />
      </motion.div>
    </div>
  );
}

// ── Profile card with holographic pedestal ─────────────────────────────────────
function ProfileCard() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { damping: 20, stiffness: 200, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springCfg);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springCfg);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width  - 0.5);
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    // Outer wrapper: relative + pb for pedestal overflow space
    <div className="relative w-full max-w-md pb-16">
      {/* 3D Holographic Pedestal — renders beneath the card */}
      <AvatarPedestal3D height={200} />

      {/* Profile card */}
      <div
        style={{ perspective: 1000 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative z-10"
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative bg-white/90 dark:bg-zinc-900/80 p-4 sm:p-5 rounded-3xl border border-slate-200/90 dark:border-zinc-800/80 w-full transition-colors duration-200 group shadow-lg dark:shadow-2xl"
        >
          {/* Profile Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
            <Image
              src="/sohanimage.png"
              alt="MD. SOHAN Profile Photo"
              width={600}
              height={750}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              priority
            />

            {/* Status badges */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 dark:bg-zinc-950/90 border border-slate-200/90 dark:border-zinc-800 backdrop-blur-md shadow-md text-xs font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-slate-800 dark:text-zinc-200 font-semibold text-[11px]">
                  Intern @ Cyber Bit Byte
                </span>
              </div>

              <div className="px-2.5 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-400/30 text-indigo-700 dark:text-indigo-300 font-mono text-[10px] font-bold shadow-xs">
                CST 6th Sem
              </div>
            </div>

            {/* Cinematic vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 dark:from-zinc-950 via-transparent to-transparent opacity-85 pointer-events-none" />

            {/* Bottom name card */}
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
        </motion.div>
      </div>
    </div>
  );
}

// ── Main About section ─────────────────────────────────────────────────────────
export default function About() {
  return (
    <section
      id="about"
      className="relative pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-12 z-10 overflow-x-clip transition-colors duration-300"
      aria-label="About MD. SOHAN - Academic & Professional Background"
    >
      {/* ── 3D Cybernetic Background Canvas ─────────────────────────────── */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <AboutBackground3D />
        {/* Radial vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100/60 via-slate-100/30 to-slate-100/80 dark:from-zinc-950/60 dark:via-zinc-950/25 dark:to-zinc-950/85 pointer-events-none" />
      </div>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <div className="w-11/12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal className="text-center space-y-3.5 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 text-xs font-mono tracking-wider shadow-xs dark:shadow-sm">
            <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>BIOGRAPHY & ACADEMIC BACKGROUND</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight">
            Academic Rigour &{" "}
            <span className="text-indigo-600 dark:text-indigo-400">Production Engineering</span>
          </h2>

          <p className="max-w-2xl mx-auto text-slate-600 dark:text-zinc-400 text-xs sm:text-sm md:text-base font-light leading-relaxed">
            6th-Semester Computer Science & Technology student at Tangail Polytechnic Institute,
            actively deploying production software as a Full-Stack Intern at Cyber Bit Byte.
          </p>
        </ScrollReveal>

        {/* Main grid: Photo + Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left column: Profile card with holographic pedestal */}
          <ScrollReveal direction="right" className="lg:col-span-5 flex justify-center w-full">
            <ProfileCard />
          </ScrollReveal>

          {/* Right column: Bio + telemetry cards */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Bio narrative */}
            <ScrollReveal direction="left">
              <div className="bg-white/90 dark:bg-zinc-900/80 p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-zinc-800/80 space-y-4 shadow-md dark:shadow-2xl transition-colors duration-300 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider font-semibold">
                  <Terminal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Engineering Arc & Technical Foundation</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-zinc-100 leading-snug">
                  Bridging Foundational Computer Science with High-Scale Web Architecture
                </h3>

                <p className="text-slate-600 dark:text-zinc-300 text-xs sm:text-sm md:text-base leading-relaxed font-light">
                  Hello! I&apos;m{" "}
                  <strong className="text-slate-900 dark:text-zinc-100 font-semibold">MD. SOHAN</strong>, a
                  Full-Stack Engineer and 6th-semester Computer Science & Technology student at{" "}
                  <strong className="text-indigo-600 dark:text-indigo-400 font-medium">
                    Tangail Polytechnic Institute
                  </strong>
                  . My academic curriculum grounds me in essential computer science principles — data
                  structures, algorithms, system architecture, and algorithmic complexity.
                </p>

                <p className="text-slate-600 dark:text-zinc-300 text-xs sm:text-sm md:text-base leading-relaxed font-light">
                  Complementing this formal rigor, I actively serve as a{" "}
                  <strong className="text-emerald-600 dark:text-emerald-400 font-medium">
                    Full-Stack Developer Intern at Cyber Bit Byte
                  </strong>
                  . In this active production role, I engineer scalable, high-availability web systems,
                  dynamic editorial portals, and optimized RESTful services powered by Next.js 16 App
                  Router, TypeScript, Node.js, and MongoDB.
                </p>

                <p className="text-slate-600 dark:text-zinc-300 text-xs sm:text-sm md:text-base leading-relaxed font-light">
                  Recognized as a{" "}
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">
                    Programming Hero Blackbelt Developer (Batch 13)
                  </span>
                  , I combine clean architecture, JWT/OAuth security, Stripe payment workflows, and
                  interactive 3D WebGL experiences using Three.js and Framer Motion.
                </p>

                {/* Tech & milestone chips */}
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

            {/* 3D tilt telemetry cards grid */}
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
