"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className = "", hover = false, onClick }: GlassCardProps) {
  return (
    <motion.div
      className={`glass rounded-[2.5rem] p-8 ${hover ? "cursor-pointer hover:bg-white/[0.06] transition-all" : ""} ${className}`}
      onClick={onClick}
      whileHover={hover ? { scale: 1.02 } : undefined}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export function GlassCardLarge({ children, className = "", hover = false, onClick }: GlassCardProps) {
  return (
    <motion.div
      className={`glass rounded-[3rem] p-12 ${hover ? "cursor-pointer hover:bg-white/[0.06] transition-all group" : ""} ${className}`}
      onClick={onClick}
      whileHover={hover ? { scale: 1.01 } : undefined}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
