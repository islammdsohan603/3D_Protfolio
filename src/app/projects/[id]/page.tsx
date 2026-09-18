import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, ShieldCheck, CheckCircle2, Code2, Layers, Terminal } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import rawProjects from "@/components/db/projects.json";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectDetailHeroImage from "./ProjectDetailHeroImage";

interface ProjectSchema {
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

// Generate static params for SSG pre-rendering
export async function generateStaticParams() {
  const projects = rawProjects as ProjectSchema[];
  return projects.map((project) => ({
    id: String(project.id),
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const projectId = resolvedParams.id;

  const projects = rawProjects as ProjectSchema[];
  const project = projects.find((p) => String(p.id) === String(projectId));

  if (!project) {
    notFound();
  }

  const projectTags = project.tags || project.tech || [];
  const projectLive = project.liveUrl || project.live || "#";
  const projectGithub = project.githubUrl || project.github || "#";

  return (
    <main className="relative min-h-screen bg-slate-100 dark:bg-[#08090a] text-slate-900 dark:text-zinc-100 overflow-hidden selection:bg-cyan-500 selection:text-black transition-colors duration-300">
      {/* Sci-Fi Grid Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Glassmorphic Navbar */}
      <Navbar />

      <div className="relative z-10 w-11/12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16">
        {/* Top Back Navigation Bar */}
        <div className="mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/[0.08] hover:border-indigo-400 dark:hover:border-cyan-400/40 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white text-xs sm:text-sm font-mono transition-all group shadow-xs"
          >
            <ArrowLeft className="w-4 h-4 text-indigo-600 dark:text-cyan-400 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Projects Showcase</span>
          </Link>
        </div>

        {/* Hero Banner Header Card */}
        <div className="relative bg-white/90 dark:bg-white/[0.03] backdrop-blur-xl rounded-3xl border border-slate-200/90 dark:border-white/[0.08] overflow-hidden p-6 sm:p-10 mb-12 shadow-xl dark:shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-mono">
              <Terminal className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>CASE STUDY ARCHITECTURE #{project.id}</span>
            </div>

            <div className="flex items-center gap-3">
              {projectGithub !== "#" && (
                <a
                  href={projectGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.1] text-slate-800 dark:text-zinc-200 hover:text-slate-900 dark:hover:text-white text-xs font-semibold transition-all flex items-center gap-2 shadow-xs"
                >
                  <FaGithub className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}
              {projectLive !== "#" && (
                <a
                  href={projectLive}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all flex items-center gap-2 shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Production Preview</span>
                </a>
              )}
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
            {project.title}
          </h1>

          <p className="text-slate-600 dark:text-zinc-300 text-base sm:text-xl font-light leading-relaxed max-w-4xl mb-8">
            {project.description}
          </p>

          {/* Robust Hero Image Component */}
          <ProjectDetailHeroImage src={project.image} alt={project.title} />
        </div>

        {/* Detailed Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Main Content: Architecture & Features */}
          <div className="lg:col-span-8 space-y-8">
            {/* Architecture Section */}
            {project.architecture && (
              <div className="bg-white/90 dark:bg-white/[0.03] backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-white/[0.08] space-y-4 shadow-md dark:shadow-xl">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-cyan-400">
                  <Layers className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
                  <span>System Design & Architecture</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Technical Architecture & Engineering Pattern
                </h3>
                <p className="text-slate-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
                  {project.architecture}
                </p>
              </div>
            )}

            {/* Key Features List */}
            {project.features && project.features.length > 0 && (
              <div className="bg-white/90 dark:bg-white/[0.03] backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-white/[0.08] space-y-6 shadow-md dark:shadow-xl">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Engineering Highlights ({project.features.length})</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Key Features & Capabilities
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.05] flex items-start gap-3 shadow-xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 font-light leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Tech Stack & Meta Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white/90 dark:bg-white/[0.03] backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-white/[0.08] space-y-6 shadow-md dark:shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                <Code2 className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
                <span>Technologies & Libraries</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Tech Stack
              </h3>

              <div className="flex flex-wrap gap-2">
                {projectTags.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-800 dark:text-cyan-300 text-xs font-mono font-medium shadow-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-white/[0.08] space-y-4">
                {projectLive !== "#" && (
                  <a
                    href={projectLive}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Launch Live Preview</span>
                  </a>
                )}

                {projectGithub !== "#" && (
                  <a
                    href={projectGithub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl font-semibold text-xs text-slate-800 dark:text-zinc-200 bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/[0.1] transition-all flex items-center justify-center gap-2 border border-slate-200 dark:border-white/[0.1] shadow-xs"
                  >
                    <FaGithub className="w-4 h-4" />
                    <span>Inspect GitHub Source</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
