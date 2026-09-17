"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Server, Wrench, Cpu } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  skills: { name: string; level: number; icon: string; tag: string }[];
}

const SKILLS_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Architecture",
    icon: Code2,
    description: "Building responsive, modern, 3D interactive user interfaces",
    skills: [
      { name: "React.js", level: 95, icon: "⚛️", tag: "Expert" },
      { name: "Next.js (App Router)", level: 92, icon: "▲", tag: "Advanced" },
      { name: "TypeScript", level: 90, icon: "📘", tag: "Advanced" },
      { name: "JavaScript (ES6+)", level: 95, icon: "⚡", tag: "Expert" },
      { name: "Tailwind CSS", level: 95, icon: "🎨", tag: "Expert" },
      { name: "Framer Motion", level: 88, icon: "✨", tag: "Advanced" },
      { name: "Three.js / R3F", level: 82, icon: "🧊", tag: "Intermediate" },
    ],
  },
  {
    title: "Backend & Database",
    icon: Server,
    description: "Designing resilient REST APIs, microservices, and NoSQL databases",
    skills: [
      { name: "Node.js", level: 90, icon: "🟢", tag: "Advanced" },
      { name: "Express.js", level: 92, icon: "🚀", tag: "Advanced" },
      { name: "MongoDB & Mongoose", level: 88, icon: "🍃", tag: "Advanced" },
      { name: "RESTful APIs", level: 95, icon: "🔌", tag: "Expert" },
      { name: "Next.js Server Actions", level: 90, icon: "⚡", tag: "Advanced" },
    ],
  },
  {
    title: "Tools & Workflows",
    icon: Wrench,
    description: "Continuous integration, cloud deployment, and AI-accelerated dev",
    skills: [
      { name: "Git & GitHub", level: 92, icon: "🐙", tag: "Advanced" },
      { name: "Vercel & Deployment", level: 95, icon: "▲", tag: "Expert" },
      { name: "Postman", level: 90, icon: "🧡", tag: "Advanced" },
      { name: "AI-Powered Workflows", level: 94, icon: "🤖", tag: "Expert" },
    ],
  },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="skills" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wider">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>TECHNICAL ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Skills & <span className="text-gradient-violet">Tech Stack</span>
          </h2>

          <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base">
            Comprehensive breakdown of my production technologies, frameworks, backend services, and deployment pipelines.
          </p>
        </motion.div>

        {/* Category Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
            {SKILLS_CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={cat.title}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg glow-cyan"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Tab Skills Grid */}
        <div className="max-w-5xl mx-auto">
          {SKILLS_CATEGORIES.map((cat, catIdx) => {
            if (catIdx !== activeTab) return null;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={skill.name}
                    className="glass-card p-6 rounded-2xl border border-white/10 hover:border-cyan-400/40 glass-card-hover"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{skill.icon}</span>
                        <div>
                          <h4 className="font-bold text-white text-base sm:text-lg">{skill.name}</h4>
                          <span className="text-xs text-cyan-400 font-mono">{skill.tag}</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-md">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, delay: sIdx * 0.1 }}
                        className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
