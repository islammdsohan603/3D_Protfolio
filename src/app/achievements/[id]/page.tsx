import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Award,
  Calendar,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Terminal,
  Layers,
  FileBadge,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AchievementDetailCanvas from "./AchievementDetailCanvas";
import AchievementImageTilt from "./AchievementImageTilt";

export interface AchievementDetailData {
  id: string;
  title: string;
  subtitle: string;
  organization: string;
  batch: string;
  credentialId?: string;
  issueDate: string;
  validity: string;
  badgeLabel: string;
  gradient: string;
  image: string;
  description: string;
  verificationUrl: string;
  variant: "cyan-violet" | "indigo-emerald" | "amber-cyan";
  scope: string[];
  milestones: string[];
  metrics: { label: string; value: string }[];
}

const ACHIEVEMENTS_MAP: Record<string, AchievementDetailData> = {
  blackbelt: {
    id: "blackbelt",
    title: "Programming Hero BLACKBELT Developer",
    subtitle: "Top-Tier Honor for Technical Mastery, Architectural Excellence & Rapid Execution",
    organization: "Programming Hero",
    batch: "Batch 13",
    credentialId: "PH-B13-BLACKBELT-SOHAN",
    issueDate: "October 2024",
    validity: "Valid Till Oct 2026 (Lifetime Status)",
    badgeLabel: "Blackbelt Developer",
    gradient: "bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300",
    image: "/blackbelt.png",
    verificationUrl: "https://web.programming-hero.com",
    variant: "amber-cyan",
    description:
      "Awarded the prestigious BLACKBELT title by Programming Hero for achieving top-tier scores, exceptional code quality, rapid problem solving, and building complex end-to-end full-stack applications in Batch 13. Recognized for engineering resilience, clean code architecture, and high-performance execution across modern web technologies.",
    scope: [
      "React.js 19 Architecture",
      "Next.js App Router & Server Actions",
      "TypeScript Strict Typing",
      "Node.js & Express.js REST APIs",
      "MongoDB Data Modeling & Indexing",
      "System Architecture & Security",
      "AI Workflows & LLM Integration",
      "Tailwind CSS & Framer Motion",
      "JWT & OAuth 2.0 Security",
      "Vercel Cloud CI/CD Pipelines",
    ],
    milestones: [
      "Attained top-tier class percentile rank in Batch 13",
      "Consistent 100/100 scores in consecutive full-stack milestone sprints",
      "Architected complex enterprise-grade SaaS web applications from scratch",
      "Exemplary performance in algorithmic problem solving and system debugging",
    ],
    metrics: [
      { label: "Recognition", value: "BLACKBELT" },
      { label: "Graduation Cohort", value: "Batch 13" },
      { label: "Curriculum Score", value: "Top Tier" },
      { label: "Status", value: "Verified Active" },
    ],
  },
  certificate: {
    id: "certificate",
    title: "Certificate of Completion with Excellence",
    subtitle: "Complete Web Development Course (Batch 13, WEB13-0641)",
    organization: "Programming Hero",
    batch: "Batch 13",
    credentialId: "WEB13-0641",
    issueDate: "September 2024",
    validity: "Official Verified Certificate",
    badgeLabel: "Top Graduate / Excellence",
    gradient: "bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-400",
    image: "/cartificat.png",
    verificationUrl: "https://web.programming-hero.com",
    variant: "cyan-violet",
    description:
      "Completed the rigorous, comprehensive web engineering program with top-tier distinction (Credential ID: WEB13-0641). Spanning comprehensive fundamentals to modern full-stack web stacks: semantic HTML5, modern CSS3/Tailwind, JavaScript ES6+, React, Next.js App Router, Node.js server architectures, MongoDB data pipelines, authentication systems, and production cloud deployments.",
    scope: [
      "HTML5 Semantic Standards",
      "Tailwind CSS & Responsive Layouts",
      "JavaScript ES6+ Asynchronous Core",
      "React.js & Custom Hooks",
      "Next.js App Router & SSR",
      "Node.js & Express RESTful APIs",
      "MongoDB Atlas Aggregations",
      "JWT Authentication & Session Security",
      "Payment Gateway Integrations",
      "Vercel & Cloud CI/CD Deployments",
    ],
    milestones: [
      "Successfully delivered 12+ production-ready milestone web projects",
      "Passed all rigorous peer code reviews and architectural defenses",
      "Mastered full-stack authentication, database modeling, and real-time state",
      "Officially credentialed under verified certificate ID: WEB13-0641",
    ],
    metrics: [
      { label: "Credential ID", value: "WEB13-0641" },
      { label: "Graduation Cohort", value: "Batch 13" },
      { label: "Distinction", value: "Excellence" },
      { label: "Status", value: "Verified Official" },
    ],
  },
};

// Aliases for route flexibility
ACHIEVEMENTS_MAP["blackbelt-dev"] = ACHIEVEMENTS_MAP["blackbelt"];
ACHIEVEMENTS_MAP["completion-excellence"] = ACHIEVEMENTS_MAP["certificate"];

export async function generateStaticParams() {
  return [
    { id: "blackbelt" },
    { id: "certificate" },
    { id: "blackbelt-dev" },
    { id: "completion-excellence" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const achievement = ACHIEVEMENTS_MAP[resolvedParams.id];

  if (!achievement) {
    return {
      title: "Achievement Details | MD. SOHAN",
    };
  }

  return {
    title: `${achievement.title} | Verified Credential | MD. SOHAN`,
    description: achievement.description,
  };
}

export default async function AchievementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const achievement = ACHIEVEMENTS_MAP[resolvedParams.id];

  if (!achievement) {
    notFound();
  }

  return (
    <main className="relative min-h-screen bg-slate-100 dark:bg-[#08090a] text-slate-900 dark:text-zinc-100 overflow-hidden selection:bg-cyan-500 selection:text-black transition-colors duration-300">
      {/* 3D Contextual Ambient Particle Canvas */}
      <AchievementDetailCanvas variant={achievement.variant} />

      {/* Sci-Fi Grid Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Navigation Bar */}
      <Navbar />

      <div className="relative z-10 w-11/12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-24">
        {/* Breadcrumb / Back Navigation */}
        <div className="mb-8">
          <Link
            href="/#achievements"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 dark:bg-zinc-950/80 border border-slate-200/90 dark:border-zinc-800/80 hover:border-amber-400 dark:hover:border-cyan-400 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white text-xs sm:text-sm font-mono transition-all group shadow-xs backdrop-blur-xl"
          >
            <ArrowLeft className="w-4 h-4 text-amber-600 dark:text-cyan-400 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Achievements Showcase</span>
          </Link>
        </div>

        {/* Top Header Banner Card */}
        <div className="relative bg-zinc-950/80 backdrop-blur-xl rounded-3xl border border-zinc-800/80 p-6 sm:p-10 mb-10 shadow-2xl text-white overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-amber-500/10 via-cyan-500/10 to-transparent blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
                <Terminal className="w-3.5 h-3.5 text-amber-400" />
                <span>OFFICIAL VERIFIED CREDENTIAL CASE STUDY</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={achievement.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 hover:border-cyan-400 text-zinc-200 hover:text-white text-xs font-mono font-semibold transition-all flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Verify at Programming Hero</span>
                </a>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-3 leading-tight">
              {achievement.title}
            </h1>

            <p className="text-zinc-300 text-base sm:text-lg font-light leading-relaxed max-w-4xl mb-6">
              {achievement.subtitle}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-zinc-800/80">
              {achievement.metrics.map((m, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                    {m.label}
                  </div>
                  <div className="text-base sm:text-lg font-bold font-mono text-cyan-400">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Split Grid / Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 3D Tilt Zoomable Image Frame (5 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <AchievementImageTilt
              src={achievement.image}
              alt={achievement.title}
              badgeLabel={achievement.badgeLabel}
              gradient={achievement.gradient}
            />

            {/* Credential Meta Card */}
            <div className="bg-zinc-950/80 backdrop-blur-xl rounded-3xl border border-zinc-800/80 p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
                <FileBadge className="w-4 h-4 text-cyan-400" />
                <span>Verification & Issuance Telemetry</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                  <span className="text-zinc-500 uppercase">Issuing Authority</span>
                  <div className="text-sm font-semibold text-zinc-200">
                    {achievement.organization}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                  <span className="text-zinc-500 uppercase">Issue Date</span>
                  <div className="text-sm font-semibold text-zinc-200 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{achievement.issueDate}</span>
                  </div>
                </div>

                {achievement.credentialId && (
                  <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1 sm:col-span-2">
                    <span className="text-zinc-500 uppercase">Official Credential ID</span>
                    <div className="text-sm font-bold text-amber-400 break-all">
                      {achievement.credentialId}
                    </div>
                  </div>
                )}

                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1 sm:col-span-2">
                  <span className="text-zinc-500 uppercase">Validity Period</span>
                  <div className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{achievement.validity}</span>
                  </div>
                </div>
              </div>

              <a
                href={achievement.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Verify Credential on Official Portal</span>
              </a>
            </div>
          </div>

          {/* Right Column: Case Study Narrative, Milestones & Curriculum Scope (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            {/* Overview Card */}
            <div className="bg-zinc-950/80 backdrop-blur-xl rounded-3xl border border-zinc-800/80 p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Honor Background & Evaluation Criteria</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                About This Credential
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
                {achievement.description}
              </p>
            </div>

            {/* Key Milestones */}
            <div className="bg-zinc-950/80 backdrop-blur-xl rounded-3xl border border-zinc-800/80 p-6 sm:p-8 space-y-5 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Milestone Achievements</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Demonstrated Competencies
              </h2>

              <div className="space-y-3">
                {achievement.milestones.map((milestone, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                      {milestone}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Scope */}
            <div className="bg-zinc-950/80 backdrop-blur-xl rounded-3xl border border-zinc-800/80 p-6 sm:p-8 space-y-5 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Technical Scope Verified ({achievement.scope.length} Domains)</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Curriculum Scope & Tech Stack
              </h2>

              <div className="flex flex-wrap gap-2.5">
                {achievement.scope.map((tech) => (
                  <div
                    key={tech}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-cyan-500/40 text-cyan-300 text-xs font-mono transition-colors shadow-xs"
                  >
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>{tech}</span>
                  </div>
                ))}
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
