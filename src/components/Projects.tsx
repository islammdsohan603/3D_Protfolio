"use client";

import React, { useState, useMemo, useRef } from "react";
import { FolderGit2, Search, SlidersHorizontal } from "lucide-react";
import { useScroll } from "framer-motion";
import ProjectCard, { ProjectItemData } from "./ProjectCard";
import rawProjects from "@/components/db/projects.json";
import { ScrollReveal } from "./ui/ScrollReveal";

export default function Projects() {
  const [selectedTechFilter, setSelectedTechFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Track parent scroll progress to coordinate stacking scale and dimming
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const projectsList: ProjectItemData[] = useMemo(() => {
    return rawProjects as ProjectItemData[];
  }, []);

  // Filter categories derived from real project tech stack
  const techCategories = useMemo(() => {
    const categoriesSet = new Set<string>();
    categoriesSet.add("All");
    projectsList.forEach((p) => {
      const tags = p.tags || p.tech || [];
      tags.forEach((t) => {
        if (["Next.js", "React", "Node.js", "MongoDB", "Express.js"].includes(t)) {
          categoriesSet.add(t);
        }
      });
    });
    return Array.from(categoriesSet);
  }, [projectsList]);

  // Filtered projects list
  const filteredProjects = useMemo(() => {
    return projectsList.filter((project) => {
      const tags = project.tags || project.tech || [];
      const matchesFilter =
        selectedTechFilter === "All" || tags.includes(selectedTechFilter);

      const matchesSearch =
        searchQuery.trim() === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesFilter && matchesSearch;
    });
  }, [projectsList, selectedTechFilter, searchQuery]);

  return (
    <section id="projects" className="relative py-20 lg:py-32 z-10 overflow-x-clip">
      <div className="w-11/12 max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollReveal className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono tracking-wider shadow-sm">
            <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>ENTERPRISE CASE STUDIES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight">
            Featured <span className="text-indigo-400">Engineering Work</span>
          </h2>

          <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
            Production applications demonstrating scalable Next.js App Router architecture, microservice backends, indexed MongoDB schemas, and responsive 3D interfaces.
          </p>
        </ScrollReveal>

        {/* Filter Controls & Search */}
        <ScrollReveal direction="up" delay={0.1} className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-16">
          {/* Tech Filter Pills */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 bg-zinc-950/80 p-1.5 rounded-xl border border-zinc-800/80 backdrop-blur-md w-full sm:w-auto">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 text-zinc-500 text-xs font-mono">
              <SlidersHorizontal className="w-3 h-3" />
              <span>Filter:</span>
            </div>
            {techCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedTechFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer min-h-[38px] ${
                  selectedTechFilter === cat
                    ? "bg-zinc-100 text-zinc-950 font-semibold shadow-sm"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search stack or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-zinc-100 placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-zinc-700 transition-colors min-h-[40px]"
            />
          </div>
        </ScrollReveal>

        {/* Pinned Stacking Project Showcase */}
        {filteredProjects.length > 0 ? (
          <div ref={containerRef} className="relative">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                total={filteredProjects.length}
                containerProgress={scrollYProgress}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-950/60 rounded-3xl border border-zinc-800/80">
            <p className="text-zinc-400 text-sm">No projects found matching your filter criteria.</p>
            <button
              onClick={() => {
                setSelectedTechFilter("All");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-zinc-900 text-zinc-300 text-xs font-mono border border-zinc-800 hover:bg-zinc-800 transition-colors min-h-[40px] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
