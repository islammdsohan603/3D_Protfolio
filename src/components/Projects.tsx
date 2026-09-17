"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FolderGit2, Search } from "lucide-react";
import ProjectCard, { ProjectItemData } from "./ProjectCard";
import rawProjects from "@/components/db/projects.json";

export default function Projects() {
  const [selectedTechFilter, setSelectedTechFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const projectsList: ProjectItemData[] = useMemo(() => {
    return rawProjects as ProjectItemData[];
  }, []);

  // Filter categories derived from project tags/tech
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
    <section id="projects" className="relative py-28 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono tracking-wider">
            <FolderGit2 className="w-4 h-4 text-indigo-400" />
            <span>ENTERPRISE CASE STUDIES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">Engineering Work</span>
          </h2>

          <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
            Production applications showcasing scalable Next.js App Router architecture, microservice backends, indexed MongoDB schemas, and responsive 3D interfaces.
          </p>
        </motion.div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          {/* Tech Filter Pills */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 bg-white/[0.03] p-1.5 rounded-2xl border border-white/[0.08] backdrop-blur-md w-full sm:w-auto">
            {techCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedTechFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedTechFilter === cat
                    ? "bg-gradient-to-r from-cyan-400 to-indigo-500 text-black shadow-md font-bold"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by keyword or stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-zinc-100 placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="h-full"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/[0.03] rounded-3xl border border-white/[0.08]">
            <p className="text-zinc-400 text-sm">No projects found matching your search term.</p>
            <button
              onClick={() => {
                setSelectedTechFilter("All");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-indigo-500/10 text-indigo-400 text-xs font-mono border border-indigo-500/30"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
