"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
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

export interface ProjectCardProps {
  project: ProjectItemData;
  index: number;
  total: number;
  containerProgress: MotionValue<number>;
}

export default function ProjectCard({
  project,
  index,
  total,
  containerProgress,
}: ProjectCardProps) {
  const router = useRouter();
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
    if (!isFirst && progress < startEnter) return 180;

    if (!isFirst && progress >= startEnter && progress < endEnter) {
      const t = (progress - startEnter) / cardStep;
      const eased = smoothstep(t);
      return 180 * (1 - eased);
    }

    if (isLast) return 0;

    if (progress >= startExit && progress < endExit) {
      const t = (progress - startExit) / cardStep;
      const eased = smoothstep(t);
      return -20 * eased;
    }

    if (progress >= endExit) return -20;

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

  // =========================================================================
  // STRICT ACTIVE CARD HIT-TESTING & POINTER-EVENTS ISOLATION
  // Only the card actively in view receives hit-tests and pointer events.
  // Inactive or pre-entering cards are strictly pointer-events: none and sit at low z-index.
  // =========================================================================
  const isActiveCard = (progress: number): boolean => {
    if (isFirst) {
      return progress < cardStep - 0.02;
    }
    if (isLast) {
      return progress >= (total - 1) * cardStep - 0.02;
    }
    const myStart = index * cardStep - 0.02;
    const myEnd = (index + 1) * cardStep - 0.02;
    return progress >= myStart && progress < myEnd;
  };

  // 5. Dynamic Z-Index shifting: Active card is always elevated to 50
  const zIndex = useTransform(containerProgress, (progress) => {
    if (isActiveCard(progress)) {
      return 50;
    }
    if (progress >= (index + 1) * cardStep) {
      return index + 1;
    }
    return 10 + index;
  });

  // 6. Interactive pointer events gating: Only active card allows pointer events
  const pointerEvents = useTransform(containerProgress, (progress) => {
    return isActiveCard(progress) ? "auto" : "none";
  });

  const projectTags = project.tags || project.tech || [];

  // Strict URL Normalization
  const rawLiveUrl = project.liveUrl || project.live;
  const formattedLiveUrl =
    rawLiveUrl && rawLiveUrl.trim() !== "" && rawLiveUrl !== "#"
      ? rawLiveUrl.trim().startsWith("http")
        ? rawLiveUrl.trim()
        : `https://${rawLiveUrl.trim()}`
      : null;

  const rawGithubUrl = project.githubUrl || project.github;
  const formattedGithubUrl =
    rawGithubUrl && rawGithubUrl.trim() !== "" && rawGithubUrl !== "#"
      ? rawGithubUrl.trim().startsWith("http")
        ? rawGithubUrl.trim()
        : `https://${rawGithubUrl.trim()}`
      : null;

  const architectureBadge = getArchitectureBadge(project);

  // Card Navigation Isolation: Only navigates if the click is outside interactive action buttons
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement | null;
    if (target?.closest("a, button, [role='button']:not([data-card-trigger='true'])")) {
      return;
    }
    router.push(`/projects/${project.id}`);
  };

  const handleCardKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      const target = e.target as HTMLElement | null;
      if (target?.closest("a, button")) {
        return;
      }
      e.preventDefault();
      router.push(`/projects/${project.id}`);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        y,
        scale,
        opacity,
        filter,
        zIndex,
      }}
      className="absolute inset-0 w-full h-full flex items-center justify-center will-change-transform pointer-events-none"
    >
      <motion.div
        role="button"
        tabIndex={0}
        data-card-trigger="true"
        onClick={handleCardClick}
        onKeyDown={handleCardKeyDown}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ pointerEvents }}
        className="relative w-full max-h-[calc(100vh-16rem)] sm:max-h-[calc(100vh-15rem)] rounded-3xl bg-white/95 dark:bg-zinc-950/90 backdrop-blur-2xl border border-slate-200/90 dark:border-zinc-800/90 hover:border-zinc-400 dark:hover:border-zinc-700/90 shadow-xl dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] overflow-hidden transition-all duration-300 flex flex-col justify-center cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        {/* Subtle Ambient Top Rim Highlight */}
        <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-slate-300 dark:via-zinc-700/60 to-transparent pointer-events-none z-10" />

        <div className="p-5 sm:p-6 lg:p-8 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Column: Narrative & Telemetry (col-span-6) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-3 sm:space-y-4">
              {/* Telemetry Header: Monospace Index + Live Status Chip */}
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Monospace index indicator (01 // 04) */}
                  <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-md">
                    {String(index + 1).padStart(2, "0")} {"//"} {String(total).padStart(2, "0")}
                  </span>

                  {/* Live Status Chip */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                    <span>PRODUCTION LIVE</span>
                  </span>

                  {/* Architecture Chip */}
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-[10px] font-mono text-slate-600 dark:text-zinc-400">
                    <Layers className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                    <span>{architectureBadge}</span>
                  </span>
                </div>

                {formattedGithubUrl && (
                  <a
                    href={formattedGithubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onPointerDown={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="relative z-50 pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 shadow-xs cursor-pointer"
                    aria-label={`View ${project.title} source code on GitHub`}
                  >
                    <FaGithub className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                )}
              </div>

              {/* Large Display Heading & Executive Summary */}
              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight leading-snug">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm font-light leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Architectural Summary Highlight Box */}
              {project.architecture && (
                <div className="rounded-xl bg-slate-50 dark:bg-zinc-900/70 border border-slate-200/80 dark:border-zinc-800/80 p-2.5 sm:p-3 space-y-1 shadow-xs">
                  <div className="flex items-center gap-2 text-[11px] font-mono font-medium text-slate-700 dark:text-zinc-300 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>Architecture & Microservices</span>
                  </div>
                  <p className="text-slate-600 dark:text-zinc-400 text-xs leading-relaxed font-light line-clamp-2">
                    {project.architecture}
                  </p>
                </div>
              )}

              {/* Tech Stack Monospace Pills */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-500 uppercase tracking-wider block">
                  Core Technologies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {projectTags.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 text-xs font-mono shadow-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {projectTags.length > 5 && (
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 text-xs font-mono">
                      +{projectTags.length - 5}
                    </span>
                  )}
                </div>
              </div>

              {/* Action CTAs: Case Study + Live Demo */}
              <div className="pt-1 flex flex-wrap items-center gap-3">
                <Link
                  href={`/projects/${project.id}`}
                  onPointerDown={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="relative z-50 pointer-events-auto border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-800 dark:text-zinc-100 text-xs font-medium px-4 py-2 rounded-xl shadow-xs dark:shadow-sm transition-all duration-300 flex items-center gap-2 min-h-[38px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
                </Link>

                {formattedLiveUrl && (
                  <a
                    href={formattedLiveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onPointerDown={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="relative z-50 pointer-events-auto bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-4 py-2 rounded-xl transition-colors duration-200 flex items-center gap-2 shadow-sm min-h-[38px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer"
                    aria-label={`Open live preview for ${project.title}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: 3D Mockup Frame (col-span-6) — non-blocking pointer events */}
            <div className="lg:col-span-6 w-full flex justify-center perspective-[1000px] pointer-events-none select-none">
              <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative w-full h-44 sm:h-52 md:h-60 lg:h-[280px] xl:h-[320px] rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900/50 shadow-lg dark:shadow-2xl group/preview transition-transform duration-300 pointer-events-none"
              >
                <Image
                  src={imgSrc}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
                  unoptimized={isUnoptimized}
                  onError={handleImageError}
                  className="object-cover object-top group-hover/preview:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                  priority={index === 0}
                />

                {/* Subtle Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 dark:from-zinc-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Interactive Case Study Trigger Overlay */}
                <div className="absolute inset-0 bg-slate-900/50 dark:bg-zinc-950/60 backdrop-blur-xs opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 pointer-events-none">
                  <div className="px-4 py-2 rounded-xl bg-white/95 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-700 text-xs font-medium text-slate-900 dark:text-zinc-100 flex items-center gap-2 shadow-lg pointer-events-none">
                    <Eye className="w-3.5 h-3.5 text-slate-700 dark:text-zinc-300" />
                    <span>Explore Case Study</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
