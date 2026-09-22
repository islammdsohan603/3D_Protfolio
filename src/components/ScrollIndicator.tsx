"use client";

import React, { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowUp, ArrowDown, Mouse } from "lucide-react";

/**
 * ScrollIndicator Component
 *
 * Persistent, right-side interactive scroll indicator and action trigger.
 * - Always visible on the right edge of the screen.
 * - Displays an animated scroll-down prompt (cascading chevrons & progress ring).
 * - Tracks page scroll progress (0% to 100%).
 * - When reaching the bottom of the page, the button physically animates back to the top-right position.
 * - Clicking at the bottom triggers a smooth scroll back to top; clicking elsewhere scrolls down.
 */
export default function ScrollIndicator() {
  const [progress, setProgress] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const lenis = useLenis();

  // 60-120fps direct synchronization with Lenis scroll engine
  useLenis(({ scroll, progress: lenisProgress, limit }) => {
    if (limit <= 0) {
      setProgress(1);
      setIsAtBottom(true);
      return;
    }
    const clampedProgress = Math.min(1, Math.max(0, lenisProgress));
    setProgress(clampedProgress);
    setIsAtBottom(scroll >= limit - 70 || clampedProgress >= 0.985);
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const maxScroll = docHeight - winHeight;

      if (maxScroll <= 0) {
        setProgress(1);
        setIsAtBottom(true);
        return;
      }

      const rawProgress = Math.min(1, Math.max(0, scrollY / maxScroll));
      setProgress(rawProgress);

      // Bottom threshold detection (within 70px or >= 98.5% progress)
      const atBottom = scrollY >= maxScroll - 70 || rawProgress >= 0.985;
      setIsAtBottom(atBottom);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleScrollAction = () => {
    if (isAtBottom) {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.4 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      // Scroll down by ~80% viewport height
      const nextTarget = window.scrollY + window.innerHeight * 0.82;
      if (lenis) {
        lenis.scrollTo(nextTarget, { duration: 0.9 });
      } else {
        window.scrollTo({ top: nextTarget, behavior: "smooth" });
      }
    }
  };

  // SVG Circular progress math
  const strokeWidth = 3;
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  const percentage = Math.min(100, Math.max(0, Math.round(progress * 100)));

  return (
    <>
      {/* Right Side Subtle Vertical Rail Indicator */}
      <div className="fixed right-2 top-24 bottom-24 w-0.5 pointer-events-none z-30 hidden sm:block opacity-40 group">
        <div className="w-full h-full bg-slate-300/30 dark:bg-zinc-800/40 rounded-full overflow-hidden">
          <div
            className="w-full bg-gradient-to-b from-cyan-400 via-purple-500 to-emerald-400 transition-all duration-200 ease-out rounded-full"
            style={{ height: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* Main Interactive Floating Scroll Button */}
      <motion.div
        className="fixed right-6 z-40 group flex items-center cursor-pointer select-none"
        style={{ touchAction: "manipulation" }}
        initial={{ bottom: "6rem" }}
        animate={{
          bottom: isAtBottom ? "calc(100vh - 7.5rem)" : "6rem",
          scale: isAtBottom ? 1.08 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 240,
          damping: 24,
          mass: 0.9,
        }}
      >
        {/* Tooltip on Hover */}
        <div className="mr-3 px-3 py-1.5 rounded-xl bg-slate-900/95 dark:bg-[#0c1017]/95 border border-cyan-500/40 text-cyan-400 text-xs font-semibold shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none font-mono whitespace-nowrap backdrop-blur-md flex items-center gap-2 -translate-x-1 group-hover:translate-x-0">
          {isAtBottom ? (
            <>
              <ArrowUp className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
              <span className="text-emerald-400">Back to Top</span>
              <span className="text-slate-400 text-[10px]">100%</span>
            </>
          ) : (
            <>
              <ArrowDown className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
              <span>Scroll Down</span>
              <span className="text-slate-400 text-[10px]">{percentage}%</span>
            </>
          )}
        </div>

        {/* Interactive Button Container */}
        <button
          type="button"
          onClick={handleScrollAction}
          aria-label={isAtBottom ? "Scroll back to top" : "Scroll down to explore"}
          className="relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 focus:outline-hidden"
        >
          {/* Glowing pulse aura when at bottom or prompting scroll */}
          <AnimatePresence>
            {isAtBottom ? (
              <motion.span
                key="at-bottom-glow"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.25, 1] }}
                exit={{ opacity: 0 }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute -inset-2 rounded-full bg-gradient-to-r from-emerald-500/50 to-cyan-400/50 blur-md pointer-events-none"
              />
            ) : (
              <motion.span
                key="scroll-down-glow"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="absolute -inset-1.5 rounded-full bg-cyan-500/30 blur-sm pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Circular SVG Progress Ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
            viewBox="0 0 56 56"
          >
            {/* Base Ring Track */}
            <circle
              cx="28"
              cy="28"
              r={radius}
              fill="transparent"
              strokeWidth={strokeWidth}
              className="stroke-slate-300/50 dark:stroke-zinc-800/80"
            />

            <defs>
              <linearGradient id="scrollProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isAtBottom ? "#10b981" : "#00f2fe"} />
                <stop offset="100%" stopColor={isAtBottom ? "#00f2fe" : "#9d4edd"} />
              </linearGradient>
            </defs>

            {/* Dynamic Progress Stroke */}
            <circle
              cx="28"
              cy="28"
              r={radius}
              fill="transparent"
              stroke="url(#scrollProgressGradient)"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-[stroke-dashoffset] duration-150 ease-out"
            />
          </svg>

          {/* Glassmorphism Inner Orb */}
          <div
            className={`relative w-11 h-11 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-md backdrop-blur-xl ${
              isAtBottom
                ? "bg-emerald-500/20 dark:bg-emerald-950/60 border border-emerald-400/60 shadow-[0_0_25px_rgba(16,185,129,0.5)] text-emerald-400"
                : "bg-white/90 dark:bg-zinc-900/90 border border-slate-200/90 dark:border-white/10 shadow-[0_0_18px_rgba(0,242,254,0.25)] text-slate-800 dark:text-cyan-400"
            }`}
          >
            {/* Animated Directional Chevron / Arrow */}
            <motion.div
              animate={{
                rotate: isAtBottom ? 180 : 0,
                y: isAtBottom ? [0, -3, 0] : [0, 3, 0],
              }}
              transition={{
                rotate: { type: "spring", stiffness: 320, damping: 20 },
                y: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
              }}
              className="flex items-center justify-center"
            >
              <ChevronDown className="w-5 h-5 stroke-[2.5]" />
            </motion.div>

            {/* Micro Scroll Hint Animation below icon when scrolling down */}
            {!isAtBottom && (
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3], y: [0, 2, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="-mt-1 text-[8px] font-mono font-bold text-cyan-500/80 leading-none"
              >
                ▼
              </motion.div>
            )}
          </div>
        </button>
      </motion.div>
    </>
  );
}

