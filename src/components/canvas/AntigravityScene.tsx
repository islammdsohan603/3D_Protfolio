"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html, Stars, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import {
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
} from "react-icons/si";

// Definition for each tech node in the constellation
export interface TechNodeConfig {
  id: string;
  name: string;
  short: string;
  color: string;
  glowColor: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  desktopPos: [number, number, number];
  mobilePos: [number, number, number];
  speed: number;
  rotationSpeed: number;
  floatRange: [number, number];
  phase: number;
  scale: number;
}

// 7 Core stack technologies configured with brand colors and strategic coordinates
export const TECH_NODES: TechNodeConfig[] = [
  {
    id: "typescript",
    name: "TypeScript",
    short: "TS",
    color: "#3178C6",
    glowColor: "#38bdf8",
    icon: SiTypescript,
    desktopPos: [-3.8, 2.3, -0.6],
    mobilePos: [-1.6, 2.7, -0.6],
    speed: 1.2,
    rotationSpeed: 1.0,
    floatRange: [0.25, 0.3],
    phase: 0.0,
    scale: 0.95,
  },
  {
    id: "javascript",
    name: "JavaScript",
    short: "JS",
    color: "#F7DF1E",
    glowColor: "#facc15",
    icon: SiJavascript,
    desktopPos: [-4.6, -0.2, 0.6],
    mobilePos: [-1.8, 0.4, 0.4],
    speed: 1.4,
    rotationSpeed: 0.9,
    floatRange: [0.2, 0.25],
    phase: 1.4,
    scale: 0.9,
  },
  {
    id: "nextjs",
    name: "Next.js",
    short: "NEXT",
    color: "#FFFFFF",
    glowColor: "#38bdf8",
    icon: SiNextdotjs,
    desktopPos: [-0.2, 3.1, -1.2],
    mobilePos: [0.0, 3.4, -1.0],
    speed: 1.1,
    rotationSpeed: 0.8,
    floatRange: [0.2, 0.35],
    phase: 2.8,
    scale: 1.05,
  },
  {
    id: "react",
    name: "React.js",
    short: "REACT",
    color: "#61DAFB",
    glowColor: "#00f2fe",
    icon: SiReact,
    desktopPos: [3.6, 2.5, 0.4],
    mobilePos: [1.7, 2.7, 0.3],
    speed: 1.3,
    rotationSpeed: 1.1,
    floatRange: [0.22, 0.28],
    phase: 4.2,
    scale: 1.0,
  },
  {
    id: "nodejs",
    name: "Node.js",
    short: "NODE",
    color: "#339933",
    glowColor: "#4ade80",
    icon: SiNodedotjs,
    desktopPos: [-3.4, -2.5, -0.8],
    mobilePos: [-1.6, -2.7, -0.8],
    speed: 1.5,
    rotationSpeed: 1.2,
    floatRange: [0.2, 0.3],
    phase: 5.6,
    scale: 0.95,
  },
  {
    id: "express",
    name: "Express.js",
    short: "EX",
    color: "#E2E8F0",
    glowColor: "#94a3b8",
    icon: SiExpress,
    desktopPos: [4.3, -1.5, 0.2],
    mobilePos: [1.8, 0.2, 0.1],
    speed: 1.2,
    rotationSpeed: 0.85,
    floatRange: [0.18, 0.24],
    phase: 7.0,
    scale: 0.9,
  },
  {
    id: "mongodb",
    name: "MongoDB",
    short: "MONGO",
    color: "#47A248",
    glowColor: "#22c55e",
    icon: SiMongodb,
    desktopPos: [1.0, -3.1, -1.4],
    mobilePos: [1.5, -2.8, -1.2],
    speed: 1.0,
    rotationSpeed: 0.75,
    floatRange: [0.25, 0.35],
    phase: 8.4,
    scale: 1.0,
  },
];

// Logical constellation links connecting nodes across the full-stack architecture
const CONSTELLATION_LINKS: [number, number][] = [
  [0, 1], // TypeScript <-> JavaScript
  [0, 2], // TypeScript <-> Next.js
  [0, 3], // TypeScript <-> React
  [3, 2], // React <-> Next.js
  [1, 4], // JavaScript <-> Node.js
  [4, 5], // Node.js <-> Express.js
  [4, 6], // Node.js <-> MongoDB
  [2, 4], // Next.js <-> Node.js
  [5, 6], // Express.js <-> MongoDB
];

// Module-scoped initial line buffer for zero-render allocations
const INITIAL_LINE_POSITIONS = new Float32Array(CONSTELLATION_LINKS.length * 2 * 3);

// Individual 3D Floating Tech Node with Antigravity Physics, Orbital Rings & Glassmorphic HTML Badge
function TechConstellationNode({
  node,
  index,
  updatePosition,
}: {
  node: TechNodeConfig;
  index: number;
  updatePosition: (index: number, pos: THREE.Vector3) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const isMobile = viewport.width < 7.5;
  const targetBase = useMemo(() => {
    return isMobile ? node.mobilePos : node.desktopPos;
  }, [isMobile, node.mobilePos, node.desktopPos]);

  const IconComponent = node.icon;

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;
    const time = state.clock.getElapsedTime();

    // 1. Smooth Idle Float Motion with individual sine/cosine phase offset
    const floatX = Math.sin(time * node.speed * 0.7 + node.phase) * node.floatRange[0];
    const floatY = Math.cos(time * node.speed * 0.9 + node.phase) * node.floatRange[1];
    const floatZ = Math.sin(time * node.speed * 0.4 + node.phase) * 0.15;

    // 2. Interactive Mouse Repulsion & Antigravity Drift
    const pointerWorldX = state.pointer.x * (viewport.width * 0.5);
    const pointerWorldY = state.pointer.y * (viewport.height * 0.5);

    const currentX = group.position.x;
    const currentY = group.position.y;
    const dx = currentX - pointerWorldX;
    const dy = currentY - pointerWorldY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const repulsionRadius = isMobile ? 2.0 : 2.8;
    let repulseX = 0;
    let repulseY = 0;

    if (dist < repulsionRadius && dist > 0.001) {
      const force = Math.pow(1 - dist / repulsionRadius, 1.5) * (isMobile ? 0.7 : 1.2);
      repulseX = (dx / dist) * force;
      repulseY = (dy / dist) * force;
    }

    const targetX = targetBase[0] + floatX + repulseX;
    const targetY = targetBase[1] + floatY + repulseY;
    const targetZ = targetBase[2] + floatZ;

    // Smooth Lerp Damping (authentic zero-gravity buoyancy)
    group.position.x = THREE.MathUtils.lerp(group.position.x, targetX, 0.045);
    group.position.y = THREE.MathUtils.lerp(group.position.y, targetY, 0.045);
    group.position.z = THREE.MathUtils.lerp(group.position.z, targetZ, 0.045);

    // Continuous subtle orbital rotation for glowing neon rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += 0.012 * node.rotationSpeed;
      ring1Ref.current.rotation.x += 0.006 * node.rotationSpeed;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += 0.015 * node.rotationSpeed;
      ring2Ref.current.rotation.z -= 0.008 * node.rotationSpeed;
    }

    // Report real-time 3D coordinate to Constellation network manager
    updatePosition(index, group.position);
  });

  return (
    <group ref={groupRef} position={targetBase} scale={isMobile ? node.scale * 0.85 : node.scale}>
      <Float speed={node.speed * 0.8} rotationIntensity={0.6} floatIntensity={0.8}>
        {/* 3D Translucent Dark Glass Core Sphere */}
        <mesh>
          <sphereGeometry args={[0.26, 24, 24]} />
          <meshStandardMaterial
            color="#080c14"
            emissive={node.color}
            emissiveIntensity={0.4}
            roughness={0.25}
            metalness={0.75}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* Outer Orbital Neon Halo Ring 1 */}
        <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.42, 0.014, 16, 48]} />
          <meshBasicMaterial
            color={node.color}
            transparent
            opacity={0.65}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Outer Orbital Neon Halo Ring 2 (Intersecting counter-angle) */}
        <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
          <torusGeometry args={[0.48, 0.01, 16, 48]} />
          <meshBasicMaterial
            color={node.glowColor}
            transparent
            opacity={0.45}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Soft Point Light radiating brand color to surrounding star particles */}
        <pointLight color={node.color} intensity={0.6} distance={2.2} decay={2} />

        {/* Crisp 3D Transformed Glassmorphism Tech Badge with Glowing Neon Accents */}
        <Html
          transform
          distanceFactor={7.2}
          position={[0, 0, 0]}
          center
          pointerEvents="none"
          className="select-none pointer-events-none"
        >
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md shadow-2xl transition-transform duration-300"
            style={{
              background: "rgba(10, 15, 29, 0.88)",
              border: `1.5px solid ${node.color}55`,
              boxShadow: `0 0 16px ${node.glowColor}30, inset 0 0 10px ${node.glowColor}18`,
            }}
          >
            <IconComponent
              className="w-4 h-4 shrink-0"
              style={{
                color: node.color,
                filter: `drop-shadow(0 0 6px ${node.color}aa)`,
              }}
            />
            <span
              className="font-mono font-bold text-[11px] tracking-wider uppercase"
              style={{
                color: "#f8fafc",
                textShadow: `0 0 8px ${node.color}88`,
              }}
            >
              {node.short}
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
              style={{
                backgroundColor: node.color,
                boxShadow: `0 0 8px ${node.color}`,
              }}
            />
          </div>
        </Html>
      </Float>
    </group>
  );
}

// Dynamic 3D Constellation Network Filaments connecting the 7 tech nodes
function ConstellationFilaments({
  positionsRef,
}: {
  positionsRef: React.MutableRefObject<THREE.Vector3[]>;
}) {
  const lineSegmentsRef = useRef<THREE.LineSegments>(null);

  useFrame(() => {
    const lineMesh = lineSegmentsRef.current;
    if (!lineMesh) return;
    const geo = lineMesh.geometry;
    if (!geo) return;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    if (!posAttr) return;

    const array = posAttr.array as Float32Array;
    const positions = positionsRef.current;
    let index = 0;

    for (let i = 0; i < CONSTELLATION_LINKS.length; i++) {
      const [startIndex, endIndex] = CONSTELLATION_LINKS[i];
      const startPos = positions[startIndex];
      const endPos = positions[endIndex];

      if (startPos && endPos) {
        array[index++] = startPos.x;
        array[index++] = startPos.y;
        array[index++] = startPos.z;

        array[index++] = endPos.x;
        array[index++] = endPos.y;
        array[index++] = endPos.z;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <lineSegments ref={lineSegmentsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[INITIAL_LINE_POSITIONS, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#38bdf8"
        transparent
        opacity={0.22}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

// Interactive Ambient Particle Network
function ParticleNetwork() {
  const count = 100;
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color("#00f2fe");
    const violet = new THREE.Color("#9d4edd");

    const pseudoRandom = (seed: number) => {
      const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 22;
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 18;
      pos[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 12;

      const mixedColor = pseudoRandom(i * 3 + 4) > 0.5 ? cyan : violet;
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    pointsRef.current.rotation.x = state.pointer.y * 0.05;
    pointsRef.current.rotation.z = state.pointer.x * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Scene Root: Coordinates the 3D Constellation Canvas
export default function AntigravityScene() {
  // Shared ref holding live coordinates of all 7 tech nodes
  const positionsRef = useRef<THREE.Vector3[]>(
    TECH_NODES.map((n) => new THREE.Vector3(...n.desktopPos))
  );

  const updatePosition = (index: number, pos: THREE.Vector3) => {
    if (positionsRef.current[index]) {
      positionsRef.current[index].copy(pos);
    }
  };

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={58} />

        {/* Curated Sci-Fi Lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[8, 10, 5]} intensity={1.4} color="#00f2fe" />
        <directionalLight position={[-8, -10, -5]} intensity={1.0} color="#9d4edd" />

        {/* 3D Deep Space Starfield */}
        <Stars
          radius={45}
          depth={40}
          count={2000}
          factor={3.5}
          saturation={0}
          fade
          speed={0.8}
        />

        {/* Dynamic Constellation Filament Lines */}
        <ConstellationFilaments positionsRef={positionsRef} />

        {/* 7 Floating 3D Tech Constellation Nodes */}
        {TECH_NODES.map((node, index) => (
          <TechConstellationNode
            key={node.id}
            node={node}
            index={index}
            updatePosition={updatePosition}
          />
        ))}

        {/* Ambient Stardust Network */}
        <ParticleNetwork />
      </Canvas>
    </div>
  );
}
