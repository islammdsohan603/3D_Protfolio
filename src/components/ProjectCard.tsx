"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ExternalLink, ArrowRight, Layers, Sparkles } from "lucide-react";
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

interface ProjectTheme {
  name: string;
  systemTag: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  topGradient: string;
  borderHover: string;
  glowHex: string;
  liveBtnBg: string;
  metricHighlight: string;
}

const PROJECT_THEMES: Record<string, ProjectTheme> = {
  "1": {
    name: "Flixora",
    systemTag: "HYBRID SVOD + CINEMA TICKETING",
    badgeBg: "bg-cyan-500/10 dark:bg-cyan-500/15",
    badgeBorder: "border-cyan-500/30",
    badgeText: "text-cyan-600 dark:text-cyan-400",
    topGradient: "from-cyan-400 via-indigo-500 to-purple-500",
    borderHover: "hover:border-cyan-500/50",
    glowHex: "#06b6d4",
    liveBtnBg: "bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500",
    metricHighlight: "10-Min Atomic Locking & Real-Time QR Passes",
  },
  "2": {
    name: "RecipeHub",
    systemTag: "FULL-STACK SOCIAL + RBAC DASHBOARD",
    badgeBg: "bg-amber-500/10 dark:bg-amber-500/15",
    badgeBorder: "border-amber-500/30",
    badgeText: "text-amber-600 dark:text-amber-400",
    topGradient: "from-amber-400 via-orange-500 to-rose-500",
    borderHover: "hover:border-amber-500/50",
    glowHex: "#f59e0b",
    liveBtnBg: "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500",
    metricHighlight: "RBAC Admin Engine & Fuzzy Search Pipelines",
  },
  "3": {
    name: "Job Portal",
    systemTag: "HIGH-CONCURRENCY MERN ENGINE",
    badgeBg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    badgeBorder: "border-emerald-500/30",
    badgeText: "text-emerald-600 dark:text-emerald-400",
    topGradient: "from-emerald-400 via-teal-500 to-cyan-500",
    borderHover: "hover:border-emerald-500/50",
    glowHex: "#10b981",
    liveBtnBg: "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500",
    metricHighlight: "Sub-50ms Indexed Query Pipelines & Recruiter Flow",
  },
  "4": {
    name: "Programming Courses",
    systemTag: "MODULAR E-LEARNING ARCHITECTURE",
    badgeBg: "bg-blue-500/10 dark:bg-blue-500/15",
    badgeBorder: "border-blue-500/30",
    badgeText: "text-blue-600 dark:text-blue-400",
    topGradient: "from-blue-400 via-indigo-500 to-violet-500",
    borderHover: "hover:border-blue-500/50",
    glowHex: "#3b82f6",
    liveBtnBg: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500",
    metricHighlight: "SSG Pre-rendered Layouts & Modular Curriculum",
  },
  "5": {
    name: "Doctor Appointment",
    systemTag: "HEALTHCARE SCHEDULING ENGINE",
    badgeBg: "bg-rose-500/10 dark:bg-rose-500/15",
    badgeBorder: "border-rose-500/30",
    badgeText: "text-rose-600 dark:text-rose-400",
    topGradient: "from-rose-400 via-pink-500 to-red-500",
    borderHover: "hover:border-rose-500/50",
    glowHex: "#f43f5e",
    liveBtnBg: "bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500",
    metricHighlight: "Collision Detection Algorithm & Atlas Collections",
  },
};

const defaultTheme: ProjectTheme = {
  name: "System",
  systemTag: "DISTRIBUTED WEB ARCHITECTURE",
  badgeBg: "bg-indigo-500/10 dark:bg-indigo-500/15",
  badgeBorder: "border-indigo-500/30",
  badgeText: "text-indigo-600 dark:text-indigo-400",
  topGradient: "from-indigo-500 via-purple-500 to-pink-500",
  borderHover: "hover:border-indigo-500/50",
  glowHex: "#6366f1",
  liveBtnBg: "bg-indigo-600 hover:bg-indigo-500",
  metricHighlight: "High-Performance Modern Web Architecture",
};

export interface ProjectCardProps {
  project: ProjectItemData;
  index: number;
  total: number;
}

export default function ProjectCard({ project, index, total }: ProjectCardProps) {
  const router = useRouter();
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const [imgSrc, setImgSrc] = useState<string>(() => formatImageUrl(project.image));
  const [isUnoptimized, setIsUnoptimized] = useState<boolean>(false);

  const theme = PROJECT_THEMES[String(project.id)] || defaultTheme;

  // শেরিয়ান্স স্ট্যাকিং স্ক্রল প্রগ্রেস: কার্ড পিন হওয়ার পর যখন পরবর্তী কার্ড আসবে
  const { scrollYProgress } = useScroll({
    target: cardWrapperRef,
    offset: ["start start", "end start"],
  });

  // পেছনের কার্ডটি 1 থেকে 0.94 স্কেলে আসবে এবং অপাসিটি 1 থেকে 0.4 এ নামবে
  const isLast = index === total - 1;
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.5]);

  // 3D কার্সর টিল্ট
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

  const projectTags = project.tags || project.tech || [];

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

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement | null;
    if (target?.closest("a, button")) {
      return;
    }
    router.push(`/projects/${project.id}`);
  };

  return (
    <div
      ref={cardWrapperRef}
      className="sticky w-full mb-8 sm:mb-12"
      style={{
        // প্রতিটি কার্ডের টপ অফসেট শেরিয়ান্স স্টাইলে সেট করা
        top: `calc(5.5rem + ${index * 24}px)`,
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{ scale, opacity }}
        role="button"
        tabIndex={0}
        onClick={handleCardClick}
        className={`relative w-full rounded-3xl bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border border-slate-200/90 dark:border-zinc-800/90 ${theme.borderHover} shadow-2xl overflow-hidden transition-colors duration-300 flex flex-col justify-center cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500`}
      >
        {/* Top Accent Gradient Bar */}
        <div className={`absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r ${theme.topGradient} z-20`} />

        {/* Corner Glow */}
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 dark:opacity-25"
          style={{ backgroundColor: theme.glowHex }}
        />

        <div className="p-6 sm:p-8 lg:p-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`font-mono text-xs sm:text-sm font-extrabold tracking-wider border px-3 py-1 rounded-lg ${theme.badgeBg} ${theme.badgeBorder} ${theme.badgeText}`}>
                    {String(index + 1).padStart(2, "0")} {"//"} {String(total).padStart(2, "0")}
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 text-[11px] font-mono font-semibold">
                    <Layers className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{theme.systemTag}</span>
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                    LIVE
                  </span>
                </div>

                {formattedGithubUrl && (
                  <a
                    href={formattedGithubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                    className="relative z-30 pointer-events-auto flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-zinc-100 text-xs font-mono font-medium transition-colors"
                  >
                    <FaGithub className="w-3.5 h-3.5" />
                    <span>Source Code</span>
                  </a>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight leading-tight">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-[15px] text-slate-600 dark:text-zinc-300 font-normal leading-relaxed">
                  {project.description}
                </p>
              </div>

              {project.architecture && (
                <div className="rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200/90 dark:border-zinc-800/90 p-3.5 sm:p-4 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-800 dark:text-zinc-200 uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" style={{ color: theme.glowHex }} />
                      <span>System Design & Microservices</span>
                    </div>
                    <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md border ${theme.badgeBg} ${theme.badgeBorder} ${theme.badgeText}`}>
                      ⚡ {theme.metricHighlight}
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-600 dark:text-zinc-300 leading-relaxed font-light">
                    {project.architecture}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-wider font-semibold block">
                  Core Technologies & Stack
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {projectTags.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 text-xs font-mono font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href={`/projects/${project.id}`}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  className="relative z-30 pointer-events-auto border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-900 dark:text-zinc-100 text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-4 h-4 text-slate-500 dark:text-zinc-400" />
                </Link>

                {formattedLiveUrl && (
                  <a
                    href={formattedLiveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                    className={`relative z-30 pointer-events-auto text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-sm ${theme.liveBtnBg}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: 3D Frame */}
            <div
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              className="lg:col-span-5 w-full flex justify-center perspective-[1000px] select-none"
            >
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                className="relative w-full h-56 sm:h-72 md:h-80 lg:h-[350px] xl:h-[390px] rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900/50 shadow-xl dark:shadow-2xl group/preview transition-transform duration-300"
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
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 dark:from-zinc-950/70 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}