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
  Filter,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { TECH_ITEMS, TechCategoryType, CategoryFilter } from "./techData";
import TechBentoCard from "./TechBentoCard";
import FrontierRadarPod from "./FrontierRadarPod";

// Dynamic import for Three.js 3D Orbital Canvas to avoid SSR issues
const OrbitalSphere3D = dynamic(() => import("./OrbitalSphere3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[320px] sm:h-[400px] flex items-center justify-center rounded-3xl bg-zinc-950/40 border border-zinc-800">
      <div className="flex items-center gap-3 text-cyan-400 font-mono text-sm">
        <Cpu className="w-5 h-5 animate-spin" />
        <span>INITIALIZING 3D ANTIGRAVITY CORE...</span>
      </div>
    </div>
  ),
});

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
      production: TECH_ITEMS.filter((i) => i.statusTag === "Production Ready" || i.statusTag === "Core Engine").length,
      frontier: TECH_ITEMS.filter((i) => i.category === "frontier").length,
    };
  }, []);

  return (
    <section id="skills" className="relative py-28 z-10 overflow-hidden bg-[#09090b]">
      {/* Sci-Fi Background Glow & Ambient Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-cyan-500/10 via-purple-500/5 to-emerald-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Telemetry Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wider shadow-[0_0_15px_rgba(0,242,254,0.15)]">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>INTERACTIVE TECH BENTO & ORBITAL HUD</span>
          </div>

          <h2 className="text-3xl sm:text-6xl font-extrabold text-white tracking-tight">
            Skills & <span className="text-gradient-cyan">Tech Ecosystem</span>
          </h2>

          <p className="max-w-3xl mx-auto text-zinc-400 text-sm sm:text-base leading-relaxed">
            Production-grade stack architecture, backend engines, cloud infrastructure, and active continuous learning radar.
          </p>

          {/* Telemetry Stats Bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <div className="px-4 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>TOTAL STACKS: <strong className="text-cyan-400">{stats.total}</strong></span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>PRODUCTION HARDENED: <strong className="text-emerald-400">{stats.production}</strong></span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              <span>90%+ MASTERY: <strong className="text-purple-400">{stats.mastered}</strong></span>
            </div>
          </div>
        </motion.div>

        {/* 3D Central Orbital Node Matrix Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 rounded-3xl bg-slate-950/60 border border-zinc-800/90 backdrop-blur-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-2 mb-2 border-b border-white/5 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-zinc-200 font-semibold">3D ANTIGRAVITY SPHERE MATRIX</span>
            </div>
            <span className="hidden sm:inline-block text-zinc-500">INTERACTIVE ORBITAL CONTROLS ENABLED</span>
          </div>

          <OrbitalSphere3D />
        </motion.div>

        {/* Perspective Category Filter Switcher Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-zinc-950/90 p-2 rounded-2xl border border-zinc-800 backdrop-blur-xl shadow-xl">
            {CATEGORY_FILTERS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`relative flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "text-white"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-sky-500 to-purple-600 rounded-xl shadow-[0_0_20px_rgba(0,242,254,0.3)]"
                    />
                  )}
                  <span className="relative z-10 font-mono flex items-center gap-2">
                    {tab.id === "all" && <Layers className="w-4 h-4" />}
                    {tab.id === "frontend" && <Code2 className="w-4 h-4" />}
                    {tab.id === "backend" && <Server className="w-4 h-4" />}
                    {tab.id === "devops" && <Cloud className="w-4 h-4" />}
                    {tab.id === "frontier" && <Radio className="w-4 h-4" />}
                    <span>{tab.label}</span>
                    <span
                      className={`ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Grid Layout Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {filteredItems.map((item, idx) => (
              <TechBentoCard key={item.id} item={item} index={idx} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Dedicated Highlight Pod for Active Frontier Radar */}
        {(activeCategory === "all" || activeCategory === "frontier") && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <FrontierRadarPod />
          </motion.div>
        )}
      </div>
    </section>
  );
}
