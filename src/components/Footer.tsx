"use client";

import React from "react";
import { ArrowUp, Code2, Heart } from "lucide-react";
import { ScrollReveal } from "./ui/ScrollReveal";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-zinc-800/80 bg-zinc-950/90 py-12 sm:py-16 overflow-x-clip">
      <div className="w-11/12 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <ScrollReveal direction="up" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 p-[1px] shrink-0 flex items-center justify-center">
            <Code2 className="w-4 h-4 text-zinc-300" />
          </div>
          <div>
            <div className="text-sm font-bold text-zinc-100">MD. SOHAN</div>
            <div className="text-xs text-zinc-500 font-mono">
              &copy; {new Date().getFullYear()} All rights reserved.
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.05} className="text-xs text-zinc-400 font-mono text-center flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
          <span>using Next.js 16, TypeScript & 3D Three.js</span>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1}>
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-slate-900 border border-white/10 text-zinc-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all group min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </ScrollReveal>
      </div>
    </footer>
  );
}
