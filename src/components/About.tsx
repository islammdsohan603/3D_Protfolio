"use client";

import React, { useState } from "react";
import { User, ShieldCheck, Terminal, Rocket, Cpu } from "lucide-react";
import Image from "next/image";
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from "./ui/ScrollReveal";

interface StatCard {
  label: string;
  value: string;
  subtext: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

const STATS: StatCard[] = [
  {
    label: "Experience",
    value: "2.5+ Yrs",
    subtext: "Full-Stack Development",
    icon: Terminal,
    gradient: "from-cyan-400 to-blue-600",
  },
  {
    label: "Projects Completed",
    value: "20+ Live",
    subtext: "Next.js & MERN Platforms",
    icon: Rocket,
    gradient: "from-purple-400 to-pink-500",
  },
  {
    label: "Problem Solving",
    value: "1000+ Hrs",
    subtext: "Algorithms & Web Logic",
    icon: Cpu,
    gradient: "from-emerald-400 to-teal-600",
  },
  {
    label: "Programming Hero",
    value: "Blackbelt",
    subtext: "Batch 13 Top Graduate",
    icon: ShieldCheck,
    gradient: "from-amber-400 to-yellow-500",
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

    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;

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
      className="glass-card rounded-2xl p-5 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group relative overflow-hidden h-full"
    >
      <div className="flex items-center gap-3 mb-3" style={{ transform: "translateZ(20px)" }}>
        <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${stat.gradient} text-black font-bold shadow-md`}>
          <Icon className="w-5 h-5 text-black" />
        </div>
        <div>
          <span className="text-xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
            {stat.value}
          </span>
        </div>
      </div>

      <div style={{ transform: "translateZ(10px)" }}>
        <h4 className="text-sm font-bold text-cyan-300">{stat.label}</h4>
        <p className="text-xs text-zinc-400 font-mono mt-0.5">{stat.subtext}</p>
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
    <section id="about" className="relative py-16 sm:py-20 md:py-24 lg:py-32 z-10 overflow-x-clip">
      <div className="w-11/12 max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollReveal className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 text-xs font-mono tracking-wider">
            <User className="w-4 h-4 text-indigo-400" />
            <span>BIOGRAPHY & BACKGROUND</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight">
            About <span className="text-indigo-400">MD. SOHAN</span>
          </h2>

          <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base font-light">
            Dedicated Full-Stack Web Developer combining modern Next.js architecture, robust backend APIs, and futuristic 3D creative user experiences.
          </p>
        </ScrollReveal>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: High-Res Presentation of /sohanimage.png */}
          <ScrollReveal direction="right" className="lg:col-span-5 flex justify-center w-full">
            <div
              onMouseMove={handleProfileMouseMove}
              onMouseLeave={handleProfileMouseLeave}
              style={{
                transformStyle: "preserve-3d",
                transform: `perspective(1000px) rotateX(${profileRotateX}deg) rotateY(${profileRotateY}deg)`,
              }}
              className="relative glass-card p-4 sm:p-5 rounded-3xl border border-zinc-800/80 max-w-md w-full transition-all duration-200 group"
            >
              {/* Profile Image Wrapper */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-zinc-900 border border-zinc-800">
                <Image
                  src="/sohanimage.png"
                  alt="MD. SOHAN Profile Photo"
                  width={600}
                  height={750}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Cyberpunk Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 pointer-events-none" />

                {/* Floating Overlay Badge */}
                <div
                  style={{ transform: "translateZ(35px)" }}
                  className="absolute bottom-5 left-5 right-5 p-4 rounded-xl glass-card border border-zinc-800 backdrop-blur-md"
                >
                  <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-semibold mb-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Programming Hero Blackbelt</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-100 tracking-wide">MD. SOHAN</h3>
                  <p className="text-xs text-zinc-400 font-mono">Creative Technologist & Next.js Specialist</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Bio & 3D Stats Cards */}
          <div className="lg:col-span-7 space-y-8">
            {/* Bio Narrative Card */}
            <ScrollReveal direction="left">
              <div className="glass-card p-6 sm:p-8 rounded-3xl border border-zinc-800/80 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider">
                  <Terminal className="w-4 h-4 text-indigo-400" />
                  <span>Developer Journey</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-100 leading-snug">
                  Engineering Modern, High-Performance Web Applications
                </h3>

                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
                  Hello! I&apos;m <strong className="text-zinc-100 font-semibold">MD. SOHAN</strong>, a passionate Full-Stack Web Developer based in Bangladesh. My passion lies in building scalable, user-focused web applications with clean Next.js App Router architecture, TypeScript, React, Node.js, Express, and MongoDB.
                </p>

                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
                  Recognized as a <span className="text-amber-400 font-semibold">Programming Hero Blackbelt Developer</span> (Batch 13), I take pride in writing modular code, designing responsive glassmorphic interfaces, integrating payment gateways (Stripe), real-time authentication (JWT/Firebase), and building immersive 3D web experiences using Three.js and Framer Motion.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-cyan-300">
                  <span className="px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/30">
                    ⚡ Next.js App Router
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-purple-950/80 border border-purple-500/30">
                    🛡️ Full-Stack Security
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/30">
                    🎨 3D & Framer Motion
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* 3D Tilt Stats Cards Grid with Stagger */}
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
