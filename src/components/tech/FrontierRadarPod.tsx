"use client";

import React from "react";
import { motion } from "framer-motion";
import { Radio, ShieldAlert, Cpu, Terminal, Zap, ArrowUpRight } from "lucide-react";
import { SiDocker, SiSocketdotio, SiAnthropic } from "react-icons/si";

export default function FrontierRadarPod() {
  return (
    <div className="relative rounded-3xl bg-slate-950/80 border border-cyan-500/30 p-6 sm:p-8 backdrop-blur-xl overflow-hidden shadow-2xl">
      {/* Sci-Fi Background Glow & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,242,254,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header telemetry badge */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 relative z-10 border-b border-cyan-500/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Radio className="w-5 h-5 animate-pulse text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-white text-xl tracking-tight">Active Frontier Radar</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-[10px] uppercase font-bold tracking-wider">
                LIVE POD
              </span>
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm mt-0.5">
              Continuous learning radar targeting next-gen scalable backend & AI engineering capabilities.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1.5 rounded-full">
          <Zap className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
          <span>SCANNING FREQUENCY 5.8 GHz</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Animated Pulse Radar Station Visual */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 relative">
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Concentric Radar Circles */}
            <div className="absolute inset-0 rounded-full border border-cyan-500/20" />
            <div className="absolute inset-4 rounded-full border border-cyan-500/30" />
            <div className="absolute inset-12 rounded-full border border-cyan-500/40" />

            {/* Crosshair lines */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-px bg-cyan-500/20" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-full w-px bg-cyan-500/20" />
            </div>

            {/* Rotating Radar Sweep Line */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute inset-0 rounded-full origin-center"
              style={{
                background: "conic-gradient(from 0deg, rgba(0,242,254,0.4) 0deg, rgba(0,242,254,0) 60deg, transparent 360deg)",
              }}
            />

            {/* Target Blips */}
            <div className="absolute top-10 left-12 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f2fe] animate-ping" />
            <div className="absolute bottom-12 right-14 w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_12px_#a855f7] animate-ping" />
            <div className="absolute top-16 right-10 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]" />

            {/* Radar Center Station Core */}
            <div className="relative w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(0,242,254,0.5)]">
              <Cpu className="w-6 h-6 text-cyan-300" />
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase">
              DEEP TELEMETRY ACTIVE
            </span>
          </div>
        </div>

        {/* Right Column: High Priority Radar Learning Tooling Cards */}
        <div className="lg:col-span-8 space-y-4">
          {/* Card 1: Docker Containerization */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-cyan-400/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                <SiDocker className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-base">Docker Containerization</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
                    LAB PHASE
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Multi-stage Dockerfiles, microservice container isolation, and local compose environments.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-sky-400 font-bold bg-sky-950/60 px-3 py-1.5 rounded-lg border border-sky-800/40 shrink-0">
              78% Mastery
            </span>
          </div>

          {/* Card 2: Real-time WebSockets */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-cyan-400/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <SiSocketdotio className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-base">WebSockets Real-time Pipelines</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    EVENT PIPELINES
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Low-latency bi-directional channels, Socket.io event emitters, and live notification streams.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-bold bg-cyan-950/60 px-3 py-1.5 rounded-lg border border-cyan-800/40 shrink-0">
              82% Mastery
            </span>
          </div>

          {/* Card 3: AI-Augmented Engineering */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-purple-400/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <SiAnthropic className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-base">AI-Augmented Engineering</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    ADVANCED WORKFLOW
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Cursor agentic coding, prompt engineering, automated unit testing, and architecture planning.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-purple-400 font-bold bg-purple-950/60 px-3 py-1.5 rounded-lg border border-purple-800/40 shrink-0">
              94% Mastery
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
