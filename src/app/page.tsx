"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Skills from "@/components/Skills";
import CurrentWorkSection from "@/components/experience/CurrentWorkSection";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-100 dark:bg-[#09090b] text-slate-900 dark:text-zinc-100 transition-colors duration-300 overflow-x-clip selection:bg-cyan-500 selection:text-black">
      {/* Sci-Fi Ambient Grid Pattern Background Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0 transition-opacity duration-300" />

      {/* Glassmorphism Navigation Bar */}
      <Navbar />

      {/* Hero Section with 3D Antigravity Canvas */}
      <Hero />

      {/* About Section with 3D Stat Cards & Profile Image */}
      <About />

      {/* Technical Skills Architecture */}
      <Skills />

      {/* Live Industry Experience & Active Production Showcase */}
      <CurrentWorkSection />

      {/* Verified Achievements & Certifications */}
      <Achievements />

      {/* Production Projects Showcase */}
      <Projects />

      {/* Contact & Direct Channels */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Floating Corner WhatsApp Action */}
      <FloatingWhatsApp />
    </main>
  );
}
