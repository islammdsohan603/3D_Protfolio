"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, CheckCircle2, Eye, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { ProjectData } from "./ProjectDetailsModal";

interface ProjectCardProps {
  project: ProjectData;
  onOpenDetails: (project: ProjectData) => void;
}

export default function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;

    // Calculate 3D tilt angles based on mouse offset relative to center
    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className="glass-card rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-cyan-400/60 transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden"
    >
      {/* Background Neon Shimmer */}
      <div className="absolute -inset-full bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent group-hover:animate-pulse pointer-events-none" />

      <div>
        {/* Project Thumbnail Image with 3D Depth */}
        <div
          style={{ transform: "translateZ(30px)" }}
          className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden bg-slate-900 mb-5 border border-white/10 group-hover:border-cyan-500/40 transition-all"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";
            }}
          />

          {/* Quick Hover Overlay with View Details trigger */}
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <button
              onClick={() => onOpenDetails(project)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 transition-all flex items-center gap-1.5 shadow-lg cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>View Details</span>
            </button>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900/90 text-cyan-400 border border-cyan-400/40 hover:bg-cyan-500/20 transition-all"
              title="Live Preview"
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Card Header & Title with 3D Depth */}
        <div style={{ transform: "translateZ(25px)" }} className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              {project.tech[0] || "Full-Stack"}
            </span>

            <div className="flex items-center gap-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-900 border border-white/10 text-zinc-400 hover:text-white hover:border-cyan-400 transition-colors"
                title="GitHub Repository"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
                title="Live Preview"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-cyan-300 transition-colors leading-snug">
            {project.title}
          </h3>
        </div>

        {/* Description Snippet */}
        <p style={{ transform: "translateZ(15px)" }} className="text-zinc-300 text-sm leading-relaxed mb-5 line-clamp-3">
          {project.description}
        </p>

        {/* Feature Highlights Snippet */}
        {project.features && project.features.length > 0 && (
          <div style={{ transform: "translateZ(10px)" }} className="space-y-1.5 mb-5">
            {project.features.slice(0, 2).map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Tech Stack & Details Trigger Button */}
      <div style={{ transform: "translateZ(20px)" }} className="pt-5 border-t border-white/10 space-y-4">
        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-white/5 text-zinc-300 text-xs font-mono"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2 py-1 rounded-md bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onOpenDetails(project)}
            className="py-2.5 rounded-xl font-bold text-xs text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/30 hover:border-cyan-400 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>View Details</span>
          </button>

          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-300 hover:to-purple-400 transition-all text-center flex items-center justify-center gap-1.5 shadow-md"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Live Demo</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
