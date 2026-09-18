"use client";

import React from "react";
import { ArrowUp, Code2, Heart } from "lucide-react";
import { ScrollReveal } from "./ui/ScrollReveal";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-slate-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 py-5 md:py-10 lg:py-16 overflow-x-clip transition-colors duration-300">
      <div className="w-11/12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <ScrollReveal direction="up" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-[1px] shrink-0 flex items-center justify-center shadow-xs">
            <Code2 className="w-4 h-4 text-slate-700 dark:text-zinc-300" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-zinc-100">MD. SOHAN</div>
            <div className="text-xs text-slate-500 dark:text-zinc-500 font-mono">
              &copy; {new Date().getFullYear()} All rights reserved.
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.05} className="text-xs text-slate-600 dark:text-zinc-400 font-mono text-center flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
          <span>using Next.js 16, TypeScript & 3D Three.js</span>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1}>
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-white/10 text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-cyan-400 hover:border-indigo-400/50 dark:hover:border-cyan-400/50 transition-all group min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer shadow-xs"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </ScrollReveal>
      </div>
    </footer>
  );
}
