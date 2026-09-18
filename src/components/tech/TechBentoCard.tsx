"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Cpu, Layers, Activity } from "lucide-react";
import { TechItem } from "./techData";

interface TechBentoCardProps {
  item: TechItem;
  index: number;
}

export default function TechBentoCard({ item, index }: TechBentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position inside the card for 3D tilt & spotlight torch
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth tilt
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  // Spotlight coordinates (in pixels)
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    // Normalized coordinates (-0.5 to 0.5)
    const normX = (e.clientX - rect.left) / width - 0.5;
    const normY = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(normX);
    mouseY.set(normY);

    // Pixel coordinates for radial spotlight
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const IconComponent = item.icon;

  // Determine status badge color based on tag
  const getBadgeStyle = (tag: string) => {
    switch (tag) {
      case "Core Engine":
        return "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30";
      case "Production Ready":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
      case "Enterprise Standard":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30";
      case "Actively Leveling Up":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30";
      default:
        return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30";
    }
  };

  return (
    <div
      ref={cardRef}
      style={{
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-3xl ${item.bentoSpan || "col-span-1"}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full rounded-3xl bg-white/90 dark:bg-zinc-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-zinc-800/80 p-6 transition-colors duration-300 group-hover:border-indigo-400/80 dark:group-hover:border-zinc-700/90 overflow-hidden flex flex-col justify-between shadow-md dark:shadow-xl"
      >
        {/* Dynamic Brand Torch Spotlight Gradient Effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [spotlightX, spotlightY],
              ([x, y]) =>
                `radial-gradient(450px circle at ${x}px ${y}px, ${item.brandColor}20, transparent 75%)`
            ),
          }}
        />

        {/* Hairline Glow Accent Border on Hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: `inset 0 0 0 1px ${item.brandColor}40`,
          }}
        />

        {/* Top Header: Brand Vector Icon & Status Telemetry Badge */}
        <div className="relative z-10 flex items-start justify-between gap-4 mb-4" style={{ transform: "translateZ(25px)" }}>
          <div className="flex items-center gap-3">
            {/* Vector Brand Logo Container with Dynamic Hex Glow */}
            <div
              className="relative w-12 h-12 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-950/80 transition-all duration-300 group-hover:scale-110"
              style={{
                boxShadow: isHovered
                  ? `0 0 25px ${item.brandColor}45, inset 0 0 10px ${item.brandColor}20`
                  : "none",
                borderColor: isHovered ? `${item.brandColor}60` : undefined,
              }}
            >
              <IconComponent
                className="w-6 h-6 transition-colors duration-300 text-slate-700 dark:text-[#E4E4E7]"
                style={{ color: isHovered ? item.brandColor : undefined }}
              />
            </div>

            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg tracking-tight flex items-center gap-2">
                <span>{item.name}</span>
              </h3>
              <div className="text-xs text-slate-500 dark:text-zinc-400 font-mono flex items-center gap-1.5 mt-0.5">
                <Layers className="w-3 h-3 text-slate-400 dark:text-zinc-500" />
                <span>{item.proficiencyTier}</span>
              </div>
            </div>
          </div>

          {/* Status Tag Telemetry Badge */}
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-wide border ${getBadgeStyle(
              item.statusTag
            )}`}
          >
            <Activity className="w-3 h-3" />
            <span>{item.statusTag}</span>
          </div>
        </div>

        {/* Middle Body: Typical Real-World Architecture Use-Case */}
        <div className="relative z-10 my-2" style={{ transform: "translateZ(15px)" }}>
          <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed font-normal">
            {item.typicalUseCase}
          </p>
        </div>

        {/* Bottom Telemetry Bar: Proficiency Meter & Cyber Specs */}
        <div className="relative z-10 pt-4 mt-2 border-t border-slate-200/80 dark:border-white/5 flex flex-col gap-2" style={{ transform: "translateZ(20px)" }}>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>EFFICIENCY TIER</span>
            </span>
            <span
              className="font-bold text-sm"
              style={{ color: item.brandColor }}
            >
              {item.proficiency}%
            </span>
          </div>

          {/* Animated Sci-Fi Progress Meter */}
          <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-zinc-950 overflow-hidden border border-slate-300 dark:border-white/5 relative">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${item.proficiency}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 + index * 0.03 }}
              className="h-full rounded-full relative"
              style={{
                backgroundColor: item.brandColor,
                boxShadow: `0 0 12px ${item.brandColor}`,
              }}
            />
          </div>
        </div>

        {/* Dynamic Neon Corner Ambient Accent */}
        <div
          className="pointer-events-none absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
          style={{ backgroundColor: item.brandColor }}
        />
      </motion.div>
    </div>
  );
}
