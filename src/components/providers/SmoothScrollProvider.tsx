"use client";

import React from "react";
import { ReactLenis } from "lenis/react";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

/**
 * Global Buttery Smooth Scroll Engine powered by Lenis
 * Delivers natural inertia curve, frictionless momentum, and seamless
 * coexistence with Framer Motion scroll triggers and sticky-pinned interactive decks.
 */
export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.0,
        syncTouch: false,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
