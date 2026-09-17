"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/8801849468455"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group flex items-center cursor-pointer"
      aria-label="Chat on WhatsApp"
    >
      {/* Tooltip on Hover */}
      <span className="mr-3 px-3.5 py-1.5 rounded-xl bg-slate-900/95 border border-emerald-500/40 text-emerald-400 text-xs font-semibold shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none font-mono whitespace-nowrap backdrop-blur-md">
        WhatsApp Chat (+8801849468455)
      </span>

      {/* Button with Glowing Pulse Effect */}
      <div className="relative">
        <span className="absolute -inset-1 rounded-full bg-emerald-500/50 animate-ping opacity-75" />
        <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center text-black shadow-[0_0_25px_rgba(16,185,129,0.6)] group-hover:scale-110 transition-transform duration-300">
          <MessageCircle className="w-7 h-7 text-black fill-current" />
        </div>
      </div>
    </a>
  );
}
