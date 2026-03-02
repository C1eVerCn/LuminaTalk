"use client";

import { motion } from "framer-motion";
import { Mic, Pause, Square } from "lucide-react";

interface LiquidOrbProps {
  isListening?: boolean;
  isSpeaking?: boolean;
  size?: "sm" | "md" | "lg";
  showWaveform?: boolean;
}

export function LiquidOrb({ 
  isListening = false, 
  isSpeaking = false, 
  size = "lg",
  showWaveform = true 
}: LiquidOrbProps) {
  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-48 h-48",
    lg: "w-64 h-64"
  };

  return (
    <div className="relative">
      <motion.div
        className={`${sizeClasses[size]} rounded-full liquid-orb flex items-center justify-center relative overflow-hidden`}
        animate={{
          scale: isListening ? [1, 1.05, 1] : 1,
          filter: isListening ? "blur(2px)" : "blur(2px)"
        }}
        transition={{
          duration: 2,
          repeat: isListening ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        {showWaveform && isListening && (
          <div className="flex items-end space-x-1 h-12">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-white/60 rounded-full"
                animate={{
                  height: ["20%", "100%", "20%"],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
                style={{ height: "30%" }}
              />
            ))}
          </div>
        )}
        {isSpeaking && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Mic className="w-8 h-8 text-white/80" />
          </motion.div>
        )}
        {!isListening && !isSpeaking && (
          <div className="w-4 h-4 bg-white/40 rounded-full" />
        )}
      </motion.div>
      
      <div className="absolute -inset-10 bg-white/5 blur-[100px] -z-10 rounded-full" />
    </div>
  );
}

interface OrbControlButtonProps {
  icon: "pause" | "stop" | "mic";
  onClick: () => void;
  variant?: "default" | "danger";
}

export function OrbControlButton({ icon, onClick, variant = "default" }: OrbControlButtonProps) {
  const IconComponent = icon === "pause" ? Pause : icon === "stop" ? Square : Mic;
  
  return (
    <motion.button
      className={`w-16 h-16 rounded-full glass flex items-center justify-center text-xl transition-all ${
        variant === "danger" 
          ? "text-red-500 hover:bg-red-500/10" 
          : "hover:bg-white/10"
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <IconComponent className="w-5 h-5" />
    </motion.button>
  );
}
