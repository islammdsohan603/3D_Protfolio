"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  Terminal,
  Cpu,
  Globe,
  FileText,
  Layers,
  Lock,
  Server,
  TrendingUp,
  Activity,
  ArrowUpRight,
  Code2,
} from "lucide-react";
import {
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
} from "react-icons/si";

export default function CurrentWorkSection() {
  const [activeHudTab, setActiveHudTab] = useState<"terminal" | "architecture" | "telemetry">("terminal");

  return (
    <section id="experience" className="relative py-28 z-10 overflow-hidden bg-[#08090b]">
      {/* Sci-Fi Ambient Glow Backdrop */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-gradient-to-br from-cyan-500/10 via-indigo-500/10 to-purple-500/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono tracking-wider shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <Briefcase className="w-4 h-4 text-indigo-400" />
            <span>LIVE INDUSTRY ENGINEERING</span>
          </div>

          <h2 className="text-3xl sm:text-6xl font-extrabold text-white tracking-tight">
            Work Experience & <span className="text-gradient-cyan">Active Production</span>
          </h2>

          <p className="max-w-3xl mx-auto text-zinc-400 text-sm sm:text-base leading-relaxed">
            Delivering high-availability web architectures, production news media platforms, and high-throughput REST API services.
          </p>
        </motion.div>

        {/* Main Bento Spotlight Experience Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl bg-zinc-900/60 border border-zinc-800/90 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl overflow-hidden group"
        >
          {/* Ambient Card Border Torch Effect */}
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Card Top Banner Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10 relative z-10">
            <div className="flex items-center gap-4">
              {/* Company Logo Badge */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-indigo-500/20 to-purple-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(0,242,254,0.25)] shrink-0">
                <Building2 className="w-7 h-7" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Cyber Bit Byte
                  </h3>
                  {/* Live Pulse Production Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>BUILDING IN PRODUCTION</span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 mt-1">
                  <span className="text-cyan-400 font-semibold flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" /> Full-Stack Developer Intern
                  </span>
                  <span className="flex items-center gap-1 text-zinc-400">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" /> Active Role (2026)
                  </span>
                  <span className="flex items-center gap-1 text-zinc-400">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" /> Remote / Production Team
                  </span>
                </div>
              </div>
            </div>

            {/* Flagship Project Pill */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono text-zinc-300">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>FLAGSHIP: <strong className="text-white">News & Media Portal</strong></span>
            </div>
          </div>

          {/* Asymmetric 2-Column Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
            {/* Left Column (Recruiter Signal & Impact Highlights) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Senior-Leaning Architectural Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/5 flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold">
                    <Zap className="w-4 h-4" />
                    <span>HYBRID ARCH</span>
                  </div>
                  <div className="text-sm font-bold text-white mt-1">SSR & ISR Pipelines</div>
                  <div className="text-[11px] text-zinc-400 font-mono mt-0.5">Sub-200ms page loads</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/5 flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-purple-400 text-xs font-mono font-semibold">
                    <Lock className="w-4 h-4" />
                    <span>SECURITY</span>
                  </div>
                  <div className="text-sm font-bold text-white mt-1">Role-Based ACL</div>
                  <div className="text-[11px] text-zinc-400 font-mono mt-0.5">Admin, Editor, Author</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/5 flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    <span>DISCOVERABILITY</span>
                  </div>
                  <div className="text-sm font-bold text-white mt-1">Dynamic SEO Engine</div>
                  <div className="text-[11px] text-zinc-400 font-mono mt-0.5">Breaking news indexing</div>
                </div>
              </div>

              {/* Bulleted Impact Points */}
              <div className="space-y-3.5 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2 font-bold">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>KEY RESPONSIBILITIES & ENGINEERING IMPACT</span>
                </h4>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/40 border border-white/5 hover:border-cyan-500/30 transition-all">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-zinc-200 font-medium">
                        <strong className="text-white">Dynamic Editorial & News Engine:</strong> Architecting modular publishing flows with granular Role-Based Access Control (RBAC) separating Admin controls, Editor review workflows, and Author content drafts.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/40 border border-white/5 hover:border-cyan-500/30 transition-all">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-zinc-200 font-medium">
                        <strong className="text-white">High-Throughput Content Delivery:</strong> Leveraging Next.js App Router for Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR) ensuring sub-second rendering latency and breaking-news SEO indexing.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/40 border border-white/5 hover:border-cyan-500/30 transition-all">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-zinc-200 font-medium">
                        <strong className="text-white">Resilient Backend Architecture:</strong> Engineering Node.js/Express REST API endpoints optimized with MongoDB aggregation pipelines for instant article search, category filtering, and real-time trending metrics.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/40 border border-white/5 hover:border-cyan-500/30 transition-all">
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-zinc-200 font-medium">
                        <strong className="text-white">Modern Reader Experience:</strong> Crafting responsive, accessible UI layouts with interactive reading modes, rich media embeds, and clean glassmorphism dark mode styling.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div className="pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3 font-bold">
                  PRODUCTION STACK USED
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs font-semibold text-zinc-200">
                    <SiNextdotjs className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Next.js App Router</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs font-semibold text-zinc-200">
                    <SiTypescript className="w-3.5 h-3.5 text-sky-400" />
                    <span>TypeScript</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs font-semibold text-zinc-200">
                    <SiNodedotjs className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Node.js</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs font-semibold text-zinc-200">
                    <SiExpress className="w-3.5 h-3.5 text-zinc-300" />
                    <span>Express.js</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs font-semibold text-zinc-200">
                    <SiMongodb className="w-3.5 h-3.5 text-emerald-500" />
                    <span>MongoDB Atlas</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs font-semibold text-zinc-200">
                    <SiTailwindcss className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Tailwind CSS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Interactive Terminal & Telemetry HUD Window) */}
            <div className="lg:col-span-5 w-full">
              <div className="rounded-2xl bg-slate-950 border border-zinc-800 shadow-2xl overflow-hidden font-mono text-xs">
                {/* HUD Header Bar & Tabs */}
                <div className="px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-zinc-400 text-[11px] font-semibold hidden sm:inline">
                      cyberbitbyte-news-engine.sys
                    </span>
                  </div>

                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-white/5">
                    <button
                      onClick={() => setActiveHudTab("terminal")}
                      className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer text-[10px] ${
                        activeHudTab === "terminal"
                          ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Terminal
                    </button>
                    <button
                      onClick={() => setActiveHudTab("architecture")}
                      className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer text-[10px] ${
                        activeHudTab === "architecture"
                          ? "bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      ACL Spec
                    </button>
                    <button
                      onClick={() => setActiveHudTab("telemetry")}
                      className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer text-[10px] ${
                        activeHudTab === "telemetry"
                          ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Metrics
                    </button>
                  </div>
                </div>

                {/* HUD Content Area */}
                <div className="p-5 space-y-3 min-h-[360px] bg-slate-950/95 leading-relaxed text-zinc-300">
                  <AnimatePresence mode="wait">
                    {activeHudTab === "terminal" && (
                      <motion.div
                        key="terminal"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2.5"
                      >
                        <div className="text-zinc-500 flex items-center gap-2">
                          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Initializing Cyber Bit Byte Portal Pipeline...</span>
                        </div>

                        <div className="text-cyan-400">
                          &gt; next build --turbopack
                        </div>
                        <div className="text-emerald-400">
                          ✓ Compiled /news/[category]/[slug] (ISR 60s) in 142ms
                        </div>
                        <div className="text-emerald-400">
                          ✓ MongoDB aggregation index hit: {`{ status: "published" }`}
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900/90 border border-cyan-500/20 my-3 text-[11px] text-zinc-300 space-y-1">
                          <div className="text-cyan-300 font-bold flex items-center justify-between">
                            <span>HTTP POST /api/v1/articles/publish</span>
                            <span className="text-emerald-400">201 CREATED</span>
                          </div>
                          <div className="text-zinc-400">
                            Payload: {`{ title: "Enterprise News Portal", role: "EDITOR" }`}
                          </div>
                          <div className="text-emerald-400 font-mono text-[10px]">
                            Speed: 184ms | Cache-Control: s-maxage=60, stale-while-revalidate
                          </div>
                        </div>

                        <div className="text-purple-400 flex items-center gap-2 pt-2">
                          <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                          <span>RBAC Verification: Authorized [ADMIN_SCOPE_GRANTED]</span>
                        </div>

                        <div className="flex items-center gap-2 text-zinc-400 pt-3 border-t border-white/5">
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                          <span>Listening for live editorial webhook broadcasts...</span>
                        </div>
                      </motion.div>
                    )}

                    {activeHudTab === "architecture" && (
                      <motion.div
                        key="architecture"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3"
                      >
                        <div className="text-purple-400 font-bold flex items-center gap-2">
                          <Lock className="w-4 h-4 text-purple-400" />
                          <span>Role-Based Access Matrix (RBAC)</span>
                        </div>

                        <div className="space-y-2">
                          <div className="p-2.5 rounded-lg bg-slate-900 border border-purple-500/30 flex justify-between items-center">
                            <div>
                              <span className="text-purple-300 font-bold text-[11px]">ROLE: ADMIN</span>
                              <p className="text-[10px] text-zinc-400">Full platform controls & analytics</p>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px]">ALL PERMISSIONS</span>
                          </div>

                          <div className="p-2.5 rounded-lg bg-slate-900 border border-cyan-500/30 flex justify-between items-center">
                            <div>
                              <span className="text-cyan-300 font-bold text-[11px]">ROLE: EDITOR</span>
                              <p className="text-[10px] text-zinc-400">Review, schedule & publish drafts</p>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px]">PUBLISH & REVISE</span>
                          </div>

                          <div className="p-2.5 rounded-lg bg-slate-900 border border-emerald-500/30 flex justify-between items-center">
                            <div>
                              <span className="text-emerald-300 font-bold text-[11px]">ROLE: AUTHOR</span>
                              <p className="text-[10px] text-zinc-400">Write drafts & media submission</p>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">DRAFT & SUBMIT</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeHudTab === "telemetry" && (
                      <motion.div
                        key="telemetry"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <div className="text-emerald-400 font-bold flex items-center gap-2">
                          <Activity className="w-4 h-4 text-emerald-400" />
                          <span>Production Engine Telemetry</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
                            <span className="text-zinc-400 text-[10px]">LIGHTHOUSE SCORE</span>
                            <div className="text-lg font-bold text-emerald-400">98 / 100</div>
                            <span className="text-[9px] text-zinc-500">SEO & Performance</span>
                          </div>

                          <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
                            <span className="text-zinc-400 text-[10px]">ISR REVALIDATION</span>
                            <div className="text-lg font-bold text-cyan-400">60 Seconds</div>
                            <span className="text-[9px] text-zinc-500">Zero DB Overhead</span>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-2">
                          <div className="flex justify-between text-[10px] text-zinc-400">
                            <span>SEARCH INDEX LATENCY</span>
                            <span className="text-cyan-400 font-bold">18ms</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden">
                            <div className="h-full bg-cyan-400 rounded-full w-[92%]" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
