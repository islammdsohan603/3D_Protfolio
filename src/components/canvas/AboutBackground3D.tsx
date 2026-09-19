"use client";

/**
 * AboutBackground3D — Cybernetic Geodesic Core + Neural Particle Matrix
 *
 * Visual concept:
 *  - Wireframe icosahedron that gently tilts toward cursor (smooth lerp)
 *  - Outer geodesic ring lattice rotating counter to core
 *  - Ambient neural particle cloud orbiting behind content
 *  - Neon cyan (#00f2fe) + violet (#6366f1) at low opacity — text stays crisp
 *
 * Performance guards:
 *  - frameloop="demand" (only renders when state changes)
 *  - dpr capped at 1.5
 *  - Mobile: particle count halved, pointer repulsion disabled
 *  - ≤ 8 draw calls total
 */

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─────────────────────────────────────────────────────────────────────────────
// Wireframe Geodesic Core — reacts smoothly to pointer via lerp
// ─────────────────────────────────────────────────────────────────────────────
function GeodesicCore({ isMobile }: { isMobile: boolean }) {
  const outerRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const ringRef  = useRef<THREE.Mesh>(null!);

  const targetRotX = useRef(0);
  const targetRotY = useRef(0);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Pointer-driven tilt target (disabled on mobile to save CPU)
    if (!isMobile) {
      targetRotX.current = state.pointer.y * 0.35;
      targetRotY.current = state.pointer.x * 0.35;
    }

    // Outer icosahedron — lerp toward pointer + slow idle spin
    if (outerRef.current) {
      outerRef.current.rotation.x = THREE.MathUtils.lerp(
        outerRef.current.rotation.x,
        targetRotX.current + t * 0.07,
        0.04
      );
      outerRef.current.rotation.y = THREE.MathUtils.lerp(
        outerRef.current.rotation.y,
        targetRotY.current + t * 0.09,
        0.04
      );
    }

    // Inner octahedron — counter-rotates for cymatic layering
    if (innerRef.current) {
      innerRef.current.rotation.y -= 0.006;
      innerRef.current.rotation.x += 0.004;
      innerRef.current.rotation.z += 0.003;
    }

    // Ring — tilts with pointer and slow Y spin
    if (ringRef.current) {
      ringRef.current.rotation.y = THREE.MathUtils.lerp(
        ringRef.current.rotation.y,
        -targetRotY.current * 0.5 + t * 0.05,
        0.03
      );
      ringRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;
    }
  });

  return (
    <group position={[isMobile ? 1.2 : 2.6, 0, -1.5]} scale={isMobile ? 0.65 : 1}>
      {/* Outer geodesic wireframe icosahedron */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.7, 1]} />
        <meshBasicMaterial
          color="#00f2fe"
          wireframe
          transparent
          opacity={0.13}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Inner counter-rotating octahedron */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.95, 0]} />
        <meshBasicMaterial
          color="#6366f1"
          wireframe
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Equatorial torus ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[2.1, 0.012, 12, 64]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Core glow point */}
      <pointLight color="#00f2fe" intensity={0.7} distance={4} decay={2} />
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Neural Particle Matrix — floating micro-dust cloud
// ─────────────────────────────────────────────────────────────────────────────
function NeuralParticleMatrix({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan   = new THREE.Color("#00f2fe");
    const violet = new THREE.Color("#6366f1");
    const sky    = new THREE.Color("#38bdf8");

    const palette = [cyan, violet, sky];

    // Deterministic pseudo-random (avoids React hydration issues)
    const rng = (seed: number) => {
      const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (rng(i * 3 + 1) - 0.5) * 18;
      pos[i * 3 + 1] = (rng(i * 3 + 2) - 0.5) * 14;
      pos[i * 3 + 2] = (rng(i * 3 + 3) - 0.5) * 9;

      const c = palette[Math.floor(rng(i * 3 + 4) * palette.length)];
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.018;
    pointsRef.current.rotation.x = Math.sin(t * 0.25) * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]}    />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Lattice Line Network — 8 vertex-to-vertex connections
// ─────────────────────────────────────────────────────────────────────────────
function LatticeLines() {
  const { viewport } = useThree();
  const linesRef = useRef<THREE.LineSegments>(null!);
  const t = useRef(0);

  const positions = useMemo(() => {
    // 8 lines → 16 points × 3 components
    const pts = new Float32Array(16 * 3);
    return pts;
  }, []);

  const nodeAngles = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2),
  []);

  useFrame((state, delta) => {
    t.current += delta * 0.15;
    if (!linesRef.current) return;
    const attr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr  = attr.array as Float32Array;

    const cx = (viewport.width  * 0.5) * 0.55;
    const cy = (viewport.height * 0.5) * 0.0;
    const r  = Math.min(viewport.width, viewport.height) * 0.35;

    let idx = 0;
    for (let i = 0; i < 8; i++) {
      const angle = nodeAngles[i] + t.current;
      const nx = cx + Math.cos(angle) * r;
      const ny = cy + Math.sin(angle) * r * 0.5;

      const nextAngle = nodeAngles[(i + 3) % 8] + t.current;
      const nx2 = cx + Math.cos(nextAngle) * r;
      const ny2 = cy + Math.sin(nextAngle) * r * 0.5;

      arr[idx++] = nx;  arr[idx++] = ny;  arr[idx++] = -2;
      arr[idx++] = nx2; arr[idx++] = ny2; arr[idx++] = -2;
    }
    attr.needsUpdate = true;
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        color="#00f2fe"
        transparent
        opacity={0.1}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// About Background Scene Root
// ─────────────────────────────────────────────────────────────────────────────
function AboutScene({ isMobile }: { isMobile: boolean }) {
  const particleCount = isMobile ? 40 : 85;

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 4]}  intensity={0.6} color="#00f2fe" />
      <directionalLight position={[-5, -8, -4]} intensity={0.4} color="#6366f1" />

      <GeodesicCore isMobile={isMobile} />
      <NeuralParticleMatrix count={particleCount} />
      <LatticeLines />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Exported component — mounted as absolute inset-0 background layer
// ─────────────────────────────────────────────────────────────────────────────
export default function AboutBackground3D() {
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
      gl={{
        antialias: !isMobile,
        alpha: true,
        powerPreference: "low-power",
      }}
      dpr={[1, isMobile ? 1 : 1.5]}
      camera={{ position: [0, 0, 7], fov: 55 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <AboutScene isMobile={isMobile} />
    </Canvas>
  );
}
