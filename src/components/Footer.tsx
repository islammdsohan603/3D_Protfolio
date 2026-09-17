"use client";

import React from "react";
import { ArrowUp, Code2, Heart } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#09090b]/90 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left emblem & copyright */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 p-[1px]">
            <div className="w-full h-full bg-[#09090b] rounded-[11px] flex items-center justify-center">
              <Code2 className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-white">MD. SOHAN ISLAM</div>
            <div className="text-xs text-zinc-400 font-mono">
              &copy; {new Date().getFullYear()} All rights reserved.
            </div>
          </div>
        </div>

        {/* Center Tagline */}
        <div className="text-xs text-zinc-400 font-mono text-center flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
          <span>using Next.js 16, TypeScript & 3D Three.js</span>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-slate-900 border border-white/10 text-zinc-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all group"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
