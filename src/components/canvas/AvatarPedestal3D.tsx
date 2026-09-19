"use client";

/**
 * AvatarPedestal3D — Holographic Projection Disc & Cyber Pedestal
 *
 * Renders a premium sci-fi holographic pedestal beneath the developer portrait:
 *  - Concentric neon cyan/indigo energy rings rotating in 3D perspective
 *  - Rising floating telemetry particles that ascend vertically
 *  - Reactive to mouse pointer via smooth lerp dampening
 *  - Additive blending only — transparent, sits behind profile card
 *
 * Performance:
 *  - ≤ 6 draw calls (3 tori + 1 particles + 1 disc + 1 glow)
 *  - frameloop="demand" — pauses when not active
 *  - Mobile: simplified geometry (half segments), no pointer tracking
 */

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─────────────────────────────────────────────────────────────────────────────
// Holographic Base Disc
// ─────────────────────────────────────────────────────────────────────────────
function HolographicDisc({ isMobile }: { isMobile: boolean }) {
  const discRef = useRef<THREE.Mesh>(null!);
  const segs = isMobile ? 32 : 64;

  useFrame((state) => {
    if (!discRef.current) return;
    discRef.current.rotation.z += 0.004;
    // Gentle breathing pulse via scale
    const t = state.clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * 1.8) * 0.025;
    discRef.current.scale.set(pulse, pulse, 1);
  });

  return (
    <mesh ref={discRef} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1.1, 1.4, segs]} />
      <meshBasicMaterial
        color="#00f2fe"
        transparent
        opacity={0.18}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Energy Rings — 3 concentric rotating tori at varying tilts
// ─────────────────────────────────────────────────────────────────────────────
function EnergyRings({ isMobile }: { isMobile: boolean }) {
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);
  const ring3 = useRef<THREE.Mesh>(null!);
  const segs = isMobile ? 32 : 60;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1.current) {
      ring1.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.5) * 0.12;
      ring1.current.rotation.z += 0.008;
    }
    if (ring2.current) {
      ring2.current.rotation.x = -Math.PI / 4 + Math.cos(t * 0.4) * 0.1;
      ring2.current.rotation.y += 0.006;
    }
    if (ring3.current) {
      ring3.current.rotation.x = Math.PI / 6 + Math.sin(t * 0.3) * 0.08;
      ring3.current.rotation.z -= 0.005;
    }
  });

  return (
    <group>
      {/* Ring 1 — primary cyan */}
      <mesh ref={ring1}>
        <torusGeometry args={[0.9, 0.012, 12, segs]} />
        <meshBasicMaterial
          color="#00f2fe"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Ring 2 — indigo */}
      <mesh ref={ring2}>
        <torusGeometry args={[1.25, 0.009, 10, segs]} />
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Ring 3 — sky blue outer */}
      <mesh ref={ring3}>
        <torusGeometry args={[1.6, 0.007, 8, segs]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Rising Telemetry Particles — ascend slowly, loop back to base
// ─────────────────────────────────────────────────────────────────────────────
function RisingParticles({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  // Static random positions in a cylinder
  const [positions, speeds, colors] = useMemo(() => {
    const pos    = new Float32Array(count * 3);
    const spd    = new Float32Array(count);
    const col    = new Float32Array(count * 3);
    const cyan   = new THREE.Color("#00f2fe");
    const violet = new THREE.Color("#a855f7");

    const rng = (s: number) => {
      const x = Math.sin(s * 12.9898 + 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    for (let i = 0; i < count; i++) {
      const angle  = rng(i * 5 + 1) * Math.PI * 2;
      const radius = rng(i * 5 + 2) * 1.2 + 0.3;

      pos[i * 3]     = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (rng(i * 5 + 3) - 0.3) * 3;  // y: -0.9 to +2.1
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      spd[i] = rng(i * 5 + 4) * 0.012 + 0.004;

      const c = rng(i * 5 + 5) > 0.5 ? cyan : violet;
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, spd, col];
  }, [count]);

  const posRef = useRef(positions.slice()); // mutable copy

  useFrame(() => {
    if (!pointsRef.current) return;
    const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr  = attr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i];
      // Loop back to bottom when particle exits top
      if (arr[i * 3 + 1] > 2.5) {
        arr[i * 3 + 1] = -0.9;
      }
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[posRef.current, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]}          />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Pointer-Reactive Group — the whole pedestal tilts toward cursor
// ─────────────────────────────────────────────────────────────────────────────
function PedestalScene({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const { viewport } = useThree();
  const particleCount = isMobile ? 25 : 55;

  useFrame((state) => {
    if (!groupRef.current) return;
    if (isMobile) return; // skip pointer tracking on mobile

    const targetX = -state.pointer.y * 0.25;
    const targetY =  state.pointer.x * 0.25;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x, targetX, 0.06
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y, targetY, 0.06
    );
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight color="#00f2fe" intensity={1.2} position={[0, 1.5, 2]} distance={6} decay={2} />
      <pointLight color="#6366f1" intensity={0.8} position={[0, -1, -1]} distance={5} decay={2} />

      <group ref={groupRef}>
        <HolographicDisc isMobile={isMobile} />
        <EnergyRings isMobile={isMobile} />
        <RisingParticles count={particleCount} />
      </group>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Exported component
// Renders as an absolute overlay beneath the profile photo frame.
// Parent must have position: relative for this to be positioned correctly.
// ─────────────────────────────────────────────────────────────────────────────
interface AvatarPedestal3DProps {
  /** Height of the canvas in pixels */
  height?: number;
}

export default function AvatarPedestal3D({ height = 220 }: AvatarPedestal3DProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div
      style={{ height, width: "100%", position: "absolute", bottom: -height / 3, left: 0, right: 0 }}
      className="pointer-events-none select-none z-0"
    >
      <Canvas
        frameloop="demand"
        gl={{ antialias: !isMobile, alpha: true, powerPreference: "low-power" }}
        dpr={[1, isMobile ? 1 : 1.5]}
        camera={{ position: [0, 1.2, 4], fov: 42 }}
        style={{ position: "absolute", inset: 0 }}
      >
        <PedestalScene isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
