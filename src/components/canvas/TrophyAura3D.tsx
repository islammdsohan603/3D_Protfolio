"use client";

/**
 * TrophyAura3D — Floating Trophy Particle Vortex
 *
 * Contextual 3D environment for the Achievements section:
 *  - Swirling golden/amber particle vortex centered in the section
 *  - Outer particle ring slowly rotating like a trophy aura
 *  - Additive-blended golden glow that pulses in sync with time
 *  - Subtle cyan accents for contrast with the amber primary
 *
 * Performance:
 *  - Single Points draw call
 *  - frameloop="demand"
 *  - Mobile: 40% fewer particles, no vortex spiral
 */

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─────────────────────────────────────────────────────────────────────────────
// Vortex Particle Cloud — spiraling golden aura
// ─────────────────────────────────────────────────────────────────────────────
function TrophyVortex({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors, initialAngles] = useMemo(() => {
    const pos    = new Float32Array(count * 3);
    const col    = new Float32Array(count * 3);
    const angles = new Float32Array(count);

    const amber  = new THREE.Color("#f59e0b");
    const gold   = new THREE.Color("#fbbf24");
    const cyan   = new THREE.Color("#00f2fe");
    const violet = new THREE.Color("#a855f7");

    const palette = [amber, gold, cyan, violet, gold, gold]; // weighted toward gold

    const rng = (s: number) => {
      const x = Math.sin(s * 12.9898 + 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    for (let i = 0; i < count; i++) {
      // Spiral vortex layout
      const t     = i / count;
      const angle = t * Math.PI * 8;          // 4 full revolutions
      const radius = 0.8 + t * 3.5;           // grows outward
      const height = (rng(i * 3 + 1) - 0.5) * 5; // vertical spread

      pos[i * 3]     = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      angles[i] = angle;

      const c = palette[Math.floor(rng(i * 3 + 4) * palette.length)];
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col, angles];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    // Slow vortex rotation
    pointsRef.current.rotation.y = t * 0.1;
    // Subtle vertical oscillation
    pointsRef.current.position.y = Math.sin(t * 0.4) * 0.15;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]}    />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Outer Aura Ring — a flat torus of particles for trophy crown halo effect
// ─────────────────────────────────────────────────────────────────────────────
function AuraRing({ isMobile }: { isMobile: boolean }) {
  const ringRef = useRef<THREE.Mesh>(null!);
  const segs = isMobile ? 48 : 80;

  useFrame((state) => {
    if (!ringRef.current) return;
    const t = state.clock.getElapsedTime();
    ringRef.current.rotation.z += 0.003;
    ringRef.current.rotation.x = Math.PI / 2.5 + Math.sin(t * 0.5) * 0.1;

    const mat = ringRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.12 + Math.sin(t * 1.8) * 0.06;
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
      <torusGeometry args={[3.2, 0.04, 10, segs]} />
      <meshBasicMaterial
        color="#f59e0b"
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Scene Root
// ─────────────────────────────────────────────────────────────────────────────
function TrophyScene({ isMobile }: { isMobile: boolean }) {
  const particleCount = isMobile ? 60 : 150;

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight color="#f59e0b" intensity={0.8} position={[0, 2, 2]} distance={8} decay={2} />
      <pointLight color="#00f2fe" intensity={0.4} position={[-3, -1, 1]} distance={6} decay={2} />

      <TrophyVortex count={particleCount} />
      <AuraRing isMobile={isMobile} />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Exported component
// ─────────────────────────────────────────────────────────────────────────────
export default function TrophyAura3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <Canvas
      frameloop="demand"
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      dpr={[1, isMobile ? 1 : 1.5]}
      camera={{ position: [0, 0, 9], fov: 55 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <TrophyScene isMobile={isMobile} />
    </Canvas>
  );
}
