"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { ExternalLink, ArrowRight, Layers, Eye } from "lucide-react";
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

export default function ProjectCard({
  project,
  index,
  total,
  containerProgress,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgSrc, setImgSrc] = useState<string>(() => formatImageUrl(project.image));
  const [isUnoptimized, setIsUnoptimized] = useState<boolean>(false);

  // Performant 3D cursor-follow tilt using Framer Motion springs (zero React state updates)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 160 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Disable on touch screens or users with reduced motion preferences
    if (e.pointerType === "touch") return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleImageError = () => {
    if (!isUnoptimized) {
      setIsUnoptimized(true);
    } else {
      setImgSrc(FALLBACK_IMAGE_URL);
    }
  };

  // Progressive Pinned Stacking Transforms (Sheryians / Creative Agency Aesthetic)
  const isLast = index === total - 1;
  const rangeStart = index * (1 / total);

  // Underlying card subtly scales down (scale: 1 -> ~0.92-0.94)
  const targetScale = isLast ? 1 : 1 - (total - index - 1) * 0.025;
  const scale = useTransform(
    containerProgress,
    [rangeStart, 1],
    [1, targetScale]
  );

  // Underlying card smoothly dims in opacity (1 -> ~0.4)
  const targetOpacity = isLast ? 1 : 0.4 + index * 0.18;
  const opacity = useTransform(
    containerProgress,
    [rangeStart, 1],
    [1, targetOpacity]
  );

  const projectTags = project.tags || project.tech || [];
  const projectLive = project.liveUrl || project.live || "#";
  const projectGithub = project.githubUrl || project.github || "#";
  const architectureBadge = getArchitectureBadge(project);

  return (
    <div
      ref={cardRef}
      style={{
        zIndex: index + 10,
        ["--desktop-top" as string]: `calc(5rem + ${index * 24}px)`,
        ["--mobile-top" as string]: `calc(4.5rem + ${index * 16}px)`,
      }}
      className="sticky w-full mb-24 sm:mb-32 lg:mb-40 last:mb-0 [top:var(--mobile-top)] lg:[top:var(--desktop-top)]"
    >
      <motion.div
        style={{
          scale,
          opacity,
        }}
        className="relative w-full rounded-3xl bg-zinc-950/90 backdrop-blur-xl border border-zinc-800/90 shadow-2xl overflow-hidden transition-colors duration-300"
      >
        {/* Subtle Ambient Top Rim Highlight */}
        <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent pointer-events-none" />

        <div className="p-6 sm:p-8 lg:p-10 xl:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
            {/* Left Column: Narrative & Telemetry (col-span-6) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-5 lg:space-y-6">
              {/* Project Index & Architecture Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-xs font-bold tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-md">
                    {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300">
                    <Layers className="w-3 h-3 text-indigo-400" />
                    <span>{architectureBadge}</span>
                  </span>
                </div>

                {projectGithub !== "#" && (
                  <a
                    href={projectGithub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-zinc-100 text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                    aria-label={`View ${project.title} source code on GitHub`}
                  >
                    <FaGithub className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                )}
              </div>

              {/* Title & Executive Summary */}
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-100 tracking-tight leading-tight">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm lg:text-base font-light leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Micro-architecture Highlight Box */}
              {project.architecture && (
                <div className="rounded-xl bg-zinc-900/60 border border-zinc-800/80 p-3.5 sm:p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-medium text-zinc-300 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span>System Design & Implementation</span>
                  </div>
                  <p className="text-zinc-400 text-xs leading-relaxed font-light line-clamp-3">
                    {project.architecture}
                  </p>
                </div>
              )}

              {/* Tech Stack Monospace Pills */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Core Technologies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {projectTags.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono"
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
                  className="border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 text-xs sm:text-sm font-medium px-5 py-2.5 rounded-lg shadow-sm transition-all duration-300 flex items-center gap-2 min-h-[42px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                </Link>

                {projectLive !== "#" && (
                  <a
                    href={projectLive}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm px-5 py-2.5 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-sm min-h-[42px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
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
                className="relative w-full h-56 sm:h-72 md:h-80 lg:h-96 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/50 shadow-2xl group/preview transition-transform duration-300"
              >
                <Image
                  src={imgSrc}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  unoptimized={isUnoptimized}
                  onError={handleImageError}
                  className="object-cover object-top group-hover/preview:scale-105 transition-transform duration-700 ease-out"
                  priority={index === 0}
                />

                {/* Subtle Cinematic Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-zinc-950/20 pointer-events-none" />

                {/* Quick Case Study Overlay Trigger */}
                <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-xs opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <Link
                    href={`/projects/${project.id}`}
                    className="px-4 py-2 rounded-lg bg-zinc-900/90 border border-zinc-700 text-xs font-medium text-zinc-100 flex items-center gap-2 shadow-lg hover:bg-zinc-800 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-zinc-300" />
                    <span>Explore Architecture</span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
