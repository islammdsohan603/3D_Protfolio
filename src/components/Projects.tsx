"use client";

import React, { useRef } from "react";
import { FolderGit2 } from "lucide-react";
import { useScroll } from "framer-motion";
import ProjectCard, { ProjectItemData } from "./ProjectCard";
import rawProjects from "@/components/db/projects.json";
import { ScrollReveal } from "./ui/ScrollReveal";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Wire container-targeted useScroll hook to drive continuous card deck transforms
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const projects = rawProjects as ProjectItemData[];

  return (
    <section id="projects" className="relative py-20 lg:py-32 z-10 overflow-x-clip">
      <div className="w-11/12 max-w-7xl mx-auto">
        {/* Section Header: Obsidian Typography & Architecture Kicker */}
        <ScrollReveal className="text-center space-y-4 mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono tracking-wider shadow-sm">
            <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>SELECTED WORKS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-100 tracking-tight">
            Featured Engineering & <span className="text-indigo-400">Scaled Architecture</span>
          </h2>

          <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
            Production case studies demonstrating scalable Next.js App Router architecture, microservice backends, indexed MongoDB schemas, and responsive 3D interfaces.
          </p>
        </ScrollReveal>

        {/* Progressive Pinned Stacking Card Deck Container */}
        <div ref={containerRef} className="relative">
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
      </div>
    </section>
  );
}
