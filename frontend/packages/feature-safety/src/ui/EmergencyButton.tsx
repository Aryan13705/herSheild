import React from "react";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface EmergencyButtonProps {
  onTrigger: () => void;
  isTriggered: boolean;
  disabled?: boolean;
}

export function EmergencyButton({ onTrigger, isTriggered, disabled = false }: EmergencyButtonProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-[#0F1420] border border-white/5 relative overflow-hidden">
      {/* Background Pulse Effect when Triggered */}
      {isTriggered && (
        <motion.div
          className="absolute inset-0 bg-[#E8537A]/20"
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      )}

      <button
        disabled={disabled || isTriggered}
        onClick={onTrigger}
        className={`relative w-40 h-40 rounded-full flex flex-col items-center justify-center gap-2 transition-all duration-300 shadow-2xl ${
          isTriggered
            ? "bg-[#E8537A] scale-95"
            : disabled
            ? "bg-gray-800 cursor-not-allowed opacity-50"
            : "bg-gradient-to-br from-[#E8537A] to-[#D4406A] hover:scale-105 active:scale-95 cursor-pointer"
        }`}
        style={{
          boxShadow: isTriggered
            ? "0 0 60px rgba(232,83,122,0.6)"
            : "0 0 30px rgba(232,83,122,0.3)",
        }}
      >
        <AlertTriangle className={`w-12 h-12 text-white ${isTriggered ? "animate-pulse" : ""}`} strokeWidth={2.5} />
        <span className="text-white font-black tracking-widest text-xl">
          {isTriggered ? "ACTIVE" : "SOS"}
        </span>
      </button>

      <p className="mt-6 text-sm text-[#8892B0] font-medium text-center max-w-[200px]">
        {isTriggered
          ? "Emergency contacts and local authorities have been notified."
          : "Hold for 3 seconds to trigger silent alarm"}
      </p>
    </div>
  );
}
