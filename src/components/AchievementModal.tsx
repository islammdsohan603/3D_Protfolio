"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award, ShieldCheck, Calendar, CheckCircle2, Maximize2 } from "lucide-react";
import Image from "next/image";

export interface AchievementItem {
  id: string;
  title: string;
  subtitle: string;
  organization: string;
  batch: string;
  credentialId?: string;
  validity?: string;
  badgeLabel: string;
  description: string;
  skillsCovered: string[];
  gradient: string;
  image: string; // Mapping to local public image asset (/blackbelt.png or /cartificat.png)
}

interface AchievementModalProps {
  achievement: AchievementItem | null;
  onClose: () => void;
}

export default function AchievementModal({ achievement, onClose }: AchievementModalProps) {
  if (!achievement) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-3xl glass-card rounded-3xl border border-cyan-500/40 glow-cyan overflow-hidden my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 text-zinc-400 hover:text-white rounded-full bg-slate-900/90 border border-white/20 hover:bg-slate-800 transition-all shadow-lg cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* High-Resolution Certificate / Badge Image Preview */}
          <div className="relative w-full h-64 sm:h-96 bg-slate-950 flex items-center justify-center border-b border-white/10 group overflow-hidden">
            <Image
              src={achievement.image}
              alt={achievement.title}
              width={1000}
              height={700}
              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Direct High Res View Action Link */}
            <a
              href={achievement.image}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/20 text-cyan-400 text-xs font-mono flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full Screen View</span>
            </a>
          </div>

          {/* Modal Header & Text Content */}
          <div className="p-6 sm:p-8 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className={`px-3.5 py-1 rounded-full text-xs font-extrabold font-mono tracking-wider ${achievement.gradient} text-black uppercase shadow-md`}>
                {achievement.badgeLabel}
              </span>
              {achievement.validity && (
                <span className="flex items-center gap-1 text-xs text-cyan-400 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{achievement.validity}</span>
                </span>
              )}
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1 leading-tight">
                {achievement.title}
              </h2>
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <Award className="w-4 h-4 text-amber-400" />
                <span>{achievement.organization} &bull; {achievement.batch}</span>
              </div>
            </div>

            {/* Credential ID if present */}
            {achievement.credentialId && (
              <div className="inline-block px-3 py-1 rounded-lg bg-slate-900 border border-purple-500/30 text-xs font-mono text-purple-300">
                Official Credential ID: <span className="text-white font-bold">{achievement.credentialId}</span>
              </div>
            )}

            {/* Detailed Description */}
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
              {achievement.description}
            </p>

            {/* Skills & Mastery List */}
            <div>
              <h4 className="text-xs uppercase font-mono tracking-wider text-zinc-400 mb-3">
                Technologies & Technical Competencies Verified:
              </h4>
              <div className="flex flex-wrap gap-2">
                {achievement.skillsCovered.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Official Credential</span>
              </div>

              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 transition-colors border border-white/10 cursor-pointer"
              >
                Close Certificate Preview
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
