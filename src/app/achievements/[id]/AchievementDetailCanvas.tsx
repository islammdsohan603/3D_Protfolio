"use client";

import React from "react";
import dynamic from "next/dynamic";

const AmbientParticles3D = dynamic(
  () => import("@/components/canvas/AmbientParticles3D"),
  { ssr: false, loading: () => null }
);

interface AchievementDetailCanvasProps {
  variant?: "cyan-violet" | "indigo-emerald" | "amber-cyan";
}

export default function AchievementDetailCanvas({
  variant = "amber-cyan",
}: AchievementDetailCanvasProps) {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none">
      <AmbientParticles3D variant={variant} />
      {/* Sci-Fi Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100/85 via-slate-100/40 to-slate-100/90 dark:from-[#08090a]/85 dark:via-[#08090a]/40 dark:to-[#08090a]/90 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-gradient-to-tr from-amber-500/10 via-cyan-500/8 to-indigo-500/8 blur-[140px] rounded-full pointer-events-none" />
    </div>
  );
}
