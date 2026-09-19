"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize2, ZoomIn, X, Sparkles, ShieldCheck } from "lucide-react";

interface AchievementImageTiltProps {
  src: string;
  alt: string;
  badgeLabel: string;
  gradient: string;
}

export default function AchievementImageTilt({
  src,
  alt,
  badgeLabel,
  gradient,
}: AchievementImageTiltProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;

    setRotateX(((y - centerY) / centerY) * -12);
    setRotateY(((x - centerX) / centerX) * 12);
    setGlarePos({
      x: (x / box.width) * 100,
      y: (y / box.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <>
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
        className="relative group w-full rounded-3xl p-3 sm:p-5 bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/80 hover:border-cyan-500/50 shadow-2xl transition-all duration-300 overflow-hidden"
      >
        {/* Dynamic glare highlight */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-35 transition-opacity duration-300 rounded-3xl"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
          }}
        />

        {/* Top Badges Bar */}
        <div
          style={{ transform: "translateZ(25px)" }}
          className="flex items-center justify-between gap-3 mb-4 px-2"
        >
          <span
            className={`px-3 py-1 rounded-full text-xs font-mono font-extrabold tracking-wider ${gradient} text-black shadow-lg flex items-center gap-1.5`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{badgeLabel}</span>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsZoomed(true)}
              className="p-2 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-zinc-300 hover:text-white hover:border-cyan-400 transition-all flex items-center gap-1.5 text-xs font-mono cursor-pointer shadow-md"
              title="Click to Inspect High-Res"
            >
              <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Inspect High-Res</span>
            </button>
          </div>
        </div>

        {/* Image Display Frame */}
        <div
          style={{ transform: "translateZ(30px)" }}
          className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-black/90 border border-zinc-800 flex items-center justify-center p-3 sm:p-5"
        >
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={850}
            priority
            className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-[1.02]"
          />

          {/* Quick Zoom Button Overlay */}
          <button
            onClick={() => setIsZoomed(true)}
            className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-zinc-950/85 backdrop-blur-md border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-mono flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-all shadow-xl cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Expand Frame</span>
          </button>
        </div>

        {/* Bottom Verification Seal */}
        <div
          style={{ transform: "translateZ(20px)" }}
          className="mt-4 px-2 flex items-center justify-between text-xs text-zinc-400 font-mono"
        >
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Verified Official Credential</span>
          </div>
          <span className="text-zinc-500">3D Interactive Tilt</span>
        </div>
      </div>

      {/* High-Resolution Zoom Lightbox Modal */}
      {isZoomed && (
        <div
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[92vh] rounded-3xl bg-zinc-950 border border-cyan-500/50 p-4 sm:p-6 shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-mono text-zinc-200 font-semibold">{alt}</span>
              </div>
              <button
                onClick={() => setIsZoomed(false)}
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full flex-1 min-h-[300px] sm:min-h-[500px] flex items-center justify-center bg-black/80 rounded-2xl overflow-hidden p-2">
              <Image
                src={src}
                alt={alt}
                width={1600}
                height={1100}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
