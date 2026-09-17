"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, CheckCircle2, Code2, Sparkles, Layers } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

export interface ProjectData {
  id: number | string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  image: string;
  features: string[];
  subtitle?: string;
  category?: string;
}

interface ProjectDetailsModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-4xl glass-card rounded-3xl border border-cyan-500/40 glow-cyan overflow-hidden my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 text-zinc-400 hover:text-white rounded-full bg-slate-900/90 border border-white/20 hover:bg-slate-800 transition-all shadow-lg cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Project Banner Image */}
          <div className="relative w-full h-64 sm:h-80 bg-slate-950 overflow-hidden group">
            {/* Ambient Overlay Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/80 via-transparent to-[#09090b]/80 z-10 pointer-events-none" />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                // Fallback image if remote url fails
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80";
              }}
            />

            {/* Floating Title Overlay Badge */}
            <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 backdrop-blur-md mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Featured Full-Stack Web Application</span>
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
                  {project.title}
                </h2>
              </div>
            </div>
          </div>

          {/* Modal Content Details */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Overview Description */}
            <div>
              <h3 className="text-xs uppercase font-mono tracking-wider text-cyan-400 mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Project Overview & Architecture</span>
              </h3>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
                {project.description}
              </p>
            </div>

            {/* Key Features Breakdown */}
            {project.features && project.features.length > 0 && (
              <div className="bg-slate-900/60 p-5 sm:p-6 rounded-2xl border border-white/10">
                <h3 className="text-xs uppercase font-mono tracking-wider text-purple-400 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>Key Features & Engineering Highlights ({project.features.length})</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Tags */}
            <div>
              <h3 className="text-xs uppercase font-mono tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>Technologies & Frameworks Utilized</span>
              </h3>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium shadow-sm hover:border-cyan-400 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Action Footer */}
          <div className="p-6 bg-slate-950/80 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-black bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-500 hover:from-cyan-300 hover:to-purple-400 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.4)]"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Preview</span>
              </a>

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm text-zinc-200 bg-slate-800 hover:bg-slate-700 hover:text-white transition-all flex items-center justify-center gap-2 border border-white/15"
              >
                <FaGithub className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            </div>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 rounded-xl font-medium text-xs sm:text-sm text-zinc-400 hover:text-white bg-slate-900 hover:bg-slate-800 transition-colors border border-white/10 cursor-pointer"
            >
              Close Details
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
