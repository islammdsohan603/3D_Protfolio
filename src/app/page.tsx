"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#09090b] text-white overflow-hidden selection:bg-cyan-500 selection:text-black">
      {/* Sci-Fi Ambient Grid Pattern Background Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Glassmorphism Navigation Bar */}
      <Navbar />

      {/* Hero Section with 3D Antigravity Canvas */}
      <Hero />

      {/* About Section with 3D Stat Cards & Profile Image */}
      <About />

      {/* Verified Achievements & Certifications */}
      <Achievements />

      {/* Technical Skills Architecture */}
      <Skills />

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
