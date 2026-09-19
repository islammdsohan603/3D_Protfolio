"use client";

import React, { useRef } from "react";
import { FolderGit2 } from "lucide-react";
import ProjectCard, { ProjectItemData } from "./ProjectCard";
import rawProjects from "@/components/db/projects.json";

/**
 * Projects Section: Sheryians Coding School Sticky Stacking Showcase
 * 
 * Features:
 * - Natural responsive container (w-11/12 max-w-7xl mx-auto py-16 md:py-24)
 * - Zero artificial 500vh container heights
 * - Section header at the top with natural document margins
 * - Sequential cards container in normal document flow that naturally transitions into subsequent sections
 */
export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const projects = rawProjects as ProjectItemData[];

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-11/12 max-w-7xl mx-auto py-16 md:py-24 transition-colors duration-300"
      aria-label="Selected Works & Case Studies"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center space-y-3 mb-12 sm:mb-16 md:mb-20 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 text-xs font-mono tracking-wider shadow-xs dark:shadow-sm">
          <FolderGit2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>SELECTED WORKS // PRODUCTION ARCHITECTURE</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight">
          Featured Engineering & <span className="text-indigo-600 dark:text-indigo-400">Scaled Architecture</span>
        </h2>

        <p className="max-w-2xl mx-auto text-slate-600 dark:text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
          Production case studies demonstrating scalable Next.js App Router architecture, microservices, and interactive web systems.
        </p>
      </div>

      {/* Sheryians Pinned Stacking Track in Normal Document Flow */}
      <div id="projects-deck" className="relative flex flex-col pb-16">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
      </div>

      {/* Bottom Telemetry Guide Indicator */}
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-zinc-500 pt-10 border-t border-slate-300 dark:border-zinc-900 relative z-10">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
          <span>SCROLL TO EXPLORE ARCHITECTURAL SYSTEMS</span>
        </span>

        <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
          {String(projects.length).padStart(2, "0")} ARCHITECTURAL SYSTEMS
        </span>
      </div>
    </section>
  );
}