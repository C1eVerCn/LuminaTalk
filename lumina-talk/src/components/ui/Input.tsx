"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="group">
        {label && (
          <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1 mb-2 block">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-white/30 transition-all ${className}`}
          {...props}
        />
        {error && (
          <p className="text-red-400 text-xs mt-2 ml-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
