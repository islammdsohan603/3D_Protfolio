"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, Layers, CheckCircle2 } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";

export interface ProjectItemData {
  id: number | string;
  title: string;
  description: string;
  architecture?: string;
  tech?: string[];
  tags?: string[];
  github?: string;
  githubUrl?: string;
  live?: string;
  liveUrl?: string;
  image: string;
  features?: string[];
}

interface ProjectCardProps {
  project: ProjectItemData;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;

    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const projectTags = project.tags || project.tech || [];
  const projectLive = project.liveUrl || project.live || "#";
  const projectGithub = project.githubUrl || project.github || "#";

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className="bg-white/[0.03] backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-white/[0.08] hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden shadow-2xl"
    >
      {/* Dynamic Ambient Hover Glow */}
      <div className="absolute -inset-full bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent group-hover:animate-pulse pointer-events-none" />

      <div>
        {/* Project Thumbnail with 3D Depth Layer */}
        <div
          style={{ transform: "translateZ(30px)" }}
          className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden bg-[#0d1117] mb-5 border border-white/[0.08] group-hover:border-cyan-500/30 transition-all"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";
            }}
          />

          {/* Quick Overlay with Direct Link Trigger to Case Study */}
          <div className="absolute inset-0 bg-[#08090a]/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <Link
              href={`/projects/${project.id}`}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 transition-all flex items-center gap-2 shadow-lg"
            >
              <span>Explore Case Study</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Card Header & Title with 3D Depth Layer */}
        <div style={{ transform: "translateZ(25px)" }} className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
              {projectTags[0] || "Full-Stack"}
            </span>

            <div className="flex items-center gap-2">
              {projectGithub !== "#" && (
                <a
                  href={projectGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/[0.05] border border-white/[0.1] text-zinc-400 hover:text-white hover:border-cyan-400/50 transition-colors"
                  title="Source Code"
                >
                  <FaGithub className="w-4 h-4" />
                </a>
              )}
              {projectLive !== "#" && (
                <a
                  href={projectLive}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
                  title="Live Demo"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-100 tracking-tight group-hover:text-cyan-400 transition-colors leading-snug">
            {project.title}
          </h3>
        </div>

        {/* Description Snippet */}
        <p style={{ transform: "translateZ(15px)" }} className="text-zinc-400 text-sm leading-relaxed mb-5 line-clamp-3 font-light">
          {project.description}
        </p>

        {/* Features Snippet */}
        {project.features && project.features.length > 0 && (
          <div style={{ transform: "translateZ(10px)" }} className="space-y-1.5 mb-5">
            {project.features.slice(0, 2).map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tech Stack Badges & Direct Case Study Router Link */}
      <div style={{ transform: "translateZ(20px)" }} className="pt-5 border-t border-white/[0.08] space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {projectTags.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.05] text-zinc-300 text-xs font-mono"
            >
              {t}
            </span>
          ))}
          {projectTags.length > 4 && (
            <span className="px-2 py-1 rounded-md bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-medium">
              +{projectTags.length - 4}
            </span>
          )}
        </div>

        {/* Primary Case Study Router Action Button */}
        <Link
          href={`/projects/${project.id}`}
          className="w-full py-3 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-cyan-400 via-indigo-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 transition-all flex items-center justify-center gap-2 shadow-md group/btn"
        >
          <Layers className="w-4 h-4 text-black" />
          <span>View Case Study Architecture</span>
          <ArrowRight className="w-4 h-4 text-black group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
