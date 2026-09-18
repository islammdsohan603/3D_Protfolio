"use client";

import React, { useState } from "react";
import { Trophy } from "lucide-react";
import AchievementCard from "./AchievementCard";
import AchievementModal, { AchievementItem } from "./AchievementModal";
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from "./ui/ScrollReveal";

const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: "blackbelt-dev",
    title: "Programming Hero BLACKBELT Developer",
    subtitle: "Recognized for Outstanding Performance & Technical Mastery",
    organization: "Programming Hero",
    batch: "Batch 13",
    validity: "Valid Till Oct 2026",
    badgeLabel: "Blackbelt Developer",
    gradient: "bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300",
    image: "/blackbelt.png",
    description:
      "Awarded the prestigious BLACKBELT title by Programming Hero for achieving top-tier scores, exceptional code quality, rapid problem solving, and building complex end-to-end full-stack applications in Batch 13.",
    skillsCovered: [
      "React.js",
      "Next.js App Router",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "System Architecture",
      "AI Workflows",
    ],
  },
  {
    id: "completion-excellence",
    title: "Certificate of Completion with Excellence",
    subtitle: "Complete Web Development Course",
    organization: "Programming Hero",
    batch: "Batch 13",
    credentialId: "WEB13-0641",
    badgeLabel: "Top Graduate / Excellence",
    gradient: "bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-400",
    image: "/cartificat.png",
    description:
      "Completed full intensive curriculum with distinction (Credential ID: WEB13-0641). Mastering HTML5, CSS3, JavaScript (ES6+), React.js, Next.js, Node.js, Express.js, MongoDB database modeling, security authentication, and production deployment.",
    skillsCovered: [
      "HTML5 & CSS3",
      "Tailwind CSS",
      "JavaScript ES6+",
      "React.js & Hooks",
      "Next.js Server Actions",
      "RESTful APIs",
      "JWT Authentication",
      "Postman & Vercel",
    ],
  },
];

export default function Achievements() {
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementItem | null>(null);

  return (
    <section id="achievements" className="relative py-5 md:py-10 lg:py-16 z-10 overflow-x-clip transition-colors duration-300">
      <div className="w-11/12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-mono tracking-wider shadow-xs dark:shadow-sm">
            <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>HONORS & CERTIFIED CREDENTIALS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Achievements & <span className="text-gradient-cyan">Certifications</span>
          </h2>

          <p className="max-w-2xl mx-auto text-slate-600 dark:text-zinc-400 text-sm sm:text-base font-light">
            Official industry certifications, awards, and verified credentials establishing technical mastery in modern full-stack engineering and Next.js development.
          </p>
        </ScrollReveal>

        {/* Cards Grid */}
        <ScrollRevealStagger className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {ACHIEVEMENTS_DATA.map((item) => (
            <ScrollRevealItem key={item.id} className="h-full">
              <AchievementCard
                achievement={item}
                onSelect={(selected) => setSelectedAchievement(selected)}
              />
            </ScrollRevealItem>
          ))}
        </ScrollRevealStagger>
      </div>

      {/* Lightbox Modal with Full-Screen Image Preview */}
      <AchievementModal
        achievement={selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
      />
    </section>
  );
}
