"use client";

import React, { useRef } from "react";
import { FolderGit2 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProjectCard, { ProjectItemData } from "./ProjectCard";
import rawProjects from "@/components/db/projects.json";

/**
 * Awwwards / Sheryians Progressive Stacked-Pinning Interaction Deck
 * Features continuous container-pinned scroll track (min-h-[400vh]), zero-jitter
 * mathematical card layer calculations, and seamless exit dampening into the Contact section.
 */
export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Wire container-targeted useScroll hook to drive continuous card deck transforms
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const projects = rawProjects as ProjectItemData[];

  // =========================================================================
  // SEAMLESS TRANSITION TO NEXT SECTION (SMOOTH EXIT GEOMETRY)
  // Stage holds stable across the final card threshold, then smoothly slides up
  // (y: 0 -> -30px) and dampens opacity (1.0 -> 0.90) during scrollYProgress 0.90 -> 1.00
  // eliminating sudden visual cuts before the Contact section enters.
  // =========================================================================
  const stageY = useTransform(scrollYProgress, (progress) => {
    if (progress < 0.90) return 0;
    const t = Math.min(1, Math.max(0, (progress - 0.90) / 0.10));
    // Smoothstep C^1 interpolation prevents acceleration jerk
    const smoothT = t * t * (3 - 2 * t);
    return -30 * smoothT;
  });

  const stageOpacity = useTransform(scrollYProgress, (progress) => {
    if (progress < 0.90) return 1;
    const t = Math.min(1, Math.max(0, (progress - 0.90) / 0.10));
    const smoothT = t * t * (3 - 2 * t);
    return 1 - smoothT * 0.10; // 1.0 -> 0.90
  });

  // Micro progress indicator for telemetry bar
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative min-h-[400vh] bg-slate-100 dark:bg-[#09090b] transition-colors duration-300"
      aria-label="Selected Works & Case Studies"
    >
      {/* Pinned Viewport Track: Sticks firmly for the full 400vh scroll duration */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-10 overflow-hidden">
        {/* Stage wrapper with smooth exit dampening */}
        <motion.div
          style={{ y: stageY, opacity: stageOpacity }}
          className="w-11/12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col h-full justify-between min-h-0"
        >
          {/* Section Header: Clear margin separation to guarantee zero overlap */}
          <div className="text-center space-y-2 sm:space-y-2.5 mb-6 sm:mb-8 shrink-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 text-xs font-mono tracking-wider shadow-xs dark:shadow-sm">
              <FolderGit2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>SELECTED WORKS // PRODUCTION CASE STUDIES</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight">
              Featured Engineering & <span className="text-indigo-600 dark:text-indigo-400">Scaled Architecture</span>
            </h2>

            <p className="max-w-2xl mx-auto text-slate-600 dark:text-zinc-400 text-xs sm:text-sm font-light leading-relaxed hidden sm:block">
              Progressive pinned case studies demonstrating scalable Next.js App Router architecture, microservices, and interactive 3D web systems.
            </p>
          </div>

          {/* Stacking Card Deck Canvas: Dedicated flex-1 container with bounds protection */}
          <div className="relative w-full flex-1 flex items-center justify-center min-h-0 overflow-hidden">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                total={projects.length}
                containerProgress={scrollYProgress}
              />
            ))}
          </div>

          {/* Bottom Telemetry Guide Indicator with Interactive Progress Line */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-zinc-500 pt-3 border-t border-slate-300 dark:border-zinc-900 shrink-0">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
              <span>SCROLL TO ADVANCE CASE STUDIES</span>
            </span>

            {/* Micro Progress Bar */}
            <div className="w-24 sm:w-36 h-1 bg-slate-200 dark:bg-zinc-900 rounded-full overflow-hidden hidden sm:block border border-slate-300 dark:border-zinc-800">
              <motion.div
                style={{ width: progressWidth }}
                className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-indigo-400 rounded-full"
              />
            </div>

            <span className="text-indigo-600 dark:text-indigo-400">
              {String(projects.length).padStart(2, "0")} ARCHITECTURAL SYSTEMS
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
