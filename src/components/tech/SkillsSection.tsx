"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Layers,
  Code2,
  Server,
  Cloud,
  Radio,
  Sparkles,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { TECH_ITEMS, TechCategoryType, CategoryFilter } from "./techData";
import TechBentoCard from "./TechBentoCard";
import FrontierRadarPod from "./FrontierRadarPod";
import { ScrollReveal } from "../ui/ScrollReveal";

// ── 3D assets (SSR-safe dynamic imports) ─────────────────────────────────────
const OrbitalSphere3D = dynamic(() => import("./OrbitalSphere3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[320px] sm:h-[400px] flex items-center justify-center rounded-3xl bg-slate-100 dark:bg-zinc-950/40 border border-slate-200 dark:border-zinc-800">
      <div className="flex items-center gap-3 text-cyan-600 dark:text-cyan-400 font-mono text-sm">
        <Cpu className="w-5 h-5 animate-spin" />
        <span>INITIALIZING 3D ANTIGRAVITY CORE...</span>
      </div>
    </div>
  ),
});

// Ambient particle background (imported from shared canvas/)
const AmbientParticles3D = dynamic(
  () => import("../canvas/AmbientParticles3D"),
  { ssr: false, loading: () => null }
);

// ─────────────────────────────────────────────────────────────────────────────
const CATEGORY_FILTERS: CategoryFilter[] = [
  { id: "all", label: "All Ecosystems", iconName: "Layers", count: TECH_ITEMS.length },
  {
    id: "frontend",
    label: "Frontend & UI",
    iconName: "Code2",
    count: TECH_ITEMS.filter((i) => i.category === "frontend").length,
  },
  {
    id: "backend",
    label: "Backend & Data",
    iconName: "Server",
    count: TECH_ITEMS.filter((i) => i.category === "backend").length,
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    iconName: "Cloud",
    count: TECH_ITEMS.filter((i) => i.category === "devops").length,
  },
  {
    id: "frontier",
    label: "Frontier Radar",
    iconName: "Radio",
    count: TECH_ITEMS.filter((i) => i.category === "frontier").length,
  },
];

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<TechCategoryType>("all");

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return TECH_ITEMS;
    return TECH_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const stats = useMemo(() => {
    return {
      total: TECH_ITEMS.length,
      mastered: TECH_ITEMS.filter((i) => i.proficiency >= 90).length,
      production: TECH_ITEMS.filter(
        (i) => i.statusTag === "Production Ready" || i.statusTag === "Core Engine"
      ).length,
      frontier: TECH_ITEMS.filter((i) => i.category === "frontier").length,
    };
  }, []);

  return (
    <section
      id="skills"
      className="relative pt-6 sm:pt-10 md:pt-12 pb-8 sm:pb-12 md:pb-16 z-10 overflow-x-clip transition-colors duration-300"
    >
      {/* ── Ambient 3D Particle Background ───────────────────────────────── */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <AmbientParticles3D variant="cyan-violet" />
        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100/65 via-slate-100/15 to-slate-100/70 dark:from-zinc-950/65 dark:via-zinc-950/15 dark:to-zinc-950/75 pointer-events-none" />
        {/* Retained sci-fi glow accent */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-cyan-500/10 via-purple-500/5 to-emerald-500/5 blur-[140px] pointer-events-none rounded-full" />
      </div>

      <div className="w-11/12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <ScrollReveal className="text-center space-y-3.5 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono tracking-wider shadow-[0_0_15px_rgba(0,242,254,0.15)]">
            <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>INTERACTIVE TECH BENTO & ORBITAL HUD</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Skills & <span className="text-gradient-cyan">Tech Ecosystem</span>
          </h2>

          <p className="max-w-3xl mx-auto text-slate-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
            Production-grade stack architecture, backend engines, cloud infrastructure, and active
            continuous learning radar.
          </p>

          {/* Telemetry stats bar */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-mono">
            <div className="px-3.5 py-1.5 rounded-xl bg-white/90 dark:bg-zinc-900/80 border border-slate-200/90 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 flex items-center gap-2 shadow-xs dark:shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
              <span>
                TOTAL STACKS:{" "}
                <strong className="text-cyan-600 dark:text-cyan-400">{stats.total}</strong>
              </span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-white/90 dark:bg-zinc-900/80 border border-slate-200/90 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 flex items-center gap-2 shadow-xs dark:shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              <span>
                PRODUCTION HARDENED:{" "}
                <strong className="text-emerald-600 dark:text-emerald-400">{stats.production}</strong>
              </span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-white/90 dark:bg-zinc-900/80 border border-slate-200/90 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 flex items-center gap-2 shadow-xs dark:shadow-sm">
              <Zap className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>
                90%+ MASTERY:{" "}
                <strong className="text-purple-600 dark:text-purple-400">{stats.mastered}</strong>
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* 3D Central Orbital Node Matrix */}
        <ScrollReveal
          direction="up"
          delay={0.1}
          className="mb-8 sm:mb-10 rounded-3xl bg-white/90 dark:bg-slate-950/60 border border-slate-200/90 dark:border-zinc-800/90 backdrop-blur-2xl p-4 sm:p-6 shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors duration-300"
        >
          <div className="flex items-center justify-between px-4 py-2 mb-2 border-b border-slate-200/60 dark:border-white/5 text-xs font-mono text-slate-500 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-slate-800 dark:text-zinc-200 font-semibold">
                3D ANTIGRAVITY SPHERE MATRIX
              </span>
            </div>
            <span className="hidden sm:inline-block text-slate-500 dark:text-zinc-500">
              INTERACTIVE ORBITAL CONTROLS ENABLED
            </span>
          </div>

          <OrbitalSphere3D />
        </ScrollReveal>

        {/* Category filter tabs */}
        <ScrollReveal direction="up" delay={0.15} className="flex justify-center mb-8 sm:mb-10">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-white/90 dark:bg-zinc-950/90 p-2 rounded-2xl border border-slate-200/90 dark:border-zinc-800 backdrop-blur-xl shadow-md dark:shadow-xl transition-colors duration-300">
            {CATEGORY_FILTERS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`relative flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer min-h-[44px] ${
                    isActive
                      ? "text-white"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 dark:from-cyan-500 dark:via-sky-500 dark:to-purple-600 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                    />
                  )}
                  <span className="relative z-10 font-mono flex items-center gap-2">
                    {tab.id === "all"      && <Layers className="w-4 h-4" />}
                    {tab.id === "frontend" && <Code2  className="w-4 h-4" />}
                    {tab.id === "backend"  && <Server className="w-4 h-4" />}
                    {tab.id === "devops"   && <Cloud  className="w-4 h-4" />}
                    {tab.id === "frontier" && <Radio  className="w-4 h-4" />}
                    <span>{tab.label}</span>
                    <span
                      className={`ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Bento grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 sm:mb-10"
          >
            {filteredItems.map((item, idx) => {
              const isFirstActiveRadar =
                item.proficiencyTier === "Active Radar / Lab" &&
                (idx === 0 || filteredItems[idx - 1].proficiencyTier !== "Active Radar / Lab");
              return (
                <React.Fragment key={item.id}>
                  {/* Actively Learning label — spans full grid width before Docker/Socket.io */}
                  {isFirstActiveRadar && (
                    <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex items-center gap-3 pt-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[11px] font-mono font-bold tracking-wider uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse inline-block" />
                        Actively Learning
                      </span>
                      <div className="flex-1 h-px bg-amber-500/20" />
                    </div>
                  )}
                  <TechBentoCard item={item} index={idx} />
                </React.Fragment>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Frontier Radar pod */}
        {(activeCategory === "all" || activeCategory === "frontier") && (
          <ScrollReveal direction="up" delay={0.2} className="mt-8 sm:mt-10">
            <FrontierRadarPod />
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
