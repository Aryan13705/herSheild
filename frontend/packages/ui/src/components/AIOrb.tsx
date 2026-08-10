import React from "react";
import { cn } from "../lib/utils";

export type AIOrbState = "safe" | "listening" | "thinking" | "scanning" | "emergency";

interface AIOrbProps {
  state?: AIOrbState;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const AIOrb: React.FC<AIOrbProps> = ({ state = "safe", className, size = "md" }) => {
  // Map states to animations
  const stateClasses = {
    safe: "animate-[breathe_4s_ease-in-out_infinite] border-[var(--color-brand-tertiary)]",
    listening: "animate-[pulseCyan_2s_ease-in-out_infinite] border-[var(--color-brand-primary)]",
    thinking: "animate-[radar_3s_linear_infinite] border-[var(--color-brand-secondary)]",
    scanning: "animate-[radar_2s_linear_infinite] border-[var(--color-brand-tertiary)]",
    emergency: "animate-[breathe_1s_ease-in-out_infinite] border-[var(--color-safety-danger)] shadow-[0_0_40px_rgba(255,59,48,0.8)]",
  };

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-40 h-40",
  };

  return (
    <div className={cn("relative flex items-center justify-center", sizeClasses[size], className)}>
      {/* Outer Glow */}
      <div 
        className={cn(
          "absolute inset-0 rounded-full blur-xl opacity-60 transition-all duration-1000",
          state === "emergency" ? "bg-[var(--color-safety-danger)]" : "bg-[var(--color-brand-tertiary)]"
        )}
      />
      
      {/* Inner Orb Body */}
      <div 
        className={cn(
          "absolute inset-2 rounded-full border border-opacity-50 transition-all duration-500",
          "bg-gradient-to-br from-[var(--color-surface-glass)] to-[var(--color-surface-bg)] backdrop-blur-3xl",
          stateClasses[state]
        )}
        style={{
          boxShadow: state === "emergency" 
            ? "inset 0 0 20px rgba(255,59,48,0.5)" 
            : "inset 0 0 20px rgba(0,240,255,0.2)",
        }}
      >
        {/* Core light */}
        <div 
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md",
            state === "emergency" ? "bg-white w-2 h-2" : "bg-[var(--color-brand-tertiary)] w-3 h-3"
          )}
        />
      </div>

      {/* Radar rings for specific states */}
      {(state === "scanning" || state === "thinking") && (
        <div className="absolute inset-0 rounded-full border-t border-[var(--color-brand-tertiary)] animate-[radar_2s_linear_infinite] opacity-50" />
      )}
    </div>
  );
};
