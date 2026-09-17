"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// 1. Particle Cloud Component
function AntigravityParticles({ count = 160 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorChoices = [
      new THREE.Color("#00f2fe"),
      new THREE.Color("#9d4edd"),
      new THREE.Color("#38bdf8"),
      new THREE.Color("#10b981"),
    ];

    for (let i = 0; i < count; i++) {
      // Radius between 2.2 and 4.2
      const radius = 2.2 + Math.random() * 2.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.12;
      pointsRef.current.rotation.x += delta * 0.05;
    }
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
        size={0.06}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// 2. Central Cyber Lattice Core
function CyberLatticeCore() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25;
      meshRef.current.rotation.z += delta * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.35;
      innerRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <group>
      {/* Outer Wireframe Icosahedron */}
      <mesh ref={meshRef} scale={[1.4, 1.4, 1.4]}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          wireframe
          color="#00f2fe"
          emissive="#00f2fe"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh ref={innerRef} scale={[0.85, 0.85, 0.85]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#9d4edd"
          emissive="#9d4edd"
          emissiveIntensity={0.9}
          wireframe
        />
      </mesh>
    </group>
  );
}

// 3. Orbiting Tech Nodes Ring
function OrbitingNodes() {
  const ringRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 0.3;
      ringRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.15;
    }
  });

  const nodes = useMemo(() => {
    return [
      { color: "#61DAFB", radius: 2.3, angle: 0 },
      { color: "#38BDF8", radius: 2.3, angle: (Math.PI * 2) / 5 },
      { color: "#3178C6", radius: 2.3, angle: ((Math.PI * 2) / 5) * 2 },
      { color: "#5FA04E", radius: 2.3, angle: ((Math.PI * 2) / 5) * 3 },
      { color: "#47A248", radius: 2.3, angle: ((Math.PI * 2) / 5) * 4 },
    ];
  }, []);

  return (
    <group ref={ringRef}>
      {nodes.map((node, i) => {
        const x = Math.cos(node.angle) * node.radius;
        const z = Math.sin(node.angle) * node.radius;
        return (
          <mesh key={i} position={[x, 0, z]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={1.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// 4. Main Canvas Scene Export
export default function OrbitalSphere3D() {
  return (
    <div className="w-full h-[320px] sm:h-[400px] relative flex items-center justify-center">
      {/* Sci-Fi Canvas Background Backdrop */}
      <div className="absolute inset-0 bg-radial from-cyan-500/10 via-purple-500/5 to-transparent rounded-3xl pointer-events-none" />

      {/* Orbit Telemetry HUD Overlay */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/30 text-[10px] font-mono text-cyan-400">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>3D ORBITAL MATRIX // ANTIGRAVITY LATENCY ACTIVE</span>
      </div>

      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f2fe" />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color="#9d4edd" />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
          <CyberLatticeCore />
          <OrbitingNodes />
          <AntigravityParticles count={180} />
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.2}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
