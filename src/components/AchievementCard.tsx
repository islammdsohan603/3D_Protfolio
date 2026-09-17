"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Maximize2, Calendar, Sparkles, Eye } from "lucide-react";
import { AchievementItem } from "./AchievementModal";
import Image from "next/image";

interface AchievementCardProps {
  achievement: AchievementItem;
  onSelect: (item: AchievementItem) => void;
}

export default function AchievementCard({ achievement, onSelect }: AchievementCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;

    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      onClick={() => onSelect(achievement)}
      className="relative glass-card rounded-3xl p-6 sm:p-7 cursor-pointer border border-white/10 hover:border-cyan-400/60 transition-all duration-300 group overflow-hidden flex flex-col justify-between h-full"
    >
      {/* Dynamic Metallic Foil Shimmer */}
      <div className="absolute -inset-full bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent group-hover:animate-pulse pointer-events-none" />

      <div>
        {/* Image Thumbnail Container with 3D Depth */}
        <div
          style={{ transform: "translateZ(30px)" }}
          className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden bg-slate-900 mb-5 border border-white/10 group-hover:border-cyan-500/40 transition-all"
        >
          <Image
            src={achievement.image}
            alt={achievement.title}
            width={600}
            height={400}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <span className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-cyan-400 flex items-center gap-1.5 shadow-lg">
              <Eye className="w-4 h-4" />
              <span>Inspect Credential</span>
            </span>
          </div>
        </div>

        {/* Top Badge & Action Icon with 3D Depth */}
        <div style={{ transform: "translateZ(20px)" }} className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1.5 rounded-full text-xs font-extrabold font-mono tracking-wider ${achievement.gradient} text-black shadow-md flex items-center gap-1.5`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>{achievement.badgeLabel}</span>
          </span>

          <div className="w-9 h-9 rounded-full bg-slate-800/80 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-cyan-400 group-hover:scale-110 transition-all">
            <Maximize2 className="w-4 h-4" />
          </div>
        </div>

        {/* Card Header */}
        <div style={{ transform: "translateZ(25px)" }} className="space-y-1.5 mb-3">
          <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-cyan-300 transition-colors leading-snug">
            {achievement.title}
          </h3>
          <p className="text-xs font-semibold text-cyan-400 font-mono">
            {achievement.organization} &bull; {achievement.batch}
          </p>
        </div>

        {/* Description Snippet */}
        <p style={{ transform: "translateZ(15px)" }} className="text-zinc-300 text-sm leading-relaxed mb-5 line-clamp-3">
          {achievement.description}
        </p>

        {/* Skills Badges */}
        <div style={{ transform: "translateZ(10px)" }} className="flex flex-wrap gap-1.5 mb-5">
          {achievement.skillsCovered.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 rounded-md bg-slate-900/90 text-zinc-300 text-xs border border-white/5 font-mono"
            >
              {skill}
            </span>
          ))}
          {achievement.skillsCovered.length > 4 && (
            <span className="px-2 py-1 rounded-md bg-cyan-950 text-cyan-400 text-xs font-mono font-bold">
              +{achievement.skillsCovered.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div style={{ transform: "translateZ(15px)" }} className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-zinc-400">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="font-medium text-emerald-400">Verified Certificate</span>
        </div>

        {achievement.validity && (
          <div className="flex items-center gap-1 font-mono text-cyan-400/80">
            <Calendar className="w-3.5 h-3.5" />
            <span>{achievement.validity}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
