"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { ExternalLink, ArrowRight, Layers, Eye, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { formatImageUrl, FALLBACK_IMAGE_URL } from "@/lib/utils/formatImageUrl";

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
  index: number;
  total: number;
  containerProgress: MotionValue<number>;
}

// Micro-architecture badges derived from real project characteristics
function getArchitectureBadge(project: ProjectItemData): string {
  const idStr = String(project.id);
  if (idStr === "1") return "Next.js App Router & Microservices";
  if (idStr === "2") return "High-Concurrency MERN Engine";
  if (idStr === "3") return "SSG & Client State Architecture";
  if (idStr === "4") return "Atlas Collision Detection Engine";
  return "Distributed Web Architecture";
}

/**
 * Smoothstep interpolation curve (C^1 continuity)
 * Guarantees zero velocity at boundaries (t=0 and t=1), eliminating sudden acceleration jumps.
 */
function smoothstep(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped * clamped * (3 - 2 * clamped);
}

export default function ProjectCard({
  project,
  index,
  total,
  containerProgress,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgSrc, setImgSrc] = useState<string>(() => formatImageUrl(project.image));
  const [isUnoptimized, setIsUnoptimized] = useState<boolean>(false);

  // 3D Cursor-Follow Micro-Tilt using Framer Motion springs (zero React state updates)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 22, stiffness: 170 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleImageError = () => {
    if (!isUnoptimized) {
      setIsUnoptimized(true);
      return;
    }
    if (imgSrc !== FALLBACK_IMAGE_URL) {
      setImgSrc(FALLBACK_IMAGE_URL);
    }
  };

  // =========================================================================
  // MATHEMATICALLY CONTINUOUS CARD TIMELINE FORMULA
  // =========================================================================
  const cardStep = 1 / total;
  const startEnter = (index - 1) * cardStep;
  const endEnter = index * cardStep;
  const startExit = index * cardStep;
  const endExit = (index + 1) * cardStep;

  const isFirst = index === 0;
  const isLast = index === total - 1;

  // 1. Smooth Step-Interpolated Vertical Position Translation
  const y = useTransform(containerProgress, (progress) => {
    if (!isFirst && progress < startEnter) return 160;

    if (!isFirst && progress >= startEnter && progress < endEnter) {
      const t = (progress - startEnter) / cardStep;
      const eased = smoothstep(t);
      return 160 * (1 - eased);
    }

    if (isLast) return 0;

    if (progress >= startExit && progress < endExit) {
      const t = (progress - startExit) / cardStep;
      const eased = smoothstep(t);
      return -24 * eased;
    }

    if (progress >= endExit) return -24;

    return 0;
  });

  // 2. Continuous Scale Dampening for stacked visual depth
  const scale = useTransform(containerProgress, (progress) => {
    if (!isFirst && progress < startEnter) return 0.94;

    if (!isFirst && progress >= startEnter && progress < endEnter) {
      const t = (progress - startEnter) / cardStep;
      const eased = smoothstep(t);
      return 0.94 + 0.06 * eased;
    }

    if (isLast) return 1.0;

    if (progress >= startExit && progress < endExit) {
      const t = (progress - startExit) / cardStep;
      const eased = smoothstep(t);
      return 1.0 - 0.05 * eased;
    }

    if (progress >= endExit) return 0.95;

    return 1.0;
  });

  // 3. Smooth Step Entrance Fade & Background Receding
  const opacity = useTransform(containerProgress, (progress) => {
    if (!isFirst && progress < startEnter) return 0;

    if (!isFirst && progress >= startEnter && progress < endEnter) {
      const t = (progress - startEnter) / cardStep;
      const eased = smoothstep(t);
      return Math.min(1, Math.max(0, eased * 1.05));
    }

    if (isLast) return 1.0;

    if (progress >= startExit && progress < endExit) {
      const t = (progress - startExit) / cardStep;
      const eased = smoothstep(t);
      return 1.0 - 0.20 * eased;
    }

    if (progress >= endExit) return 0.80;

    return 1.0;
  });

  // 4. Layer Blur & Brightness Attenuation
  const filter = useTransform(containerProgress, (progress) => {
    if (isLast || progress < startExit) return "blur(0px) brightness(1)";
    if (progress >= endExit) return "blur(4px) brightness(0.70)";

    const t = (progress - startExit) / cardStep;
    const eased = smoothstep(t);
    const blur = (eased * 4).toFixed(1);
    const brightness = (1 - eased * 0.3).toFixed(2);
    return `blur(${blur}px) brightness(${brightness})`;
  });

  // 5. Dynamic Z-Index shifting: incoming card has higher z-index, underlying drops behind
  const zIndex = useTransform(containerProgress, (progress) => {
    if (isFirst) {
      return progress >= endExit ? 1 : 20;
    }
    if (isLast) {
      return progress >= startEnter ? 50 : 0;
    }
    if (progress < startEnter) return 0;
    if (progress >= endExit) return index + 1;
    return 20 + index * 10;
  });

  // 6. Interactive pointer events gating
  const pointerEvents = useTransform(containerProgress, (progress) => {
    if (isFirst) {
      return progress < endExit ? "auto" : "none";
    }
    if (isLast) {
      return progress >= startEnter ? "auto" : "none";
    }
    return progress >= startEnter && progress < endExit ? "auto" : "none";
  });

  const projectTags = project.tags || project.tech || [];
  const projectLive = project.liveUrl || project.live || "#";
  const projectGithub = project.githubUrl || project.github || "#";
  const architectureBadge = getArchitectureBadge(project);

  return (
    <motion.div
      ref={cardRef}
      style={{
        y,
        scale,
        opacity,
        filter,
        zIndex,
        pointerEvents,
      }}
      className="absolute inset-0 w-full h-fit my-auto will-change-transform"
    >
      <div className="relative w-full rounded-3xl bg-white/95 dark:bg-zinc-950/90 backdrop-blur-2xl border border-slate-200/90 dark:border-zinc-800/90 shadow-xl dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] overflow-hidden transition-colors duration-300">
        {/* Subtle Ambient Top Rim Highlight */}
        <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-slate-300 dark:via-zinc-700/60 to-transparent pointer-events-none" />

        <div className="p-6 sm:p-8 lg:p-10 xl:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
            {/* Left Column: Narrative & Telemetry (col-span-6) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-4 sm:space-y-5 lg:space-y-6">
              {/* Telemetry Header: Monospace Index + Live Status Chip */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  {/* Monospace index indicator (01 // 04) */}
                  <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-md">
                    {String(index + 1).padStart(2, "0")} {"//"} {String(total).padStart(2, "0")}
                  </span>

                  {/* Live Status Chip */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                    <span>PRODUCTION LIVE</span>
                  </span>

                  {/* Architecture Chip */}
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-[11px] font-mono text-slate-600 dark:text-zinc-400">
                    <Layers className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                    <span>{architectureBadge}</span>
                  </span>
                </div>

                {projectGithub !== "#" && (
                  <a
                    href={projectGithub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 shadow-xs"
                    aria-label={`View ${project.title} source code on GitHub`}
                  >
                    <FaGithub className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                )}
              </div>

              {/* Large Display Heading & Executive Summary */}
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight leading-tight">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm lg:text-base font-light leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {project.description}
                </p>
              </div>

              {/* Architectural Summary Highlight Box */}
              {project.architecture && (
                <div className="rounded-xl bg-slate-50 dark:bg-zinc-900/70 border border-slate-200/80 dark:border-zinc-800/80 p-3 sm:p-4 space-y-1.5 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-mono font-medium text-slate-700 dark:text-zinc-300 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>Architecture & Microservices</span>
                  </div>
                  <p className="text-slate-600 dark:text-zinc-400 text-xs leading-relaxed font-light line-clamp-2 sm:line-clamp-3">
                    {project.architecture}
                  </p>
                </div>
              )}

              {/* Tech Stack Monospace Pills */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-500 uppercase tracking-wider block">
                  Core Technologies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {projectTags.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 text-xs font-mono shadow-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action CTAs: Case Study + Live Demo */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href={`/projects/${project.id}`}
                  className="border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-800 dark:text-zinc-100 text-xs sm:text-sm font-medium px-5 py-2.5 rounded-xl shadow-xs dark:shadow-sm transition-all duration-300 flex items-center gap-2 min-h-[42px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
                </Link>

                {projectLive !== "#" && (
                  <a
                    href={projectLive}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-colors duration-200 flex items-center gap-2 shadow-xs min-h-[42px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                    aria-label={`Open live preview for ${project.title}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: 3D Mockup Frame (col-span-6) */}
            <div
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              className="lg:col-span-6 w-full flex justify-center perspective-[1000px]"
            >
              <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative w-full h-52 sm:h-64 md:h-72 lg:h-[360px] xl:h-[390px] rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900/50 shadow-lg dark:shadow-2xl group/preview transition-transform duration-300"
              >
                <Image
                  src={imgSrc}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
                  unoptimized={isUnoptimized}
                  onError={handleImageError}
                  className="object-cover object-top group-hover/preview:scale-105 transition-transform duration-700 ease-out"
                  priority={index === 0}
                />

                {/* Subtle Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 dark:from-zinc-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Interactive Case Study Trigger Overlay */}
                <div className="absolute inset-0 bg-slate-900/50 dark:bg-zinc-950/60 backdrop-blur-xs opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <Link
                    href={`/projects/${project.id}`}
                    className="px-4 py-2 rounded-xl bg-white/95 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-700 text-xs font-medium text-slate-900 dark:text-zinc-100 flex items-center gap-2 shadow-lg hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-700 dark:text-zinc-300" />
                    <span>Explore Case Study</span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
