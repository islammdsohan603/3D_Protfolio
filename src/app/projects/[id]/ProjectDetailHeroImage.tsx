"use client";

import React, { useState } from "react";
import Image from "next/image";
import { formatImageUrl, FALLBACK_IMAGE_URL } from "@/lib/utils/formatImageUrl";

interface ProjectDetailHeroImageProps {
  src: string;
  alt: string;
}

export default function ProjectDetailHeroImage({ src, alt }: ProjectDetailHeroImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(() => formatImageUrl(src));
  const [isUnoptimized, setIsUnoptimized] = useState<boolean>(false);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleError = () => {
    if (!isUnoptimized) {
      setIsUnoptimized(true);
    } else {
      setImgSrc(FALLBACK_IMAGE_URL);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const box = el.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;

    setRotateX(((y - centerY) / centerY) * -8);
    setRotateY(((x - centerX) / centerX) * 8);
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
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className="relative w-full h-80 sm:h-[480px] rounded-2xl overflow-hidden bg-zinc-950 border border-slate-200/90 dark:border-zinc-800/80 hover:border-cyan-500/50 shadow-2xl transition-all duration-300 group"
    >
      {/* Dynamic Sheen / Glare Highlight */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
        }}
      />

      {/* 3D Elevated Image Layer */}
      <div
        style={{ transform: "translateZ(20px)" }}
        className="relative w-full h-full"
      >
        <Image
          src={imgSrc}
          alt={alt}
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          unoptimized={isUnoptimized}
          onError={handleError}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          priority
        />
      </div>

      {/* Subtle Bottom Vignette */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />
    </div>
  );
}
