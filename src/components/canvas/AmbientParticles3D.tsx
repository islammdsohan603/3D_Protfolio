"use client";

/**
 * AmbientParticles3D — Shared Lightweight Particle Field
 *
 * A unified, scrolling ambient starfield / micro-dust cloud that provides
 * depth cues and 3D atmosphere across the Skills, Experience, and Achievements
 * sections without the visual weight of a full constellation scene.
 *
 * Performance profile:
 *  - Single Points draw call (~60 desktop / ~25 mobile particles)
 *  - frameloop="demand" — only renders when pointer or scroll changes
 *  - dpr capped at 1.0 on mobile, 1.5 on desktop
 *  - No Three.js lights (no shadow / material overhead)
 *  - powerPreference: "low-power"
 */

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─────────────────────────────────────────────────────────────────────────────
// Color variant presets — each section gets its own tint
// ─────────────────────────────────────────────────────────────────────────────
type AmbientVariant = "cyan-violet" | "indigo-emerald" | "amber-cyan";

const VARIANT_PALETTES: Record<AmbientVariant, string[]> = {
  "cyan-violet":    ["#00f2fe", "#6366f1", "#38bdf8"],
  "indigo-emerald": ["#6366f1", "#10b981", "#4facfe"],
  "amber-cyan":     ["#f59e0b", "#00f2fe", "#a78bfa"],
};

// ─────────────────────────────────────────────────────────────────────────────
// Particle mesh
// ─────────────────────────────────────────────────────────────────────────────
function AmbientCloud({
  count,
  variant,
}: {
  count: number;
  variant: AmbientVariant;
}) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = VARIANT_PALETTES[variant].map((hex) => new THREE.Color(hex));

    const rng = (seed: number) => {
      const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (rng(i * 3 + 1) - 0.5) * 22;
      pos[i * 3 + 1] = (rng(i * 3 + 2) - 0.5) * 16;
      pos[i * 3 + 2] = (rng(i * 3 + 3) - 0.5) * 10;

      const c = palette[Math.floor(rng(i * 3 + 4) * palette.length)];
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count, variant]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.013;
    pointsRef.current.rotation.x = Math.sin(t * 0.2) * 0.03;
    // Subtle pointer parallax
    pointsRef.current.rotation.z = state.pointer.x * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]}    />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Exported component — drop into any section as an absolute inset-0 background
// ─────────────────────────────────────────────────────────────────────────────
interface AmbientParticles3DProps {
  /** Color palette variant matching the section's accent hue */
  variant?: AmbientVariant;
}

export default function AmbientParticles3D({
  variant = "cyan-violet",
}: AmbientParticles3DProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const particleCount = isMobile ? 25 : 60;

  return (
    <Canvas
      frameloop="demand"
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "low-power",
      }}
      dpr={[1, isMobile ? 1 : 1.5]}
      camera={{ position: [0, 0, 7], fov: 60 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <AmbientCloud count={particleCount} variant={variant} />
    </Canvas>
  );
}
