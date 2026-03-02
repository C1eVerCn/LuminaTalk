"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
}

export function ProgressBar({ 
  progress, 
  label, 
  showPercentage = true,
  className = "" 
}: ProgressBarProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between text-xs">
          {label && <span className="text-gray-500 italic">{label}</span>}
          {showPercentage && <span className="text-white">{progress}%</span>}
        </div>
      )}
      <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white shadow-[0_0_10px_white]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

interface MetricBarProps {
  label: string;
  value: number;
  maxValue?: number;
}

export function MetricBar({ label, value, maxValue = 9 }: MetricBarProps) {
  const percentage = (value / maxValue) * 100;
  
  return (
    <div>
      <div className="flex justify-between text-[10px] uppercase font-bold mb-2">
        <span>{label}</span>
        <span>{value.toFixed(1)}</span>
      </div>
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
