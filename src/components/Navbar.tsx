"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, MessageCircle, ArrowUpRight, Sun, Moon } from "lucide-react";
import confetti from "canvas-confetti";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

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

const emptySubscribe = () => () => {};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  // Handle scroll detection for background blur intensification
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Automatically close mobile menu on App Router route changes
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

  const isDark = mounted ? theme === "dark" : true;

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? "backdrop-blur-md bg-white/85 dark:bg-zinc-950/85 border-b border-slate-200/80 dark:border-zinc-800/80 shadow-lg dark:shadow-2xl py-3"
          : "bg-slate-100/50 dark:bg-zinc-950/40 backdrop-blur-xs border-b border-slate-200/60 dark:border-zinc-900/60 py-4"
      }`}
    >
      <div className="w-11/12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Emblem */}
        <Link
          href="/"
          className="flex items-center gap-3.5 group min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1 -m-1"
          aria-label="MD. SOHAN - Creative Technologist Portfolio"
        >
          <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-center transition-all duration-300 group-hover:border-indigo-400 dark:group-hover:border-zinc-700 group-hover:bg-slate-50 dark:group-hover:bg-zinc-800/80 shadow-xs dark:shadow-sm">
            <span className="font-mono font-bold text-xs text-slate-900 dark:text-zinc-100 tracking-tighter">
              MS
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-white transition-colors">
              MD. SOHAN
            </span>
            <span className="text-[11px] tracking-wider text-slate-500 dark:text-zinc-500 uppercase font-mono">
              Creative Technologist
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links — Strictly lg:flex */}
        <nav
          className="hidden lg:flex items-center gap-1 bg-white/80 dark:bg-zinc-900/60 px-3 py-1.5 rounded-full border border-slate-200/90 dark:border-zinc-800/80 backdrop-blur-md shadow-xs dark:shadow-inner"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 rounded-full hover:bg-slate-100/90 dark:hover:bg-zinc-800/60 transition-all duration-200 tracking-tight min-h-[36px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs & Theme Switcher — Strictly lg:flex */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Theme Toggle Button (Desktop) */}
          <button
            onClick={toggleTheme}
            type="button"
            className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-indigo-400 dark:hover:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-amber-300 transition-all duration-300 shadow-xs dark:shadow-sm flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label={isDark ? "Switch to Executive Slate theme" : "Switch to Deep Obsidian Dark theme"}
            title={isDark ? "Switch to Executive Slate theme" : "Switch to Deep Obsidian Dark theme"}
          >
            {mounted ? (
              <motion.div
                key={theme}
                initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-indigo-600" />
                )}
              </motion.div>
            ) : (
              <div className="w-4 h-4 rounded-full bg-slate-300 dark:bg-zinc-700 animate-pulse" />
            )}
          </button>

          <a
            href="https://wa.me/8801849468455"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-slate-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/80 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-zinc-100 text-xs font-medium px-4 py-2 rounded-xl transition-all duration-300 shadow-xs dark:shadow-sm min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label="Chat with MD. SOHAN on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
            <span>Connect</span>
          </a>

          <button
            onClick={triggerDownloadResume}
            className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium text-xs px-5 py-2.5 rounded-xl transition-colors duration-200 shadow-xs dark:shadow-sm flex items-center gap-2 cursor-pointer min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            aria-label="Download MD. SOHAN Resume"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile & Tablet Controls Cluster — block lg:hidden */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Theme Toggle Button (Mobile Header) */}
          <button
            onClick={toggleTheme}
            type="button"
            className="p-2.5 text-slate-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-amber-300 rounded-xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800/80 shadow-xs transition-colors cursor-pointer min-w-[42px] min-h-[42px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label={isDark ? "Switch to Executive Slate theme" : "Switch to Deep Obsidian Dark theme"}
          >
            {mounted ? (
              isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )
            ) : (
              <div className="w-4 h-4 rounded-full bg-slate-300 dark:bg-zinc-700 animate-pulse" />
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2.5 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white rounded-xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800/80 hover:border-slate-300 dark:hover:border-zinc-700 transition-colors cursor-pointer min-w-[42px] min-h-[42px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 shadow-xs"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
          >
            <div className="w-5 h-4 relative flex flex-col justify-between items-center">
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="w-full h-0.5 bg-slate-800 dark:bg-zinc-200 rounded-full origin-center"
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="w-full h-0.5 bg-slate-800 dark:bg-zinc-200 rounded-full origin-center"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="w-full h-0.5 bg-slate-800 dark:bg-zinc-200 rounded-full origin-center"
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
            className="block lg:hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border-b border-slate-200/90 dark:border-zinc-800/80 shadow-2xl overflow-hidden transition-colors duration-300"
          >
            <nav
              className="w-11/12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col space-y-2"
              aria-label="Mobile Navigation"
            >
              {/* Drawer Theme Switcher Row */}
              <div className="flex items-center justify-between p-3 mb-2 rounded-xl bg-slate-100/90 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 text-xs font-mono">
                <span className="text-slate-600 dark:text-zinc-400 flex items-center gap-2">
                  <span>INTERFACE THEME:</span>
                  <strong className="text-slate-900 dark:text-zinc-100 font-bold uppercase">
                    {mounted ? (isDark ? "Obsidian Dark" : "Executive Slate") : "Loading"}
                  </strong>
                </span>
                <button
                  onClick={toggleTheme}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 text-slate-800 dark:text-zinc-200 font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  {isDark ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span>Slate</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Dark</span>
                    </>
                  )}
                </button>
              </div>

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
                      className="text-sm sm:text-base font-medium text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white py-3 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-900/60 transition-colors flex items-center justify-between min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 dark:text-zinc-600" />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              <div className="pt-6 border-t border-slate-200 dark:border-zinc-800/80 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/8801849468455"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="flex-1 flex items-center justify-center gap-2 py-3 text-xs sm:text-sm font-medium border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-800 dark:text-zinc-100 rounded-xl transition-all duration-300 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 shadow-xs"
                  aria-label="Chat with MD. SOHAN on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-slate-500 dark:text-zinc-400" />
                  <span>WhatsApp Direct</span>
                </a>

                <button
                  onClick={() => {
                    handleLinkClick();
                    triggerDownloadResume();
                  }}
                  className="flex-1 py-3 text-xs sm:text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 shadow-xs"
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
