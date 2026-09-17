"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamic import for R3F Canvas with SSR disabled
const AntigravityScene = dynamic(
  () => import("./AntigravityScene"),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 z-0 bg-[#09090b] flex items-center justify-center opacity-40">
        <div className="w-12 h-12 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    ),
  }
);

export default function AntigravityCanvasWrapper() {
  return <AntigravityScene />;
}
