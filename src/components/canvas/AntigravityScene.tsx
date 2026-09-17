"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// Floating Interactive Polyhedron
function FloatingPolyhedron({
  position,
  color,
  scale = 1,
  speed = 1.5,
  distort = 0.3,
  geometryType = "icosahedron",
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
  distort?: number;
  geometryType?: "icosahedron" | "octahedron" | "torusKnot" | "dodecahedron";
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Mouse tilt / antigravity drift reaction
    const targetX = state.mouse.x * 0.8;
    const targetY = state.mouse.y * 0.8;
    
    meshRef.current.rotation.x += 0.005 * speed;
    meshRef.current.rotation.y += 0.008 * speed;

    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      position[0] + targetX * 1.5,
      0.03
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      position[1] + targetY * 1.5,
      0.03
    );
  });

  return (
    <Float speed={speed * 1.2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometryType === "icosahedron" && <icosahedronGeometry args={[1, 1]} />}
        {geometryType === "octahedron" && <octahedronGeometry args={[1, 0]} />}
        {geometryType === "torusKnot" && <torusKnotGeometry args={[0.7, 0.25, 100, 16]} />}
        {geometryType === "dodecahedron" && <dodecahedronGeometry args={[0.9, 0]} />}

        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={speed}
          roughness={0.15}
          metalness={0.85}
          wireframe={false}
          emissive={color}
          emissiveIntensity={0.25}
        />
      </mesh>
    </Float>
  );
}

// Interactive Particle Cloud
function ParticleNetwork() {
  const count = 120;
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
      pos[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 20;
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 20;
      pos[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 15;

      const mixedColor = pseudoRandom(i * 3 + 4) > 0.5 ? cyan : violet;
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    pointsRef.current.rotation.x = state.mouse.y * 0.1;
    pointsRef.current.rotation.z = state.mouse.x * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Scene Container
export default function AntigravityScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={60} />
        
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00f2fe" />
        <pointLight position={[-10, -10, -5]} intensity={1.2} color="#9d4edd" />

        {/* 3D Stars background */}
        <Stars radius={50} depth={50} count={2500} factor={4} saturation={0} fade speed={1} />

        {/* Dynamic Antigravity Floating Polyhedrons */}
        <FloatingPolyhedron
          position={[-3.2, 1.8, -1]}
          color="#00f2fe"
          scale={0.85}
          speed={1.8}
          distort={0.4}
          geometryType="icosahedron"
        />
        <FloatingPolyhedron
          position={[3.5, 2.1, -2]}
          color="#9d4edd"
          scale={1.1}
          speed={1.2}
          distort={0.3}
          geometryType="torusKnot"
        />
        <FloatingPolyhedron
          position={[-3.8, -2.2, -1.5]}
          color="#38bdf8"
          scale={0.9}
          speed={1.5}
          distort={0.35}
          geometryType="octahedron"
        />
        <FloatingPolyhedron
          position={[3.2, -2.0, -0.5]}
          color="#10b981"
          scale={0.75}
          speed={2.0}
          distort={0.25}
          geometryType="dodecahedron"
        />

        {/* Interactive Particle Network */}
        <ParticleNetwork />
      </Canvas>
    </div>
  );
}
