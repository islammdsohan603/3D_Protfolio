"use client";

/**
 * RadarGrid3D — 3D Signal Radar & Communication HUD
 *
 * Contextual 3D environment for the Contact section:
 *  - 3D flat grid plane representing a satellite signal map / radar field
 *  - Concentric expanding radio wave rings emitting from center
 *  - Floating signal node points (particle dots) around the radar
 *  - Emerald/cyan color scheme matching the Contact section accent
 *
 * Performance:
 *  - Grid: 1 draw call (LineSegments)
 *  - Radio waves: 3 tori draw calls with opacity animation
 *  - Particles: 1 Points draw call
 *  - Total: ≤ 6 draw calls
 */

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─────────────────────────────────────────────────────────────────────────────
// 3D Perspective Grid Plane
// ─────────────────────────────────────────────────────────────────────────────
function RadarGridPlane({ isMobile }: { isMobile: boolean }) {
  const linesRef = useRef<THREE.LineSegments>(null!);
  const size     = 10;
  const divs     = isMobile ? 8 : 14;
  const step     = size / divs;

  const positions = useMemo(() => {
    const pts: number[] = [];
    const half = size / 2;
    // Lines along X
    for (let i = 0; i <= divs; i++) {
      const z = -half + i * step;
      pts.push(-half, 0, z, half, 0, z);
    }
    // Lines along Z
    for (let j = 0; j <= divs; j++) {
      const x = -half + j * step;
      pts.push(x, 0, -half, x, 0, half);
    }
    return new Float32Array(pts);
  }, [divs, size, step]);

  useFrame((state) => {
    if (!linesRef.current) return;
    const t = state.clock.getElapsedTime();
    // Tilt slightly toward viewer for dramatic perspective
    linesRef.current.rotation.x = -0.55 + Math.sin(t * 0.15) * 0.04;
    const mat = linesRef.current.material as THREE.LineBasicMaterial;
    mat.opacity = 0.06 + Math.sin(t * 1.5) * 0.02;
  });

  return (
    <lineSegments ref={linesRef} position={[0, -1.5, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        color="#10b981"
        transparent
        opacity={0.08}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Concentric Radio Wave Rings — expand outward and fade
// ─────────────────────────────────────────────────────────────────────────────
function RadioWave({
  phaseOffset,
  baseRadius,
  color,
  isMobile,
}: {
  phaseOffset: number;
  baseRadius: number;
  color: string;
  isMobile: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const segs = isMobile ? 32 : 56;

  useFrame((state) => {
    if (!meshRef.current) return;
    const t     = (state.clock.getElapsedTime() + phaseOffset) % 3.5;
    const scale = 0.2 + (t / 3.5) * 2.0;
    const opacity = Math.max(0, 0.35 - (t / 3.5) * 0.35);

    meshRef.current.scale.set(scale, scale, scale);

    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = opacity;
  });

  return (
    <mesh ref={meshRef} position={[0, -1.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[baseRadius - 0.04, baseRadius, segs]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Floating Signal Nodes — particle cloud around the radar
// ─────────────────────────────────────────────────────────────────────────────
function SignalNodes({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const emerald = new THREE.Color("#10b981");
    const cyan    = new THREE.Color("#00f2fe");

    const rng = (s: number) => {
      const x = Math.sin(s * 12.9898 + 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (rng(i * 3 + 1) - 0.5) * 20;
      pos[i * 3 + 1] = (rng(i * 3 + 2) - 0.5) * 14;
      pos[i * 3 + 2] = (rng(i * 3 + 3) - 0.5) * 10;

      const c = rng(i * 3 + 4) > 0.5 ? emerald : cyan;
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.01;
    pointsRef.current.rotation.x = Math.sin(t * 0.18) * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]}    />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Scene Root
// ─────────────────────────────────────────────────────────────────────────────
function RadarScene({ isMobile }: { isMobile: boolean }) {
  const nodeCount = isMobile ? 25 : 55;

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight color="#10b981" intensity={0.9} position={[0, 2, 2]} distance={8} decay={2} />
      <pointLight color="#00f2fe" intensity={0.5} position={[-3, 1, -1]} distance={6} decay={2} />

      {/* Perspective grid */}
      <RadarGridPlane isMobile={isMobile} />

      {/* 3 staggered radio wave rings */}
      <RadioWave phaseOffset={0}    baseRadius={0.9} color="#10b981" isMobile={isMobile} />
      <RadioWave phaseOffset={1.16} baseRadius={0.9} color="#00f2fe" isMobile={isMobile} />
      <RadioWave phaseOffset={2.33} baseRadius={0.9} color="#6366f1" isMobile={isMobile} />

      {/* Signal particle cloud */}
      <SignalNodes count={nodeCount} />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Exported component
// ─────────────────────────────────────────────────────────────────────────────
export default function RadarGrid3D() {
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
      camera={{ position: [0, 2.5, 7], fov: 52 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <RadarScene isMobile={isMobile} />
    </Canvas>
  );
}
