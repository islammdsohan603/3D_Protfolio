"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

export type ScrollDirection = "up" | "down" | "left" | "right" | "none";

export interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: ScrollDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  viewportAmount?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 30,
  className = "",
  viewportAmount = 0.2,
  once = true,
}: ScrollRevealProps) {
  const getInitialOffsets = () => {
    switch (direction) {
      case "up":
        return { x: 0, y: distance };
      case "down":
        return { x: 0, y: -distance };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      case "none":
        return { x: 0, y: 0 };
    }
  };

  const initial = getInitialOffsets();

  return (
    <motion.div
      initial={{ opacity: 0, x: initial.x, y: initial.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: viewportAmount }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Cubic-bezier easeOutExpo for ultra-fluid motion
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export interface ScrollRevealStaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
  viewportAmount?: number;
  once?: boolean;
}

export function ScrollRevealStagger({
  children,
  className = "",
  staggerChildren = 0.12,
  delayChildren = 0.05,
  viewportAmount = 0.2,
  once = true,
}: ScrollRevealStaggerProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: viewportAmount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export interface ScrollRevealItemProps {
  children: React.ReactNode;
  className?: string;
  direction?: ScrollDirection;
  distance?: number;
  duration?: number;
}

export function ScrollRevealItem({
  children,
  className = "",
  direction = "up",
  distance = 25,
  duration = 0.5,
}: ScrollRevealItemProps) {
  const getInitialOffsets = () => {
    switch (direction) {
      case "up":
        return { x: 0, y: distance };
      case "down":
        return { x: 0, y: -distance };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      case "none":
        return { x: 0, y: 0 };
    }
  };

  const initial = getInitialOffsets();

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: initial.x, y: initial.y },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

export default ScrollReveal;
