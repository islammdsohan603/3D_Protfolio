"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FolderGit2, Search } from "lucide-react";
import ProjectCard from "./ProjectCard";
import ProjectDetailsModal, { ProjectData } from "./ProjectDetailsModal";
import rawProjects from "@/components/db/projects.json";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [selectedTechFilter, setSelectedTechFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Projects data imported directly from @/components/db/projects.json
  const projectsList: ProjectData[] = useMemo(() => {
    return rawProjects as ProjectData[];
  }, []);

  // Filter options derived from all project technologies
  const techCategories = useMemo(() => {
    const categoriesSet = new Set<string>();
    categoriesSet.add("All");
    projectsList.forEach((p) => {
      p.tech.forEach((t) => {
        if (["Next.js", "React", "Node.js", "MongoDB", "Express.js"].includes(t)) {
          categoriesSet.add(t);
        }
      });
    });
    return Array.from(categoriesSet);
  }, [projectsList]);

  // Filtered projects based on active filter and search text
  const filteredProjects = useMemo(() => {
    return projectsList.filter((project) => {
      const matchesFilter =
        selectedTechFilter === "All" || project.tech.includes(selectedTechFilter);

      const matchesSearch =
        searchQuery.trim() === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesFilter && matchesSearch;
    });
  }, [projectsList, selectedTechFilter, searchQuery]);

  return (
    <section id="projects" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono tracking-wider">
            <FolderGit2 className="w-4 h-4 text-purple-400" />
            <span>FEATURED WORK & PORTFOLIO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Production <span className="text-gradient-cyan">Projects</span>
          </h2>

          <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base font-light">
            Explore live production applications directly built with Next.js, React, Node.js, Express, MongoDB, and modern 3D UI architectures.
          </p>
        </motion.div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          {/* Tech Filter Pills */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md w-full sm:w-auto">
            {techCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedTechFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedTechFilter === cat
                    ? "bg-cyan-500 text-black shadow-md font-bold"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
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
              placeholder="Search projects or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-colors"
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
                <ProjectCard
                  project={project}
                  onOpenDetails={(p) => setSelectedProject(p)}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-card rounded-3xl border border-white/10">
            <p className="text-zinc-400 text-sm">No projects found matching your filter criteria.</p>
            <button
              onClick={() => {
                setSelectedTechFilter("All");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 text-xs font-mono border border-cyan-500/30"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Interactive Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
