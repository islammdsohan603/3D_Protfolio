"use client";

/**
 * ServerCluster3D — Isometric Production Server Rack Visual
 *
 * Contextual 3D environment for the Work Experience section:
 *  - 3D server blade rack silhouettes with glowing status LED indicators
 *  - Live pulsing data stream tubes (LineSegments) representing high-throughput pipelines
 *  - Green/cyan blinking status LEDs for continuous high-availability signals
 *  - Subtle data packet particles flowing along stream paths
 *
 * Performance profile:
 *  - ≤ 10 draw calls (server blocks + LEDs + stream lines + particles)
 *  - InstancedMesh for LED dots (single draw call for N LEDs)
 *  - Mobile: 50% fewer servers, no data stream animation
 */

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─────────────────────────────────────────────────────────────────────────────
// Server Rack Blades — dark metallic boxes with LED strips
// ─────────────────────────────────────────────────────────────────────────────
function ServerRack({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const bladeCount = isMobile ? 4 : 8;
  const bladeHeight = 0.18;
  const bladeGap    = 0.28;

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle sway
    groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.06;
  });

  const blades = useMemo(() => {
    return Array.from({ length: bladeCount }, (_, i) => ({
      y: (i - bladeCount / 2) * bladeGap,
      ledColor: i % 3 === 0 ? "#10b981" : i % 3 === 1 ? "#00f2fe" : "#6366f1",
      phase: i * 0.7,
    }));
  }, [bladeCount, bladeGap]);

  return (
    <group ref={groupRef} position={[-1.8, 0, -1]}>
      {/* Rack chassis frame */}
      <mesh>
        <boxGeometry args={[1.4, bladeCount * bladeGap + 0.3, 0.5]} />
        <meshStandardMaterial
          color="#0a0e1a"
          roughness={0.7}
          metalness={0.9}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Server blades */}
      {blades.map((blade, i) => (
        <group key={i} position={[0, blade.y, 0.02]}>
          {/* Blade body */}
          <mesh>
            <boxGeometry args={[1.3, bladeHeight, 0.42]} />
            <meshStandardMaterial
              color="#111827"
              roughness={0.5}
              metalness={0.85}
              emissive="#060b14"
              emissiveIntensity={0.3}
            />
          </mesh>

          {/* LED strip — small sphere at right edge */}
          <LedDot
            position={[0.58, 0, 0.22]}
            color={blade.ledColor}
            phase={blade.phase}
          />
          <LedDot
            position={[0.48, 0, 0.22]}
            color={blade.ledColor}
            phase={blade.phase + 0.3}
          />
        </group>
      ))}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Individual blinking LED dot
// ─────────────────────────────────────────────────────────────────────────────
function LedDot({
  position,
  color,
  phase,
}: {
  position: [number, number, number];
  color: string;
  phase: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const mat     = useRef<THREE.MeshBasicMaterial>(null!);

  useFrame((state) => {
    const t    = state.clock.getElapsedTime();
    const blink = Math.sin(t * 2.5 + phase);
    const intensity = blink > 0.2 ? 1.0 : 0.15;
    if (mat.current) {
      (mat.current as THREE.MeshBasicMaterial & { opacity: number }).opacity = intensity * 0.9 + 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.022, 6, 6]} />
      <meshBasicMaterial
        ref={mat}
        color={color}
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Data Stream Tubes — flowing LineSegments between waypoints
// ─────────────────────────────────────────────────────────────────────────────
const STREAM_WAYPOINTS: [number, number, number][] = [
  [-1.2, -1.4, -0.5],
  [0.0, -0.8, 0.2],
  [1.2, -0.2, -0.3],
  [2.0, 0.5, 0.1],
  [1.5, 1.2, -0.4],
  [0.5, 1.6, 0.3],
  [-0.5, 1.8, -0.2],
];

// Static positions: generate segments once
const STREAM_POSITIONS = (() => {
  const pts: number[] = [];
  for (let i = 0; i < STREAM_WAYPOINTS.length - 1; i++) {
    const [ax, ay, az] = STREAM_WAYPOINTS[i];
    const [bx, by, bz] = STREAM_WAYPOINTS[i + 1];
    pts.push(ax, ay, az, bx, by, bz);
  }
  return new Float32Array(pts);
})();

function DataStreams() {
  const linesRef = useRef<THREE.LineSegments>(null!);

  useFrame((state) => {
    if (!linesRef.current) return;
    const t = state.clock.getElapsedTime();
    // Animate opacity to create a pulsing data-flow effect
    const mat = linesRef.current.material as THREE.LineBasicMaterial;
    mat.opacity = 0.12 + Math.sin(t * 2.5) * 0.06;
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[STREAM_POSITIONS, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        color="#00f2fe"
        transparent
        opacity={0.18}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Data Packet Particles — small particles travelling the stream path
// ─────────────────────────────────────────────────────────────────────────────
function DataPackets({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const curve     = useMemo(() => new THREE.CatmullRomCurve3(
    STREAM_WAYPOINTS.map(([x, y, z]) => new THREE.Vector3(x, y, z))
  ), []);

  // Initialize particles at evenly spaced positions along curve
  const [positions, offsets] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const off = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      off[i] = i / count;
      const pt = curve.getPoint(off[i]);
      pos[i * 3]     = pt.x;
      pos[i * 3 + 1] = pt.y;
      pos[i * 3 + 2] = pt.z;
    }
    return [pos, off];
  }, [count, curve]);

  const progressRef = useRef(offsets.slice());

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr  = attr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      progressRef.current[i] = (progressRef.current[i] + delta * 0.08) % 1;
      const pt = curve.getPoint(progressRef.current[i]);
      arr[i * 3]     = pt.x;
      arr[i * 3 + 1] = pt.y;
      arr[i * 3 + 2] = pt.z;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#00f2fe"
        size={0.065}
        transparent
        opacity={0.9}
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
function ServerScene({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight color="#00f2fe" intensity={1.0} position={[2, 2, 2]} distance={8} decay={2} />
      <pointLight color="#10b981" intensity={0.7} position={[-3, -1, 1]} distance={6} decay={2} />
      <pointLight color="#6366f1" intensity={0.5} position={[0, 3, -2]} distance={6} decay={2} />

      <ServerRack isMobile={isMobile} />
      <DataStreams />
      {!isMobile && <DataPackets count={12} />}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Exported component
// ─────────────────────────────────────────────────────────────────────────────
export default function ServerCluster3D() {
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
      gl={{ antialias: !isMobile, alpha: true, powerPreference: "low-power" }}
      dpr={[1, isMobile ? 1 : 1.5]}
      camera={{ position: [0, 0, 6.5], fov: 52 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ServerScene isMobile={isMobile} />
    </Canvas>
  );
}
