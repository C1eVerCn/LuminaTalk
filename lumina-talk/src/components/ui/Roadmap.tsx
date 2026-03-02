"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StepRoadmapProps {
  steps: Array<{
    id: number;
    title: string;
    subtitle: string;
    completed?: boolean;
    active?: boolean;
  }>;
}

export function StepRoadmap({ steps }: StepRoadmapProps) {
  return (
    <div className="flex justify-between items-start mb-20 relative">
      <div className="absolute top-6 left-0 w-full h-[1px] bg-white/10 -z-0" />
      
      {steps.map((step, index) => (
        <motion.div
          key={step.id}
          className="z-10 text-center flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: step.active || step.completed ? 1 : 0.4 }}
          transition={{ delay: index * 0.1 }}
        >
          <motion.div
            className={`w-12 h-12 rounded-full glass flex items-center justify-center mb-4 font-bold ${
              step.active
                ? "bg-white text-black border-white/40"
                : "border-white/10"
            }`}
            animate={step.active ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 2, repeat: step.active ? Infinity : 0 }}
          >
            {step.id}
          </motion.div>
          <span className="text-xs font-bold uppercase tracking-widest">
            {step.title}
          </span>
          <span className="text-[10px] text-gray-500 mt-1">{step.subtitle}</span>
        </motion.div>
      ))}
    </div>
  );
}

interface TopicCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  active?: boolean;
  onClick?: () => void;
}

export function TopicCard({ icon, title, subtitle, active = false, onClick }: TopicCardProps) {
  return (
    <motion.div
      className={`p-5 rounded-2xl cursor-pointer transition-all ${
        active
          ? "bg-white text-black"
          : "border border-white/10 hover:border-white/30"
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`${active ? "text-black" : "text-gray-500"} mb-4`}>
        {icon}
      </div>
      <div className="font-bold">{title}</div>
      <div className={`text-[10px] ${active ? "opacity-60" : "text-gray-500"} mt-1`}>
        {subtitle}
      </div>
    </motion.div>
  );
}
