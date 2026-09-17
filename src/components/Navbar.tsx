"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, MessageCircle, ArrowUpRight } from "lucide-react";
import confetti from "canvas-confetti";
import Link from "next/link";
import { usePathname } from "next/navigation";

const RESUME_DOWNLOAD_URL = "https://drive.google.com/uc?export=download&id=1gg2hVewdNubgbXD7JEXdMLieLW3hXG0s";

interface NavLink {
  name: string;
  href: string;
}

const NAV_LINKS: readonly NavLink[] = [
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Experience", href: "/#experience" },
  { name: "Projects", href: "/#projects" },
  { name: "Achievements", href: "/#achievements" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll detection for background blur intensification
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Automatically close mobile menu on App Router route changes (React-recommended render-phase pattern)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  // Lock body scroll when mobile drawer is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const triggerDownloadResume = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.2 },
      colors: ["#6366f1", "#818cf8", "#cbd5e1"],
    });

    const link = document.createElement("a");
    link.href = RESUME_DOWNLOAD_URL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? "backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800/80 shadow-2xl py-3.5"
          : "bg-zinc-950/40 backdrop-blur-xs border-b border-zinc-900/60 py-5"
      }`}
    >
      <div className="w-11/12 max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Emblem */}
        <Link
          href="/"
          className="flex items-center gap-3.5 group min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded-lg p-1 -m-1"
          aria-label="MD. SOHAN - Creative Technologist Portfolio"
        >
          <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center transition-all duration-300 group-hover:border-zinc-700 group-hover:bg-zinc-800/80 shadow-sm">
            <span className="font-mono font-bold text-xs text-zinc-100 tracking-tighter">
              MS
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base sm:text-lg tracking-tight text-zinc-100 group-hover:text-white transition-colors">
              MD. SOHAN
            </span>
            <span className="text-[11px] tracking-wider text-zinc-500 uppercase font-mono">
              Creative Technologist
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links — Strictly lg:flex */}
        <nav
          className="hidden lg:flex items-center gap-1 bg-zinc-900/60 px-3 py-1.5 rounded-full border border-zinc-800/80 backdrop-blur-md shadow-inner"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-100 rounded-full hover:bg-zinc-800/60 transition-all duration-200 tracking-tight min-h-[38px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs — Strictly lg:flex */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://wa.me/8801849468455"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-100 text-xs font-medium px-4 py-2 rounded-lg transition-all duration-300 shadow-sm min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
            aria-label="Chat with MD. SOHAN on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-zinc-400" />
            <span>Connect</span>
          </a>

          <button
            onClick={triggerDownloadResume}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-5 py-2.5 rounded-lg transition-colors duration-200 shadow-sm flex items-center gap-2 cursor-pointer min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            aria-label="Download MD. SOHAN Resume"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile & Tablet Hamburger Toggle — block lg:hidden */}
        <div className="block lg:hidden">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2.5 text-zinc-300 hover:text-white rounded-xl bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
          >
            <div className="w-5 h-4 relative flex flex-col justify-between items-center">
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="w-full h-0.5 bg-zinc-200 rounded-full origin-center"
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="w-full h-0.5 bg-zinc-200 rounded-full origin-center"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="w-full h-0.5 bg-zinc-200 rounded-full origin-center"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile + Tablet Animated Drawer — Below lg */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="block lg:hidden bg-zinc-950/95 backdrop-blur-2xl border-b border-zinc-800/80 shadow-2xl overflow-hidden"
          >
            <nav
              className="w-11/12 max-w-7xl mx-auto py-6 flex flex-col space-y-2"
              aria-label="Mobile Navigation"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                  hidden: {},
                }}
                className="flex flex-col space-y-1"
              >
                {NAV_LINKS.map((link) => (
                  <motion.div
                    key={link.name}
                    variants={{
                      hidden: { opacity: 0, x: -12 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      className="text-sm sm:text-base font-medium text-zinc-300 hover:text-white py-3 px-3 rounded-lg hover:bg-zinc-900/60 transition-colors flex items-center justify-between min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className="w-4 h-4 text-zinc-600" />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/8801849468455"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="flex-1 flex items-center justify-center gap-2 py-3 text-xs sm:text-sm font-medium border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 rounded-lg transition-all duration-300 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                  aria-label="Chat with MD. SOHAN on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-zinc-400" />
                  <span>WhatsApp Direct</span>
                </a>

                <button
                  onClick={() => {
                    handleLinkClick();
                    triggerDownloadResume();
                  }}
                  className="flex-1 py-3 text-xs sm:text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  aria-label="Download MD. SOHAN Resume"
                >
                  <Download className="w-4 h-4 text-white" />
                  <span>Download Resume</span>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
