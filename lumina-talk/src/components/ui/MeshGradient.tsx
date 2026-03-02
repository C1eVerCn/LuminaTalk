"use client";

import { motion } from "framer-motion";

interface MeshGradientProps {
  delay?: number;
}

export function MeshGradient({ delay = 0 }: MeshGradientProps) {
  return (
    <motion.div
      className="mesh-gradient animate-mesh-rotate"
      style={{ animationDelay: `${delay}s` }}
    />
  );
}

export function MeshGradientStatic() {
  return (
    <div 
      className="absolute inset-0 -z-10"
      style={{
        background: "radial-gradient(at 50% 50%, rgba(10,10,10,1) 0, #000 100%)"
      }}
    />
  );
}
