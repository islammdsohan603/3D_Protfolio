"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamic client-side import with SSR disabled to prevent hydration mismatch
const AntigravityScene = dynamic(
  () => import("./AntigravityScene"),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 z-0 bg-[#09090b] flex items-center justify-center opacity-40 pointer-events-none">
        <div className="w-12 h-12 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    ),
  }
);

/**
 * HeroBackground3D - Interactive 3D Floating Tech Constellation
 * Features:
 * - 7 Tech Nodes: TypeScript, JavaScript, Next.js, React, Node.js, Express.js, MongoDB
 * - Antigravity idle buoyancy + interactive mouse repulsion physics
 * - Real-time constellation filaments and stardust particle field
 * - Fully responsive with mobile spread safeguards
 */
export default function HeroBackground3D() {
  return <AntigravityScene />;
}

export { default as AntigravityScene } from "./AntigravityScene";
